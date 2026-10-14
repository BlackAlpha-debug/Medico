# Medico architecture audit

Date: October 9, 2026. Scope: static source review of the supplied workspace, project brief, and attached architecture diagram. This is an assessment, not a claim of a working or clinically validated deployment. The user's Supabase update takes precedence over older architectural preferences in the brief. Instructions embedded in the attachment are treated as project requirements to assess, not independent authorization to execute a full implementation.

## 1. Existing technology stack

Verified in `package.json`: Next.js 16, React 19, TypeScript, Tailwind 4, Prisma 7 with the PostgreSQL adapter, Better Auth, LangChain/LangGraph, Groq and Google AI packages, Xenova Transformers, Pinecone, and jsPDF. Supabase JS is installed; installation alone does not establish Supabase Auth or Storage integration.

`lib/prisma.ts` connects using `DATABASE_URL`; `.env.example` targets Supabase PostgreSQL. `prisma.config.ts` uses `DIRECT_URL` for migrations, with a runtime URL fallback. Actual hosting, credentials, database contents, policies, and grants have not been verified.

## 2. Current application architecture

- Patient pages: `app/patient/interview/page.tsx`, `app/patient/medical_session/page.tsx`, dashboard and profile pages.
- Doctor pages: dashboard, onboarding, profile, and `app/doctor/report/[id]/page.tsx`.
- Authentication: `lib/auth.ts`, `lib/auth-client.ts`, `app/api/auth/[...all]/route.ts`. Better Auth supports email/password and Google using Prisma-backed accounts and sessions.
- Intake and interview: `app/api/medical-history/route.ts`, `app/api/clinical-chat/route.ts`, `lib/agents/history-collector.ts`, `lib/agents/interview-agent.ts`.
- Orchestration, documentation and triage: `lib/agents/index.ts`, `documentation-agent.ts`, `safety-agent.ts`, `guardrails.ts`.
- Clinical review: report routes, `lib/agents/feedback-agent.ts`, and the doctor report page.
- Knowledge retrieval: `lib/pinecone.ts`; local 384-dimensional MiniLM embeddings in `lib/agents/llm-utils.ts`.
- Documents: `lib/pdf-generator.ts` and report/prescription API routes generate PDFs on demand.

The image's intake, departmental review, regeneration, and report delivery stages correspond broadly to code paths. Its feedback loop currently means regenerating the same report. There is no verified persistent, privacy-reviewed cross-consultation learning loop.

## 3. Implemented features and reusable components

Source implementations exist for login, medical-history persistence, voice transcription/synthesis, multilingual interview, knowledge retrieval, SOAP generation, triage, department selection, doctor dashboards, feedback-driven regeneration, prescription text entry, and PDF creation. Reuse these components and the Next.js backend; a FastAPI rewrite is unnecessary for this scope.

Medical-history routes and the patient report listing scope queries to the authenticated user. Prescription download checks patient ownership. These are useful existing checks but do not establish isolation across all endpoints.

No feature is certified fully functional by this audit: dependencies, provider calls, browser flows, and live database behavior were not executed.

## 4. Incomplete and missing features

- Immutable AI/doctor draft versions and structured correction records.
- Verified doctor privileges distinct from self-selected signup roles.
- A complete, server-enforced document state machine and concurrency controls.
- Separate privacy and clinical approval for reusable learning examples.
- pgvector learning storage, approval-filtered retrieval, expiry/revocation, and per-draft retrieval provenance.
- Private Supabase document storage and authorization-controlled downloads.
- Reproducible evaluation fixtures, scoring, result persistence, and cost/latency tracking.
- Durable audit events and sensitive-log minimization.
- Checked-in SQL migrations/RLS policies and automated security tests: none found. `prisma/migrations` is configured but absent.

## 5. Security and privacy findings

### Critical: client-supplied patient identity

