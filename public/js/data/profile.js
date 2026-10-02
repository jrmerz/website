/**
 * @typedef {object} Profile
 * @property {string} name
 * @property {string} title
 * @property {string} location
 * @property {string[]} emails
 * @property {string} github
 * @property {string} linkedin
 * @property {string} orcid
 * @property {string} orcidId
 * @property {string} scopusId
 * @property {string[]} aboutParagraphs
 * @property {string} resumeSummary
 * @property {string[]} topSkills
 * @property {string[]} funFacts
 */

/** @type {Profile} */
export const profile = {
  name: 'Justin Merz',
  title: 'Senior Technology Architect',
  location: 'Sacramento / Davis, California',
  emails: ['jrmerz@ucdavis.edu', 'jrmerz@gmail.com'],
  github: 'https://github.com/jrmerz',
  linkedin: 'https://www.linkedin.com/in/justin-merz',
  orcid: 'https://orcid.org/0000-0003-1690-8112',
  orcidId: '0000-0003-1690-8112',
  scopusId: '56985470700',
  aboutParagraphs: [
    'I design and build open source platforms to support data-intensive research, distributed systems, library applications and modern AI workloads.',
    'As a Senior Technology Architect at the UC Davis Library, I lead the design and development of cloud-native and on-premise systems that power research data management, digital asset discovery platforms, and institutional applications. My work spans distributed system architecture, PostgreSQL based data platforms, and hybrid infrastructure combining cloud services and on-premise environments. I work across system design, backend development, frontend development, and infrastructure.',
    'More recently, I have been developing and operating local AI infrastructure, including multi-node GPU clusters and retrieval-augmented generation (RAG) systems, enabling the Library to run open source LLMs on-premise with secure, integrated workflows.',
  ],
  resumeSummary:
    'Senior Technology Architect with experience designing and scaling systems using open source technologies, with a focus on cloud-native architectures, distributed systems, and extensible platforms. Proven ability to translate complex requirements into maintainable, high-performance solutions. Skilled in leading technical direction, contributing to and integrating open ecosystems, and modernizing systems with a sustainability-first mindset that balances flexibility and cost.',
  topSkills: ['Software Architecture', 'System Architects', 'Solution Architecture'],
  funFacts: [
    'Former UCD Club Water Polo President (2001-2006). Draw your own conclusions about his ability to tread water under pressure.',
    'Follows OpenAI on LinkedIn. This site was built by their biggest competitor. Make of that what you will.',
    'Holds an ORCID iD (0000-0003-1690-8112) despite spending most of his career writing Kubernetes YAML instead of journal articles.',
    'Also follows Grafana Labs on LinkedIn. Make of THAT what you will too.',
    'Graduated UC Davis with a CS&E degree in 2006, then went straight back to UC Davis. Efficient, or a bit of a homebody. Possibly both.',
    'Wrote his first professional code in 2005, as part of Google Summer of Code, back when "the cloud" just meant weather.',
    'Co-authored a peer-reviewed paper on optimal siting for hybrid poplar biorefineries. Yes, that is a real sentence, and yes, he will explain it if you ask.',
    'Has published in both an agricultural engineering journal and a satellite imaging one. Range.',
    'Operates a multi-GPU on-prem LLM cluster named "Samwise." No comment on whether a "Frodo" cluster is planned.',
    'Scopus Author ID 56985470700 - proof that sometimes a software architect moonlights as a co-author.',
    'Built PG Farm, a PostgreSQL platform with scale-to-zero Kubernetes orchestration - a database that can take a nap. Humans should be so lucky.',
    'Architected CaskFS, a content-addressable filesystem built on top of Postgres, because apparently a relational database was not enough of a filesystem already.',
    'Cut his teeth from 2006-2012 on Cal-Atlas, MyPlan, and the Conservation Easements Registry - GIS tools so niche they double as a conversation-ending icebreaker at parties.',
    'Re-architected a legacy Fortran forest-growth model (Cloud FVS) into an autoscaling cloud system at New Forests. Somewhere, a decades-old mainframe is finally allowed to retire.',
    'Named his on-prem LLM cluster "Samwise" and locked it down with Keycloak - so technically, even the robots need to show ID.',
  ],
};
