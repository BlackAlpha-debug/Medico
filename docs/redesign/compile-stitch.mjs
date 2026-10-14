import {createRequire} from 'node:module';
import path from 'node:path';
import {readFileSync,writeFileSync} from 'node:fs';
import vm from 'node:vm';
const require=createRequire(path.join(process.env.TEMP,'medico-stitch-tools','package.json'));
const postcss=require('postcss');const tailwind=require('tailwindcss');
const html=readFileSync('stitch_hospital_management/hospital_management_system_landing_page/code.html','utf8');
const script=html.match(/<script id="tailwind-config">([\s\S]*?)<\/script>/)[1];
const context={tailwind:{}};vm.runInNewContext(script,context);const config=JSON.parse(JSON.stringify(context.tailwind.config));
const extras=['medico_about_us_leadership','medico_contact_us','find_a_doctor_medico_hospital_management_system'].map(n=>readFileSync(`stitch_hospital_management/${n}/code.html`,'utf8'));
config.content=[{raw:html+extras.join(''),extension:'html'}];config.important='#stitch-landing';
for(const [k,v]of Object.entries(config.theme.extend.fontFamily))config.theme.extend.fontFamily[k]=v[0]==='Outfit'?['var(--font-outfit)','sans-serif']:['var(--font-inter)','sans-serif'];
const result=await postcss([tailwind(config)]).process('@tailwind base; @tailwind components; @tailwind utilities;',{from:undefined});
const root=postcss.parse(result.css);
root.walkRules(rule=>{
 if(rule.parent?.type==='atrule'&&/keyframes/.test(rule.parent.name))return;
 if(rule.selector.includes('#stitch-landing'))return;
 rule.selectors=rule.selectors.map(selector=>{
  if(['html',':host','body'].includes(selector.trim()))return '#stitch-landing';
  return '#stitch-landing '+selector;
 });
});
const custom=`\n@font-face{font-family:'Stitch Material Symbols';font-style:normal;font-weight:100 700;src:url('/medico/stitch/material-symbols.woff2') format('woff2');font-display:block}\n#stitch-landing .material-symbols-outlined{font-family:'Stitch Material Symbols';font-weight:normal;font-style:normal;font-size:24px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;font-feature-settings:'liga';-webkit-font-feature-settings:'liga';-webkit-font-smoothing:antialiased}\n#stitch-landing{font-family:var(--font-inter),sans-serif;color:#121e1e;background:#effcfb} #stitch-landing [hidden]{display:none!important} #stitch-landing :focus-visible{outline:3px solid #004fda;outline-offset:4px} #stitch-landing main>:first-child{margin-top:0!important}#stitch-landing main>:last-child{margin-bottom:0!important}\n`;
// Font sizes must override the Material Symbols default, exactly as in Google's sheet + Tailwind.
writeFileSync('app/stitch-landing.css',custom+root.toString().replaceAll('--tw-','--stitch-'));
// A non-scoped source stylesheet allows an independent source HTML baseline without a CDN.
const baseline=await postcss([tailwind({...config,important:false})]).process('@tailwind base; @tailwind components; @tailwind utilities;',{from:undefined});
writeFileSync('public/medico/stitch/source-baseline.css',custom.replaceAll('#stitch-landing ', '').replaceAll('#stitch-landing','body')+baseline.css);
console.log('Compiled source Tailwind theme into isolated static CSS');
