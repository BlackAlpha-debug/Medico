import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const require = createRequire(path.join(process.env.TEMP, 'medico-browser-check', 'package.json'));
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const results = [];
const errors = [];

const user = { id: 'doctor-qa', name: 'Marcus Vance', email: 'marcus@example.com', role: 'doctor' };
const doctor = { specialization: 'Cardiology', department: 'cardiology', hospitalAffiliation: 'Medico Clinical Network' };
const reports = [
  { id: 'report-1', patientName: 'Eleanor Vance', patientAge: 38, patientGender: 'female', chiefComplaint: 'Recurring palpitations and lightheadedness', department: 'cardiology', priority: 'routine', reviewStatus: 'pending', createdAt: '2026-10-10T07:30:00.000Z', sessionDate: '2026-10-10T07:30:00.000Z' },
  { id: 'report-2', patientName: 'Noah Williams', patientAge: 51, patientGender: 'male', chiefComplaint: 'Intermittent chest discomfort after exertion', department: 'cardiology', priority: 'urgent', reviewStatus: 'in_review', createdAt: '2026-10-09T13:10:00.000Z', sessionDate: '2026-10-09T13:10:00.000Z' },
  { id: 'report-3', patientName: 'Ava Patel', patientAge: 29, patientGender: 'female', chiefComplaint: 'Follow-up for elevated resting heart rate', department: 'cardiology', priority: 'routine', reviewStatus: 'approved', createdAt: '2026-10-08T09:20:00.000Z', sessionDate: '2026-10-08T09:20:00.000Z' },
];
const report = {
  id: 'report-1', sessionId: 'clinical-1', patientId: 'patient-1', patientName: 'Eleanor Vance',
  patientInfo: { age: 38, gender: 'female', bloodGroup: 'A+' },
  medicalHistory: { chronicConditions: ['Hypertension'], currentMedications: ['Lisinopril 10 mg'], allergies: ['Penicillin'] },
  subjective: { chiefComplaint: 'Recurring palpitations and lightheadedness', symptoms: ['Palpitations', 'Lightheadedness'], patientHistory: 'Episodes began two weeks ago and are more noticeable after climbing stairs.', patientNarrative: 'No loss of consciousness or severe chest pain reported.' },
  objective: { reportedSymptoms: ['Palpitations', 'Lightheadedness'], severity: 'moderate', confidenceLevel: 82 },
  assessment: { primaryDiagnosis: 'Palpitations under evaluation', differentialDiagnosis: ['Cardiac arrhythmia', 'Anxiety-related symptoms'], severity: 'moderate', confidence: 82, aiAnalysis: 'Symptoms warrant clinician review and correlation with an ECG.', redFlags: [] },
  plan: { recommendations: ['Maintain a symptom log', 'Arrange clinician follow-up'], testsNeeded: ['12-lead ECG'], specialistReferral: 'Cardiology', followUpNeeded: true, urgency: 'routine' },
  department: 'cardiology', priority: 'routine', reviewStatus: 'pending', createdAt: '2026-10-10T07:30:00.000Z', sessionDate: '2026-10-10T07:30:00.000Z',
};

