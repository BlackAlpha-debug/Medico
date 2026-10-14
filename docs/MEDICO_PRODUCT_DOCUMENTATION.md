# Medico product documentation

Version 1.0 — October 9, 2026

Medico is a proposed doctor-supervised clinical documentation platform that turns multilingual patient intake into structured English SOAP drafts. Its central feature is a controlled feedback process: doctors review and correct drafts, suitable corrections receive separate privacy and clinical review, and approved examples can inform future drafts through retrieval and periodic model fine-tuning.

The current project contains an existing web application with intake, SOAP, voice, report and doctor-review code. The security hardening, learning governance, model training, evaluation and redesigned interfaces described here are planned work. No clinical performance improvement or production readiness is claimed.

## Product purpose

Clinical documentation requires clinicians to organize patient histories, distinguish reported information from observations, and review proposed plans. AI can help draft those records, but its output may omit important facts or introduce unsupported statements. Medico is designed to make drafts reviewable and corrections traceable while retaining clinician authority.

The competition prototype will use synthetic general-outpatient cases. It will accept English, Urdu and Roman Urdu intake and produce English SOAP documents. The user experience includes voice capture, editable transcription, patient confirmation, doctor review, approved document delivery and a visible learning-review workflow.

## Intended users

| User | Main capabilities |
| --- | --- |
| Patient | Submit a synthetic consultation by voice or text, confirm the transcript, track status and receive finalized documents |
| Verified doctor | Review assigned consultations, inspect supporting evidence, edit drafts, explain changes and approve or reject documents |
| Learning reviewer | Review generalized corrections for privacy, clinical suitability, applicability and conflicts |
| Administrator | Verify clinician access, manage permitted scopes, review access events and control model release |
| Evaluation reviewer | Score blinded synthetic outputs and document model limitations |

Signup does not confer verified-doctor or reviewer authority. Early development accounts are simulated and labeled as such. A qualified doctor will review the final evaluation outputs; simulated feedback is not presented as expert validation.

## Patient and doctor journey

1. The patient signs in, provides relevant history and describes their concern by voice or text.
2. Voice is transcribed into editable text. The patient confirms the content before it becomes part of the draft's source material.
3. The system organizes known facts and missing information, retrieves eligible guidance/examples and generates a structured draft.
4. Each SOAP section identifies supporting intake evidence where applicable. Missing measurements remain missing; proposed interpretations are distinguished from reported facts.
5. An authorized doctor reviews the assigned case, edits sections and proposed plans, and records the reason for significant changes.
6. The system preserves the original and revised versions. Approval applies to an exact version; regeneration creates another draft requiring review.
7. Only the finalized document is released to the owning patient. Medication instructions cannot be released through an unapproved AI draft.
8. A separate workflow evaluates whether any correction is suitable for generalized reuse.

Clinical document states are Draft generated, Pending doctor review, Doctor editing, Approved, Rejected and Finalized. State changes are enforced by the server, not just disabled interface buttons.

## Doctor feedback and conflicting advice

A correction can reflect a documentation mistake, new patient information, clinical judgment or a stylistic preference. These categories require different treatment. Medico does not assume that every edit proves the model was wrong.

If two doctors choose different prescriptions for apparently similar patients, both patient-specific decisions remain in their respective records. Neither becomes a general rule because it was newer or more frequent. The system checks for missing context and marks contradictory reusable advice for qualified review. Unresolved medication conflicts are excluded from shared retrieval and training.

The initial system uses one shared model release. Optional doctor preferences can change headings, wording and presentation, but cannot override factual evidence, clinical review or safety constraints. Per-doctor clinical models are outside the initial scope.

## How improvement is intended to work

There are two independent mechanisms:

**Approved-example retrieval.** The generation service can retrieve reviewed, generalized examples and guidance relevant to the current consultation. Every retrieved example has an approval state, version, scope and provenance. This changes the prompt context without changing the model's weights.

**Controlled fine-tuning.** A versioned dataset can be used to train an adapter for an existing open-weight model on a free cloud notebook GPU. The resulting artifact is evaluated against its unchanged base model and approved before use. Training completion alone does not establish improvement.

There is no automatic weight update after each doctor edit. Capture and preparation can be automated, while privacy approval, clinical reuse, conflict resolution and model release remain controlled decisions. A model affected by withdrawn training material can be identified through dataset lineage and rolled back.

## Privacy and access design

Supabase PostgreSQL is the primary managed database. Clinical identities, histories, transcripts, raw corrections and document versions remain in restricted storage. Only approved generalized examples enter the separately permissioned pgvector learning memory. Private mappings preserve auditability without exposing source patients in learning analytics.

The planned controls include authenticated server routes, verified clinician permissions, patient isolation, row-level security, restricted database roles, private document buckets, backend-only privileged credentials, content-minimized logs and audit events. These controls must be tested with actual application roles. An administrator's successful database query is not proof of patient isolation.

