> Current direction: the public, authentication, patient, clinician-dashboard, clinician-report, and 404 redesigns are implemented while preserving existing workflows and API contracts. See `design-qa.md` for the latest verification result and `docs/MEDICO_SETUP_CHECKLIST.md` for live-service setup.

# Medico: phased Next.js redesign plan

Prepared 10 October 2026. Brand confirmed by the user: **Medico**.

## Scope and evidence

This plan is based on `stitch_hospital_management/clinical_clarity/DESIGN.md`, all 12 supplied screen images and their HTML exports, and inspection of the existing routes, UI handlers, authentication configuration, API routes and Prisma schema. It is a source/design review, not a live application audit: backend connectivity, authentication providers and complete user journeys have not been tested.

The application already uses Next.js 16.1.1 App Router, React 19, TypeScript and Tailwind CSS 4. Keep this application and its Better Auth, Prisma/PostgreSQL, interview orchestration, voice services and report APIs. No framework migration is necessary.

Implemented public scope: landing, About, Contact, Doctors, Services, Departments, login, and signup. Navigation opens in the same browser tab. Patient portal pages, the clinician report queue/detail workflow, and the 404 page are also implemented. The signup experience handles patient/doctor role selection and professional registration. Contact email confirmed by the user: `Support@medico.com`.

## What the references tell us

- The landing, about and contact screens establish deep teal hero sections, pale mint backgrounds, white cards, generous spacing, photographic imagery and a consistent public header/footer.
- The login screen provides a strong split layout and patient/clinician selector. Despite its folder name, the supplied screenshot shows login, not a complete signup screen.
- Patient and doctor dashboards share a sidebar, top bar and modular content. The medical records screen uses a timeline; the consultation screen gives SOAP documentation a prominent position.
- Directory, booking, schedule and billing are coherent future modules, but their workflows extend beyond the existing application.
- The supplied doctor dashboard and calendar visibly clip content at the right side; some cards truncate names and dense tables compress text. Preserve their visual language while correcting responsive overflow and access to complete information.
- Only one screenshot is provided per screen. Mobile layouts, validation, empty results, denied access, loading and backend failure states need explicit implementation and review.

### Resolve design inconsistencies once

`DESIGN.md` has conflicting values between its frontmatter and prose, and the HTML exports contain further radius variations. Proposed convention:

| Token | Decision |
| --- | --- |
| Deep brand teal | `#005252`, the structured primary token and prominent reference hero color |
| Main button/container teal | `#1F6B6B` |
| Canvas | `#EFFCFB` |
| Cards | `#FFFFFF` |
| Main text / secondary text | `#121E1E` / `#3F4948` |
| Secondary action | `#004FDA`, with the supplied blue container token where needed |
| Fonts | Outfit headings, Inter body; retain Noto Nastaliq Urdu for existing Urdu workflows |
| Shape | 8px controls, 16px cards, 24px large panels; allow reference-specific landing/auth CTA pills |
| Spacing | 4/8px rhythm; desktop, tablet and mobile layouts from the design guide |

Check actual foreground/background contrast and focus visibility during implementation. Screenshot inspection alone does not establish accessibility compliance.

## Existing functionality to preserve

| Area | Current implementation and contract |
| --- | --- |
| Authentication | Email/password sessions through the installed Better Auth library; patient/doctor selection, role conflict messages and completion-based redirects. Google sign-in is intentionally deferred and hidden. |
| Patient onboarding | `/patient/medical_session`, medical-history questionnaire, voice UI, persistence and completion routing |
| Patient home | `/patient/dashboard`, session totals, ready/pending reports, session search, interview mode selection, prescriptions and report download actions |
| Clinical interview | `/patient/interview`, voice/text entry modes, Urdu/English handling, streaming response UI, end-session/report-generation behavior |
| Patient profile | `/patient/profile`, available history/profile information and its onboarding links |
| Doctor registration/profile | Signup is the professional-registration experience. `/doctor/profile` remains a possible later profile-management page. |
| Doctor home | `/doctor/dashboard`, pending/in-review/reviewed queues, search, date/priority/department filters and 30-second data refresh |
| Doctor report | `/doctor/report/[id]`, SOAP content, review/feedback, regeneration, prescription saving, report chat and PDF download |
| Supporting pages | `/docs` and the not-found experience |

Keep existing URLs and API payloads stable during visual changes. Retain the current loading and permission behavior while recording any existing defects separately; preserving behavior does not mean certifying it as correct.

## Delivery order: one page at a time

### Phase 0 — small foundation, included with the landing-page work

