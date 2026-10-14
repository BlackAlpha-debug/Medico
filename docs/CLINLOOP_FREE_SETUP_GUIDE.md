# ClinLoop AI free setup guide

Version 1.0 — October 9, 2026

This guide prepares user-owned services for the phased implementation. The application will run on localhost, use a new Supabase project, and train its own open-weight adapter in Colab or Kaggle. No local GPU, paid subscription, credit card, or billing-enabled cloud account is required by the plan. Free availability is a dependency to verify, not an uptime guarantee.

Some configuration names and scripts below are proposed implementation deliverables. They are marked accordingly. Do not expect the current application to support the new learning, training or role-isolation paths before they are implemented.

## 1 Accounts you need

| Service | Use | Action |
| --- | --- | --- |
| Supabase Free | PostgreSQL, pgvector and private documents | Create a fresh project |
| Groq Free | Initial open-weight inference and multilingual transcription | Create only if free access is available without billing |
| Kaggle or Google Colab | Your actual adapter training and notebook inference | Use your existing accounts |
| Hugging Face | Public model downloads; optionally private adapter storage | Free account; no paid inference endpoint or Space required |
| GitHub | Optional private source backup | Free account if desired; local Git is sufficient initially |

You do not need Pinecone, OpenAI, Anthropic, Gemini, ElevenLabs, Uplift, Vercel, AWS or Google Cloud billing for this plan. Existing code may reference some of them; implementation will remove hard startup dependencies and select only configured providers.

## 2 Create the Supabase project

