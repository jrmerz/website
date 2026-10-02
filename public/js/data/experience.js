/**
 * @typedef {object} Project
 * @property {string} slug - Used as the vfs filename (without extension).
 * @property {string} name
 * @property {string} [url]
 * @property {string[]} highlights
 */

/**
 * @typedef {object} Role
 * @property {string} title
 * @property {string} start
 * @property {string} end
 */

/**
 * @typedef {object} Job
 * @property {string} slug - Used as the vfs directory/file name.
 * @property {string} org
 * @property {string} location
 * @property {string} [division]
 * @property {Role[]} roles
 * @property {Project[]} [projects]
 * @property {string[]} [notes] - Freeform bullets not tied to a named project.
 */

/** @type {Job[]} */
export const experience = [
  {
    slug: 'ucd-library',
    org: 'University of California, Davis - Library',
    location: 'Davis, CA',
    division: 'Digital Applications',
    roles: [
      { title: 'Senior Technology Architect', start: 'Jul 2025', end: 'Present' },
      { title: 'Research Support Engineer', start: 'Sep 2018', end: 'Jul 2025' },
      { title: 'Applications Programmer', start: 'Mar 2017', end: 'Sep 2018' },
    ],
    projects: [
      {
        slug: 'aggie-experts',
        name: 'Aggie Experts',
        url: 'https://experts.ucdavis.edu',
        highlights: [
          'Research profiles system for UC Davis.',
          'Architected, automated and scaled a platform integrating publications, grants, and researcher data.',
          'Designed data ingestion and search pipelines supporting institutional discovery.',
        ],
      },
      {
        slug: 'caskfs',
        name: 'CaskFS',
        url: 'https://github.com/ucd-library/caskfs',
        highlights: [
          'A modern data management system for linked data, built on top of Postgres.',
          'Designed content-addressable storage and virtualized filesystem layers on Postgres.',
          'Implemented linked data architecture enabling flexible data modeling and retrieval.',
        ],
      },
      {
        slug: 'anduin',
        name: 'Project Anduin',
        highlights: [
          'Workflow and automation platform and reporting (Dagster, Celery, Apache Superset).',
          'Designed distributed workflow orchestration layer for ETL pipelines and data processing.',
          'Integrated across systems (Aggie Experts, DAMS) to standardize data workflows.',
        ],
      },
      {
        slug: 'samwise',
        name: 'Samwise',
        highlights: [
          'On-prem LLM platform running on a multi-GPU cluster.',
          'Designed and operated local LLM infrastructure using vLLM, LiteLLM and Open WebUI.',
          'Implemented secure access and model workflows using Keycloak.',
        ],
      },
      {
        slug: 'pgfarm',
        name: 'PG Farm',
        url: 'https://pgfarm.library.ucdavis.edu',
        highlights: [
          'Scalable PostgreSQL platform on Kubernetes.',
          'Architected a multi-node PostgreSQL cluster with Kubernetes-based orchestration, including scale-to-zero capabilities.',
          'Implemented 2-factor campus authentication for login and a standardized REST interface via PostgREST.',
        ],
      },
      {
        slug: 'digital-collections',
        name: 'Digital Collections',
        url: 'https://digital.ucdavis.edu',
        highlights: [
          "UC Davis Library's digital collections public frontend.",
          'Designed microservices architecture around the Fedora linked data platform.',
          'Implemented cloud-based media processing workflows (IIIF via ptif, image/video pipelines).',
        ],
      },
      {
        slug: 'casita',
        name: 'CaSITA',
        highlights: [
          'Real-time satellite weather platform.',
          'Built a real-time data ingestion and rendering pipeline (<=8s latency from orbital capture to application display) for GOES-R satellite data.',
          'Designed an event-driven system using Kafka/RabbitMQ on Kubernetes.',
        ],
      },
    ],
    notes: [
      'Data management support for research projects, including relational database design and cloud-hosted data solutions.',
      '"Fin" service layer for Fedora-based data platforms - extended repository capabilities with data modeling, workflow integration, and cloud services.',
      "Modernized and optimized the UC Davis Library website (https://library.ucdavis.edu): Gutenberg-based theming, external content pipelines via cloud workflows, Elasticsearch integration.",
    ],
  },
  {
    slug: 'new-forests',
    org: 'New Forests',
    location: 'San Francisco, CA',
    roles: [{ title: 'Cloud Solutions Engineer (Contract)', start: '', end: '' }],
    projects: [
      {
        slug: 'cloud-fvs',
        name: 'Cloud FVS',
        highlights: [
          'Cloud-native forest modeling platform (USDA Forest Vegetation Simulator).',
          'Re-architected a legacy Fortran model into a parallelized, autoscaling cloud system supporting large-scale simulation workloads.',
          'Designed a distributed compute pipeline on GKE with autoscaling workers, messaging (RabbitMQ), and long-term storage.',
          'Built the web-based interface and data services enabling operational use in enterprise forestry modeling.',
        ],
      },
      {
        slug: 'k8s-conductor',
        name: 'K8s Conductor',
        highlights: [
          'On-demand Kubernetes orchestration layer.',
          'Developed middleware to dynamically start/stop Kubernetes workloads based on usage patterns, optimizing infrastructure cost.',
        ],
      },
      {
        slug: 'carbon-heatmap',
        name: 'Carbon Heatmap',
        highlights: [
          'Biomass analytics web application.',
          'Built a geospatial analysis platform for user-defined regions with real-time processing and visualization.',
        ],
      },
    ],
  },
  {
    slug: 'ucd-watershed-cstars-contracts',
    org: 'University of California, Davis',
    location: 'Davis, CA',
    division: 'Major Contracts of CSTARS (CERES, EcoSIS, AHB-PNW), Center for Watershed Sciences',
    roles: [{ title: 'Applications Programmer', start: 'Feb 2013', end: 'Mar 2017' }],
    projects: [
      {
        slug: 'ecosis',
        name: 'EcoSIS (Technical Lead)',
        url: 'http://ecosis.org',
        highlights: [
          'Led development of an open data platform for spectral data management and discovery.',
          'Extended CKAN with custom services and cloud-based infrastructure (PostgreSQL, Solr, AWS).',
        ],
      },
    ],
    notes: [
      'Built decision support tools for biomass siting and environmental analysis (PostgreSQL/PostGIS, Node.js, AWS).',
      'Developed real-time and analytical systems for water and climate data visualization (HOBBES & CALVIN, CIMIS Mobile).',
      'Implemented scientific models and data pipelines (METRIC ET in Google Earth Engine, 3-PG growth model).',
    ],
  },
  {
    slug: 'stone-cobra-2012',
    org: 'Stone Cobra',
    location: 'Roseville, CA',
    division: 'Customer Portal & Professional Services',
    roles: [{ title: 'Applications Engineer', start: 'Jul 2012', end: 'Feb 2013' }],
    notes: ['Application integration with Oracle Knowledge. Custom applications in SalesForce environments.'],
  },
  {
    slug: 'cstars-2006',
    org: 'CSTARS - University of California, Davis',
    location: 'Davis, CA',
    roles: [{ title: 'Programmer', start: 'Jul 2006', end: 'Jul 2012' }],
    notes: [
      'Cal-Atlas (CSTARS) - online library of GIS data for California.',
      'MyPlan (CalEMA) - hazard mitigation mapping.',
      'Funding Wizard (ARB) - locate grants and incentives for sustainable projects.',
      'Conservation Easements Registry (CNRA) - publicly accessible registry of conservation easements.',
    ],
  },
  {
    slug: 'gsoc-2005',
    org: 'Google Summer of Code',
    location: 'Sacramento, CA',
    roles: [{ title: 'Programmer', start: 'Jun 2005', end: 'Sep 2005' }],
  },
  {
    slug: 'feedlounge-2005',
    org: 'Feedlounge Inc.',
    location: 'Rocklin, CA',
    roles: [{ title: 'Programmer', start: 'Jun 2005', end: 'Sep 2005' }],
  },
];
