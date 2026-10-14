## Latest revision: public pages and brand cleanup

About, Contact and Find a Doctor now use their supplied Stitch designs. Services uses the source cards. Duplicate text branding and navbar gaps are removed. Directory query/filter/sort/profile controls and Contact form/FAQ/clipboard actions are connected. Contact and booking compose support email requests; the directory contains eight preview profiles.

Public-page JSX is maintained directly. Source HTML is retained in stitch_hospital_management. compile-stitch.mjs compiles source CSS; import-stitch.py regenerates landing/services/departments only. Current checks are in design-qa.md and public-checks.json.

# Current revision: exact Stitch landing

The user rejected the adapted landing below. The current landing uses all 14 original Stitch sections, assets, typography and layout. Navigation now stays in the current tab. Login/signup visuals are preserved. Source-matching `/services`, `/doctors` and `/departments` provide dedicated navigation destinations.

See `design-qa.md` and `docs/redesign/exact-checks.json` for current validation. Booking/newsletter compose email requests to Support@medico.com. Clinical calls, prescription access and messaging require the existing account/care workflow; sample content is not a live service. The video button plays a locally generated two-minute site walkthrough with captions.

Everything below records the superseded first implementation and its original configuration limits.

---

# Medico frontend review delivery

Date: 10 October 2026.

## User-confirmed scope

Stop after the landing page, its dedicated navigation destinations, login and signup for review. Brand: Medico. Support address: Support@medico.com. Navigation opens new tabs rather than scrolling to landing sections.

## Implemented routes

- `/` — Medico landing, adapted to the currently implemented clinical product.
- `/login` and `/signup` — source-based layouts, patient/doctor selection, existing email/password and Google handlers, loading/error feedback, and existing onboarding/dashboard destinations.
- `/services`, `/how-it-works`, `/about`, `/contact`, `/faq` — dedicated working destinations for public navigation.
- `?type=doctor` and `?type=patient` preselect the intended auth role.

The Contact form validates input and composes an email draft; it does not send email. The copy-address action works independently.

## Implementation boundaries

- New components: `components/medico/`.
- Styling: opt-in `.medico` scope in `app/medico.css`.
- `components/auth/AuthForm.tsx` retains the existing API/auth contracts and adds confirmation/strength/visibility controls, response-status checks, and accessible feedback.
- Header/footer navigation uses `MedicoLink`, with `target="_blank"`, `rel="noopener noreferrer"`, and assistive text announcing the new tab. Action controls remain in-page.
- Existing patient/doctor page implementations, clinical APIs and database schema were not edited. No database migrations ran. The missing generated Prisma client was regenerated from the existing schema.
- Root metadata/favicon use Medico; Inter and Urdu font variables remain, with Outfit added for migrated pages.
- Source images are stored under `public/medico/`; no runtime dependency on Stitch image URLs or Tailwind CDN scripts.
- Before-edit source archive: `docs/redesign/before-medico.zip`. No Git repository was present.

## Local preview

The development server was started on port 3000. Open `http://localhost:3000` for manual review. To restart, use `npm run dev` or `node node_modules/next/dist/bin/next dev`.

Use localhost for auth verification after configuration, since the existing auth config includes localhost origins. Automated frontend checks ran on the local 127.0.0.1 listener using mocked authentication.

## Checks

See root `design-qa.md` for screenshots, comparison evidence, design adjustments and release limitations.

- Changed-file ESLint and full TypeScript checks pass.
- 29 browser checks and 7 mocked auth-contract checks pass.
- Additional keyboard, image, clipboard, console and viewport checks pass.
- Production compilation passes; page-data collection is blocked by existing backend modules requiring missing credentials.

The Playwright scripts in this directory use tooling installed outside the application in `%TEMP%/medico-browser-check`. To rerun on this workstation, that directory needs `playwright` and an installed Microsoft Edge browser. These are review tools, not application dependencies. Browser checks use no real patient data and send no email.

## Before live authentication verification

Configure the project using the existing `.env.example` with real database/auth/provider credentials. Do not place secrets in source control. Live signup/login and external services remain unverified; passing mocked frontend tests does not establish persistence or OAuth success.

## Deferred until review

Patient and doctor dashboards, profiles, medical-history onboarding and AI interview redesign. Appointment booking, availability, billing and other hospital modules still require their separately planned backend work.
