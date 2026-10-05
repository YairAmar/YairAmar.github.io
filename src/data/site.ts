// All page content lives here. Edit this file to update the site.

export const seo = {
  url: 'https://yairamar.github.io/',
  title: 'Yair Amar | Research Scientist, Speech and AI Agents',
  description: 'Yair Amar is a research scientist at Accomplish working on safe, performant AI coding agents, and a Technion MSc student probing speech enhancement models.',
  ogImage: '/og.jpg',
  knowsAbout: ['Speech enhancement', 'Deep learning', 'Interpretability', 'AI agents', 'Coding agents', 'Agent security', 'Benchmarking'],
};

export const profile = {
  name: 'Yair Amar',
  title: ['Member of Technical Staff, Accomplish', 'MSc student, Technion'],
  // Put a square image at public/headshot.jpg and set this to '/headshot.jpg'.
  headshot: '/headshot.jpg' as string | null,
  bio: [
    "Hey! I'm a research scientist with a record of delivering results across disciplines, from the defence and health industries to speech technology and coding agents. I get deep satisfaction from making things work. I'm naturally curious and never short on new ideas.",
    'I\'m an early member of the technical staff at <a href="https://accomplish.ai">Accomplish</a>, where I work on AI agent enablement, with the goal of safe and performant agents at scale. I\'m also pursuing my MSc at the Technion under the guidance of Dr. Amir Ivry and Prof. Israel Cohen, focused on probing speech enhancement models.',
  ],
  links: [
    { label: 'Email', href: 'mailto:yairamr@gmail.com', text: 'yairamr@gmail.com' },
    { label: 'GitHub', href: 'https://github.com/YairAmar', text: 'YairAmar' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yair-amar-b65b62144/', text: 'yair-amar' },
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=XXgJht4AAAAJ', text: 'Google Scholar' },
  ],
};

// Each interest jumps to the related publication on this page (its id). Leave href out to show a plain chip.
// Names that get linked to a personal website wherever they appear on the page.
export const people: Record<string, string> = {
  'Amir Ivry': 'https://amir-ivry.github.io/',
  'Israel Cohen': 'https://israelcohen.com/',
};

export const interests: { label: string; href?: string }[] = [
  { label: 'Deep learning for speech', href: '#speech-probing' },
  { label: 'AI agents and coding agents', href: '#hardening-tax' },
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
  summary: string; // one plain sentence, always visible; click reveals the abstract
  abstract: string; // HTML
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
    summary: 'Enterprise security policy costs coding agents up to 18.3 points of success and 167.3% more cost on Terminal-Bench 2.1, and the best model depends on the policy.',
    abstract: 'Coding agents increasingly run inside organizations whose security controls (scoped credentials, restricted egress, read-only filesystems, non-root execution) constrain them like any other software. Existing benchmarks, however, evaluate agents almost exclusively in permissive sandboxes, so it is unknown how performance changes when policy is enforced. In this work, we evaluate 12 coding agents on Terminal-Bench 2.1 across nested security policy levels derived from common real-world enterprise restrictions. Hardening is never free but far from uniform: under the strictest policy, success losses reach 18.3 points and cost inflation 167.3%, and the two axes disagree; the model that best preserves success is also the one that loses the most efficiency, so model choice is policy-dependent. Beyond aggregate scores, we characterize how agents behave when policy blocks their actions and decompose the failures hardening induces: runs grind into timeouts or wrong solutions rather than stopping early, in a mix that differs by model. To ground comparisons, we verify task solvability under the strictest policy, separating model failures from tasks the policy forecloses. We release Boundary-Bench, an open-source hardening plugin enabling policy-constrained evaluation of coding agents on Terminal-Bench and compatible benchmarks.',
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
    summary: 'A layer-by-layer probe of three speech enhancement models shows where each is robust or sensitive to noise and reverberation, and that this profile is learned during training.',
    abstract: 'Speech enhancement (SE) models advance rapidly, yet how input degradation affects their internal representations remains underexplored. We introduce a probing framework to characterize how internal representations in SE models behave under controlled input degradation. We probe three SE models across controlled levels of signal-to-noise ratio (SNR) and reverberation, quantified by C<sub>50</sub>, measuring layer-wise similarity to clean references with Centered Kernel Alignment (CKA) and summarizing each layer by a linear fit against degradation level: the intercept measures robustness, whereas the slope measures sensitivity. All three models are sharply non-uniform across depth, but they organize that non-uniformity differently. MUSE and MP-SENet grow more sensitive with depth, the sharpest transitions falling at MUSE\'s skip-connection junctions, where encoder information is reintegrated; Demucs inverts the trend. A randomly initialized model shows a near-flat profile, with slopes one to two orders of magnitude smaller, and the profile forms during fine-tuning, indicating that it is induced by the enhancement objective rather than a particular model design. Because CKA saturates at the clean reference, intercept and slope are partly coupled; we derive the identity relating them and report a <em>saturation spread</em> statistic that indicates when their relationship is informative. Together, these results characterize where SE models are most sensitive to degradation. An exploratory analysis of whether residual variation tracks output-level quality, after controlling for SNR, shows that the speaker, rather than the utterance, must be treated as the sampling unit. Code and precomputed analysis artifacts for the main sweeps are publicly available.',
    title: 'Probing Layer-Wise Robustness and Sensitivity of Speech Enhancement Models',
    authors: ['Yair Amar', 'Amir Ivry', 'Israel Cohen'],
    venue: 'arXiv preprint arXiv:2512.00482',
    year: 2026,
    note: 'Under review at IEEE/ACM Transactions on Audio, Speech, and Language Processing',
    links: [
      { label: 'arXiv', href: 'https://arxiv.org/abs/2512.00482' },
      { label: 'Code', href: 'https://github.com/YairAmar/SE-Probe' },
      { label: 'Demo', href: 'https://yairamar.github.io/seint-show-web/' },
    ],
  },
  {
    id: 'icassp-demo',
    summary: 'A live demo: speak into a microphone, add noise with a slider, and watch how a speech enhancement model\'s internal layers react alongside PESQ, STOI, and SI-SDR.',
    abstract: 'This demonstration presents an interactive system for speech enhancement intelligence: observing, probing, and interpreting how a speech enhancement model responds as noise conditions change. Rather than treating the model as a black box, the demo provides an interface that exposes how internal representations evolve under increasing noise, controlled by the user. Attendees begin by speaking a short utterance into a microphone. This recording is treated as a clean reference. Artificial noise is then added in a controlled manner using an SNR slider, allowing users to smoothly move from clean to highly noisy conditions while keeping the underlying speech fixed. At each noise level, the clean and noisy signals are processed through a speech enhancement model, and internal activations from selected layers are extracted. The interface visualizes how the activations evolve under increasing noise and evaluates how closely the model\'s representations under noise resemble those elicited by clean speech. These similarities are shown layer by layer using Centered Kernel Alignment (CKA), revealing which parts of the model remain stable, which become noise-sensitive, and which recover as noise conditions improve. These measures are summarized via linearization of the CKA versus SNR trend. Alongside these internal indicators, standard enhancement performance metrics such as PESQ, STOI, and SI-SDR are updated in real time. By interacting with the noise controls, attendees can observe how internal representation stability degrades and recovers, and how these internal changes align with variations in output quality. This enables inspection of model behavior beyond post-hoc evaluation of enhanced signals alone. The demo offers an intuitive, hands-on view of how speech enhancement models internally respond to noise. It is relevant to the ICASSP community, as it illustrates how signal processing, learning-based models, and interpretability tools can be combined to better understand the internal behavior of modern speech systems.',
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
    icon: '/logos/technion.png',
    when: '2024 to present (expected 2027)',
    detail: 'Advisors: Dr. Amir Ivry and Prof. Israel Cohen.',
  },
  {
    title: 'BSc, Electrical Engineering and Physics',
    org: 'Technion, Israel Institute of Technology',
    icon: '/logos/technion.png',
    when: '2016 to 2020',
  },
];
