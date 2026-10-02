/**
 * @typedef {object} SkillCategory
 * @property {string} category
 * @property {string[]} items
 */

/**
 * @typedef {object} SkillGroup
 * @property {string} slug
 * @property {string} title
 * @property {SkillCategory[]} categories
 */

/** @type {SkillGroup[]} */
export const skillGroups = [
  {
    slug: 'architecture-and-systems',
    title: 'Architecture & Systems',
    categories: [
      {
        category: 'AI Systems Engineering',
        items: [
          'Design and operation of local LLM platforms on multi-node GPU clusters (vLLM, Ollama, LiteLLM, Open WebUI).',
          'RAG architectures: vector search, embedding pipelines, retrieval optimization, context orchestration.',
        ],
      },
      {
        category: 'System Design',
        items: [
          'Design of distributed systems and microservice architectures with a focus on scalability, resilience, and cost.',
          'Container orchestration with Kubernetes and Docker across self-managed and cloud environments.',
          'System observability and operational design: logging, monitoring, tracing.',
        ],
      },
      {
        category: 'Distributed Systems / Messaging',
        items: [
          'Event-driven architecture using Kafka, RabbitMQ, ActiveMQ, and Google Pub/Sub.',
          'Workflow orchestration and data pipelines (Dagster, Google Cloud Workflows).',
        ],
      },
      {
        category: 'Data & Storage',
        items: [
          'PostgreSQL/PostGIS: advanced schema design, performance tuning, indexing strategies, query optimization.',
          'Redis: caching, ephemeral state, pub/sub.',
          'Elasticsearch: search indexing, relevance tuning, vector search.',
          'MongoDB, Neo4j: document and graph data.',
        ],
      },
    ],
  },
  {
    slug: 'implementation-and-platform',
    title: 'Implementation & Platform',
    categories: [
      {
        category: 'Cloud & Infrastructure',
        items: [
          'Cloud-native architecture on GCP: Compute Engine, GKE, Cloud Run, Cloud Functions, Storage, observability, CI/CD.',
          'Hybrid infrastructure with on-prem Kubernetes clusters, deploying container workloads from Google Cloud Registry.',
          'AWS: EC2, S3.',
        ],
      },
      {
        category: 'Developer Tooling',
        items: [
          'AI-assisted development workflows (GitHub Copilot, Codex, Claude CLI).',
          'Code generation, review, and agentic automation.',
          'Collaborative development workflows (VS Code Live Share).',
        ],
      },
      {
        category: 'Backend Development',
        items: [
          'Design and implementation of high-performance backend services (Node.js, Python, Java).',
          'API design (REST, event-driven), data modeling, and service integration.',
          'Authentication and authorization integration (Keycloak, OIDC/OAuth2).',
          'CI/CD pipeline design, including custom build systems on Google Cloud Build for dependency and version orchestration across containerized services.',
        ],
      },
    ],
  },
];
