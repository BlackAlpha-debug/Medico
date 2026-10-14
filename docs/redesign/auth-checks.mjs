import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(path.join(process.env.TEMP,'medico-browser-check','package.json'));
const {chromium}=require('playwright');
const browser=await chromium.launch({channel:'msedge',headless:true});
const checks=[];
for (const scenario of [{mode:'login',role:'patient',complete:true,target:'/patient/dashboard'},{mode:'login',role:'doctor',complete:true,target:'/doctor/home'},{mode:'login',role:'doctor',complete:false,target:'/doctor/onboarding'},{mode:'login',role:'patient',complete:false,target:'/patient/medical_session'},{mode:'signup',role:'patient',target:'/patient/medical_session'},{mode:'signup',role:'doctor',target:'/doctor/onboarding'}]) {
 const page=await browser.newPage();
 const user={id:'frontend-test',name:'Test User',email:'test@example.com',emailVerified:false,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
 await page.route('**/api/doctors/check?*',r=>r.fulfill({json:{exists:scenario.mode==='login',role:scenario.mode==='login'?scenario.role:null,profileComplete:scenario.complete}}));
 await page.route('**/api/auth/sign-in/email',r=>r.fulfill({json:{token:'test-token',user}}));
 await page.route('**/api/auth/sign-up/email',r=>r.fulfill({json:{token:'test-token',user}}));
 let roleSaved=false;await page.route('**/api/user/role',r=>{assert.equal(r.request().postDataJSON().role,scenario.role);roleSaved=true;return r.fulfill({json:{success:true}})});
 await page.route('**'+scenario.target+'*',r=>r.fulfill({contentType:'text/html',body:'<!doctype html><html><body>Redirect target stub</body></html>'}));
 await page.goto(`http://127.0.0.1:3000/${scenario.mode}?type=${scenario.role}`,{waitUntil:'networkidle'});
 if(scenario.mode==='signup'){await page.getByLabel('Full name',{exact:true}).fill('Test User');await page.getByLabel('Confirm password',{exact:true}).fill('Testpass123!')}
 await page.getByLabel('Email address',{exact:true}).fill('test@example.com');await page.locator('#password').fill('Testpass123!');
 const redirected=page.waitForRequest(r=>new URL(r.url()).pathname===scenario.target);
 await page.locator('button[type=submit]').click();await redirected;
 if(scenario.mode==='signup'||scenario.role==='doctor')assert.ok(roleSaved);
 checks.push(`${scenario.mode}/${scenario.role}/${scenario.complete??'new'}: request to ${scenario.target}; mocked auth and redirect destination`);await page.close();
}
const page=await browser.newPage();await page.route('**/api/auth/sign-in/social',r=>{assert.equal(r.request().postDataJSON().provider,'google');return r.fulfill({status:400,json:{code:'PROVIDER_UNAVAILABLE',message:'Google sign-in is unavailable. Please use email.'}})});await page.goto('http://127.0.0.1:3000/login?type=doctor');await page.getByRole('button',{name:'Continue with Google'}).click();await page.locator('.form-error').waitFor();assert.match(await page.locator('.form-error').innerText(),/Google sign-in is unavailable/);assert.equal(await page.evaluate(()=>localStorage.getItem('pendingUserType')),'doctor');checks.push('Google provider request, pending role persistence, and failure message (mocked)');
writeFileSync('docs/redesign/auth-checks.json',JSON.stringify({checks,limits:'All authentication/role responses and final destinations mocked. This proves frontend request and navigation handling, not live authentication or persistence.'},null,2));console.log(JSON.stringify(checks,null,2));await browser.close();
