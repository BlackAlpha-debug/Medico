# ClinLoop AI learning and evaluation specification

Version 1.0 — October 9, 2026

This specification defines what the system may learn, how it handles conflicting doctors, how actual training will work without a local GPU, and what evidence is required before claiming improvement. The first model tasks are English SOAP drafting and doctor-requested revisions from English, Urdu or Roman Urdu intake. Clinical correctness remains subject to qualified review.

## 1 What happens when two doctors disagree

The system must not choose a reusable prescription simply because it is newer, more common, or written by a particular doctor. Two apparently identical histories may omit important examination findings, investigations, timing, patient preferences or other context. Sometimes multiple approaches are reasonable; sometimes one correction is wrong. Similarity is not enough to decide which.

Each doctor can approve the document for the patient they are authorized to treat. That approval does not publish a general rule and does not update model weights.

| Kind of difference | What ClinLoop stores | Effect on shared learning |
| --- | --- | --- |
| Wording or document layout | Optional private doctor style preference | May affect formatting only; cannot alter clinical facts or treatment |
| New patient-specific information | New clinical version plus explanation | Stays with that patient; not generalized automatically |
| Different but potentially valid clinical options | Both candidate rationales and applicability | Reviewer decides whether a bounded principle is supportable |
| Missing context | Explicit information gap | Ask for clarification; no reusable medication rule |
| Contradictory treatment or safety advice | Conflict record linking candidates | Quarantine from shared retrieval and training pending qualified adjudication |
| Verified correction of a documentation error | Generalized principle with source/evidence | Eligible after separate privacy and clinical approval |

For a simple synthetic example, Doctor A changes a plan to treatment X and Doctor B changes a similar case to treatment Y. ClinLoop preserves both patient records, records each explanation, and opens a conflict. It does not average doses, select the latest treatment, count votes, or assume one doctor's preference is medical truth. If no qualified reviewer resolves it, the reusable lesson may only be that the context is insufficient to generalize. The current treating doctor still reviews their own patient's plan.

Initial architecture: one shared, versioned base/adapter model with separately reviewed shared knowledge. No per-doctor clinical model. Optional doctor-specific preferences are limited to language, headings and formatting. Personal clinical fine-tuning is deferred because it could reinforce inconsistent practice and fragment evaluation.

## 2 Review and conflict lifecycle

1. Capture the original AI version, exact doctor revision, changed section, classification and explanation.
2. Preserve raw feedback in restricted clinical storage. Record whether a change concerns style, newly obtained facts, model error, clinical judgment or uncertainty.
3. Create a separate generalized candidate. Remove patient identity and identifying combinations; avoid verbatim transcript fragments.
4. Perform privacy and applicability review. Record clinical population, relevant conditions, context, jurisdiction, exclusions, source version and expiry where needed.
5. Compare against existing candidates using structured categories and semantic similarity. Automated detection only flags potential conflicts; it does not adjudicate medicine. Include manual conflict flags and periodic reviewer sampling because automated detection can miss disagreements.
6. A designated qualified reviewer evaluates clinical reuse and conflicts. The author cannot independently publish their own correction. Medication/safety conflicts require an independent qualified reviewer; until one is available they remain blocked.
7. Publish an approved, generalized principle with explicit scope. Keep the private source mapping outside the published example.
8. Recheck status, conflict, expiry and applicability before every retrieval. On a detected conflict with an already published principle, suspend the affected scope pending review; do not silently substitute the new candidate.
9. Allow revocation and revalidation. Maintain who decided what and why, without exposing clinical source records in analytics.

Reviewer independence is role- and actor-checked on the server. For the early demo, simulated reviewer accounts demonstrate these controls, and their examples remain tagged `experimental_synthetic`; they are not represented as clinically approved. Published clinical examples and experimental demo examples use distinct permissions and eligibility flags.

## 3 Learning has two separate mechanisms

**Retrieval:** an eligible example can influence the next prompt without changing model weights. The model receives a generalized principle and its provenance, not the source patient's record.

**Fine-tuning:** a controlled job adjusts adapter parameters using a frozen, approved dataset. The deployed adapter changes only after evaluation and explicit release. A successful training process can still produce a worse model.

The system may automatically capture, classify, identify candidates and prepare a proposed training manifest. It must not automatically approve clinical examples, train on arbitrary live edits, or promote a newly trained model. In this prototype, the cloud notebook job is deliberately started by the user; automation of scheduling does not bypass the review gates.

