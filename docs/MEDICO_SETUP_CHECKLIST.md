# Medico: services and setup checklist

Do not paste API keys, database passwords, OAuth secrets, or production patient data into chat. Put secrets in the local `.env` file and, for deployment, in the hosting provider's encrypted environment-variable settings.

## Current local status — 10 October 2026

| Service | Status | Next action |
| --- | --- | --- |
| Better Auth | Ready | No external account is needed. It is the installed email/password session library; a local secret has been generated. |
| Production build | Passed | The full Next.js production build completes with `.env`. |
| PostgreSQL/Supabase | Connected; schema empty | The database password/URLs are now correct. None of the seven required tables exist yet; review and apply the initial Prisma migration next. |
| xAI Grok | Key valid; account blocked | The new `XAI_API_KEY` authenticates, but xAI returns HTTP 403 because the team has no credits or licenses. Add credits/enable a license before live inference can be verified. |
| Groq | Not configured | No longer planned as the primary text provider if xAI is selected. The existing Whisper speech-to-text route still needs Groq or a replacement STT provider. |
| Pinecone | Connected but empty | The configured index is Ready, 384-dimensional, and cosine, but contains 0 records. A reviewed corpus still needs to be ingested. |
| Uplift | Ready | A live synthesis job was accepted. |
| ElevenLabs | Ready for TTS | A live request using the app's configured voice/model returned audio successfully. The restricted key lacks `voices_read`, which is only needed if the app later lists selectable voices. |
| Google OAuth | Deferred | Google is not configured and its button is hidden. |

Credentials were originally placed in this Markdown document and have now been moved to ignored `.env` and removed from the document. Rotate the database password and every pasted third-party key before production use.

## 1. What is required

### Core application

| Item | Environment variables | Why it is needed |
| --- | --- | --- |
| PostgreSQL database | `DATABASE_URL`, `DIRECT_URL` | Configured locally in ignored `.env`; values intentionally omitted |
| Better Auth secret and application URL | `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL` | Already configured locally. Better Auth is an installed library, not another hosted account or paid API. |
| xAI API key | `XAI_API_KEY` | Configured locally in ignored `.env`; the xAI team still needs credits/licenses |
| Pinecone project and index | `PINECONE_API_KEY`, `PINECONE_INDEX_NAME` | Configured locally in ignored `.env`; index contents still require verification |

The Pinecone index must use 384-dimensional vectors because the code generates embeddings with `Xenova/all-MiniLM-L6-v2`. An API key and empty index are not enough: a reviewed medical knowledge corpus must be embedded and uploaded. This repository does not currently contain a Pinecone ingestion script, so the corpus and ingestion step still need to be designed.

### Enable if these features should work

| Feature | Environment variables / input | Notes |
| --- | --- | --- |
| Natural voice output | `ELEVENLABS_API_KEY` | Configured locally in ignored `.env` |
| Urdu voice fallback | `UPLIFT_API_KEY` | Configured locally in ignored `.env` |

`GEMINI_API_KEY` and the commented LiveKit variables in `.env.example` are not currently used by runtime code. Do not buy or configure them unless the implementation changes.

## 2. Other decisions and materials needed

To move from a working prototype to a real healthcare product, provide decisions rather than secrets:

1. The local and production domains.
2. The database provider/project and region.
3. Which voice providers should be enabled.
4. A licensed/reviewed medical knowledge corpus for Pinecone and its permitted use.
5. Doctor verification rules: who approves a doctor, which license fields are required, and which jurisdictions are supported.
6. Privacy, consent, data-retention, deletion, and emergency-escalation requirements reviewed for the launch jurisdiction.
7. Production roles and access policy, especially which doctors may see which patient reports.
8. Brand support email and legal pages.
9. Hosting choice and access to its project settings. Vercel is a natural fit for this Next.js app, but is not required.

## 3. Local setup, step by step

### Step 1 — local environment file (completed)

The ignored `.env` file exists and contains a generated Better Auth secret. Do not commit or paste this file.

### Step 2 — configure PostgreSQL

Create a Supabase PostgreSQL project (or another PostgreSQL database), then place:

- the pooled runtime connection string in `DATABASE_URL`;
- the direct, non-pooler connection string in `DIRECT_URL`.

Keep `sslmode=require` if the provider requires TLS. Test only against a non-production database until the schema is reviewed.

### Step 3 — add the core AI services

1. Create a Groq key and set `GROQ_API_KEY`.
2. Create a Pinecone index with 384 dimensions and cosine similarity.
3. Set `PINECONE_API_KEY` and `PINECONE_INDEX_NAME`.
4. Prepare and ingest the reviewed medical corpus before relying on retrieval results.

### Step 4 — configure optional voice services

Uplift is working. ElevenLabs can be replaced later or omitted so the fallback chain uses Uplift.

### Step 5 — install and initialize

```powershell
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

There are currently no committed Prisma migrations. Review the generated initial migration before applying it anywhere important. Production should use committed migrations with `npx prisma migrate deploy`, not `migrate dev`.

### Step 6 — verify the complete local flow

1. Create a patient account and complete medical history.
2. Run a text clinical interview and confirm a SOAP report is created.
3. Create a separate doctor account and complete doctor onboarding.
4. Open `/doctor/dashboard`, review the report, add notes/prescription, and approve or reject it.
5. Return to the patient account and confirm the reviewed result appears.
6. Test voice input/output only after voice keys are configured.
7. Confirm unauthorized users cannot open patient or doctor records.

### Step 7 — production deployment

1. Create the hosting project and production database.
2. Add every production secret through encrypted environment settings.
3. Set `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to the exact HTTPS production origin.
4. Run reviewed Prisma migrations against production.
5. Perform a test with synthetic data only.
6. Complete security, privacy, clinical-safety, backup, retention, and access-control review before using real patient data.

## 4. What to send back to continue

Send status only, for example:

- “Supabase database configured locally”
- “Groq key configured locally”
- “Pinecone index created: 384 dimensions, cosine; corpus not loaded yet”
- “Voice required / not required”
- “Target deployment: Vercel at `https://example.com`”

Do not include the secret values. Once those statuses and product decisions are available, the remaining integrations can be implemented and tested end to end.
