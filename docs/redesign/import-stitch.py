from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Comment
import re, json, html
root=Path.cwd(); src=root/'stitch_hospital_management/hospital_management_system_landing_page/code.html'; s=BeautifulSoup(src.read_text(encoding='utf-8'),'html.parser')
out=root/'components/stitch';out.mkdir(exist_ok=True)
assets=json.loads((root/'docs/redesign/stitch-assets.json').read_text())
for img in s.select('img'):
 img['src']=assets[img['src']]
 img['alt']=img.get('alt',img.get('data-alt',''))
 # Keep dimensions governed by the original design's class names.
 if img.find_parent('section') != s.select('main section')[0]:img['loading']='lazy'
for tag in s.select('script'):tag.decompose()
for tag in s.select('*'):
 for key in list(tag.attrs):
  if key.startswith('on'):del tag.attrs[key]
 tag.attrs.pop('target',None)
for i,section in enumerate(s.select('main section'),1):section['data-section']=str(i)
sections=s.select('main section')
def action(el,name,value=None):
 el['data-action']=name
 if value is not None:el['data-value']=str(value)
 if el.name=='a':el['href']='?action='+name+('&item='+str(value) if value is not None else '')
 if el.name=='button':el['type']='button'
 if el.name not in ('a','button','input','form'):el['role']='button';el['tabindex']='0'
# Header: same-tab destinations; source profile icon becomes keyboard-accessible.
nav={'home':'/','services':'/services','doctors':'/doctors','departments':'/departments','about':'/about','contact':'/contact','login':'/login'}
for a in s.select('header a'):
 if a.get('data-path') in nav:a['href']=nav[a['data-path']]
 else:action(a,'booking')
profile=s.select_one('header .w-8.h-8');profile.name='a';profile['href']='/login';profile['aria-label']='Open patient portal'
action(sections[0].find('a'),'booking');action(sections[0].find('button'),'tour')
# Services
for i,b in enumerate(sections[2].select('button[aria-label]')):
 label=b['aria-label']
 if 'service' in label and label.startswith(('Previous','Next')):action(b,'service-slide',-1 if label.startswith('Previous') else 1)
 else:action(b,'toggle',label);b['aria-pressed']='false'
for a in sections[2].select('a'):
 if 'Book' in a.get_text():action(a,'booking')
 elif 'Order' in a.get_text():action(a,'pharmacy')
 else:a['href']='/signup?type=doctor'
service_grid=sections[2].select_one('.grid');service_grid['data-services']='true'
for idx,card in enumerate(service_grid.find_all('div',recursive=False)):card['data-service-card']=str(idx)
# Departments and doctors
catalog={'departments':[],'doctors':[],'packages':[],'articles':[]}
for i,a in enumerate(sections[3].select('a')):
 card=a.parent;catalog['departments'].append({'title':card.h3.get_text(' ',strip=True),'description':card.p.get_text(' ',strip=True)});action(a,'department',i)
for i,b in enumerate(sections[5].select('#doctor-filters button')):action(b,'filter',b.get_text(strip=True));b['aria-pressed']='true' if i==0 else 'false'
for i,h in enumerate(sections[5].select('h3')):
 card=h.parent.parent.parent
 catalog['doctors'].append({'name':h.get_text(' ',strip=True),'specialty':h.parent.span.get_text(' ',strip=True),'description':h.parent.p.get_text(' ',strip=True),'image':card.img['src'],'filter':['Cardiology','Pediatrics','Neurology','Surgery'][i]})
 card['data-doctor-card']=str(i);card['data-specialty']=catalog['doctors'][-1]['filter']
 for b in card.select('button'):action(b,'call' if b.get('aria-label') else 'booking',i)
# Chat
for b in sections[6].select('button'):
 label=b.get('aria-label',b.get_text(' ',strip=True))
 action(b,{'Audio Call':'audio','Video Call':'video','download':'download','Confirm Slot':'confirm','Reschedule':'reschedule','Send message':'message'}[label])
 if label=='download':b['aria-label']='Download sample attachment'
chat_input=sections[6].find('input');chat_input['aria-label']='Message';chat_input['maxlength']='1000';chat_input['data-chat-input']='true'
chat_body=sections[6].select_one('div.flex.flex-col.gap-space-sm.py-2');chat_body['data-chat-body']='true';chat_body['aria-live']='polite'
# Packages
for i,h in enumerate(sections[7].select('h3')):
 card=h.parent.parent;catalog['packages'].append({'title':h.get_text(' ',strip=True),'price':h.parent.select_one('.font-headline-xl').get_text(strip=True),'features':[li.get_text(' ',strip=True).replace('check_circle ','').replace('cancel ','') for li in card.select('li')]});action(card.find('button'),'package',i)
# Articles
for i,h in enumerate(sections[10].select('h3')):
 card=h.find_parent('article') or h.parent.parent.parent;catalog['articles'].append({'title':h.get_text(' ',strip=True),'description':h.parent.p.get_text(' ',strip=True),'image':card.img['src']});action(card,'article',i);card['aria-label']='Read '+catalog['articles'][-1]['title']
action(sections[10].find('a'),'articles')
# FAQs
for i,b in enumerate(sections[11].select('button')):
 action(b,'faq',i);b['aria-expanded']='false';b['aria-controls']='stitch-answer-'+str(i);panel=b.parent.select_one('.faq-content');panel['id']='stitch-answer-'+str(i)
