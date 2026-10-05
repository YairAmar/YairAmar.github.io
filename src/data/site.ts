// All page content lives here. Edit this file to update the site.

export const profile = {
  name: 'Yair Amar',
  title: ['Member of Technical Staff, Accomplish', 'MSc student, Technion'],
  // Put a square image at public/headshot.jpg and set this to '/headshot.jpg'.
  headshot: '/headshot.jpg' as string | null,
  bio: [
    'I am a Technion graduate in Electrical Engineering and Physics. I thrive in fast-moving environments, love getting into new subjects, and care about work with real impact. I am a team player who enjoys working with bright, quick-thinking people.',
    'Today I am a Member of Technical Staff at Accomplish, where I study coding agents under enterprise security policy. I am also an MSc student at the Technion, advised by Dr. Amir Ivry and Prof. Israel Cohen, probing the internals of speech enhancement models. My path ran from the defence industry to speech, then medical data at Sheba, and now coding agents.',
  ],
  links: [
    { label: 'Email', href: 'mailto:yairamr@gmail.com', text: 'yairamr@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/YairAmar', text: 'YairAmar' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yair-amar-b65b62144/', text: 'yair-amar' },
  ],
};

// Each interest jumps to the related publication on this page (its id). Leave href out to show a plain chip.
export const interests: { label: string; href?: string }[] = [
  { label: 'Deep learning for speech', href: '#speech-probing' },
  { label: 'AI agents and coding agents', href: '#hardening-tax' },
  { label: 'Self-improving agents' },
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
  id: string;
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
    id: 'hardening-tax',
    title: 'The Hardening Tax: Policy-Graded Evaluation of Coding Agents under Enterprise Security Constraints',
    authors: ['Yair Amar*', 'Dotan Davidovich*', 'Hai Rozencwajg*', 'Or Hiltch', 'Ravid Shwartz-Ziv'],
    venue: 'NeurIPS 2026 Workshop on Agents in the Wild',
    year: 2026,
    note: '* Equal contribution. Extended version on arXiv as "Permission Denied: Policy-Graded Evaluation of Coding Agents in Hardened Environments".',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2608.02670' },
      { label: 'Code', href: 'https://github.com/boundary-bench/boundary-bench' },
      { label: 'Website', href: 'https://boundarybench.com/' },
    ],
  },
  {
    id: 'speech-probing',
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
    id: 'icassp-demo',
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

export type Entry = { title: string; org?: string; icon?: string; when: string; detail?: string };

export const experience: Entry[] = [
  {
    title: 'Member of Technical Staff',
    org: 'Accomplish',
    icon: '/logos/accomplish.png',
    when: 'Mar 2026 to present',
    detail: 'Evaluation of coding agents under enterprise security policy.',
  },
  {
    title: 'Senior Research Scientist',
    org: 'Innovation Center, Sheba Medical Center',
    icon: '/logos/sheba.png',
    when: 'Aug 2024 to Mar 2026',
    detail: 'Machine learning on medical data.',
  },
  {
    title: 'Data Scientist',
    org: 'Defence industry',
    icon: '/logos/stealth.svg',
    when: '2020 to 2026',
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
