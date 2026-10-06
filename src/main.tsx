import { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, ArrowUpRight, Activity, MessageSquare, Presentation, LayoutDashboard, BookOpen, Sparkles, ShieldCheck, ChevronRight, Coffee, Droplets, BedDouble, Volume2, ExternalLink, Menu, X, RotateCcw, Check } from 'lucide-react';
import { Communicate } from './Communicate';
import { Life } from './Life';
import { Resources } from './Resources';
import { Modal } from './ui';
import { readMessages, deleteMessage } from './audio';
import type { Product } from './model';
import './styles.css';
const products=[['overview','Demo overview',LayoutDashboard],['presentation','Presentation',Presentation],['communicate','Communication tools',MessageSquare],['life','MND records',Activity],['resources','Resources',BookOpen]] as const;
function currentProduct():Product {const hash=location.hash.slice(1);return products.some(p=>p[0]===hash)?hash as Product:'overview'}
function App() {
 const [product,setProduct]=useState<Product>(currentProduct),[mobileMenu,setMobileMenu]=useState(false),[toast,setToast]=useState(''),[tourRequest,setTourRequest]=useState(0),[reset,setReset]=useState(false);
 const notify=useCallback((text:string)=>setToast(text),[]);
 useEffect(()=>{const listen=()=>{setProduct(currentProduct());setMobileMenu(false)};window.addEventListener('hashchange',listen);return()=>window.removeEventListener('hashchange',listen)},[]);
 useEffect(()=>{if(!toast)return;const timeout=setTimeout(()=>setToast(''),5500);return()=>clearTimeout(timeout)},[toast]);
 const go=(value:Product)=>{location.hash=value;setProduct(value);setMobileMenu(false);setTourRequest(0);window.scrollTo(0,0)};
 const startTour=(value:Product=product)=>{if(value!==product){location.hash=value;setProduct(value)}setTourRequest(n=>n+1)};
 const resetDemo=async()=>{for(const key of Object.keys(localStorage))if(key.startsWith('mnd-demo:'))localStorage.removeItem(key);try{const messages=await readMessages();await Promise.all(messages.map(m=>deleteMessage(m.id)))}catch{}location.hash='overview';location.reload()};
 return <div className="app-shell"><a href="#main-content" className="skip-link">Skip to content</a><aside className={`sidebar ${mobileMenu?'open':''}`}><button className="brand" onClick={()=>go('overview')} aria-label="MND demo overview"><span className="brand-mark"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M7 29V11l13 12 13-12v18"/></svg></span><span><b>MND<span>demo</span></b><small>INDEPENDENT DEMO</small></span></button><div className="sidebar-label">DEMO WORKSPACE</div><nav className="global-nav" aria-label="Applications">{products.map(([id,label,Icon])=><button className={product===id?'active':''} aria-current={product===id?'page':undefined} key={id} onClick={()=>go(id)}><Icon size={19}/><span>{label}</span>{product===id&&<i/>}</button>)}</nav><div className="sidebar-bottom"><div className="prototype-label"><span/>INDEPENDENT PROTOTYPE</div><p>Prepared for a conversation with MND Australia. No affiliation or endorsement implied.</p><button onClick={()=>setReset(true)}><RotateCcw size={14}/>Reset demo data</button></div></aside>{mobileMenu&&<button className="menu-shade" aria-label="Close navigation" onClick={()=>setMobileMenu(false)}/>}<div className="app-body"><header className="topbar"><div><button className="mobile-menu icon-button" aria-label="Open navigation" onClick={()=>setMobileMenu(true)}><Menu/></button><span className="breadcrumb">Demo workspace<ChevronRight size={14}/><b>{products.find(p=>p[0]===product)?.[1]}</b></span></div><div className="topbar-right"><span className="demo-status"><i/>Fictional data only</span>{(product==='communicate'||product==='life')&&<button className="button primary tour-button tutorial-launch" onClick={()=>startTour()}><Sparkles size={16}/>Tutorial</button>}<span className="jordan-avatar" title="Created by Jordan Haigh">JH</span></div></header><main id="main-content" className={product==='presentation'?'content presentation-content':'content'}>
 {product==='overview'&&<Overview go={go} startTour={startTour}/>}
 {product==='communicate'&&<Communicate notify={notify} tourRequest={tourRequest}/>}
 {product==='life'&&<Life notify={notify} tourRequest={tourRequest}/>}
 {product==='resources'&&<Resources/>}
 {product==='presentation'&&<><div className="deck-page-header"><div><span className="eyebrow">PREPARED FOR MND AUSTRALIA</span><h1>Presentation</h1></div><a className="button" href="./presentation/index.html" target="_blank" rel="noreferrer"><ExternalLink size={16}/>Open full screen</a></div><iframe className="deck-frame" title="MND demo presentation · 10 slides" src="./presentation/index.html"/><p className="deck-caption">Use the arrows or your keyboard to move between slides. Full screen includes print / save as PDF. <button className="text-button" onClick={()=>go('resources')}>Resources<ArrowUpRight size={14}/></button></p></>}
 </main><footer className="app-footer"><span>Independent concept · Jordan Haigh</span><span>For discussion and co-design · October 2026</span></footer></div>{toast&&<div className="toast" role="status"><Check size={18}/><span>{toast}</span><button className="icon-button" onClick={()=>setToast('')} aria-label="Dismiss notification"><X size={16}/></button></div>}{reset&&<Modal title="Reset the local demo?" onClose={()=>setReset(false)}><p>This removes demo edits, preferences, metadata and audio recordings from this browser, then restores the fictional starting data.</p><div className="actions"><button className="button" onClick={()=>setReset(false)}>Keep my changes</button><button className="button primary" onClick={()=>void resetDemo()}><RotateCcw size={16}/>Reset demo</button></div></Modal>}</div>;
}
function Overview({go,startTour}:{go:(p:Product)=>void;startTour:(p:Product)=>void}) {
 return <>
  <section className="presentation-banner">
   <span className="presentation-icon"><Presentation size={22}/></span>
   <div><h2>Presentation</h2><div className="presentation-meta">10 slides</div></div>
   <button className="button" onClick={()=>go('presentation')}>Open deck<ArrowUpRight size={18}/></button>
  </section>
  <section className="overview-hero">
   <div className="hero-kicker"><i/>PREPARED FOR MND AUSTRALIA</div>
   <h1>Explore the demos</h1>
  </section>
  <section className="product-cards" aria-label="Interactive demos">
   <article className="product-card communicate-card">
    <div className="product-card-top"><span className="product-card-icon"><MessageSquare size={25}/></span><span className="focus-tag">AAC</span></div>
    <div className="product-card-copy"><h2>Communication tools</h2></div>
    <div className="mini-aac"><div className="mini-aac-top"><b>What would you like to say?</b><span><Volume2 size={13}/>Quick Speak</span></div><div className="mini-phrases">{[[Coffee,'Coffee'],[Droplets,'Water'],[BedDouble,'Reposition me']].map(([Icon,label])=>{const I=Icon as typeof Coffee;return <div key={String(label)}><I size={24}/><b>{String(label)}</b></div>})}</div></div>
    <div className="product-card-footer"><button className="button primary tutorial-launch" onClick={()=>startTour('communicate')}><Sparkles size={17}/>Start tutorial</button><button className="text-button" onClick={()=>go('communicate')}>Open app<ArrowRight size={16}/></button></div>
   </article>
   <article className="product-card life-card">
    <div className="product-card-top"><span className="product-card-icon"><Activity size={25}/></span><span className="concept-tag">RESEARCH CONCEPT</span></div>
    <div className="product-card-copy"><h2>MND records</h2></div>
    <div className="mini-life"><div className="mini-life-title"><span className="mini-avatar">MW</span><div><b>Margaret’s timeline</b><small>Fictional participant record</small></div><ShieldCheck size={19}/></div><div className="mini-life-event"><i/><span>2021</span><b>MND diagnosis</b><span className="tiny-tag">Clinical</span></div><div className="mini-life-event"><i/><span>2022</span><b>AAC planning</b><span className="tiny-tag">Support</span></div></div>
    <div className="product-card-footer"><button className="button primary tutorial-launch" onClick={()=>startTour('life')}><Sparkles size={17}/>Start tutorial</button><button className="text-button" onClick={()=>go('life')}>Open app<ArrowRight size={16}/></button></div>
   </article>
  </section>
  <section className="overview-resources"><BookOpen size={19}/><h2>Resources</h2><button className="text-button" onClick={()=>go('resources')}>View links<ArrowRight size={16}/></button></section>
 </>;
}
createRoot(document.getElementById('root')!).render(<App/>);
