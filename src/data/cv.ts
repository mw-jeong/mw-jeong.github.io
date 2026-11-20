// CV 내용. 날짜는 'YYYY-MM' (월을 모르면 'YYYY'), 진행 중이면 end를 비워 둡니다.
// detail/text 안에는 <em>, <a href="..."> 같은 간단한 HTML을 쓸 수 있습니다.

export type Entry = {
  title: string;
  org?: string;
  start?: string;
  end?: string;
  when?: string; // 'Fall 2026'처럼 기간 대신 직접 쓰는 날짜
  details?: string[];
};

export type Publication = {
  title: string;
  authors: string[];
  venue: string;
  date: string;
  links?: { label: string; href: string }[];
};

export const education: Entry[] = [
  {
    title: 'Ph.D. in Data Science',
    org: 'KAIST',
    start: '2026-09',
    details: ['Advisor: Prof. Yoonjin Yoon'],
  },
  {
    title: 'M.S. in Data Science',
    org: 'KAIST',
    start: '2024-03',
    end: '2026-02',
    details: [
      'Advisor: Prof. Yoonjin Yoon',
      'Thesis: <em>Agentic Framework for Interactive Generation of Simulation Scenarios in SUMO via Large Language Models</em>',
    ],
  },
  {
    title: 'B.A. in Economics',
    org: 'University of Seoul',
    start: '2017-03',
    end: '2021-02',
    details: ['Double major in Data Science'],
  },
];

// 최신순
export const publications: Publication[] = [
  {
    title:
      'AgentSUMO: An Agentic Framework for Interactive Simulation Scenario Generation in SUMO via Large Language Models',
    authors: ['Minwoo Jeong', 'Jeeyun Chang', 'Yoonjin Yoon'],
    venue: '106th Transportation Research Board (TRB) Annual Meeting',
    date: '2027',
    links: [{ label: 'Project page', href: 'https://agentsumo.org' }],
  },
  {
    title: 'SUMO-SimQA: A Benchmark for LLM Cross-File Reasoning over Traffic Simulation Files',
    authors: ['Jeeyun Chang', 'Taeyoung Yun', 'Minwoo Jeong', 'Jinkyu Park', 'Yoonjin Yoon'],
    venue: 'Proceedings of the 35th ACM International Conference on Information and Knowledge Management (CIKM)',
    date: '2026',
  },
  {
    title: 'Speak to Simulate: An LLM-Guided Agentic Framework for Traffic Simulation in SUMO',
    authors: ['Minwoo Jeong', 'Jeeyun Chang', 'Yoonjin Yoon'],
    venue: 'Proceedings of the 8th ACM SIGSPATIAL International Workshop on Geospatial Simulation',
    date: '2025',
  },
  {
    title:
      'Integrating Urban Air Mobility with Highway Infrastructure: A Strategic Approach for Vertiport Location Selection in the Seoul Metropolitan Area',
    authors: ['Donghyun Yoon', 'Minwoo Jeong', 'Jinyong Lee', 'Seyun Kim', 'Yoonjin Yoon'],
    venue: '104th Transportation Research Board (TRB) Annual Meeting',
    date: '2025',
  },
];

export const experience: Entry[] = [
  {
    title: 'Researcher',
    org: 'KAIST Urban AI Institute',
    start: '2026-03',
    end: '2026-08',
  },
  {
    title: 'Army Officer',
    org: 'Republic of Korea Army',
    start: '2021-03',
    end: '2023-06',
    details: ['ROTC 59th, completed military service as a First Lieutenant.'],
  },
];

export const teaching: Entry[] = [
  {
    title: 'Head Teaching Assistant',
    org: 'KAIST CE252 Introduction to Data Science for Civil Engineers',
    when: 'Fall 2026',
  },
  {
    title: 'Instructor and Curriculum Developer',
    org: 'KAIST Global Institute for Talented Education (GIFTED)',
    start: '2025-03',
    details: [
      'Designed and teach <em>Cities Alive with Data</em> (데이터로 살아 움직이는 도시), a course for gifted middle-school students.',
      'Also teach Data Science and Introduction to AI, and develop course materials.',
    ],
  },
  {
    title: 'Teaching Assistant',
    org: 'KAIST CE252 Introduction to Data Science for Civil Engineers',
    when: 'Fall 2024',
  },
];

