import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const require = createRequire(path.join(process.env.TEMP, 'medico-browser-check', 'package.json'));
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
const errors = [];

const user = { id: 'patient-qa', name: 'Eleanor Vance', email: 'eleanor@example.com', emailVerified: true, role: 'patient', createdAt: '2025-01-10T00:00:00.000Z' };
const history = { id: 'history-qa', patientId: user.id, age: 38, gender: 'female', bloodGroup: 'A+', weight: 64, height: 171, familyHistory: { diabetes: true }, chronicConditions: ['Hypertension'], currentMedications: ['Lisinopril 10 mg'], allergies: ['Penicillin'], pastSurgeries: [], smokingStatus: 'never', alcoholConsumption: 'occasional', onboardingTranscript: [], isComplete: true, createdAt: '2025-01-10T00:00:00.000Z', updatedAt: '2026-10-01T00:00:00.000Z' };
const sessions = [
  { id: 'session-1', chiefComplaint: 'Recurring headaches', department: 'General Medicine', status: 'approved', createdAt: '2026-10-08T09:00:00.000Z', reportId: 'report-1', hasPrescription: true },
  { id: 'session-2', chiefComplaint: 'Seasonal cough', department: 'Pulmonology', status: 'pending', createdAt: '2026-10-09T10:00:00.000Z', reportId: null, hasPrescription: false },
];
const prescriptions = [{ id: 'rx-1', reportId: 'report-1', chiefComplaint: 'Recurring headaches', department: 'General Medicine', prescription: 'Lisinopril 10 mg once daily. Continue hydration and record symptoms.', doctorNotes: 'Follow up if symptoms change or become severe.', doctorName: 'A. Khan', doctorSpecialization: 'Internal Medicine', doctorHospital: 'Medico Clinical Review', reviewedAt: '2026-10-09T12:00:00.000Z', createdAt: '2026-10-08T09:00:00.000Z' }];

async function makePage(viewport, complete = true) {
  const page = await browser.newPage({ viewport });
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', message => { if (message.type() === 'error' && !message.text().includes('Failed to load resource')) errors.push(`console: ${message.text()}`); });
  await page.route('**/api/auth/get-session', route => route.fulfill({ json: { user, session: { id: 'session-auth' } } }));
  await page.route('**/api/medical-history', route => route.fulfill({ json: { exists: true, isComplete: complete, data: history, medicalHistory: history } }));
  await page.route('**/api/patient/stats', route => route.fulfill({ json: { stats: { totalSessions: 2, reportsReady: 1, pendingReview: 1 }, sessions, prescriptions } }));
  await page.route('**/api/user/role/check', route => route.fulfill({ json: { isDoctor: false } }));
  await page.route('**/api/clinical-chat', route => route.fulfill({ json: { sessionId: 'clinical-qa' } }));
  await page.route('**/api/voice/tts', route => route.fulfill({ status: 503, body: '' }));
  return page;
}

for (const viewport of [{ width: 1440, height: 1000, name: 'desktop' }, { width: 768, height: 900, name: 'tablet' }, { width: 390, height: 844, name: 'mobile' }]) {
  const page = await makePage(viewport);
  await page.goto('http://127.0.0.1:3000/patient/dashboard', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.getByRole('heading', { name: 'Comprehensive clinical overview' }).isVisible(), true);
  const size = await page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
  assert.equal(size.scroll, size.viewport, `dashboard overflow at ${viewport.name}`);
  await page.screenshot({ path: `docs/redesign/patient-dashboard-${viewport.name}.png`, fullPage: true });
  await page.getByRole('button', { name: /start (ai |health )?interview/i }).first().click();
  assert.equal(await page.getByRole('heading', { name: 'How would you like to talk?' }).isVisible(), true);
  results.push({ route: '/patient/dashboard', viewport: viewport.name, overflow: size, modeDialog: true });
  await page.close();
}

{
  const page = await makePage({ width: 1440, height: 1000 });
  await page.goto('http://127.0.0.1:3000/patient/profile?tab=medical-history', { waitUntil: 'networkidle' });
  assert.equal(await page.getByText('Personal health baseline').isVisible(), true);
  const medicalHistoryLink = page.getByRole('link', { name: 'Medical history', exact: true });
  const profileLink = page.getByRole('link', { name: 'Profile', exact: true });
  assert.equal((await medicalHistoryLink.getAttribute('class')).split(/\s+/).includes('bg-white'), true);
  assert.equal((await profileLink.getAttribute('class')).split(/\s+/).includes('bg-white'), false);
  await page.screenshot({ path: 'docs/redesign/patient-profile-desktop.png', fullPage: true });
  results.push({ route: '/patient/profile?tab=medical-history', historyFields: true, singleActiveNavigationItem: true });
  await page.close();
}

for (const mode of ['text', 'voice']) {
  const page = await makePage({ width: 390, height: 844 });
  await page.goto(`http://127.0.0.1:3000/patient/interview?mode=${mode}`, { waitUntil: 'networkidle' });
  assert.equal(await page.getByText(mode === 'voice' ? 'Voice Interview' : 'Health Interview').isVisible(), true);
  if (mode === 'voice') {
    assert.equal(await page.getByRole('button', { name: 'Urdu microphone' }).isVisible(), true);
    await page.getByRole('button', { name: 'English microphone' }).click();
    assert.equal(await page.getByRole('button', { name: 'English microphone' }).getAttribute('aria-pressed'), 'true');
  }
  const size = await page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
  assert.equal(size.scroll, size.viewport, `${mode} interview overflow`);
  await page.screenshot({ path: `docs/redesign/patient-interview-${mode}-mobile.png`, fullPage: true });
  results.push({ route: `/patient/interview?mode=${mode}`, overflow: size });
  await page.close();
}

{
  const page = await makePage({ width: 390, height: 844 }, false);
  await page.goto('http://127.0.0.1:3000/patient/medical_session', { waitUntil: 'networkidle' });
  assert.equal(await page.getByRole('button', { name: 'Text' }).isVisible(), true);
  await page.getByRole('button', { name: 'Text' }).click();
  await page.screenshot({ path: 'docs/redesign/patient-medical-history-mobile.png', fullPage: true });
  results.push({ route: '/patient/medical_session', textModeAvailable: true });
  await page.close();
}

writeFileSync('docs/redesign/patient-checks.json', JSON.stringify({ results, errors, limits: 'Authentication, medical-history, clinical-session, dashboard, and voice endpoints were mocked. Tests verify frontend rendering and interactions, not live services.' }, null, 2));
console.log(JSON.stringify({ results, errors }, null, 2));
await browser.close();