async function makePage(viewport) {
  const page = await browser.newPage({ viewport });
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', message => { if (message.type() === 'error' && !message.text().includes('Failed to load resource')) errors.push(`console: ${message.text()}`); });
  await page.route('**/api/auth/get-session', route => route.fulfill({ json: { user, session: { id: 'auth-session' } } }));
  await page.route('**/api/doctors', route => route.fulfill({ json: { exists: true, isComplete: true, data: doctor } }));
  await page.route('**/api/doctors/stats', route => route.fulfill({ json: {
    stats: { pending: 1, inReview: 1, reviewed: 1, total: 3 },
    reports: {
      pending: [{ ...reports[0], patientId: 'patient-1', age: 38, complaint: reports[0].chiefComplaint, status: 'pending', timestamp: reports[0].createdAt, reviewedAt: null, redFlags: [], urgency: 'low', triageLabel: 'Routine' }],
      inReview: [{ ...reports[1], patientId: 'patient-2', age: 51, complaint: reports[1].chiefComplaint, status: 'in_review', timestamp: reports[1].createdAt, reviewedAt: null, redFlags: ['Exertional discomfort'], urgency: 'high', triageLabel: 'Urgent' }],
      reviewed: [{ ...reports[2], patientId: 'patient-3', age: 29, complaint: reports[2].chiefComplaint, status: 'approved', timestamp: reports[2].createdAt, reviewedAt: '2026-10-09T10:20:00.000Z', redFlags: [], urgency: 'low', triageLabel: 'Routine' }],
    },
  } }));
  await page.route('**/api/reports/report-1/review', route => route.fulfill({ json: { success: true } }));
  await page.route('**/api/reports/report-1/regenerate', route => route.fulfill({ json: { report } }));
  await page.route('**/api/reports/report-1/prescription', route => route.fulfill({ json: { success: true } }));
  await page.route('**/api/reports/report-1/chat', route => route.fulfill({ json: { response: 'The report recommends an ECG and routine cardiology follow-up.' } }));
  await page.route('**/api/reports/report-1', route => {
    if (route.request().method() === 'GET') return route.fulfill({ json: { report } });
    return route.fulfill({ contentType: 'application/pdf', body: '%PDF-1.4' });
  });
  return page;
}

for (const viewport of [{ width: 1440, height: 1000, name: 'desktop' }, { width: 768, height: 900, name: 'tablet' }, { width: 390, height: 844, name: 'mobile' }]) {
  const page = await makePage(viewport);
  await page.goto('http://127.0.0.1:3000/doctor/home', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole('heading', { name: /Good morning, Dr\. Marcus/i }).waitFor({ state: 'visible' });
  assert.equal(await page.locator('#queue').getByText('Recurring palpitations and lightheadedness').first().isVisible(), true);
  const size = await page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
  assert.equal(size.scroll, size.viewport, `dashboard overflow at ${viewport.name}`);
  await page.screenshot({ path: `docs/redesign/doctor-dashboard-${viewport.name}.png`, fullPage: true });
  if (viewport.name === 'desktop') {
    const desktopSidebar = page.locator('aside').first();
    assert.equal(Math.round((await desktopSidebar.boundingBox()).width), 80, 'desktop sidebar should start compact');
    await desktopSidebar.hover();
    await page.waitForTimeout(400);
    assert.equal(Math.round((await desktopSidebar.boundingBox()).width), 288, 'desktop sidebar should expand on hover');
    await page.screenshot({ path: 'docs/redesign/doctor-sidebar-expanded.png' });
    assert.equal(await page.getByRole('link', { name: 'Open Review Queue', exact: true }).getAttribute('href'), '/doctor/reports');
    assert.equal(await page.getByRole('link', { name: 'Appointments', exact: true }).getAttribute('href'), '/doctor/appointments');
    assert.equal(await page.getByRole('link', { name: 'Patients', exact: true }).getAttribute('href'), '/doctor/patients');
    assert.equal(await page.getByRole('link', { name: 'Schedule', exact: true }).getAttribute('href'), '/doctor/schedule');
    assert.equal(await page.getByRole('link', { name: 'Reports', exact: true }).getAttribute('href'), '/doctor/reports');
  }
  results.push({ route: '/doctor/home', viewport: viewport.name, overflow: size, reportQueue: true, dedicatedNavigation: viewport.name === 'desktop' });
  await page.close();
}

const sectionRoutes = [
  ['/doctor/appointments', 'Appointments & Clinical Queue'],
  ['/doctor/patients', 'Patient Registry'],
  ['/doctor/schedule', 'Doctor Schedule & Clinic Timetable'],
  ['/doctor/prescriptions', 'Prescriptions'],
  ['/doctor/lab-requests', 'Lab Requests'],
  ['/doctor/messages', 'Clinical Messages'],
  ['/doctor/reports', 'Clinical Reports'],
  ['/doctor/settings', 'Doctor Portal Settings'],
];

for (const [route, heading] of sectionRoutes) {
  const page = await makePage({ width: 1440, height: 1000 });
  await page.goto(`http://127.0.0.1:3000${route}`, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: heading, exact: true }).waitFor({ state: 'visible' });
  assert.equal(await page.locator(`a[href="${route}"]`).first().getAttribute('aria-current'), 'page');
  const size = await page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
  assert.equal(size.scroll, size.viewport, `${route} overflow`);
  if (route === '/doctor/schedule') {
    await page.getByRole('button', { name: /Block custom slot/i }).click();
    assert.equal(await page.getByRole('heading', { name: 'Block custom schedule slot' }).isVisible(), true);
    await page.getByRole('button', { name: 'Close dialog' }).click();
  }
  if (route === '/doctor/lab-requests') {
    await page.getByRole('button', { name: /New request/i }).click();
    assert.equal(await page.getByRole('heading', { name: 'Create lab request' }).isVisible(), true);
    await page.getByRole('button', { name: 'Close dialog' }).click();
  }
  if (route === '/doctor/messages') {
    await page.getByRole('button', { name: /Compose message/i }).click();
    assert.equal(await page.getByRole('heading', { name: 'Compose clinical message' }).isVisible(), true);
    await page.getByRole('button', { name: 'Close dialog' }).click();
  }
  if (route === '/doctor/settings') {
    await page.getByRole('button', { name: 'Save preferences' }).click();
    assert.equal(await page.getByRole('status').isVisible(), true);
  }
  results.push({ route, viewport: 'desktop', overflow: size, activeNavigation: true, primaryInteraction: true });
  await page.close();
}

