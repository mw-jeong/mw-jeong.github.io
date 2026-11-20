// Header animation: a 3D model of Gangnam (OpenStreetMap roads and buildings) where one person at a
// time goes about their day, then faces a what-if (a vertiport, a road closure, a department store)
// and weighs two options before choosing. Loaded lazily from Hero.astro when WebGL2 is available.
import { Deck, MapView, LightingEffect, AmbientLight, DirectionalLight } from '@deck.gl/core';
import { PolygonLayer, PathLayer, ScatterplotLayer, ColumnLayer, TextLayer, LineLayer } from '@deck.gl/layers';
import { TripsLayer } from '@deck.gl/geo-layers';
import { PathStyleExtension } from '@deck.gl/extensions';

export async function start(root, { reduce = false } = {}) {
const REDUCE = reduce;
const CITY = await (await fetch('/data/city.json')).json();
let live = false;
  // ---------- story timeline (seconds within one persona) ----------
  const LOOP = 14, T_Q = 4.4, T_INT = 5.0, T_CHOICE = 5.9, T_DECIDE = 7.6, T_GO = 8.1, T_END = 12.8;
  const PERSON = [38, 48, 61], FLOW = [124, 138, 162], GRAY = [150, 158, 168];
  const PALETTE = {
    uam: { c: [0, 144, 210], ink: [0, 112, 159] },       // AREX blue
    closure: { c: [214, 48, 49], ink: [176, 34, 36] },   // construction red
    store: { c: [240, 125, 26], ink: [184, 88, 8] },     // department-store orange
  };
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const smooth = (x) => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };
  const hex = (c) => '#' + c.map((v) => v.toString(16).padStart(2, '0')).join('');

  // ---------- city ----------
  const [W0, S0] = CITY.origin;
  const ll = (x, y) => [W0 + x / 1e5, S0 + y / 1e5];
  const MX = Math.cos((37.5015 * Math.PI) / 180) * 1.1132, MY = 1.1054;
  const buildings = CITY.buildings.map((b) => { const ring = []; let x = b[1], y = b[2]; ring.push(ll(x, y)); for (let i = 3; i < b.length; i += 2) { x += b[i]; y += b[i + 1]; ring.push(ll(x, y)); } return { polygon: ring, h: b[0] }; });
  const E = CITY.edges.map(([c, u, v, ...f]) => {
    const xy = []; for (let i = 0; i < f.length; i += 2) xy.push([f[i], f[i + 1]]);
    let len = 0; for (let i = 1; i < xy.length; i++) len += Math.hypot((xy[i][0] - xy[i - 1][0]) * MX, (xy[i][1] - xy[i - 1][1]) * MY);
    return { c, u, v, xy, len, mid: xy[Math.floor(xy.length / 2)], path: xy.map(([a, b]) => ll(a, b)) };
  }).filter((e) => e.len > 0.5);
  let N = 0; for (const e of E) N = Math.max(N, e.u + 1, e.v + 1);
  const NP = new Array(N); for (const e of E) { NP[e.u] = NP[e.u] || e.xy[0]; NP[e.v] = NP[e.v] || e.xy[e.xy.length - 1]; }
  const COST = [0.7, 0.85, 1.0, 1.3];
  const adj = Array.from({ length: N }, () => []);
  E.forEach((e, i) => { const w = e.len * COST[e.c]; adj[e.u].push({ e: i, to: e.v, w }); adj[e.v].push({ e: i, to: e.u, w }); });
  const comp = new Int32Array(N).fill(-1); let best = -1, bestSize = 0;
  for (let s = 0, cid = 0; s < N; s++) { if (comp[s] !== -1 || !NP[s]) continue; let size = 0; const st = [s]; comp[s] = cid; while (st.length) { const n = st.pop(); size++; for (const a of adj[n]) if (comp[a.to] === -1) { comp[a.to] = cid; st.push(a.to); } } if (size > bestSize) { bestSize = size; best = cid; } cid++; }
  const nodes = (classes, test = () => true) => { const s = new Set(); for (const e of E) if (classes.includes(e.c)) for (const n of [e.u, e.v]) if (comp[n] === best && test(NP[n])) s.add(n); return [...s]; };
  const nearest = (x, y, list) => { let bn = list[0], bd = Infinity; for (const n of list) { const d = Math.hypot(NP[n][0] - x, NP[n][1] - y); if (d < bd) { bd = d; bn = n; } } return bn; };
  const nodeLL = (n) => ll(NP[n][0], NP[n][1]);

  // Teheran-ro (Gangnam Station -> Samseong); the stretch under construction
  const LA = [1260, 740], LB = [4500, 1740];
  const lineY = (x) => LA[1] + ((x - LA[0]) * (LB[1] - LA[1])) / (LB[0] - LA[0]);
  const distToLine = (p) => { const dx = LB[0] - LA[0], dy = LB[1] - LA[1]; return Math.abs(dy * (p[0] - LA[0]) - dx * (p[1] - LA[1])) / Math.hypot(dx, dy); };
  const CLOSED = new Set(E.map((e, i) => (e.c === 0 && distToLine(e.mid) < 40 && e.mid[0] > 2050 && e.mid[0] < 2850 ? i : -1)).filter((i) => i >= 0));

  const cache = new Map();
  function route(src, dst, closed) {
    const key = (closed ? 1 : 0) * N * N + src * N + dst;
    if (cache.has(key)) return cache.get(key);
    const dist = new Float64Array(N).fill(Infinity), pe = new Int32Array(N), pn = new Int32Array(N).fill(-1), h = [];
    const push = (d, n) => { h.push([d, n]); let i = h.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (h[p][0] <= h[i][0]) break; [h[p], h[i]] = [h[i], h[p]]; i = p; } };
    const pop = () => { const top = h[0], last = h.pop(); if (h.length) { h[0] = last; let i = 0; for (;;) { const l = 2 * i + 1, r = l + 1; let m = i; if (l < h.length && h[l][0] < h[m][0]) m = l; if (r < h.length && h[r][0] < h[m][0]) m = r; if (m === i) break; [h[m], h[i]] = [h[i], h[m]]; i = m; } } return top; };
    dist[src] = 0; push(0, src);
    while (h.length) { const [d, n] = pop(); if (d > dist[n]) continue; if (n === dst) break; for (const a of adj[n]) { if (closed && CLOSED.has(a.e)) continue; const nd = d + a.w; if (nd < dist[a.to]) { dist[a.to] = nd; pe[a.to] = a.e; pn[a.to] = n; push(nd, a.to); } } }
    let res = null;
    if (dist[dst] < Infinity && src !== dst) {
      const steps = []; for (let n = dst; n !== src; n = pn[n]) steps.push({ e: pe[n], from: pn[n] }); steps.reverse();
      const pts = []; let usesClosed = false;
      for (const st of steps) { const e = E[st.e]; if (CLOSED.has(st.e)) usesClosed = true; const seq = e.u === st.from ? e.path : [...e.path].reverse(); for (let i = pts.length ? 1 : 0; i < seq.length; i++) pts.push(seq[i]); }
      res = { pts, usesClosed, cost: dist[dst] };
    }
    cache.set(key, res);
    return res;
  }
  const join = (a, b) => (a && b ? { pts: [...a.pts, ...b.pts.slice(1)], cost: a.cost + b.cost } : null);
  function timed(pts, t0, v) {
    const ts = [t0]; let acc = 0;
    for (let i = 1; i < pts.length; i++) { acc += Math.hypot((pts[i][0] - pts[i - 1][0]) * 1e5 * MX, (pts[i][1] - pts[i - 1][1]) * 1e5 * MY) + Math.abs((pts[i][2] || 0) - (pts[i - 1][2] || 0)); ts.push(t0 + acc / v); }
    return { path: pts.map((p) => [p[0], p[1], p[2] || 0]), ts, t0, t1: ts[ts.length - 1] };
  }
  const posAt = (tr, t) => { const ts = tr.ts; if (t <= ts[0]) return tr.path[0]; for (let i = 1; i < ts.length; i++) if (t <= ts[i]) { const k = (t - ts[i - 1]) / (ts[i] - ts[i - 1] || 1), a = tr.path[i - 1], b = tr.path[i]; return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]; } return tr.path[tr.path.length - 1]; };
  const airPath = (a, b, z0, z1, peak) => { const pts = []; for (let i = 0; i <= 40; i++) { const s = i / 40; pts.push([a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s, z0 + (z1 - z0) * s + (peak - Math.max(z0, z1)) * Math.sin(Math.PI * s)]); } return pts; };

  // ---------- interventions ----------
  const all0 = nodes([0, 1]), all2 = nodes([1, 2]), all3 = nodes([3]);
  const STORE_NODE = nearest(1750, 1250, nodes([2, 3]));
  const sc = NP[STORE_NODE], sw = 34, sh = 26;
  const STORE = { polygon: [ll(sc[0] - sw, sc[1] - sh), ll(sc[0] + sw, sc[1] - sh), ll(sc[0] + sw, sc[1] + sh), ll(sc[0] - sw, sc[1] + sh)], h: 85 };
  const VERT_NODE = nearest(3200, 1360, all0), VH = 70;
  const AIRPORT = ll(-1500, 2500);
  const closedPaths = [...CLOSED].map((i) => E[i].path);
  const closedEnds = (() => { const p = [...CLOSED].flatMap((i) => [E[i].xy[0], E[i].xy[E[i].xy.length - 1]]); p.sort((a, b) => a[0] - b[0]); return [ll(...p[0]), ll(...p[p.length - 1])]; })();
  const closedMid = [(closedEnds[0][0] + closedEnds[1][0]) / 2, (closedEnds[0][1] + closedEnds[1][1]) / 2];

  // ---------- stories ----------
  const PV = 1450, AV = 1900;
  function build(def) {
    const S = { ...def, pal: PALETTE[def.kind], trips: [], stops: [{ label: def.stops[0][0], t: 0 }] };
    [0.8, 2.7].forEach((dep, i) => {
      const r = route(def.stops[i][1], def.stops[i + 1][1], false);
      const tr = timed(r ? r.pts : [nodeLL(def.stops[i][1]), nodeLL(def.stops[i + 1][1])], dep, PV);
      S.trips.push(tr); S.stops.push({ label: def.stops[i + 1][0], dep, t: tr.t1 });
    });
    // the two options; options[win] is what they do
    const win = def.options.findIndex((o) => o.win);
    const chosen = def.options[win];
    const tr = timed(chosen.ground, T_GO, PV);
    S.trips.push(tr); S.stops.push({ label: def.newLabel, dep: T_GO, t: tr.t1, changed: true });
    if (chosen.air) { S.air = timed(chosen.air, tr.t1 + 0.35, 1100); S.stops.push({ label: 'Airport', dep: S.air.t0, t: S.air.t0 + 1.4, changed: true }); }
    S.win = win;
    return S;
  }
  const lunchB = nearest(3330, 1010, all2);
  const roadToAirport = route(lunchB, nearest(700, 760, all0), false);
  const toVert = route(lunchB, VERT_NODE, false);
  const work = nearest(3050, 1290, nodes([0]));
  const client = (() => { const c = nodes([0, 1, 2], (p) => p[0] > 1750 && p[0] < 2100 && p[1] > 850 && p[1] < 1150); for (const n of c) { const r = route(n, work, false); if (r && r.usesClosed && route(n, work, true)) return n; } return c[0]; })();
  // two detours: the best one, and the best one that goes round the other side of Teheran-ro
  const detour1 = route(client, work, true);
  const side1 = detour1.pts.reduce((s, p) => s + ((p[1] - S0) * 1e5 - lineY((p[0] - W0) * 1e5)), 0) > 0 ? 'north' : 'south';
  const viaOther = nearest(2450, lineY(2450) + (side1 === 'north' ? -260 : 260), nodes([1, 2, 3]));
  const detour2 = join(route(client, viaOther, true), route(viaOther, work, true)) || detour1;
  const north = side1 === 'north' ? detour1 : detour2, south = side1 === 'north' ? detour2 : detour1;
  const academy = nearest(2350, 1250, all2), restaurant = nearest(2560, 1330, all2);

  const STORIES = [
    build({ key: 'business', kind: 'uam', name: 'Business traveler', attrs: '45, male, visiting from Busan, no car in Seoul',
      q: 'What if a vertiport for urban air mobility opens nearby?', cq: 'Taxi or UAM?',
      stops: [['Hotel', nearest(3800, 1550, all3)], ['Meeting', nearest(3150, 1120, all0)], ['Lunch', lunchB]], newLabel: 'Vertiport',
      options: [
        { label: 'Taxi', p: 0.36, preview: roadToAirport.pts },
        { label: 'UAM (air taxi)', p: 0.64, win: true, ground: toVert.pts, air: airPath(nodeLL(VERT_NODE), AIRPORT, VH, 340, 360), preview: [...toVert.pts.map((q) => [q[0], q[1], 0]), ...airPath(nodeLL(VERT_NODE), ll(1200, 1900), VH, 300, 320)] },
      ], replan: 'Takes the air taxi to the airport.' }),
    build({ key: 'office', kind: 'closure', name: 'Office worker', attrs: '32, female, lives near Seolleung, drives to work',
      q: 'What if Teheran-ro closes for construction?', cq: 'North side or south side?',
      stops: [['Home', nearest(2900, 1750, all3)], ['Work', work], ['Client', client]], newLabel: 'Work',
      options: [
        { label: 'Detour north', p: north === detour1 ? 0.59 : 0.41, win: north === detour1, ground: north.pts, preview: north.pts },
        { label: 'Detour south', p: south === detour1 ? 0.59 : 0.41, win: south === detour1, ground: south.pts, preview: south.pts },
      ], replan: 'Drives back to the office on the shorter detour.' }),
    build({ key: 'student', kind: 'store', name: 'Student', attrs: '17, male, high school, takes the bus',
      q: 'What if a new department store opens here?', cq: 'Restaurant or department store?',
      stops: [['Home', nearest(1250, 1600, all3)], ['School', nearest(2050, 1650, all2)], ['Academy', academy]], newLabel: 'Dept. store',
      options: [
        { label: 'Restaurant', p: 0.43, preview: route(academy, restaurant, false).pts },
        { label: 'Dept. store', p: 0.57, win: true, ground: route(academy, STORE_NODE, false).pts, preview: route(academy, STORE_NODE, false).pts },
      ], replan: 'Meets friends at the new department store after class.' }),
  ];

  // ---------- background flows (one set per story) ----------
  let seed = 9; const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const pick = (a) => a[Math.floor(rand() * a.length)];
  const focus = (p) => p[0] > 800 && p[0] < 4000 && p[1] > 500 && p[1] < 1900;
  const H = nodes([3], focus), WK = nodes([0, 1], focus);
  function flows(kind) {
    const out = []; let changed = 0, replanned = 0;
    for (let i = 0; i < 130; i++) {
      let src = pick(H), dst = pick(WK), t = 0.2 + rand() * 10.5;
      if (rand() < 0.5) [src, dst] = [dst, src];
      let k = 'flow';
      const after = t > T_DECIDE;
      if (after && kind === 'store' && changed < 9 && rand() < 0.2) { dst = STORE_NODE; k = 'chg'; changed++; }
      if (after && kind === 'uam' && changed < 5 && rand() < 0.12) { dst = VERT_NODE; k = 'chg'; changed++; }
      const r = route(src, dst, t > T_INT && kind === 'closure');
      if (!r) continue;
      if (t > T_INT && kind === 'closure') { const o = route(src, dst, false); if (o && o.usesClosed) { replanned++; if (changed < 12 && t > T_DECIDE) { k = 'chg'; changed++; } } }
      if (k === 'chg' && kind !== 'closure') replanned++;
      const tr = timed(r.pts, t, AV * (0.85 + rand() * 0.3)); tr.kind = k; out.push(tr);
    }
    return { list: out, replanned };
  }
  const FLOWS = Object.fromEntries(STORIES.map((s) => [s.key, flows(s.kind)]));
  const EXTRA_AIR = timed(airPath(ll(-200, 300), nodeLL(VERT_NODE), 320, VH, 340), T_INT + 0.5, 1100);

  // ---------- deck ----------
  const lighting = new LightingEffect({ ambient: new AmbientLight({ color: [255, 255, 255], intensity: 1.4 }), key: new DirectionalLight({ color: [255, 255, 255], intensity: 0.75, direction: [-3, -9, -6] }), fill: new DirectionalLight({ color: [255, 255, 255], intensity: 0.3, direction: [6, 3, -4] }) });
  const material = { ambient: 0.62, diffuse: 0.45, shininess: 18, specularColor: [36, 38, 42] };
  const CENTER = ll(2550, 1180);
  const deckgl = new Deck({ parent: document.getElementById('scene'), views: new MapView({ repeat: false }), controller: false, effects: [lighting], initialViewState: { longitude: CENTER[0], latitude: CENTER[1], zoom: 15, pitch: 54, bearing: -22 } });
  const dash = PathStyleExtension ? [new PathStyleExtension({ dash: true })] : [];
  const TOP = { depthCompare: 'always', depthWriteEnabled: false };
  const roadsLayer = new PathLayer({ id: 'roads', data: E, getPath: (e) => e.path, getColor: (e) => [[208, 214, 221], [216, 221, 227], [226, 230, 234], [234, 237, 240]][e.c], getWidth: (e) => [13, 9, 6, 4][e.c], widthUnits: 'meters', widthMinPixels: 0.6, capRounded: true, jointRounded: true });
  const buildingsLayer = new PolygonLayer({ id: 'buildings', data: buildings, getPolygon: (d) => d.polygon, extruded: true, wireframe: true, getElevation: (d) => d.h, getFillColor: [251, 251, 252], getLineColor: [224, 228, 233], lineWidthMinPixels: 1, material });
  const label = (id, d, color, a) => new TextLayer({ id, data: d, parameters: TOP, getPosition: (x) => x.p, getText: (x) => x.text, getColor: [...color, Math.round(255 * a)], getSize: 12.5, fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 500, fontSettings: { sdf: true }, outlineWidth: 4, outlineColor: [255, 255, 255, Math.round(255 * a)], getTextAnchor: 'middle', getAlignmentBaseline: 'bottom', getPixelOffset: [0, -4] });

  // ---------- overlay ----------
  const $ = (id) => document.getElementById(id);
  let current = 0, t0 = performance.now(), clockStart = performance.now();
  const list = $('whoList');
  STORIES.forEach((s, i) => { const b = document.createElement('button'); b.type = 'button'; b.innerHTML = `${s.name}<i></i>`; b.addEventListener('click', () => { current = i; t0 = performance.now(); }); list.appendChild(b); });
  let lastChain = '', lastKey = '';
  function overlay(t, S) {
    if (S.key !== lastKey) {
      lastKey = S.key;
      $('q2').textContent = S.q; $('pname').textContent = S.name; $('pattrs').textContent = S.attrs; $('cq').textContent = S.cq; $('replan').textContent = S.replan;
      $('person').style.setProperty('--c', hex(S.pal.c)); $('person').style.setProperty('--c-ink', hex(S.pal.ink));
      ['optA', 'optB'].forEach((id, i) => { $(id).querySelector('.ol').textContent = S.options[i].label; });
    }
    const q2 = t >= T_Q && t < T_END + 0.6;
    $('q1').style.opacity = q2 ? 0 : 1; $('q2').style.opacity = q2 ? 1 : 0;
    $('stat').textContent = `${FLOWS[S.key].replanned} trips re-planned in the simulation`;
    $('stat').style.opacity = t >= T_DECIDE + 0.3 && t < T_END + 0.4 ? 1 : 0;
    [...list.children].forEach((b, i) => { b.setAttribute('aria-pressed', i === current); b.querySelector('i').style.width = i === current ? `${(t / LOOP) * 100}%` : '0'; });

    // day so far
    const moving = S.stops.find((s) => s.dep !== undefined && s.dep <= t && t < s.t);
    let unkShown = false;
    const html = S.stops.map((s) => {
      if (s.t <= t) { const now = !moving && S.stops.filter((x) => x.t <= t).pop() === s; return `<div class="stop ${now ? 'now' : 'done'} ${s.changed ? 'chg' : ''}"><i class="dot"></i><span>${s.label}</span></div>`; }
      if (moving === s) return `<div class="stop unk ${s.changed ? 'chg' : ''}"><i class="dot"></i><span>?</span></div>`;
      if (s.changed && t >= T_CHOICE && t < T_GO && !unkShown) { unkShown = true; return `<div class="stop unk chg"><i class="dot"></i><span>?</span></div>`; }
      return '';
    }).join('');
    if (html !== lastChain) { $('chain').innerHTML = html; lastChain = html; }

    // the choice: two options weighed against each other, then one wins
    const k = clamp((t - T_CHOICE) / (T_DECIDE - T_CHOICE), 0, 1);
    const wobble = Math.sin(t * 9) * 0.06 * (1 - k);
    ['optA', 'optB'].forEach((id, i) => {
      const o = S.options[i], target = o.p, p = 0.5 + (target - 0.5) * smooth(k) + (i === 0 ? wobble : -wobble);
      const el = $(id); el.querySelector('.bar i').style.width = `${Math.round(p * 100)}%`; el.querySelector('.pct').textContent = `${Math.round(p * 100)}%`;
      el.classList.toggle('win', t >= T_DECIDE && i === S.win); el.classList.toggle('lose', t >= T_DECIDE && i !== S.win);
    });
    $('choice').classList.toggle('on', t >= T_CHOICE && t < T_END + 0.4);
    $('replan').style.opacity = t >= T_DECIDE + 0.2 ? 1 : 0;
    $('person').classList.toggle('on', t > 0.3 && t < T_END + 0.4);
  }
  function personPos(S, t) {
    if (S.air && t >= S.air.t0) return posAt(S.air, t);
    let pos = S.trips[0].path[0];
    for (const tr of S.trips) if (t >= tr.t0) pos = posAt(tr, t);
    return pos;
  }

  // ---------- frame ----------
  function frame(t, gt) {
    const S = STORIES[current], F = FLOWS[S.key], C = S.pal.c;
    const fade = clamp(t / 0.5, 0, 1) * clamp((LOOP - t) / 0.5, 0, 1);
    const A = (a) => Math.round(255 * clamp(a, 0, 1) * fade);
    const show = smooth((t - T_INT) / 0.7) * (1 - smooth((t - T_END) / 0.9));
    const layers = [roadsLayer, buildingsLayer];
    const fc = (d) => (d.kind === 'chg' ? [...C, A(0.9)] : [...FLOW, A(0.55 - 0.3 * show)]);
    layers.push(new TripsLayer({ id: 'flow-' + S.key, data: F.list, parameters: TOP, getPath: (d) => d.path, getTimestamps: (d) => d.ts, getColor: fc, getWidth: 3, widthUnits: 'meters', widthMinPixels: 1.5, trailLength: 0.6, currentTime: t, capRounded: true, jointRounded: true, fadeTrail: true, updateTriggers: { getColor: [S.key, Math.round(show * 20), Math.round(fade * 20)] } }));

    if (show > 0.01 && S.kind === 'closure') {
      layers.push(new PathLayer({ id: 'closed-band', data: closedPaths, parameters: TOP, getPath: (d) => d, getColor: [...C, A(0.12 * show)], getWidth: 22, widthUnits: 'meters', capRounded: true }));
      layers.push(new PathLayer({ id: 'closed', data: closedPaths, parameters: TOP, getPath: (d) => d, getColor: [...C, A(0.95 * show)], getWidth: 6, widthUnits: 'meters', widthMinPixels: 2, extensions: dash, getDashArray: [3, 2], dashJustified: true }));
      layers.push(new ScatterplotLayer({ id: 'barriers', data: closedEnds, parameters: TOP, getPosition: (d) => d, getRadius: 14, radiusMinPixels: 4, getFillColor: [255, 255, 255, A(show)], stroked: true, getLineColor: [...C, A(show)], lineWidthMinPixels: 2.5 }));
      layers.push(new LineLayer({ id: 'closed-lead', data: [0], parameters: TOP, getSourcePosition: () => [...closedMid, 0], getTargetPosition: () => [...closedMid, 60], getColor: [...C, A(0.8 * show)], getWidth: 1 }));
      layers.push(label('closed-label', [{ p: [...closedMid, 60], text: 'Teheran-ro closed for construction' }], S.pal.ink, show * fade));
    }
    if (show > 0.01 && S.kind === 'uam') {
      const g = smooth((t - T_INT) / 1.0);
      layers.push(new ColumnLayer({ id: 'vertiport', data: [VERT_NODE], diskResolution: 6, radius: 30, extruded: true, getPosition: (n) => nodeLL(n), getElevation: () => VH * g, getFillColor: [...C, A(0.88 * show)], material, updateTriggers: { getElevation: [g], getFillColor: [show, fade] } }));
      layers.push(new LineLayer({ id: 'v-lead', data: [0], parameters: TOP, getSourcePosition: () => [...nodeLL(VERT_NODE), VH * g], getTargetPosition: () => [...nodeLL(VERT_NODE), VH * g + 45], getColor: [...C, A(0.8 * show)], getWidth: 1 }));
      layers.push(label('v-label', [{ p: [...nodeLL(VERT_NODE), VH * g + 45], text: 'Vertiport for urban air mobility' }], S.pal.ink, show * fade));
      const air = [EXTRA_AIR, ...(S.air ? [S.air] : [])];
      layers.push(new TripsLayer({ id: 'air', data: air, parameters: TOP, getPath: (d) => d.path, getTimestamps: (d) => d.ts, getColor: (d) => (d === S.air ? [...PERSON, A(1)] : [...C, A(0.9)]), getWidth: 5, widthUnits: 'meters', widthMinPixels: 2.2, trailLength: 1.6, currentTime: t, capRounded: true, fadeTrail: true, updateTriggers: { getColor: [fade] } }));
      const flying = air.filter((d) => t >= d.t0 && t <= d.t1).map((d) => posAt(d, t));
      layers.push(new ScatterplotLayer({ id: 'air-shadow', data: flying, getPosition: (p) => [p[0], p[1], 0], getRadius: 12, radiusMinPixels: 2.5, getFillColor: [30, 40, 60, A(0.14)] }));
    }
    if (show > 0.01 && S.kind === 'store') {
      const rise = 1 - Math.pow(1 - smooth((t - T_INT) / 1.3), 2);
      layers.push(new PolygonLayer({ id: 'store', data: [STORE], getPolygon: (d) => d.polygon, extruded: true, wireframe: true, getElevation: (d) => d.h * rise, getFillColor: [...C, A(0.85 * show)], getLineColor: [255, 255, 255, A(0.7 * show)], material, updateTriggers: { getElevation: [rise], getFillColor: [show, fade] } }));
      layers.push(new LineLayer({ id: 's-lead', data: [0], parameters: TOP, getSourcePosition: () => [...nodeLL(STORE_NODE), STORE.h * rise], getTargetPosition: () => [...nodeLL(STORE_NODE), STORE.h * rise + 40], getColor: [...C, A(0.8 * show)], getWidth: 1 }));
      layers.push(label('s-label', [{ p: [...nodeLL(STORE_NODE), STORE.h * rise + 40], text: 'New department store' }], S.pal.ink, show * fade));
    }

    // the two options on the map: both drawn while weighing, the winner takes the colour
    const optA = smooth((t - T_CHOICE) / 0.4) * (1 - smooth((t - T_GO - 0.3) / 0.5));
    if (optA > 0.01) {
      const decided = t >= T_DECIDE;
      const pulse = 0.55 + 0.35 * Math.sin(t * 6);
      S.options.forEach((o, i) => {
        const win = i === S.win, alpha = decided ? (win ? 0.95 : 0.25) : (i === 0 ? pulse : 1.1 - pulse);
        layers.push(new PathLayer({ id: 'opt-' + i, data: [o.preview], parameters: TOP, getPath: (d) => d, getColor: [...(decided && win ? C : GRAY), A(alpha * optA)], getWidth: decided && win ? 7 : 5, widthUnits: 'meters', widthMinPixels: decided && win ? 2.2 : 1.6, extensions: dash, getDashArray: [2, 1.6], updateTriggers: { getColor: [t], getWidth: [decided] } }));
      });
    }

    // the person
    const pa = smooth((t - 0.3) / 0.4) * (1 - smooth((t - T_END) / 0.8));
    layers.push(new TripsLayer({ id: 'p-trail', data: S.trips, parameters: TOP, getPath: (d) => d.path, getTimestamps: (d) => d.ts, getColor: [...PERSON, A(pa)], getWidth: 6, widthUnits: 'meters', widthMinPixels: 2.6, trailLength: 1.8, currentTime: t, capRounded: true, jointRounded: true, fadeTrail: true, updateTriggers: { getColor: [Math.round(pa * 20), Math.round(fade * 20)] } }));
    const pp = personPos(S, t);
    const ring = (t * 0.9) % 1;
    layers.push(new ScatterplotLayer({ id: 'p-ring', data: [0], parameters: TOP, getPosition: () => [pp[0], pp[1], pp[2] || 0], stroked: true, filled: false, getRadius: 16 + 34 * ring, getLineColor: [...PERSON, A(0.45 * (1 - ring) * pa)], lineWidthMinPixels: 1.2, updateTriggers: { getRadius: [t], getLineColor: [t], getPosition: [t] } }));
    layers.push(new ScatterplotLayer({ id: 'p-dot', data: [0], parameters: TOP, getPosition: () => pp, getRadius: 10, radiusMinPixels: 5, getFillColor: [...PERSON, A(pa)], stroked: true, getLineColor: [255, 255, 255, A(pa)], lineWidthMinPixels: 2, updateTriggers: { getPosition: [t], getFillColor: [t] } }));

    if (!live) { live = true; requestAnimationFrame(() => root.classList.add('is-live')); }
    deckgl.setProps({ layers, viewState: { longitude: CENTER[0], latitude: CENTER[1], zoom: 15.0, pitch: 54, bearing: -22 + 7 * Math.sin((2 * Math.PI * gt) / 70) } });
    overlay(t, S);
  }

  // ---------- loop ----------
  const hp = (location.hash.match(/hero-p=(business|office|student)/) || [])[1];
  if (hp) current = STORIES.findIndex((s) => s.key === hp);
  const jumpT = parseFloat((location.hash.match(/hero-t=([\d.]+)/) || [])[1]);
  if (REDUCE || /hero-freeze/.test(location.hash)) {
    // reduced motion: one representative still frame, re-drawn only for a moment while the scene settles
    const ft = REDUCE ? 9.0 : jumpT;
    let n = 0;
    const still = () => { frame(ft, 0); if (REDUCE ? ++n < 40 : true) requestAnimationFrame(still); };
    requestAnimationFrame(still);
    window.addEventListener('resize', () => frame(ft, 0));
  } else {
    if (isFinite(jumpT)) t0 -= jumpT * 1000;
    let visible = true, paused = 0;
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe($('banner'));
    const tick = (now) => {
      if (!visible) { if (!paused) paused = now; requestAnimationFrame(tick); return; }
      if (paused) { t0 += now - paused; clockStart += now - paused; paused = 0; }
      let t = (now - t0) / 1000;
      if (t >= LOOP) { current = (current + 1) % STORIES.length; t0 = now; t = 0; }
      frame(t, (now - clockStart) / 1000);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}