1. Establish a source-control checkpoint or backup: this workspace currently does not appear to be a Git repository.
2. Record baseline build/lint results and smoke-test the existing main journeys when the configured services and test accounts are available. Separate pre-existing failures from redesign regressions.
3. Add opt-in Medico tokens and reusable buttons/cards/fields. Scope tokens and typography to migrated page wrappers so the first change does not recolor every existing screen.
4. Keep the existing shared `Button` API compatible; use separate Medico variants/components where needed. Introduce shared public/auth/portal shells only as their first page needs them.
5. Treat exported HTML as reference material. Translate it into React components using the project's Tailwind build, Lucide icons and React state, rather than embedding whole documents, CDN Tailwind scripts or DOM-manipulation scripts.

### Phase 1 — landing page `/`

**Status: implemented.** The supplied 14-section landing reference is reproduced with working, honest controls and same-tab navigation.

**Reference:** `hospital_management_system_landing_page`.

First delivery: a responsive Medico landing page with the reference's header, teal hero, image treatment, mint canvas, cards, section rhythm, FAQ and footer, connected to existing entry points.

Suggested initial section sequence:

1. Medico header with Home, How It Works, Features, FAQ, Login and Get Started. Only include links with real destinations.
2. Teal hero with the source's two-column composition. Describe the actual AI interview and clinician-review product. Primary CTA goes to `/signup`; secondary CTA scrolls to the workflow explanation.
3. Compact capability strip: voice/text interviews, Urdu/English support, structured reports and clinician review. Use verified capabilities rather than the template's patient-count/rating claims.
4. Three service cards: medical-history intake, clinical interview and doctor-reviewed reports.
5. Four-step workflow: create account, complete history, describe symptoms, receive a report for clinician review.
6. Patient and clinician feature sections using the source's modular card layouts.
7. FAQ with working disclosure controls, followed by a final signup/login CTA and footer.

The template also includes doctor listings, health packages, pharmacy, messaging, testimonials, articles, newsletter and emergency dispatch. Include these only when real content and working destinations exist. Do not turn placeholder ratings, hospital accreditation, sample contacts or response-time promises into product claims. The layout can accommodate these sections later.

Reuse source imagery where usable; resolve stable assets and image dimensions during this phase. Replace the old public brand and landing metadata with Medico; migrate other screens' branding with their own phase.

**Likely files:** `app/page.tsx`, `components/landing/*`, `components/layout/Navbar.tsx`, scoped styling, assets and landing metadata. Keep authentication and clinical APIs unchanged.

**Acceptance:** visual comparison against the supplied landing reference; responsive checks at approximately 390, 768 and 1440px; no page-wide overflow; mobile menu, FAQ, anchors and auth CTAs work; keyboard focus and reduced-motion behavior checked; build/lint delta reviewed; existing login and dashboard entry points remain usable.

### Phase 2 — authentication, two deliveries

**Status: implemented and approved.** Keep the current login and signup visuals unchanged.

**2.1 Login `/login`:** reproduce the supplied split-screen layout with Medico branding. Preserve email/password login, role selection, error/loading behavior and redirects. Google OAuth, Apple ID, password recovery, email verification and notifications are deferred and are not exposed as working controls.

**2.2 Signup `/signup`:** use the forthcoming signup reference and the shared auth shell. Preserve name/email/password entry, role conflict checks, role assignment and patient/doctor onboarding destinations.

Because login and signup share `app/(auth)/layout.tsx` and `AuthForm`, isolate the first page's presentation or introduce a compatible variant to prevent an unreviewed redesign of the other page.

**Acceptance per page:** patient and doctor success paths, invalid input, duplicate account/role conflict, failed request and sign-in pending state.

### Phase 3 — patient experience, four deliveries

**Status: implemented and visually verified.** The portal remains one continuous flow: signup/login → patient medical history → dashboard → text or voice clinical interview → report generation → clinician review → patient report/prescription access.

**3.1 Dashboard `/patient/dashboard`:** apply the supplied patient portal shell and cards. Populate the hero with real patient context; prioritize Start Interview. Replace sample blood-pressure/glucose graphs and appointments with actual session, report and prescription data. Preserve voice/text mode selection, search, downloads, prescription expansion, profile navigation, sign-out and data refresh.

**3.2 Medical-history onboarding `/patient/medical_session`:** no dedicated reference is supplied. Retain the bilingual questionnaire, voice and text input, microphone states, persistence, role checks and completion redirect. Match the dashboard's Medico teal/mint controls without changing the collection workflow.

**3.3 Interview `/patient/interview`:** no dedicated reference is supplied. Refine the existing text and voice modes with the Medico teal/mint system. Preserve bilingual content, recording/playback, streaming, progress/activity feedback, completion dialog and report creation. Do not combine an orchestration rewrite with the visual redesign.

**3.4 Profile `/patient/profile`:** use the supplied medical-records timeline as visual influence while showing only profile and medical-history fields returned by current APIs. Any new editing functionality needs its own API-backed specification.

