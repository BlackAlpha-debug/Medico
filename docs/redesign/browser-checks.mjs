import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const require = createRequire(path.join(process.env.TEMP, 'medico-browser-check', 'package.json'));
const { chromium } = require('playwright');
const browser=await chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1050}});
const page=await context.newPage();
const checks=[],errors=[]; page.on('pageerror',e=>errors.push(e.message));
const base='http://127.0.0.1:3000';
const routes=['/','/services','/how-it-works','/about','/contact','/faq','/login','/signup','/signup?type=doctor'];
const screenshots={ '/':'landing','/login':'login','/signup':'signup','/contact':'contact' };
for(const route of routes){
 const response=await page.goto(base+route,{waitUntil:'networkidle',timeout:120000});
 assert.equal(response.status(),200,route);
 assert.equal(await page.locator('h1').count(),1,`${route}: one h1`);
 const bad=await page.locator('a').evaluateAll(links=>links.filter(a=>a.getAttribute('href')!=='#main-content'&&(!a.getAttribute('href')||a.getAttribute('href')==='#'||a.target!=='_blank')).map(a=>({text:a.innerText,href:a.getAttribute('href')})));
 assert.deepEqual(bad,[],`${route}: all navigation uses a real destination/new tab`);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${route}: desktop overflow`);
 if(screenshots[route])await page.screenshot({path:`docs/redesign/${screenshots[route]}-desktop.png`,fullPage:true});
 checks.push(`${route}: HTTP 200; navigation targets; desktop layout`);
}
await page.goto(base);await page.waitForLoadState('networkidle');
const popupPromise=context.waitForEvent('page'); await page.getByRole('navigation',{name:'Main navigation',exact:true}).getByRole('link',{name:'Contact',exact:false}).click();
const popup=await popupPromise;await popup.waitForLoadState();assert.equal(new URL(popup.url()).pathname,'/contact');await popup.close();checks.push('Contact navigation opens /contact in a new tab');
await page.locator('summary').first().click();assert.equal(await page.locator('details').first().getAttribute('open'),'');await page.locator('summary').first().click();assert.equal(await page.locator('details').first().getAttribute('open'),null);checks.push('FAQ opens and closes');
await page.setViewportSize({width:390,height:844});
for(const route of ['/','/login','/signup','/signup?type=doctor','/contact','/services','/about','/how-it-works','/faq']){
 await page.goto(base+route,{waitUntil:'networkidle'});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${route}: mobile overflow`);
 if(screenshots[route])await page.screenshot({path:`docs/redesign/${screenshots[route]}-mobile.png`,fullPage:true});
 checks.push(`${route}: 390px mobile layout`);
}
await page.goto(base);await page.getByRole('button',{name:'Open menu'}).click();assert.equal(await page.getByRole('navigation',{name:'Mobile navigation'}).isVisible(),true);await page.getByRole('button',{name:'Close menu'}).click();assert.equal(await page.getByRole('navigation',{name:'Mobile navigation'}).count(),0);checks.push('Mobile navigation opens/closes');
await page.goto(base+'/signup');await page.getByRole('button',{name:'Doctor / Clinician'}).click();assert.equal(await page.getByRole('heading',{name:'Doctor registration'}).isVisible(),true);assert.match(page.url(),/type=doctor/);checks.push('Signup role selector and query parameter');
await page.getByLabel('Full name',{exact:true}).fill('Medico Test');await page.getByLabel('Email address',{exact:true}).fill('test@example.com');await page.getByLabel('Create password',{exact:true}).fill('Testpass123!');await page.getByLabel('Confirm password',{exact:true}).fill('Different123!');await page.getByRole('button',{name:'Create doctor account'}).click();await page.locator('.form-error[role=alert]').waitFor();assert.match(await page.locator('.form-error[role=alert]').innerText(),/do not match/);checks.push('Signup password mismatch blocks submission');
await page.getByRole('button',{name:'Show password'}).click();assert.equal(await page.locator('#password').getAttribute('type'),'text');await page.getByRole('button',{name:'Hide password'}).click();assert.equal(await page.locator('#password').getAttribute('type'),'password');checks.push('Password visibility toggle');
await page.route('**/api/doctors/check?*',route=>route.fulfill({status:200,json:{exists:true,role:'patient',profileComplete:true}}));
await page.getByLabel('Confirm password',{exact:true}).fill('Testpass123!');await page.getByRole('button',{name:'Create doctor account'}).click();await page.waitForTimeout(200);assert.match(await page.locator('.form-error[role=alert]').innerText(),/registered as a patient/);checks.push('Role mismatch error (mocked account lookup)');
await page.goto(base+'/signup');await page.getByLabel('Full name',{exact:true}).fill('Medico Test');await page.getByLabel('Email address',{exact:true}).fill('test@example.com');await page.getByLabel('Create password',{exact:true}).fill('Testpass123!');await page.getByLabel('Confirm password',{exact:true}).fill('Testpass123!');await page.getByRole('button',{name:'Create patient account'}).click();await page.waitForTimeout(200);assert.match(await page.locator('.form-error[role=alert]').innerText(),/already exists/);checks.push('Duplicate account error (mocked account lookup)');
await page.unroute('**/api/doctors/check?*');await page.route('**/api/doctors/check?*',route=>route.fulfill({status:503,json:{error:'Unavailable'}}));await page.getByRole('button',{name:'Create patient account'}).click();await page.waitForTimeout(200);assert.match(await page.locator('.form-error[role=alert]').innerText(),/couldn’t check/);checks.push('Failed account request gives retryable error (mocked 503)');
await page.goto(base+'/contact');await page.evaluate(()=>{window.__opened=[];window.open=(...args)=>{window.__opened.push(args);return null;}});await page.getByLabel('Full name',{exact:true}).fill('Test Visitor');await page.getByLabel('Email address',{exact:true}).fill('visitor@example.com');await page.getByLabel('Subject',{exact:true}).fill('Account question');await page.getByLabel('Your message',{exact:true}).fill('How do I get started?');await page.getByRole('button',{name:'Open email draft'}).click();const opened=await page.evaluate(()=>window.__opened);assert.equal(opened[0][1],'_blank');assert.ok(opened[0][0].startsWith('mailto:Support@medico.com?'));assert.match(decodeURIComponent(opened[0][0]),/Test Visitor/);assert.match(await page.getByRole('status').innerText(),/Review and send/);checks.push('Contact form validates and composes correct email draft (window.open intercepted; no email sent)');
assert.deepEqual(errors,[]);checks.push('No browser page errors');
writeFileSync('docs/redesign/browser-checks.json',JSON.stringify({checks,errors,limits:['Authentication responses mocked for frontend error tests; no live database/provider configuration','Contact email draft verified without sending email']},null,2));console.log(JSON.stringify({passed:checks.length,checks},null,2));await browser.close();