for (const viewport of [{ width: 1440, height: 1000, name: 'desktop' }, { width: 390, height: 844, name: 'mobile' }]) {
  const page = await makePage(viewport);
  await page.goto('http://127.0.0.1:3000/doctor/report/report-1', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.getByRole('heading', { name: 'SOAP report review' }).isVisible(), true);
  assert.equal(await page.getByText('Review Decision').isVisible(), true);
  const size = await page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
  assert.equal(size.scroll, size.viewport, `report overflow at ${viewport.name}`);
  if (viewport.name === 'desktop') {
    await page.getByText('Write Prescription').click();
    assert.equal(await page.getByPlaceholder(/Enter prescription details/i).isVisible(), true);
    await page.getByText('Chat with Report').click();
    assert.equal(await page.getByRole('heading', { name: 'Chat with Report' }).isVisible(), true);
    await page.getByRole('button', { name: 'Close report chat' }).click();
    await page.evaluate(() => window.scrollTo(0, 0));
  }
  await page.screenshot({ path: `docs/redesign/doctor-report-${viewport.name}.png`, fullPage: true });
  results.push({ route: '/doctor/report/report-1', viewport: viewport.name, overflow: size, reviewControls: true });
  await page.close();
}

for (const viewport of [{ width: 1440, height: 900, name: 'desktop' }, { width: 390, height: 844, name: 'mobile' }]) {
  const page = await makePage(viewport);
  await page.goto('http://127.0.0.1:3000/this-page-does-not-exist', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole('heading', { name: /This page isn’t part of your care path/i }).waitFor({ state: 'visible' });
  const size = await page.evaluate(() => ({ viewport: innerWidth, scroll: document.documentElement.scrollWidth }));
  assert.equal(size.scroll, size.viewport, `404 overflow at ${viewport.name}`);
  await page.screenshot({ path: `docs/redesign/not-found-${viewport.name}.png`, fullPage: true });
  results.push({ route: '/this-page-does-not-exist', viewport: viewport.name, overflow: size });
  await page.close();
}

writeFileSync('docs/redesign/doctor-checks.json', JSON.stringify({ results, errors, limits: 'Authentication, doctor profile, report queues, review, chat, prescription, and PDF endpoints were mocked. Tests verify frontend rendering and interactions, not live services.' }, null, 2));
console.log(JSON.stringify({ results, errors }, null, 2));
await browser.close();
