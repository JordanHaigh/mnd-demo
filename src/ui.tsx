import { useEffect, useRef, type ReactNode } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Info } from 'lucide-react';
export function PageTitle({ eyebrow, title, description, action }: {eyebrow?:string;title:string;description?:string;action?:ReactNode}) { return <div className="page-title"><div>{eyebrow&&<span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{description&&<p>{description}</p>}</div>{action}</div>; }
export function Note({children}:{children:ReactNode}) {return <div className="note"><Info size={18}/><div>{children}</div></div>;}
export function Modal({title,children,onClose}:{title:string;children:ReactNode;onClose:()=>void}) {
  const dialog=useRef<HTMLDialogElement>(null);
  useEffect(()=>{dialog.current?.showModal();return()=>dialog.current?.close()},[]);
  return <dialog ref={dialog} className="modal" onCancel={onClose}><div className="modal-title"><h2>{title}</h2><button className="icon-button" aria-label="Close dialog" onClick={onClose}><X/></button></div>{children}</dialog>;
}
export type TourStep={screen:string;title:string;body:string};
export function Tour({steps,index,setIndex,onExit}:{steps:TourStep[];index:number;setIndex:(n:number)=>void;onExit:()=>void}) {
  return <aside className="tour-card" aria-label="Tutorial"><div className="tour-top"><span><Sparkles size={15}/> TUTORIAL · {index+1} / {steps.length}</span><button className="icon-button" onClick={onExit} aria-label="Exit tutorial"><X size={18}/></button></div><div className="tour-progress">{steps.map((_,n)=><i key={n} className={n<=index?'filled':''}/>)}</div><h3>{steps[index].title}</h3><p>{steps[index].body}</p><div className="tour-actions"><button className="button" disabled={!index} onClick={()=>setIndex(index-1)}><ChevronLeft size={17}/>Back</button><button className="button primary" onClick={()=>index===steps.length-1?onExit():setIndex(index+1)}>{index===steps.length-1?'Finish tutorial':'Next'}<ChevronRight size={17}/></button></div></aside>;
}
