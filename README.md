# MathVerity

MathVerity is a diploma project for a web platform that helps students in grades 5–6 practise mathematics through restricted AI hints, independent assessment and gamification. Parents receive skill reports that explain the evidence behind their child’s progress and recommend what to review next.

**Interactive prototype:** [Open MathVerity on GitHub Pages](https://latiyeva.github.io/mathverity-platform/)

The prototype demonstrates learner, parent and content workflows using synthetic data and browser-only state.

**Official topic:** Development of an intelligent platform for improving school students' mathematical skills with gamification elements.

**Current stage:** Analysis and design for the first pre-defense on 24 October 2026.

## Problem statement

A correct answer obtained with a hint or an external solver does not necessarily demonstrate that a student can solve a similar problem independently. Parents also need a clearer distinction between activity, assisted performance and demonstrated skill.

MathVerity addresses this problem by separating assisted practice from independent assessment. Mathematical correctness is determined by server-side code. AI provides limited hints and does not assign grades or determine mastery on its own. The usefulness of this approach to the target families remains a hypothesis to validate through interviews and a pilot.

## Target users

| User | Main needs |
| --- | --- |
| Students in grades 5–6 | Short practice sessions, understandable feedback, stepwise hints and opportunities to demonstrate independent performance. |
| Parents | Secure access to their linked child’s results, explainable skill statuses and actionable review recommendations. |

## Expected outcomes

- A reproducible MVP with learner and parent interfaces.
- An expert-reviewed bank of 120 original items covering eight skills.
- Deterministic assessment of supported numeric and fractional answers.
- Restricted hints with reviewed static templates available when AI is unavailable.
- Explainable skill reports that distinguish assisted and independent performance.
- Technical test results and a preliminary educational evaluation against an otherwise identical practice tool with static hints.

These are planned outcomes. Improved learning, diagnostic validity and report usefulness must be evaluated rather than assumed.

## Team and supervision

| Team member | Role | Responsibilities |
| --- | --- | --- |
| **Abylay Latiyev** | Fullstack developer | Assessment and task workflows end-to-end: React task and results interfaces, Go assessment APIs, deterministic scoring, assessment database design, accessibility, backend and UI tests. |
| **Zhailanov Daniyar** | Fullstack developer | Learner and parent workflows end-to-end: React dashboards and AI assistant interface, Go profile and progress APIs, authentication and access control, AI integration, related database design, accessibility, backend and UI tests. |
| **Madina Yermaganbetova** | Supervisor | Review of the problem, scope, requirements, architectural decisions, evaluation method and project milestones. |

## Project scope

### Planned MVP

The content scope comprises ordinary fractions, decimals, percentages and simple linear equations: eight skills and a target of 15 items per skill.

The MVP includes:

- Russian-language and Kazakh-language interfaces and learning sessions of approximately 10–15 minutes.
- Numeric and fractional answers, diagnostic selected-response questions and structured solution steps.
- Up to three hint levels during practice and separate independent items without built-in assistance.
- Evidence-based skill statuses, XP and achievements; XP does not determine mastery.
- Secure parent–child linking and reports available only for verified family relationships.
- Content authoring and publication after subject review.

### Outside the MVP

Full curriculum coverage, handwriting recognition, video calls, payments, public child leaderboards, cameras or biometrics, cheating detection, proprietary LLM training, deep knowledge tracing, school ERP integration and automated high-stakes assessment are outside the initial scope.

## Current development status

| Area | Status |
| --- | --- |
| Project analysis and design | Initial proposal, literature review, comparisons, requirements and architectural decisions have been prepared. |
| UX | User flows are described in the project materials; a runnable prototype is not included in the current deliverables. |
| Backend and frontend | The production Go API and full React client have not yet been implemented. |
| AI integration | Provider selection and real AI calls are pending. |
| Learning content | The eight-skill model and 120-item target are planned; the complete reviewed bank is not yet available. |
| Validation | User interviews, supervisor feedback, executed technical tests and the educational pilot remain pending. |

Documentation describes the target system. It does not establish that the implementation or evaluation has been completed.

## Selected technologies

| Area | Selected approach |
| --- | --- |
| Architecture | Modular monolith with explicit domain boundaries. |
| Backend | Go and `gin/gonic`. |
| Database | PostgreSQL, with `pgx` for access and `goose` for SQL migrations; `sqlc` may be introduced once queries stabilise. Gorm might be used for ORM. |
| Frontend | React, TypeScript and Vite. |
| Client–server communication | REST with JSON and an OpenAPI contract. |
| Local environment | Docker Compose. |
| Assessment | Deterministic server-side mathematical logic using exact rational arithmetic where applicable. |
| Hints | Reviewed static templates and an external LLM through a restricted Go adapter, subject to quality evaluation. |
| Planned testing | Go tests and race detection, PostgreSQL integration tests, Vitest and Playwright. |

Dependency versions and image digests will be pinned when the implementation is introduced. The AI provider has not yet been selected.

## Project tracking

**YouTrack project:** **[Diploma Project Link](https://diplomase2024.youtrack.cloud/)**

Each work item should identify its owner, priority, expected deliverable, acceptance criteria and deadline. Branches, commits and pull requests should reference real YouTrack task IDs. Completed tasks should link back to the relevant deliverables or changes.

## Project documentation

The following documents belong in the repository’s `docs/` directory:

| Document | File |
| --- | --- |
| Project proposal and scope | [01-proposal.pdf](docs/01-proposal.pdf) |
| Critical literature review and references | [02-literature-review.pdf](docs/02-literature-review.pdf) |
| Existing system comparison | [03-existing-system-comparison.pdf](docs/03-existing-system-comparison.pdf) |
| Technology comparison | [04-technology-comparison.pdf](docs/04-technology-comparison.pdf) |
| Requirements and acceptance criteria | [05-requirements.pdf](docs/05-requirements.pdf) |
| Architectural decisions | [06-architectural-decisions.pdf](docs/06-architectural-decisions.pdf) |
| Verification and evaluation | [07-verification-and-evaluation.pdf](docs/07-verification-and-evaluation.pdf) |
| Prototype materials | [08-prototype-materials.pdf](docs/08-prototype-materials.pdf) |
| Architecture and digrams | [09-architecture-and-diagrams.pdf](docs/09-architecture-and-diagrams.pdf)
## Setup and execution

### Current documentation stage

1. Clone or download the repository.
2. Open this README and the documents in `docs/` using a DOCX-compatible viewer.

No application dependencies are needed to review the documentation. There is currently no runnable application or included executable prototype, so application installation and startup commands are not yet available.

### When runnable code becomes available

This section will be updated with verified instructions for:

1. Installing the pinned Go, Node.js and Docker toolchain versions.
2. Installing backend and frontend dependencies.
3. Creating local configuration from a provided example and setting required environment variables.
4. Starting PostgreSQL and applying database migrations.
5. Starting the API and frontend, including their local URLs.
6. Running without an AI provider through the static-hint fallback.

## Testing

Automated test code and executed results are not included at this stage. Planned checks cover:

- Answer normalisation, rational arithmetic, skill-status boundaries and idempotent XP awards.
- Database transactions and integration with PostgreSQL.
- Role and object access, parent–child linking and rejection of hints in independent mode.
- AI timeouts, fallback behaviour and outgoing payload minimisation.
- Learner and parent flows, keyboard accessibility and narrow-screen layouts.
- API load, backup restoration and reproducible startup.

Exact test commands, required fixtures and expected results will be added alongside the first runnable implementation. The acceptance criteria and verification cases are defined in the [requirements specification](docs/05-requirements.pdf).