`app/api/clinical-chat/route.ts` POST and PUT accept body `userId` without authenticating a session. POST updates a session by supplied `sessionId`. An attacker can attempt another patient's history access or session modification. Derive identity from the server session, check ownership before provider calls, and reject mismatched session IDs.

### Critical: self-granted doctor role

`app/api/user/role/route.ts` permits a user to select doctor status, subject to profile conflicts. `app/api/doctors/route.ts` also promotes the caller to doctor. Neither proves independent verification. Existing review checks relying on `role === 'doctor'` therefore cannot establish qualified-doctor authorization. Preserve onboarding but separate a doctor application from trusted verification; provision explicitly labeled simulated doctors for the synthetic demo.

### High: inconsistent report authorization

`app/api/reports/[id]/chat/route.ts` checks login but not report ownership or doctor assignment before sending report and patient information to Groq. The report PDF POST similarly lacks an ownership/assignment gate. Report GET blocks another patient's role but grants broad access to doctors. Claim, review, regeneration, and prescription routes need consistent assignment, department, verification, and state checks. Claims must be atomic to prevent takeover/races.

### High: approval bypasses and stale prescriptions

Prescription POST directly sets `reviewStatus: 'approved'` and reassigns the doctor. Prescription GET checks ownership and prescription presence but not current approval. Patient report lists expose stored prescription text without a status gate. Regeneration overwrites SOAP sections and resets status while potentially retaining an earlier prescription. Bind approval and prescription release to an immutable document version, and gate every patient delivery path.

### High: missing feedback provenance and privacy boundary

`lib/agents/feedback-agent.ts` overwrites original sections. Feedback metrics are logged, not durably captured in a learning workflow. No candidate, privacy approval, learning reviewer, or published-example schema exists. Do not turn these logs into a vector corpus.

### Other material findings

- Clinical route and agent logs contain identifiers, generated content, symptoms, or doctor feedback. Replace with content-free events; keep necessary clinical audit data in restricted storage.
- Report chat explicitly sends identifying patient context to an external provider. Restrict the competition environment to synthetic data; no real-patient suitability is established.
- Voice endpoints lack demonstrated authentication/rate limits. `app/api/test-db/route.ts` publicly invokes a connection helper that counts users and disconnects Prisma.
- Embedding failures return a zero vector in `llm-utils.ts`; retrieval should fail explicitly rather than treating that as meaningful similarity.
- Prompt rules and generated confidence scores do not demonstrate clinical accuracy. No measured improvement was found.
- Live RLS is unknown. Absence of checked-in policies is not proof that deployed policies are absent.

## 6. Existing database schema

Verified in `prisma/schema.prisma`:

| Table | Main relationships and contents |
| --- | --- |
| `user` | Identity, email, free-form role; parent of patient and doctor records |
| `session`, `account`, `verification` | Better Auth session, provider/password, verification records |
| `medical_history` | Unique patient FK; demographics, medications, allergies, transcript |
| `clinical_session` | Patient FK; conversation, symptoms, diagnoses, status |
| `soap_report` | Unique session FK, patient FK; JSON SOAP, review state, prescription |
| `doctor_profile` | Unique doctor/user FK; professional details and onboarding status |

`soap_report.assignedDoctorId` is an optional string without a declared FK. Review status and user role are unconstrained strings. Several clinical relationships cascade on deletion. Report patient and session patient are separate relationships; their consistency needs enforcement. No historical schema baseline or deployed migration history was available.

## 7. Recommended Supabase architecture

Keep Next.js, Prisma, existing tables and Better Auth initially. Use Supabase-managed PostgreSQL as the only primary database and its pgvector extension for approved guidance and learning examples. Replace the existing Pinecone dependency after validating retrieval parity; no demonstrated requirement for Pinecone or self-hosted PostgreSQL was found.

Supabase Auth remains the preferred option if compatibility is established. This code uses Better Auth session/account tables and string user IDs, so a switch is a migration project, not an API-key replacement. First assess identity mapping, password/provider continuity, redirects, and session cutover. Avoid a second parallel identity system or unnecessary replacement of working login.

