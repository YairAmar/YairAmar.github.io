// All page content lives here. Edit this file to update the site.

export const profile = {
  name: 'Yair Amar',
  title: 'Member of Technical Staff, Accomplish · MSc student, Technion',
  // Put a square image at public/headshot.jpg and set this to '/headshot.jpg'.
  headshot: null as string | null,
  bio: [
    'I am a Member of Technical Staff at Accomplish, where I study how coding agents behave when enterprise security policy restricts what they can do. I am also an MSc student in Electrical Engineering at the Technion, advised by Dr. Amir Ivry and Prof. Israel Cohen. My thesis probes the internal representations of deep speech enhancement models.',
    'My work has moved between research areas in short order: from defence, to speech, to medical data at the Sheba Medical Center Innovation Center, and now to coding agents. Each move meant learning a new field fast, and that is the part of research I enjoy most.',
  ],
  links: [
    { label: 'Email', href: 'mailto:yairamr@gmail.com', text: 'yairamr@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/YairAmar', text: 'YairAmar' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yair-amar-b65b62144/', text: 'LinkedIn' },
  ],
};

export const interests = [
  'Deep learning for speech',
  'AI agents and coding agents',
  'Self-improving agents',
];

export type NewsItem = { date: string; html: string };

export const news: NewsItem[] = [
  {
    date: 'Sep 2026',
    html: '<em>The Hardening Tax</em> was accepted to the NeurIPS 2026 Workshop on Agents in the Wild. See you in Sydney in December.',
  },
  {
    date: 'Sep 2026',
    html: 'Our speech enhancement probing paper is under review at IEEE TASLP. The updated preprint is on <a href="https://arxiv.org/abs/2512.00482">arXiv</a>.',
  },
  {
    date: 'Aug 2026',
    html: '<a href="https://arxiv.org/abs/2608.02670"><em>Permission Denied</em></a> is on arXiv, and we open-sourced <a href="https://github.com/boundary-bench/boundary-bench">Boundary-Bench</a> for evaluating coding agents under security policy.',
  },
  {
    date: 'May 2026',
    html: 'Presented our Show &amp; Tell demo, <em>Speech Enhancement Intelligence</em>, at ICASSP 2026 in Barcelona. Try the <a href="https://yairamar.github.io/seint-show-web/">interactive version</a>.',
  },
  {
    date: 'Mar 2026',
    html: 'Joined <a href="https://accomplish.ai">Accomplish</a> as a Member of Technical Staff, working on coding agents under enterprise security policy.',
  },
  {
    date: 'Nov 2025',
    html: 'First preprint on arXiv: <a href="https://arxiv.org/abs/2512.00482">probing layer-wise robustness and sensitivity of speech enhancement models</a>.',
  },
  {
    date: '2024',
    html: 'Started my MSc in Electrical Engineering at the Technion with Dr. Amir Ivry and Prof. Israel Cohen.',
  },
];

export type Link = { label: string; href: string };
export type Publication = {
  title: string;
  authors: string[];
  venue: string;
  year: number;
  note?: string;
  links: Link[];
};

export const me = 'Yair Amar';

export const publications: Publication[] = [
  {
    title: 'The Hardening Tax: Policy-Graded Evaluation of Coding Agents under Enterprise Security Constraints',
    authors: ['Yair Amar*', 'Dotan Davidovich*', 'Hai Rozencwajg*', 'Or Hiltch', 'Ravid Shwartz-Ziv'],
    venue: 'NeurIPS 2026 Workshop on Agents in the Wild',
    note: '* Equal contribution',
    year: 2026,
    links: [
      { label: 'Code', href: 'https://github.com/boundary-bench/boundary-bench' },
      { label: 'Website', href: 'https://boundarybench.com/' },
    ],
  },
  {
    title: 'Permission Denied: Policy-Graded Evaluation of Coding Agents in Hardened Environments',
    authors: ['Dotan Davidovich', 'Yair Amar', 'Hai Rozencwajg', 'Or Hiltch'],
    venue: 'arXiv preprint arXiv:2608.02670',
    year: 2026,
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2608.02670' },
      { label: 'Code', href: 'https://github.com/boundary-bench/boundary-bench' },
      { label: 'Website', href: 'https://boundarybench.com/' },
    ],
  },
  {
    title: 'Probing Layer-Wise Robustness and Sensitivity of Speech Enhancement Models',
    authors: ['Yair Amar', 'Amir Ivry', 'Israel Cohen'],
    venue: 'arXiv preprint arXiv:2512.00482',
    year: 2026,
    note: 'Under review at IEEE/ACM Transactions on Audio, Speech, and Language Processing',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2512.00482' },
      { label: 'Code', href: 'https://github.com/YairAmar/SE-Probe' },
      { label: 'Interactive demo', href: 'https://yairamar.github.io/seint-show-web/' },
    ],
  },
  {
    title: 'Speech Enhancement Intelligence: Inspecting a Model Under Controlled Degradation',
    authors: ['Yair Amar', 'Amir Ivry', 'Israel Cohen'],
    venue: 'ICASSP 2026 Show & Tell demo, Barcelona',
    year: 2026,
    links: [
      { label: 'Demo', href: 'https://yairamar.github.io/seint-show-web/' },
      { label: 'Session', href: 'https://cmsworkshops.com/ICASSP2026/view_demosession.php?mid=54' },
    ],
  },
];

export type Entry = { title: string; org?: string; when: string; detail?: string };

export const experience: Entry[] = [
  {
    title: 'Member of Technical Staff',
    org: 'Accomplish',
    when: 'Mar 2026 to present',
    detail: 'Evaluation of coding agents under enterprise security policy.',
  },
  {
    title: 'Senior Research Scientist',
    org: 'Innovation Center, Sheba Medical Center',
    when: 'Until Mar 2026',
    detail: 'Machine learning on medical data.',
  },
  {
    title: 'Data Scientist',
    org: 'Defence',
    when: '',
  },
];

export const education: Entry[] = [
  {
    title: 'MSc, Electrical Engineering',
    org: 'Technion, Israel Institute of Technology',
    when: '2024 to present (expected 2027)',
    detail: 'Advisors: Dr. Amir Ivry and Prof. Israel Cohen.',
  },
  {
    title: 'BSc, Electrical Engineering and Physics',
    org: 'Technion, Israel Institute of Technology',
    when: '2016 to 2020',
  },
];