// 최신순. 날짜는 연도만 씁니다. 비어 있으면 해당 묶음이 나오지 않습니다.
export const awardsGraduate: Entry[] = [
  {
    title: '2nd Prize',
    org: 'Ulsan AI Smart City Idea Competition, Ulsan Research Institute',
    when: '2026',
    details: [
      '<em>Goraeya: A Conversational Agentic AI Service for Accessible Public Transit</em>',
      '고래야: 교통약자 이동권 확대를 위한 에이전틱 AI 기반 대화형 대중교통 통합 이용 서비스',
    ],
  },
  {
    title: 'Best Paper Award',
    org: '2025 K-Data Science Conference, Poster Session',
    when: '2025',
    details: ['<em>TripVaDE: Trip Purpose Inference via Variational Deep Embedding</em>'],
  },
  {
    title: '3rd Prize',
    org: '2nd Highway Vision Canvas Paper Competition, Korea Expressway Corporation',
    when: '2024',
    details: [
      '<em>Intermodal UAM Vertiport Site Selection Using Highway Infrastructure</em>',
      '고속도로 인프라를 활용한 환승형 UAM 버티포트 입지선정',
    ],
  },
];

// 학부 대표 수상만 골랐습니다. 기관명은 각 기관의 공식 영문명입니다.
export const awardsUndergrad: Entry[] = [
  {
    title: 'Best Paper Award',
    org: 'Capstone Design Competition (School of Economics), University of Seoul',
    when: '2021',
    details: [
      'Short paper on how COVID-19-driven income inequality depressed household consumption, using time-series regression.',
    ],
  },
  {
    title: '1st Prize (Import/Export Logistics Track)',
    org: 'Marine and Fisheries Big Data Analysis Competition, Ulsan Port Authority',
    when: '2020',
    details: [
      'Predicted vessel arrival and handling times at container terminals, and proposed a platform for repositioning empty containers.',
    ],
  },
  {
    title: '1st Prize',
    org: 'Data Creator Camp, National Information Society Agency',
    when: '2020',
    details: [
      'Hackathon: clustered movie reviews in the preliminary round and built a CNN vehicle-image classifier in the final.',
    ],
  },
  {
    title: '3rd Prize',
    org: 'SME Statistics Policy Idea Contest, Korea Federation of Small and Medium Business',
    when: '2020',
    details: [
      'Classified service-sector SMEs by online-marketing use with a boosting model and proposed tailored support policies.',
    ],
  },
  {
    title: '3rd Prize',
    org: 'Culture, Sports and Tourism Big Data Idea Contest, Korea Culture Information Service Agency',
    when: '2019',
    details: [
      '<em>KOACH KOACH</em>: proposed an AI-based recommender system that suggests personalized sports, nearby facilities, and training plans using public data.',
    ],
  },
  {
    title: '1st Prize',
    org: 'Seoul Regulatory Reform Idea Contest, Seoul Metropolitan Government',
    when: '2019',
    details: ['Proposed regulatory reforms to promote e-scooters and other personal mobility.'],
  },
];

// 외부 장학금 먼저, 학교 장학금은 받은 학기를 적습니다.
export const scholarships: Entry[] = [
  { title: 'KT Group Creative Innovation Leader Scholarship', org: 'KT Group', when: 'Fall 2020' },
  { title: 'Jusim Scholarship', org: 'Jusim Scholarship Foundation', when: 'Fall 2019' },
  {
    title: 'Outstanding Contribution Scholarship',
    org: 'University of Seoul',
    when: 'Fall 2020',
    details: ['Awarded for contributions to the university’s development and reputation.'],
  },
  {
    title: 'Academic Excellence Scholarship',
    org: 'University of Seoul',
    when: '2017–2020',
    details: ['Admission (2017), Spring 2019, Fall 2020'],
  },
  {
    title: 'Student Leader Scholarship',
    org: 'University of Seoul',
    when: '2018–2019',
    details: ['Spring 2018, Fall 2018, Spring 2019'],
  },
  {
    title: 'ROTC Development Fund Scholarship',
    org: 'University of Seoul',
    when: '2019',
    details: ['Spring 2019, Fall 2019'],
  },
  {
    title: 'Admissions Ambassador Scholarship',
    org: 'University of Seoul',
    when: '2019',
    details: ['Spring 2019, Fall 2019'],
  },
];

