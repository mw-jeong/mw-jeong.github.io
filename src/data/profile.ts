// 이름, 소속, 링크, 소개. 빈 문자열('')인 항목은 화면에 나오지 않습니다.
// 맨 위 3D 장면의 페르소나와 시나리오는 src/scripts/hero3d.js 에 있습니다.
export const profile = {
  name: 'Minwoo Jeong',
  nameKo: '정민우',
  pubName: 'Minwoo Jeong', // 논문 저자 목록에서 굵게 표시할 이름

  position: 'Ph.D. Student in Data Science',
  affiliation: 'KAIST',
  affiliationUrl: 'https://gsds.kaist.ac.kr',
  // 소속 두 번째 줄에 쉼표로 이어서 표시
  groups: [
    { label: 'Spacetime Intelligence Lab', href: 'https://spacetime.kaist.ac.kr' },
    { label: 'KAIST Urban AI Institute', href: 'https://urban.kaist.ac.kr' },
  ],

  photo: '/profile.jpg',

  links: [
    { label: 'Email', href: 'mailto:minwoo5003@kaist.ac.kr' },
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=I9mcxVUAAAAJ&hl=en' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/minwoo-jeong-206a32283/' },
    { label: 'GitHub', href: 'https://github.com/mw-jeong' },
    // { label: 'CV (PDF)', href: '/cv.pdf' },
  ],

  // 문단별로 한 항목. 첫 문단은 LinkedIn 소개글 그대로입니다.
  bio: [
    `I’m a Ph.D. student in Data Science at KAIST Spacetime Intelligence Lab and Urban AI Institute. With a background in Economics and Data Science, I’m interested in applying data science to the urban mobility domain.`,
    `While studying economics, I learned how people make choices from microeconomics, and statistical methods from econometrics. Building on this, I’m interested in people’s travel behavior in cities: where they go, how they travel, why they make those choices, and how those choices change when the city changes.`,
    `During my M.S., I worked on vertiport site selection for urban air mobility. I also developed TripVaDE, a variational deep embedding model that infers trip purposes from mobility data, and an LLM-guided agentic framework that sets up and runs traffic simulations in SUMO from plain-language requests.`,
    `My doctoral research focuses on population modeling, agentic AI for urban simulation, and spatio-temporal data mining, with the goal of testing urban plans and policies before they are put into place.`,
  ],
};

export const site = {
  title: `${profile.name} (${profile.nameKo})`,
  description: `${profile.name}, ${profile.position} at ${profile.affiliation}. Urban mobility, spatio-temporal data mining, and agentic AI for urban systems.`,
};
