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
| 이름, 소속, 링크, 소개 | `src/data/profile.ts` |
| 맨 위 3D 장면 (페르소나, 시나리오, 색) | `src/scripts/hero3d.js` |
| 학력, 논문, 경력, 강의, 수상, 장학금, News, Gallery | `src/data/cv.ts` |
| 사진 | `public/profile.jpg`, 갤러리 사진은 `public/gallery/` |
| 색상, 글꼴 | `src/styles/global.css` |

- Awards와 Gallery는 비어 있으면 화면에 나오지 않습니다.
- 브라우저에서 인쇄(Cmd+P)하면 영상과 메뉴가 빠진 CV 형태로 PDF를 저장할 수 있습니다.

## 맨 위 3D 장면

- 강남 일대 실제 도로와 건물(OpenStreetMap)을 `public/data/city.json`으로 줄여 담고, deck.gl로 그립니다. Mapbox는 쓰지 않으며 출처 표기는 OSM 한 줄입니다.
- 페르소나 3명(출장자, 직장인, 학생)이 14초씩 차례로 나옵니다. 평소 이동 → 관련 What if 하나(버티포트, 테헤란로 공사, 백화점) → 두 선택지 사이에서 고민 → 결정.
- 3D 코드는 페이지가 뜬 뒤에 따로 불러오고, WebGL2가 없는 기기는 `public/media/hero-still.jpg` 정지 이미지를, 움직임 줄이기를 켠 사용자는 멈춘 장면을 봅니다.
- 미리보기: 주소 끝에 `#hero-p=office&hero-t=8&hero-freeze` 처럼 붙이면 그 장면에서 멈춥니다.

## 배포 (처음 한 번)

1. GitHub에 **`mw-jeong.github.io`** 라는 이름으로 public 저장소를 만듭니다.
2. 이 폴더를 그 저장소의 `main` 브랜치에 push합니다.
3. 저장소 **Settings → Pages → Source**를 **GitHub Actions**로 바꿉니다.

이후로는 `main`에 push할 때마다 `.github/workflows/deploy.yml`이 사이트를 자동으로 빌드해서 배포합니다.