1. Open the [Supabase dashboard](https://supabase.com/dashboard) and sign in or create an account.
2. Create an organization on the Free plan, then a new project named `clinloop-prototype`.
3. Choose a suitable available region near the demo location, and store a strong database password in your password manager. This is not the same as an API key.
4. Confirm that the selected plan does not require billing details. If a screen requests an upgrade, stop that upgrade path; do not enable a paid trial.
5. Wait for project provisioning. Record the project URL/reference privately so the correct project can be checked before migrations.
6. Do not import patient files or paste arbitrary schema scripts. Implementation will first inspect the fresh project and create reviewed migrations.

Current plan details should be checked on [Supabase pricing](https://supabase.com/pricing). Free projects may pause after inactivity; check project status before a demo rather than assuming it is always running. [Project pausing](https://supabase.com/docs/guides/platform/free-project-pausing).

## 3 Find the correct credentials

In the project's Connect panel and API settings, identify these different values:

| Value | Purpose | Browser-safe? |
| --- | --- | --- |
| Project URL | Supabase API address | Yes; not an authorization credential |
| Publishable key, or legacy anon key | Public client identification subject to policy | Designed for public clients; still requires correct policies |
| Secret key, or legacy service-role key | Privileged server access such as document administration | No |
| Database connection URI | Prisma/PostgreSQL access including database password | No |
| Better Auth secret | Existing application session/authentication signing | No |

Never paste secret keys, database URIs, auth secrets or notebook tokens into chat, screenshots or shared documentation. A publishable key cannot replace a database URI. Rotating a Supabase API key does not rotate the database password or Better Auth secret.

Supabase documents the public client configuration in its [Next.js guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs) and privileged-key risks in [data security](https://supabase.com/docs/guides/database/secure-data).

## 4 Store values locally

The current Prisma configuration loads `.env` through `dotenv/config`; Next.js also reads it. We will use one ignored root `.env` for this prototype, not conflicting copies in several files.

Before saving any credentials, implementation will expand `.gitignore` to protect all environment variants and notebook/export secrets. Do not commit `.env`, even to a private repository. Use `.env.example` only for placeholders.

Current-code variables:

```dotenv
# Existing names; use real values only in your ignored local .env
DATABASE_URL="<runtime PostgreSQL connection URI>"
DIRECT_URL="<migration PostgreSQL connection URI>"
BETTER_AUTH_SECRET="<unique generated random secret>"
BETTER_AUTH_URL="http://localhost:3000"
GROQ_API_KEY="<your free-tier key if available>"
```

Planned additional variables, not implemented yet:

```dotenv
SUPABASE_URL="<project URL>"
SUPABASE_SECRET_KEY="<backend-only secret key>"
AUTH_DATABASE_URL="<limited auth-table connection URI>"
LEARNING_DATABASE_URL="<limited learning-service connection URI>"
CLINLOOP_DEMO_MODE="synthetic"
CLINLOOP_GENERATION_PROVIDER="groq"
CLINLOOP_GENERATION_MODEL="<verified available open-weight model ID>"
```

The implementation will add an environment validator and keep privileged variables server-only. No secret variable receives a `NEXT_PUBLIC_` prefix. A public Supabase client key is needed only if the chosen integration actually uses a browser Supabase client; do not add one just because it appears in a generic tutorial.

I can prepare the sanitized file structure and validation. You enter the credentials locally, then tell me only that they are configured. A connection check must report success/failure without echoing the URI or key.

## 5 Connect Prisma correctly

1. Open the Supabase project's Connect panel and select a PostgreSQL connection method supported by your network.
2. For a persistent local Next.js server, the session pooler is a practical starting point, particularly on an IPv4 network. Use the project's actual displayed host and URI; do not guess the region or project reference.
3. Migration access uses a direct connection where supported, or a compatible session-pooler connection. Do not point schema migration commands at a transaction pooler.
4. Use percent-encoding for reserved characters in passwords embedded in URIs. Keep passwords out of shell command history.
5. Initially provide migration credentials for reviewed setup. The implementation must create separate restricted runtime and auth roles before patient-facing routes are exercised. `DATABASE_URL` must then identify the intended runtime role, not remain the project owner.
6. Use encrypted database connections and verify TLS configuration; do not disable certificate verification as a permanent workaround.

The official [Supabase Prisma guide](https://supabase.com/docs/guides/database/prisma) explains connection choices. Its broad-privilege example is not our clinical runtime policy: a BYPASSRLS role would defeat our required isolation tests.

## 6 Apply the reviewed schema and permissions

I will prepare migrations, inspect them, and confirm the target is the fresh prototype project. We will establish the existing tables, new document/learning objects, pgvector, restricted roles, RLS, private Storage policies and synthetic seed data.

Commands such as `npx prisma migrate deploy` will be used only after checked-in migrations exist and have been reviewed. Do not run `prisma migrate reset` or `db push` as a shortcut. The current workspace has no migration history to deploy yet.

After setup, I will test actual database roles with two synthetic patients and different doctor/reviewer identities. Seeing data in the Supabase dashboard as an administrator does not prove application access is safe.

For the small learning corpus, use pgvector in this same managed database. No Pinecone account or API key is necessary. [Supabase vector columns](https://supabase.com/docs/guides/ai/vector-columns).

## 7 Set up authentication without unnecessary replacement

The current application uses Better Auth. On the selected prototype path, email/password login remains there and uses the fresh Supabase database for its existing tables. Supabase Auth does not become active merely because the database is hosted by Supabase.

During Phase 0, I will check whether moving to Supabase Auth is demonstrably simpler and compatible. If selected, its setup will include redirect URLs, server session verification, identity mapping, email/signup behavior and replacement of all old session checks. Otherwise Better Auth stays, with a tested database identity bridge. No user needs to choose this implementation detail in advance.

For Better Auth, set the exact localhost origin and a unique secret. Enable Google login only when separate OAuth credentials are configured; otherwise hide/disable that option. Seeded simulated doctors must be granted demo privileges through a trusted setup path, not public signup fields.

## 8 Private medical documents

The implementation will create a bucket such as `clinical-documents` with public access disabled. Set allowed document types and size limits, use unguessable object identifiers and store the mapping in restricted tables.

Patients receive only their finalized documents through an authenticated backend. Short-lived signed links are possible but remain usable until expiry; use an authenticated streaming route where immediate revocation is necessary. Never create permanent public medical-document URLs. Test both metadata access and actual object bytes.

This follows the private-bucket access model in [Supabase Storage documentation](https://supabase.com/docs/guides/storage/buckets/fundamentals).

## 9 Free voice and initial live generation

1. Open the [Groq console](https://console.groq.com/), create an account and remain on its free plan.
2. Confirm free access and view account limits. Do not enroll in the Developer paid plan or add billing details.
3. Create an API key and save it privately as `GROQ_API_KEY`.
4. The implementation will check currently supported models, then configure a suitable open-weight text model for the initial website and a multilingual transcription model.
5. Run a short synthetic English recording and a short synthetic Urdu recording. Confirm what was actually transcribed, including negation and quantities. Avoid speaking real patient information.
6. Test request-limit exhaustion and expired credentials. The interface must retain the intake and offer retry or text entry, rather than pretending the model answered.

Groq provides multilingual Whisper transcription and free-tier request limits. The endpoint's OpenAI-compatible format does not mean it uses the ChatGPT API. Whisper is a separate speech model; the custom SOAP model remains an open-weight model we fine-tune ourselves. [Speech documentation](https://console.groq.com/docs/speech-to-text), [limits](https://console.groq.com/docs/rate-limits), [model catalog](https://console.groq.com/docs/models).

Free Groq access is a prototype dependency, not a promise of unlimited requests. If unavailable, notebook generation and an explicit text/audio-upload workflow remain possible, but the live voice/generation gate must be reported as incomplete. English browser speech playback may be available without another key; Urdu playback depends on installed browser/OS voices and is not guaranteed.

## 10 Prepare Kaggle for actual training

1. Sign in to your existing Kaggle account. Complete any account verification it requires for accelerators without enabling paid services.
2. Create a private notebook. In its session settings, choose an available free GPU and enable internet when downloading the public model and packages.
3. Confirm the runtime actually has a GPU using the notebook preflight. The displayed allocation and account quota are authoritative; no fixed weekly hours or specific GPU is promised.
4. Attach only the versioned synthetic training export. Do not upload application `.env`, raw clinical tables, auth records or medical documents.
5. If a model token is necessary, place it in Kaggle Secrets and authorize only this notebook. Prefer ungated public model downloads where no token is needed.
6. Run notebook sections in order: environment, dataset checks, base-model evaluation, short training, full planned run, adapter reload, held-out evaluation, artifact export.
7. Save the adapter, tokenizer/config references, manifests and metrics from the persistent output directory. Download them or save to explicitly private approved storage before the session expires.
8. Keep notebook and dataset visibility private unless you intentionally choose to publish a reviewed synthetic artifact. Their visibility settings are separate.

[Kaggle notebook documentation](https://www.kaggle.com/docs/notebooks) describes GPU selection, sessions and outputs; [Kaggle secret documentation](https://github.com/Kaggle/kaggle-cli/blob/main/docs/kernels.md) describes the secret mechanism. GPU availability is limited and may involve queues.

## 11 Use Colab as the alternative

1. Open [Google Colab](https://colab.research.google.com/) and upload the supplied training notebook.
2. Select an available GPU runtime in the runtime settings. Run preflight before downloading the larger model.
3. Upload the same synthetic dataset manifest. Store any needed token in notebook Secrets, not a visible code cell.
4. Save checkpoints to a private location you control and export the final adapter and metrics. Test reload in a fresh session.
5. If the session disconnects, resume from a verified checkpoint; do not fabricate a completed training run from a partially written output.

No positive GPU allocation or maximum runtime is guaranteed on the free tier. Do not use multiple accounts to evade limits. Do not host the website's inference API through a tunneled Colab UI; use the notebook interactively for training and batch inference. [Colab FAQ](https://research.google.com/colaboratory/faq.html).

## 12 Use your trained model in the local demo

The planned first integration is intentionally explicit:

1. In the local doctor workflow, select a synthetic draft or revision job and export its authorized package.
2. Open the inference section of the notebook and load the exact approved base revision plus adapter hash.
3. Upload the package, run generation, and save the structured output with job/input/model metadata.
4. Import that output in the local app. The backend validates the job, owner, current version and output schema and creates a new pending draft.
5. Review and approve normally. The UI identifies the result as notebook-generated with the fine-tuned model.

The default live website provider does not automatically serve this adapter. A provider's base model and our trained artifact must never share a misleading label. Dedicated hosted custom-model serving is outside the zero-budget commitment.

## 13 Start and verify the local app

After implementation has made the corresponding paths available:

1. Open the workspace and install lockfile dependencies with `npm ci`.
2. Confirm ignored environment variables are configured and the fresh database migrations were applied through the reviewed setup.
3. Generate the Prisma client with the project's configured command.
4. Run lint, type-check/build and the added security/integration scripts. New test script names are listed in the implementation plan and do not exist yet.
5. Start `npm run dev`, open `http://localhost:3000`, and sign in with seeded synthetic accounts.
6. Test voice intake, doctor edits, approval, patient download, learning review and a deliberately unauthorized request.
7. Rehearse notebook export/import separately, then the full presentation flow.

## 14 Troubleshooting and recovery

| Symptom | First check |
| --- | --- |
| Cannot connect to database | Correct project, active project state, URI password encoding, network and session-pooler choice |
| Migration works but application cannot read | Runtime grants, RLS, verified identity context and transaction; do not solve by using owner credentials |
| Login works but Storage fails | Backend authorization, bucket privacy, correct server credential and object mapping |
| Voice fails | Microphone permission, supported audio format, duration/size and free-tier limit |
| GPU unavailable | Save work and use the other existing notebook provider or retry later; no quota evasion |
| Training runs out of memory | Smaller model/context/batch, supported quantization and measured preflight; do not assume two GPUs behave as one larger GPU |
| Adapter reload fails | Exact base revision, tokenizer, PEFT version, complete checkpoint and hash |
| Imported output rejected | Expected behavior if the report was edited, input hash differs, job expired or caller lacks access |

For key rotation, identify the affected credential, replace it in private configuration, restart the service, verify a minimal authorized flow and revoke the old credential according to that service's controls. Keep database-password, API-key and auth-secret rotation distinct. Never record the old or new values in test evidence.
