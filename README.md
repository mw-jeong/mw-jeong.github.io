# Minwoo Jeong: personal site

Astro로 만든 한 페이지 CV 사이트입니다. GitHub Pages에 배포됩니다 (`https://mw-jeong.github.io`).

## 로컬에서 보기

```bash
npm install
npm run dev        # http://localhost:4321
```

Node 22.12 이상이 필요합니다. Astro는 7.3.x로 고정되어 있고, 7.4 이상은 Node 22.23 이상이 필요합니다.

## 내용 고치기

| 바꿀 것 | 파일 |
| --- | --- |
| 이름, 소속, 링크, 소개, 영상 반복 여부 | `src/data/profile.ts` |
| 학력, 논문, 경력, 강의, 수상, 장학금, News, Gallery | `src/data/cv.ts` |
| 사진 | `public/profile.jpg`, 갤러리 사진은 `public/gallery/` |
| 색상, 글꼴 | `src/styles/global.css` |

- 맨 위 영상은 `profile.hero.loop`가 `true`면 반복 재생, `false`면 한 번 재생 후 마지막 장면에서 멈춥니다.
- Awards와 Gallery는 비어 있으면 화면에 나오지 않습니다.
- 브라우저에서 인쇄(Cmd+P)하면 영상과 메뉴가 빠진 CV 형태로 PDF를 저장할 수 있습니다.

## 영상

`public/media/replay-wide.mp4`는 AgentSUMO replay(`AgentSUMO_film/out/replay/replay_light.mp4`)를 웹용으로 다시 압축한 파일입니다. 원본 1920×1080에서 영상에 박힌 출처 표기가 있는 위아래 40px를 잘라내고 1600px 폭으로 줄였습니다.

Mapbox 지도 영상이므로 Mapbox 로고와 텍스트 표기(© Mapbox © OpenStreetMap Improve this map)를 영상 위에 표시합니다. 로고 파일 `public/media/mapbox-logo.svg`는 mapbox-gl 3.35.1의 CSS에서 그대로 추출한 것입니다. 이 표기는 지우지 마세요.

## 배포 (처음 한 번)

1. GitHub에 **`mw-jeong.github.io`** 라는 이름으로 public 저장소를 만듭니다.
2. 이 폴더를 그 저장소의 `main` 브랜치에 push합니다.
3. 저장소 **Settings → Pages → Source**를 **GitHub Actions**로 바꿉니다.

이후로는 `main`에 push할 때마다 `.github/workflows/deploy.yml`이 사이트를 자동으로 빌드해서 배포합니다.
