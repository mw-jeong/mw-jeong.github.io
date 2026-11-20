const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 'YYYY-MM' -> 'Sep 2026', 'YYYY' -> '2026' */
export function formatMonth(d: string): string {
  const [y, m] = d.split('-');
  return m ? `${MONTHS[+m - 1]} ${y}` : y;
}

export function formatRange(e: { start?: string; end?: string; when?: string }): string {
  if (e.when) return e.when;
  if (!e.start) return '';
  return `${formatMonth(e.start)} – ${e.end ? formatMonth(e.end) : 'present'}`;
}

export function year(d: string): string {
  return d.split('-')[0];
}

/** '2026-08-08','2026-08-09' -> 'Aug 8–9, 2026'; one day -> 'Dec 10, 2025' */
export function formatDays(start: string, end?: string): string {
  const [y1, m1, d1] = start.split('-').map(Number);
  if (!end || end === start) return `${MONTHS[m1 - 1]} ${d1}, ${y1}`;
  const [y2, m2, d2] = end.split('-').map(Number);
  if (y1 === y2 && m1 === m2) return `${MONTHS[m1 - 1]} ${d1}–${d2}, ${y1}`;
  if (y1 === y2) return `${MONTHS[m1 - 1]} ${d1} – ${MONTHS[m2 - 1]} ${d2}, ${y1}`;
  return `${MONTHS[m1 - 1]} ${d1}, ${y1} – ${MONTHS[m2 - 1]} ${d2}, ${y2}`;
}