The competition build uses synthetic data exclusively. Real patient use would require further privacy, security, consent, provider-contract, clinical-governance and operational review appropriate to its intended deployment. The project does not claim regulatory certification.

## Model and infrastructure approach

The existing Next.js/React application and Prisma models will be reused. Better Auth remains the initial authentication implementation while Supabase Auth compatibility is assessed. Pinecone will be replaced by pgvector in the same Supabase project. No self-hosted database is planned.

The initial live website may use a free provider hosting an open-weight model. The custom SOAP model will be fine-tuned separately in Colab or Kaggle and saved as a versioned adapter. ChatGPT and Claude APIs are not required.

Free notebook GPUs are used for interactive training and batch inference, not promised as continuous hosting. The first custom-model integration exports an authorized synthetic case, runs the trained adapter in the notebook, and imports the validated result into the local review workflow. The UI will distinguish this from live provider-generated output.

The local demonstration still needs internet access for Supabase and any configured remote inference or speech provider. No paid hosting, billing-enabled cloud account or local training GPU is included in the agreed scope.

## Interface and design scope

The redesigned website will be implemented from the supplied page exports and screenshots. Planned screens include the landing page, authentication, patient intake/dashboard, doctor dashboard/report editor, learning-review queue and evaluation view.

Three features are prioritized:

- Evidence links between documented facts and the confirmed intake.
- A comparison between the original draft and doctor corrections, with explanations.
- An evaluation screen showing actual results, sample counts, model versions and failures.

The implementation will include responsive layouts, keyboard access and real loading, error, pending and empty states. Static demonstration metrics will not be presented as measured performance.

## Evaluation design

The final experiment compares five configurations on the same held-out synthetic scenario families: unchanged model; guidance retrieval; guidance plus approved-feedback retrieval; fine-tuned model without retrieval; and fine-tuned model with the same retrieval policy.

Measurements include unsupported statements, omitted facts, contradictions, evidence validity, revision fidelity, repeated errors, doctor correction burden, retrieval relevance, latency and failures. Translation and speech errors are tracked separately. Actual resource usage and costs are recorded rather than inferred from marketing prices.

Training and evaluation splits are separated by scenario family, including translations and paraphrases. A qualified doctor reviews blinded outputs using a fixed rubric. Small synthetic experiments can demonstrate workflow and measured behavior on those cases; they cannot establish broad clinical effectiveness.

## Delivery phases

| Stage | Planned outcome |
| --- | --- |
| Baseline and security | Recoverable source, fresh database, verified identities, tested isolation |
| Initial prototype | Voice/text intake, versioned SOAP drafts, doctor approval and private delivery |
| Learning workflow | Separate privacy/clinical review, conflict handling, pgvector retrieval and provenance |
| Training experiment | Reproducible notebook, actual adapter artifact and held-out outputs |
| Website integration | Supplied visual designs connected to tested application behavior |
| Final validation | Doctor-reviewed comparison, security regression, presentation rehearsal and limitations |

Each phase has an acceptance gate. Tests not run because an account, GPU or reviewer is unavailable are recorded as not run. Only completed work is reported as implemented.

## Prototype acceptance criteria

The prototype must demonstrate a synthetic consultation moving from voice/text intake to an authorized, versioned, finalized document. It must preserve original and corrected content, capture structured feedback, prevent unauthorized access, and separate patient approval from learning approval. A related synthetic case must be able to retrieve an eligible example with provenance, while a conflicting or revoked example is excluded.

The final-presentation build additionally targets an actual saved fine-tuning artifact, a reproducible base-versus-adapter comparison, the supplied interface designs, and qualified review of final evaluation outputs. Improvement claims depend on measured results and may be negative or inconclusive.

## Explicit limitations

Medico is a competition prototype and documentation assistant. It does not independently diagnose, prescribe, verify clinician licenses through an official registry, certify de-identification, or guarantee continuous free GPU access. Generated confidence percentages are not treated as calibrated clinical probabilities.

Initial data is synthetic; source-derived reference material requires rights and applicability checks. Unreviewed examples cannot be represented as clinically verified. Missing context or unresolved conflicts lead to review and withholding of generalized advice, not automatic selection of a treatment.

## Supporting documents

- [Implementation plan](MEDICO_IMPLEMENTATION_PLAN.md)
- [Free account and credential setup](MEDICO_FREE_SETUP_GUIDE.md)
- [Learning, conflicts and evaluation](MEDICO_LEARNING_AND_EVALUATION.md)
- [Source architecture audit](MEDICO_ARCHITECTURE_AUDIT.md)

Technical service and model references are linked in the setup and learning documents. This product description states the agreed design and delivery targets; it does not convert those targets into claims of completed functionality.