// 최신순. 홈에는 앞의 4개만 나오고, 전체는 /news 에 나옵니다.
export const news: { date: string; text: string }[] = [
  { date: '2026-10', text: 'Won 2nd Prize at the Ulsan AI Smart City Idea Competition (Ulsan Research Institute).' },
  { date: '2026-09', text: 'Started my Ph.D. in Data Science at KAIST.' },
  { date: '2026-09', text: '1 paper got accepted to TRB 2027 (106th Annual Meeting).' },
  { date: '2026-08', text: '1 paper got accepted to CIKM 2026.' },
  { date: '2026-03', text: 'Joined the KAIST Urban AI Institute as a researcher.' },
  { date: '2026-02', text: 'Received my M.S. in Data Science from KAIST!' },
  { date: '2025-09', text: 'Received the Best Paper Award at the 2025 K-Data Science Conference.' },
  {
    date: '2025-09',
    text: '1 paper got accepted to the ACM SIGSPATIAL Workshop on Geospatial Simulation.',
  },
  { date: '2024-09', text: 'Won 3rd Prize at the 2nd Highway Vision Canvas Paper Competition (Korea Expressway Corporation).' },
  {
    date: '2024-09',
    text: '1 paper got accepted to TRB 2025 (104th Annual Meeting).',
  },
  { date: '2024-03', text: 'Started my M.S. in Data Science at KAIST.' },
];

// 갤러리: 사진은 public/gallery/<id>/<n>.jpg (크게 볼 때) 와 <n>-t.jpg (목록용).
// 최신순. 홈에는 앞의 3개 행사가 cover 사진으로 나오고, 전체는 /gallery 에 나옵니다.
export type GalleryEvent = {
  id: string;
  title: string;
  place: string;
  start: string; // 'YYYY-MM-DD'
  end?: string;
  note: string;
  cover: number; // 홈에 쓸 사진 번호
  photos: { alt: string; caption?: string }[];
};