Model release lifecycle: DRAFT_DATASET → APPROVED_DATASET → TRAINING → EVALUATING → RELEASE_CANDIDATE → APPROVED_RELEASE → ACTIVE. Failure produces FAILED/HOLD; withdrawal produces REVOKED with a rollback target. Dataset review, training completion and release approval are separate records.

## 4 Bootstrap data without collecting online prescriptions

Online prescriptions are not a suitable default training corpus: they can contain identities, omit clinical context, have unclear reuse rights and provide no reliable explanation of why a medication was chosen. The initial task is source-faithful documentation, not learning to prescribe from examples.

Recommended source strategy, with research checked October 9, 2026:

| Source | Intended use | Restriction |
| --- | --- | --- |
| [Synthea synthetic records](https://synthetichealth.github.io/downloads.html) | Generate fictional histories and consistent encounter facts | Synthetic records are not clinician-approved SOAP labels or proof of medical correctness |
| [Synthea source license](https://github.com/synthetichealth/synthea/blob/master/LICENSE) | Record software reuse obligations | Review any bundled terminology/assets separately; software license alone does not settle every derivative-data right |
| [DailyMed](https://dailymed.nlm.nih.gov/dailymed/about-dailymed.cfm) | Candidate authoritative drug-label references for human review | US labeling; not patient-specific prescribing advice or a complete local clinical guideline; check reuse terms |
| [WHO AWaRe resources](https://www.who.int/teams/surveillance-prevention-control-AMR/control-and-response-strategies/AWaRe) | Candidate stewardship source if a selected scenario needs it | Confirm document version, applicable local practice, rights and qualified review before ingestion; not blanket training permission |
| Original synthetic scenarios | Intake-to-SOAP pairs, error corrections, missing-information and contradiction tests | Label authorship and clinical-review status; do not describe generated targets as real doctor feedback |

Create a source registry with URL, title, publisher, version, access date, jurisdiction, license, allowed use, attribution, reviewer and approval state. Unknown rights means no corpus ingestion or training export until resolved. Web availability does not equal an open license. Do not copy a full source into the training set merely because it is readable online.

Use deterministic transformations of synthetic facts for early targets: preserve documented allergies and current medications, distinguish historical from current conditions, mark missing objective findings, and map supplied facts into SOAP sections. Candidate assessments/plans are explicitly unvalidated and require review. Medication-dosing targets remain excluded until appropriately reviewed.

Because a qualified doctor is only expected at final testing, early fine-tuning is an experimental documentation study. It may demonstrate parameter updates and formatting/factual-coverage behavior; it does not establish treatment safety. New corrections from future real clinicians still require privacy permissions and the same reuse gate before entering a dataset.

## 5 Dataset format and lineage

Each example contains:

- Stable example and scenario-family IDs, task type, source/license metadata and synthetic status.
- Input facts, original language, confirmed English normalization, transcript evidence IDs and missing-information flags.
- For revisions: original draft, explicit correction instruction and expected revised document. Preserve unaffected sections unless the correction warrants changes.
- Structured target SOAP with source references; unsupported clinical additions are not valid targets.
- Review status and reviewer record; permitted retrieval/training use; split assignment; content hash and dataset version.

Keep train, validation and test split manifests immutable. Group all translations, paraphrases, near-duplicates and revisions of the same scenario family in one split. Retrieval memory for an experiment cannot contain the held-out answer or a near-duplicate test case. Freeze the corpus snapshot for all compared configurations.

Start with approximately 12–20 distinct scenario families. Prepare a 20-example pipeline smoke set; expand to roughly 120–300 examples only when their quality can be checked. These numbers are engineering targets, not statistical or clinical validation thresholds. Report unique families and examples separately so paraphrases do not inflate apparent diversity.

Synthetic identifiers should still be stripped from shared examples to exercise the privacy pipeline. Neither auth credentials nor patient-record IDs belong in training exports. Separate training operator access from clinical application access.

## 6 Model selection and actual fine-tuning

Candidate starting points are [Qwen3 1.7B](https://huggingface.co/Qwen/Qwen3-1.7B) and [Qwen3 4B Instruct 2507](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507). Their published model cards provide weights and license information. They are selected for a small open-weight experiment, not because they are established clinical models. English/Urdu/Roman Urdu performance must be tested on our cases rather than inferred from general multilingual claims.

Select one candidate after measuring memory, latency, structured-output reliability and source faithfulness on validation cases. Freeze its repository revision and tokenizer/chat template. Do not change the base model halfway through an A/B comparison. Disable unnecessary reasoning output where supported and train against the required structured answer, not hidden reasoning traces.

Use [PEFT quantization guidance](https://huggingface.co/docs/peft/developer_guides/quantization) for an adapter-based QLoRA experiment. Quantized base weights plus trained LoRA parameters constitute actual fine-tuning; the base model weights need not all be updated for that claim to be true.

Proposed first-run settings, subject to the GPU smoke test: one GPU, batch size 1, 1,024–2,048 token sequences with explicit truncation checks, LoRA rank 8 or 16, gradient accumulation and at most a few short epochs. Choose the learning rate and stopping point using validation, not a claimed universal recipe. Record actual effective batch, precision, target modules, learning rate, epochs, seed and hardware. Do not silently truncate allergy/history evidence to fit a context limit.

Required notebook stages:

1. Preflight GPU, disk, package versions and model license/download.
2. Verify dataset hashes, rights, synthetic status, split isolation and target schema.
3. Generate baseline outputs before training.
4. Run a short training smoke test; check finite loss and checkpoint creation.
5. Run the selected experiment with checkpoints, bounded runtime and validation.
6. Export adapter/config/tokenizer references and the exact base revision.
7. Restart/reload in a fresh session and verify the adapter is actually active.
8. Run fixed held-out comparisons and export machine-readable results.
9. Mark the artifact experimental or release-candidate; never promote solely because training finished.

If quality declines, keep the result as a failed experiment and retain the prior release. If a revoked example was trained into an adapter, identify affected artifacts from dataset lineage and withdraw/retrain them. Removing a vector or database row does not undo a weight update.

## 7 Evaluation configurations

| ID | Model | Context | Question answered |
| --- | --- | --- | --- |
| A | Frozen base | Patient input only | What does the unchanged model do? |
| B | Same base | Approved guidance | Does guidance retrieval help? |
| C | Same base | Same guidance plus eligible corrections | Does feedback retrieval help beyond guidance? |
| D | Fine-tuned adapter on same base | Patient input only | What changed through parameter training? |
| E | Same fine-tuned model | Same retrieval policy/corpus as C | How does the combined system behave? |

Use identical held-out case inputs, output schema, generation limits and comparable inference settings. Record seeds and nondeterminism. Separate live-provider results when that provider serves a different model; they cannot substitute for the controlled base-versus-adapter comparison. Use captured retrieval snapshots to avoid a changing corpus confounding the experiment.

## 8 Metrics and release gates

| Measurement | Definition | Reviewer/check |
| --- | --- | --- |
| Output validity | Schema-valid outputs / attempted cases, including failures | Deterministic validator |
| Unsupported facts | Statements absent from input or explicitly applicable cited context | Deterministic fixture checks plus doctor review |
| Required-fact omissions | Missing expected facts / required facts, with critical subset reported separately | Case rubric |
| Contradictions | Known contradictions detected and newly introduced contradictions | Fixture checks plus doctor review |
| Evidence precision | Correct supporting references / references emitted; invalid IDs reported separately | Source-ID check plus human entailment review |
| Revision fidelity | Requested changes satisfied without unsupported unrelated changes | Diff/rubric review |
| Correction burden | Drafts requiring substantive edits / reviewed drafts; edit count/time where actually measured | Blinded doctor review |
| Repeated errors | Recurrence on related held-out scenarios after a reviewed correction | Paired scenario-family analysis |
| Conflict behavior | Unresolved conflicting medication principles excluded; uncertainty appropriately shown | Security fixture plus review |
| Retrieval relevance | Relevant approved examples among retrieved items; denied-example count | Labeled retrieval set |
| False confidence | Unsupported certainty or invented confidence percentages | Rubric review |
| Latency/reliability | p50/p95 when sample count supports it, failures, per-stage time and queue delays | Instrumentation |
| Resource usage | Tokens, GPU time/memory and actual recorded charges | Runtime records |

Report counts and denominators, scenario-family diversity and language breakdowns. A single reviewer or a small synthetic set cannot support population-level clinical accuracy claims. ROUGE/BLEU or training loss alone are insufficient evidence of clinical improvement. Do not use another LLM as the sole ground-truth judge.

Release gates are engineering criteria for this prototype: all mandatory schema/access tests pass; no observed critical unsafe release or new critical safety omission in the fixed regression suite; qualified review of the final clinical claims; and an available rollback. These gates do not certify real-world safety. A model can remain experimental if it fails to improve, and the report must say so.

The qualified doctor should review blinded paired outputs for approximately 15–30 held-out cases if available, with fewer cases explicitly limiting conclusions. This is a proposed workload, not a commitment made by the doctor. When feedback on held-out cases is used for tuning, move those cases to development/regression and create new final holdouts.

## 9 Security and workflow test matrix

All rows below are planned tests, not executed results.

| ID | Test | Required observation |
| --- | --- | --- |
| SEC01 | Anonymous clinical/voice/report requests | Denied before database mutation or provider call |
| SEC02 | Patient A submits B's user/session/report ID | Denied; no B data returned or changed |
| SEC03 | Patient changes role/profile fields | Cannot obtain verified doctor/reviewer powers |
| SEC04 | Doctor outside assignment/department | Cannot inspect, revise, approve or claim outside scope |
| SEC05 | Two doctors claim concurrently | Only one wins; loser gets controlled conflict |
| SEC06 | Missing identity and reused DB connection | Default deny; no previous caller context survives |
| SEC07 | Direct anonymous/authenticated Supabase table access | No private clinical or learning candidate access |
| SEC08 | Runtime vs owner database role | Runtime has effective RLS and lacks owner/BYPASSRLS privileges |
| SEC09 | Private PDF object/path guessing | No bytes or metadata of another patient |
| SEC10 | Public diagnostics, logs and bundled JS | No secrets or clinical content; diagnostics restricted |
| SEC11 | Cross-origin cookie-authenticated mutation and oversized payload | Denied without side effects; bounded parsing and rate limits |
| FLOW01 | Unapproved/rejected draft via JSON/PDF/chat/download | No finalized advice or prescription released |
| FLOW02 | Approval with stale version or forged status | Rejected atomically |
| FLOW03 | Regenerate finalized report | New pending version; old approval cannot authorize new content |
| FLOW04 | Duplicate request and timeout retry | No duplicate finalization/feedback/artifact side effects |
| FLOW05 | Finalize exact version | Preserved originals, doctor identity and audit event |
| MEM01 | Candidate author self-publishes | Denied without independent reviewer gate |
| MEM02 | Unapproved/expired/revoked/conflicted example | Excluded from retrieval and training export |
| MEM03 | Clinical identity embedded in candidate | Publication blocked pending privacy review |
| MEM04 | Prompt injection in retrieved text/transcript | Treated as untrusted data; cannot change authorization or approval |
| MEM05 | Revocation after retrieval before generation | Eligibility rechecked or job invalidated |
| MEM06 | Doctor formatting preference | Cannot change drug selection, dosage, diagnosis or factual content |
| TRAIN01 | Train/test paraphrase or translation overlap | Export validation fails |
| TRAIN02 | Missing approval/license/hash | Training export fails closed |
| TRAIN03 | Checkpoint interruption and fresh reload | Verified resumable artifact and base/adapter identity |
| TRAIN04 | Tampered/stale notebook result import | Denied without overwriting current clinical version |
| TRAIN05 | Revoked example in released adapter | Affected release identified, suspended and rolled back |
| VOICE01 | Denied mic, invalid/empty/large audio, 429 | Clear recoverable state; no lost intake |
| VOICE02 | Negation, numbers and drug words in English/Urdu | Displayed transcript can be corrected and confirmed |
| UI01 | Patient → doctor → reviewer → patient journey | Real role checks and version states throughout |
| UI02 | Supplied designs at mobile/desktop sizes | Readable, usable and faithful; no fake analytics |
| OPS01 | Synthetic export restore and document cleanup | Recoverable records; deleted objects and jobs inaccessible; preserved necessary lineage |

Unit tests cover validators, state transitions, conflict eligibility and metrics. Route tests cover auth and error handling. Database integration tests execute with real restricted roles against the synthetic Supabase project. Playwright covers browser journeys. GPU training tests require actual notebook execution and saved artifacts. Mocked outputs are labeled and excluded from measured model-performance results.

## 10 Evidence package

For each phase save a dated verification record with commit, configuration hash, commands, environment, pass/fail/skip counts and known issues. For each training run save a dataset card, model card, manifests, checkpoint/adapter hash, training log and evaluation outputs. For the final review save the rubric, anonymized model labels, doctor review scope, disagreement notes and result tables.

Keep raw synthetic outputs available for reproducibility without exposing account secrets. The evaluation screen must display actual imported/run results with sample counts and failure cases; before a run it displays an empty state. Do not populate invented accuracy improvements or simulate expert endorsements.