# Emergency: do not dial a fictional number from the reference.
for a in sections[12].select('a'):action(a,'emergency' if a['href'].startswith('tel:') else 'directions')
# Newsletter
form=sections[13].find('form');form['data-newsletter']='true';form.find('input')['aria-label']='Newsletter email';form.find('input')['name']='email';form.find('input')['maxlength']='254'
# Footer controls previously styled as clickable div/li.
for item in s.select('footer li'):
 a=s.new_tag('a');a['class']='block';a.string=item.get_text(' ',strip=True);item.clear();item.append(a)
 text=a.get_text()
 if text=='Find a Doctor':a['href']='/doctors'
 elif text=='Our Specialties':a['href']='/departments'
 elif text in ['Medical Records (EMR)','Prescription Refills']:a['href']='/login'
 elif text=='Patient Portal Guide':a['href']='/how-it-works'
 else:action(a,'information',text)
for el in s.select('footer div.cursor-pointer'):
 icon=el.get_text(strip=True);action(el,{'share':'share','forum':'contact','alternate_email':'email'}[icon]);el['aria-label']={'share':'Share Medico','forum':'Contact Medico','alternate_email':'Email Medico'}[icon]
for a in s.select('footer a[href="#"]'):action(a,'information',a.get_text(strip=True))
# Source text remains verbatim; actual support email is used by email actions.
# React conversion: preserve markup, classes, text, source SVG assets and styles.
attrmap={'class':'className','for':'htmlFor','tabindex':'tabIndex','viewbox':'viewBox','preserveaspectratio':'preserveAspectRatio','maxlength':'maxLength','minlength':'minLength','colspan':'colSpan','rowspan':'rowSpan','srcset':'srcSet','crossorigin':'crossOrigin','autoplay':'autoPlay','readonly':'readOnly','stroke-width':'strokeWidth','stroke-linecap':'strokeLinecap','stroke-linejoin':'strokeLinejoin','fill-rule':'fillRule','clip-rule':'clipRule'}
void={'img','input','br','hr','meta','link','source','area','wbr'};boolattrs={'required','disabled','checked','multiple','autofocus','readonly'}
def jsx(n):
 if isinstance(n,Comment):return ''
 if isinstance(n,NavigableString):
  t=str(n)
  if not t.strip():return '\n'
  return '{'+json.dumps(t,ensure_ascii=False)+'}'
 if n.name=='script':return ''
 attrs=[]
 for k,v in n.attrs.items():
  key=attrmap.get(k,k)
  if isinstance(v,list):v=' '.join(v)
  if k in boolattrs:attrs.append(key);continue
  if k in ['tabindex','maxlength','minlength','colspan','rowspan']:attrs.append(key+'={'+str(v)+'}');continue
  if k=='style':
   pairs={}
   for part in v.split(';'):
    if ':' in part:
     prop,val=part.split(':',1);prop=prop.strip();prop=re.sub(r'-([a-z])',lambda m:m.group(1).upper(),prop);pairs[prop]=val.strip()
   attrs.append('style={'+json.dumps(pairs)+'}');continue
  attrs.append(key+'='+json.dumps(str(v),ensure_ascii=False))
 name={'textpath':'textPath'}.get(n.name,n.name)
 start='<'+name+(' '+' '.join(attrs) if attrs else '')
 if n.name in void:return start+' />'
 return start+'>'+''.join(jsx(c) for c in n.children)+'</'+name+'>'
for duplicate in s.select('header span,footer span'):
 if duplicate.get_text(strip=True)=='Medico':duplicate.decompose()
header=jsx(s.header);footer=jsx(s.footer);bodyclass=' '.join(s.body['class'])
parts=[]
for i,sec in enumerate(sections,1):
 view={3:'services',4:'departments',6:'doctors'}.get(i)
 condition='view === "home"'+(' || view === "'+view+'"' if view else '')
 parts.append('{('+condition+') && ('+jsx(sec)+')}')
code='/* Generated from the supplied Stitch export; do not redesign this markup. */\n/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */\nexport function StitchMarkup({view="home"}:{view?:"home"|"services"|"departments"|"doctors"}){return <div className='+json.dumps(bodyclass)+'>'+header+'<main className="w-full bg-surface"><div className="flex flex-col w-full">'+''.join(parts)+'</div></main>'+footer+'</div>;}\n'
active='transition-colors py-1 text-primary font-semibold border-b-2 border-primary pb-1'
inactive='font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors py-1'
code=code.replace('aria-current="page" className="'+active+'"', 'aria-current={view === "home" ? "page" : undefined} className={view === "home" ? "'+active+'" : "'+inactive+'"}')
for nav_view in ['services','doctors','departments']:
 code=code.replace('className="'+inactive+'" data-path="'+nav_view+'"', 'aria-current={view === "'+nav_view+'" ? "page" : undefined} className={view === "'+nav_view+'" ? "'+active+'" : "'+inactive+'"} data-path="'+nav_view+'"',1)
(out/'StitchMarkup.tsx').write_text(code,encoding='utf-8');(out/'catalog.json').write_text(json.dumps(catalog,indent=2,ensure_ascii=False),encoding='utf-8')
# Baseline HTML for a pixel comparison: same source, original controls, downloaded assets.
baseline=BeautifulSoup(src.read_text(encoding='utf-8'),'html.parser')
for img in baseline.select('img'):img['src']=assets[img['src']]
(root/'docs/redesign/stitch-source-local.html').write_text(str(baseline),encoding='utf-8')
print('Generated exact source JSX and interaction catalog')