export const gallery: GalleryEvent[] = [
  {
    id: 'ulsan-2026', title: 'Ulsan AI Smart City Idea Competition, 2nd Prize', place: 'Ulsan', start: '2026-10-07',
    note: 'Won 2nd Prize at the Ulsan AI Smart City Idea Competition.',
    cover: 1, photos: [{ alt: 'Receiving the 2nd Prize at the Ulsan AI Smart City Idea Competition' }],
  },
  {
    id: 'icusi-2026', title: 'ICUSI 2026', place: 'Guangzhou, China', start: '2026-08-08', end: '2026-08-09',
    note: 'Presented our work at the 4th International Conference on Urban Science and Intelligence. Also went sightseeing in Hong Kong and Guangzhou.',
    cover: 3,
    photos: [
      { alt: 'A street in Hong Kong', caption: 'Hong Kong' },
      { alt: 'At the entrance of HKUST (Guangzhou)', caption: 'HKUST (Guangzhou)' },
      { alt: 'Presenting at ICUSI 2026', caption: 'Presentation' },
      { alt: 'Standing next to a poster at ICUSI 2026', caption: 'Poster session' },
    ],
  },
  {
    id: 'urban-ai-conf-2026', title: '2026 International Conference on Urban AI', place: 'Seoul', start: '2026-07-15', end: '2026-07-16',
    note: 'Presented our work at the 2026 International Conference on Urban AI, hosted by the KAIST Urban AI Institute.',
    cover: 1, photos: [{ alt: 'Presenting at the 2026 International Conference on Urban AI' }],
  },
  {
    id: 'science-festival-2026', title: '2026 Korea Science Festival', place: 'KINTEX, Gyeonggi', start: '2026-04-24', end: '2026-04-26',
    note: 'Our lab ran the AI Data Zone in the KAIST booth at the 2026 Korea Science Festival, with the exhibit “Urban Heat, Urban Sales.”',
    cover: 1, photos: [{ alt: 'Visitors at the AI Data Zone' }, { alt: 'The AI Data Zone exhibit' }],
  },
  {
    id: 'graduation-2026', title: 'M.S. graduation', place: 'KAIST', start: '2026-02-20',
    note: 'Officially a KAIST M.S. graduate!',
    cover: 2, photos: [{ alt: 'In a graduation gown on the KAIST field' }, { alt: 'Holding flowers after the graduation ceremony' }],
  },
  {
    id: 'junior-kaist-2026', title: 'Junior KAIST AI·SW Camp', place: 'KAIST', start: '2026-01-29', end: '2026-01-31',
    note: 'Spent three days as a class tutor at the Junior KAIST AI·SW Camp.',
    cover: 1, photos: [{ alt: 'Speaking to students at the camp' }, { alt: 'Students working on laptops at the camp' }],
  },
  {
    id: 'ms-defense-2025', title: 'M.S. thesis defense', place: 'KAIST', start: '2025-12-10',
    note: 'Successfully defended my M.S. thesis!',
    cover: 1, photos: [{ alt: 'Next to the title slide of the M.S. thesis defense' }],
  },
  {
    id: 'sigspatial-2025', title: 'ACM SIGSPATIAL 2025, GeoSim workshop', place: 'Minneapolis, USA', start: '2025-11-03', end: '2025-11-06',
    note: 'Attended ACM SIGSPATIAL 2025. Minneapolis, my most peaceful city ever!',
    cover: 1,
    photos: [
      { alt: 'Presenting at the GeoSim workshop', caption: 'Presentation' },
      { alt: 'At ACM SIGSPATIAL 2025', caption: 'SIGSPATIAL 2025' },
      { alt: 'St. Anthony Falls and an arched bridge over the Mississippi River', caption: 'From the Stone Arch Bridge' },
      { alt: 'Downtown Minneapolis behind autumn trees', caption: 'Minneapolis' },
    ],
  },
  {
    id: 'kds-2025', title: '2025 K-Data Science Conference, Best Paper Award', place: 'Daegu', start: '2025-09-05',
    note: 'Presented our work at the 2025 K-Data Science Conference and received the Best Paper Award.',
    cover: 1, photos: [{ alt: 'Next to the TripVaDE poster' }, { alt: 'Best Paper Award certificate' }],
  },
  {
    id: 'tsl-2025', title: 'INFORMS TSL Workshop 2025', place: 'Seoul', start: '2025-05-21',
    note: 'Presented our work at the INFORMS TSL Workshop 2025.',
    cover: 1, photos: [{ alt: 'Presenting at the INFORMS TSL Workshop 2025' }],
  },
  {
    id: 'trb-2025', title: 'TRB 104th Annual Meeting & CAUS US Workshop', place: 'Washington, D.C. and San Francisco, USA', start: '2025-01-04', end: '2025-01-16',
    note: 'Presented our work at TRB 2025 in Washington, D.C., then went to Stanford University for an international workshop. Two weeks of heavy snow in D.C. and fantastic weather in San Francisco!',
    cover: 2,
    photos: [
      { alt: 'At the Washington Monument', caption: 'Washington Monument' },
      { alt: 'Next to our poster at TRB 2025', caption: 'Poster session' },
      { alt: 'The Golden Gate Bridge', caption: 'Golden Gate Bridge' },
      { alt: 'The San Francisco skyline across the bay', caption: 'San Francisco' },
    ],
  },
  {
    id: 'highway-2024', title: '2nd Highway Vision Canvas Paper Competition, award ceremony', place: 'Korea Expressway Corporation', start: '2024-09-06',
    note: 'Our paper won 3rd Prize at the Highway Vision Canvas Paper Competition.',
    cover: 1, photos: [{ alt: 'Award ceremony of the Highway Vision Canvas Paper Competition' }],
  },
];

export const photoSrc = (id: string, n: number, thumb = false) => `/gallery/${id}/${n}${thumb ? '-t' : ''}.jpg`;