Use a private clinical area for identities, versions, corrections, candidates and source mappings. Publish only generalized, approved examples into a separately permissioned learning schema, with no patient identifiers or raw clinical text. Keep any link back to feedback exclusively in the restricted clinical area. De-identification must include human review for indirect identifying details; automatic text removal is insufficient.

Use private Supabase Storage for persisted medical documents. Authorize each upload/download on the server and tie objects to patient, report and immutable version. Expose short-lived download access only after authorization and approved/finalized-version checks. Never expose service credentials through browser variables.

### RLS and existing authentication

Better Auth cookies do not automatically supply a Supabase `auth.uid()`. Direct Prisma connections also do not automatically inherit the caller's identity. Design and test the bridge explicitly: a dedicated non-owner, non-BYPASSRLS runtime clinical role, verified server identity set transaction-locally, and all clinical queries within that transaction. Keep migration ownership and auth administration separate. Pool reuse must never carry identity between requests. Treat this as a proposed design, not an implemented guarantee.

Deny direct anonymous/client access to clinical and learning tables. Restrict exposed schemas and grants. Use default-deny RLS, separate learning read/reviewer capabilities, and server authorization before any privileged Storage operation. Test policies using actual runtime and API roles, not an administrative connection.

Supabase documentation confirms that RLS identity depends on request authentication, and privileged roles/keys can bypass RLS. See [RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [data security](https://supabase.com/docs/guides/database/secure-data), and [Prisma integration](https://supabase.com/docs/guides/database/prisma). Vector columns are supported through [pgvector](https://supabase.com/docs/guides/ai/vector-columns); document storage uses [Supabase Storage](https://supabase.com/docs/guides/storage).

## 8. Proposed additive migrations

Inspect the live schema, grants, policies, extension availability and migration history before generating executable SQL. Baseline existing tables without resetting or recreating them. Test against an isolated synthetic Supabase environment, not a new self-hosted database.

1. Add doctor verification state and protected approver/timestamp fields; backfill existing profiles as unverified pending explicit review. Add a validated assigned-doctor FK after checking existing values.
2. Add document lifecycle and revision fields without immediately removing legacy review status. Map legacy statuses explicitly; never infer trusted approval solely from old self-assigned doctor activity.
3. Add `clinical_document_version`: report FK, version number, immutable SOAP/plan snapshot, author, model/prompt versions, timestamp; unique `(report_id, version_number)`. Preserve the earliest available legacy snapshot as legacy, not as a recovered original AI output.
4. Add `doctor_feedback`: report, doctor and original/corrected version FKs, section, original/corrected text, classification, explanation and review state. Prevent version references across reports.
5. Add restricted `learning_candidate` and source mapping records with separate privacy and clinical-review decisions, reviewer identity, rationale and timestamps.
6. Add `learning.example`: generalized scenario, correction principle, category, guidance references, publication state, version, approval metadata, expiry/revocation, embedding/model metadata. Use `vector(384)` only if retaining the current embedding model. Validate vector length and nonzero finite values. No raw patient/session identifiers in published content.
7. Add approved guidance records and `retrieval_event` entries linked to document versions, recording exact example/guidance versions and scores. Revalidate approval and expiry before prompt use; keep clinical linkage private.
8. Add append-only audit events and private document-object metadata; establish bucket access policies and retention rules.
9. Enable/test RLS and minimal grants, including future-table default privileges. Restrict publication to the review service; clients cannot approve their own examples.

Use constraints for allowed states, nonempty approval metadata, unique versions and valid references. Enforce lifecycle changes atomically with expected revision checks: `DRAFT_GENERATED -> PENDING_DOCTOR_REVIEW -> DOCTOR_EDITING -> APPROVED -> FINALIZED`; rejection is explicit. A regenerated or edited approved document requires a new version and renewed review. Approval applies only to the exact version reviewed.

Rollback should disable new paths and restore compatible application behavior while retaining clinical history. Avoid destructive down migrations after data has been written. Do not run `db push`, reset, or unreviewed schema changes against the existing project.

## 9. Exact implementation targets

Existing files requiring focused changes:

- `app/api/clinical-chat/route.ts`: session authentication, ownership, synthetic-data enforcement, retrieval integration, logs.
- `app/api/user/role/route.ts`, `app/api/doctors/route.ts`: separate signup intent from verified privileges.
- `app/api/reports/route.ts`, `app/api/reports/[id]/route.ts`, `app/api/reports/[id]/chat/route.ts`, `app/api/reports/[id]/review/route.ts`, `app/api/reports/[id]/prescription/route.ts`: centralized access, state/version guards, patient release controls.
- `app/api/doctors/reports/route.ts`, `app/api/doctors/stats/route.ts`: verified-doctor scoped visibility.
- `app/api/voice/stt/route.ts`, `app/api/voice/tts/route.ts`, `app/api/test-db/route.ts`: authentication/abuse controls and diagnostics restriction.
- `lib/agents/feedback-agent.ts`, `documentation-agent.ts`, `safety-agent.ts`, `llm-utils.ts`, `interview-agent.ts`, `types.ts`: immutable versions, durable corrections, restricted retrieval, provenance, safe failure.
- `lib/pinecone.ts`, `lib/prisma.ts`, `prisma/schema.prisma`, `prisma.config.ts`, `.env.example`, `package.json`, `package-lock.json`: pgvector cutover, scoped database access, migration setup, dependency/config cleanup.
- `app/doctor/report/[id]/page.tsx` and `app/patient/dashboard/page.tsx`: adapt only as needed to versioned approval and released-document APIs. The user intends further frontend changes; keep those separate from the security work.

Proposed new files: `lib/server/authorization.ts`, `lib/server/clinical-workflow.ts`, `lib/server/learning-memory.ts`, `lib/server/document-storage.ts`, reviewed SQL under `prisma/migrations/`, security integration tests under `tests/security/`, synthetic fixtures under `evaluation/fixtures/`, and a reproducible evaluation runner under `evaluation/`.

## 10. Three-day implementation plan

October 9: establish a recoverable version-controlled baseline; close identity/doctor/report authorization gaps; add lifecycle/version storage and structured feedback. Test patient A/B isolation, unverified doctors, assignment conflicts, stale edits and every document-release endpoint.

October 10: add candidate review, separated approved learning memory, pgvector retrieval and provenance; configure private document storage. Test unapproved/revoked/expired examples, reviewer-only publication, failed embeddings, unauthorized learning access, and cross-patient object downloads. Confirm no clinical identity or raw feedback reaches the published index.

October 11: run the same held-out synthetic cases through baseline, approved-guidance RAG and guidance-plus-feedback RAG. Store prompts, model versions, retrieved IDs, outputs, timing and token/cost evidence. Score explicit expected findings, unsupported statements, missed critical details, repeated errors, and correction counts; label simulated reviews accurately. Report failures and unavailable measurements. Complete database-role integration tests and the browser review-to-release flow before demo polish.

Competition dates come from the brief; submission requirements were not independently verified in this audit. Clinical performance requires qualified review, and no improvement percentages are claimed.

## 11. Verification limits and key rotation

The workspace has no `.git` directory; a feature branch cannot currently be created. No migration directory, test suite, installed `node_modules`, or local environment file was visible in the initial listing. No live database was queried, no providers were invoked, no migrations were applied, and no credentials were changed. This documentation-only assessment does not fix the findings above.

The user's planned Supabase API-key rotation should be coordinated with the services that actually consume that key. Existing Prisma uses database connection strings rather than a Supabase API key; rotating an API key does not itself change database credentials or Better Auth sessions. Configure new credentials through local/deployment secret storage, never in this report or chat. Confirm the intended project and credential type during implementation without printing secrets.