**Acceptance:** new patient -> history completion -> dashboard -> text/voice interview -> saved report -> prescription/report access. Check permission-denied microphone, unavailable service, empty history and report pending states. Test persistence across reloads where currently supported.

### Phase 4 — clinician experience, three deliveries

**Status: dashboard and report implemented and visually verified. Doctor profile remains a later visual delivery.**

**4.1 Dashboard `/doctor/dashboard`:** use the doctor dashboard reference, adapting its appointment queue to the existing report review queue. Show real pending/in-review/reviewed totals. Preserve all filters, search, refresh and report links. Do not show fabricated revenue, lab counts or bookings.

**4.2 Report `/doctor/report/[id]`:** use the consultation detail reference. Prioritize patient context, available history, SOAP sections, review status and current review/prescription/chat controls. Preserve rating/feedback, regeneration and PDF export. Add order dispatch, lab panels or advanced prescription fields only with corresponding functionality.

**4.3 Profile `/doctor/profile`:** possible later delivery. Preserve field editing, existing image handling and save/error behavior. Professional registration itself remains part of signup.

**Acceptance:** clinician onboarding -> filtered queue -> report -> feedback/regeneration or approval/prescription -> patient-visible result. Verify failed saves cannot look successful and long clinical content remains readable at narrow widths.

### Phase 5 — supporting pages, separately reviewed

1. Restyle `/docs` while preserving its content/navigation and clarifying legacy product names.
2. Restyle the not-found page and verify recovery links. **Implemented and verified.**
3. `/about` is implemented from the supplied leadership reference.
4. `/contact` is implemented from the supplied reference; its form prepares an email to `Support@medico.com` and does not falsely claim automatic delivery.

The public Doctors, Services, and Departments routes are also implemented from supplied landing/directory material without fabricating live availability or services.

### Phase 6 — additional hospital modules

Each item remains a separate page-sized delivery, with its backend dependencies completed before its controls are released as functional.

| Order | Proposed page | Supplied reference | Additional work |
| --- | --- | --- | --- |
| 6.1 | `/patient/records` | Medical records/health timeline | Initially project real sessions, reports and prescriptions into a timeline; preserve existing dashboard access. Labs, imaging, immunizations, file uploads and record transfers require new storage/data/integrations. |
| 6.2 | `/doctors` | Find a doctor | Public directory endpoint, explicit public profile fields, filtering and pagination. Current `/api/doctors` returns the signed-in doctor's profile, not a public directory. |
| 6.3 | `/doctor/schedule` | Clinic calendar | Availability/leave models, time zones, slot generation, conflict rules and permission checks; finish these before patient bookings. |
| 6.4 | `/appointments/book` | Book an appointment | Appointment model/API, availability checking, atomic slot reservation, confirmation, cancellation/rescheduling and notification decisions. Request missing wizard steps; the supplied screenshot centers on date/time and patient/payment details. |
| 6.5 | `/patient/appointments` | No dedicated reference | Upcoming/past lists, appointment detail and cancellation/rescheduling states |
| 6.6 | `/patient/billing` | Billing/invoices | Invoice/payment models, chosen currency/provider, server-confirmed payment state, receipts, failures/refunds and webhook handling. Insurance and saved payment methods need separately defined integrations. |

The current schema has no dedicated appointment, availability, invoice or payment models. Wearable synchronization, video visits, pharmacy/refills, lab ordering and patient-doctor messaging are additional product features too. The existing report chat does not establish a general patient-doctor messaging system.

If the user wants all hospital modules in the initial rollout, keep landing first but move the directory/availability/booking work earlier and explicitly include backend scope. Billing still depends on the chosen booking/payment model.

## Repeatable completion rule for every page

1. Confirm reference and list its existing actions/data dependencies.
2. Implement the page and only the shared pieces it needs.
3. Connect every included control to real navigation/state/data; use honest empty states when data is absent.
4. Compare the result with the supplied screenshot at the matching viewport, then inspect tablet/mobile, keyboard behavior and long content.
5. Run relevant build/lint and workflow checks. Verify the changed page plus its immediate entry/exit flows; record service-dependent checks that could not run.
6. Present the page for review before moving to the next page. Keep a reversible checkpoint per delivery.

## Remaining inputs for later expansion

1. Doctor profile reference and any desired profile-management changes.
2. Real organization/team/contact information where current supplied preview content should be replaced.
3. Backend specifications for appointments, availability, billing, payments, labs, pharmacy/refills, general messaging, wearable synchronization, or telehealth.

**Current implementation:** Public routes, authentication, the patient experience, the clinician dashboard/report workflow, and the 404 recovery experience are implemented. Doctor profile styling and backend-dependent hospital modules remain later phases. See `docs/MEDICO_SETUP_CHECKLIST.md` and `docs/redesign/IMPLEMENTATION_NOTES.md` for service-configuration limits.
