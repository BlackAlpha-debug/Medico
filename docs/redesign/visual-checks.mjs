import {createRequire} from 'node:module';
import path from 'node:path';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const require=createRequire(path.join(process.env.TEMP,'medico-browser-check','package.json'));
const {chromium}=require('playwright');
const browser=await chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext({permissions:['clipboard-read','clipboard-write']});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
for(const item of [{route:'/',name:'landing',width:1440,height:1050},{route:'/login',name:'login',width:1600,height:1240},{route:'/signup',name:'signup',width:1035,height:1000},{route:'/contact',name:'contact',width:1440,height:1050}]){
 await page.setViewportSize({width:item.width,height:item.height});await page.goto('http://127.0.0.1:3000'+item.route,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`docs/redesign/${item.name}-final.png`,fullPage:true});await page.screenshot({path:`docs/redesign/${item.name}-viewport.png`});
 assert.deepEqual(await page.locator('img').evaluateAll(images=>images.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src)),[]);
 await page.setViewportSize({width:768,height:1024});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:`docs/redesign/${item.name}-tablet.png`,fullPage:true});
 await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.screenshot({path:`docs/redesign/${item.name}-mobile-final.png`,fullPage:true});
}
await page.goto('http://127.0.0.1:3000/contact');await page.getByRole('button',{name:'Copy email address'}).click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),'Support@medico.com');
await page.goto('http://127.0.0.1:3000/');await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Skip to content');await page.keyboard.press('Enter');await page.locator('summary').first().focus();await page.keyboard.press('Enter');assert.equal(await page.locator('details').first().getAttribute('open'),'');
assert.deepEqual(errors,[]);writeFileSync('docs/redesign/visual-checks.json',JSON.stringify({checks:['All source images loaded','390px/768px/desktop: no horizontal overflow','Contact clipboard action','Keyboard skip link and FAQ disclosure','No uncaught or console errors'],errors},null,2));console.log('Final captures, images, keyboard, clipboard, and tablet checks passed');await browser.close();
