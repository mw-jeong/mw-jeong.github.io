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
  { date: '2026-09', text: 'Started my Ph.D. in Data Science at KAIST.' },
  { date: '2026-09', text: '1 paper got accepted to TRB 2027 (106th Annual Meeting).' },
  { date: '2026-08', text: '1 paper got accepted to CIKM 2026.' },
  { date: '2026-03', text: 'Joined the KAIST Urban AI Institute as a researcher.' },
  { date: '2026-02', text: 'Received my M.S. in Data Science from KAIST!' },
  {
    date: '2025-09',
    text: '1 paper got accepted to the ACM SIGSPATIAL Workshop on Geospatial Simulation.',
  },
  {
    date: '2024-09',
    text: '1 paper got accepted to TRB 2025 (104th Annual Meeting).',
  },
  { date: '2024-03', text: 'Started my M.S. in Data Science at KAIST.' },
];

// 사진은 public/gallery/ 에 넣고 한 줄씩 추가합니다. 비어 있으면 Gallery 메뉴가 숨겨집니다.
// 예: { src: '/gallery/cikm2026.jpg', alt: 'Presenting SUMO-SimQA', caption: 'CIKM 2026', date: '2026-11' }
export const gallery: { src: string; alt: string; caption?: string; date?: string }[] = [];
