import { useEffect, useState } from 'react';
export type Product = 'overview' | 'communicate' | 'life' | 'presentation';
export type Notice = (message: string) => void;
export function useLocal<T>(key: string, initial: T): [T, (value: T | ((previous: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => { try { const saved = localStorage.getItem(`mnd-demo:${key}`); return saved ? JSON.parse(saved) : initial; } catch { return initial; } });
  useEffect(() => { try { localStorage.setItem(`mnd-demo:${key}`, JSON.stringify(value)); } catch { /* Browser storage may be unavailable. In-memory edits remain usable. */ } }, [key, value]);
  return [value, setValue];
}
export function download(name: string, content: string, type = 'application/json') {
  const url = URL.createObjectURL(new Blob([content], { type })); const link = document.createElement('a'); link.href = url; link.download = name; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export interface SpeechProvider { speak(text: string): Promise<void>; stop(): void; }
export class BrowserSpeechProvider implements SpeechProvider {
  speak(text: string) { return new Promise<void>((resolve, reject) => { if (!('speechSynthesis' in window)) { reject(new Error('This browser does not support speech playback.')); return; } window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(text); utterance.lang = 'en-AU'; utterance.rate = 0.9; const voices = window.speechSynthesis.getVoices(); utterance.voice = voices.find(v => v.lang === 'en-AU') || voices.find(v => v.lang.startsWith('en')) || null; utterance.onend = () => resolve(); utterance.onerror = e => e.error === 'interrupted' || e.error === 'canceled' ? resolve() : reject(new Error('Speech playback could not start. Try a different browser.')); window.speechSynthesis.speak(utterance); }); }
  stop() { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }
}
// The demo uses a browser voice. A real personal voice needs a server-side provider, consent, and credentials.
export class MockElevenLabsProvider extends BrowserSpeechProvider {}
export type Phrase = { id: string; label: string; text: string; icon: string; category: string; recordingId?: string };
export type Board = { id: string; name: string; description: string; buttons: Phrase[] };
const phrase = (id: string, label: string, text: string, icon: string, category = 'Everyday'): Phrase => ({ id, label, text, icon, category });
export const quickPhrases: Phrase[] = [
  phrase('yes','Yes','Yes.','check','Responses'), phrase('no','No','No.','x','Responses'), phrase('wait','Please wait','Please give me a moment.','clock','Responses'),
  phrase('water','Water',"I’d like some water, please.",'water','Food & drink'), phrase('coffee','Coffee',"I’d like a coffee, please.",'coffee','Food & drink'), phrase('food','Something to eat',"I’d like something to eat, please.",'food','Food & drink'),
  phrase('position','Reposition me','Could you reposition me, please?','bed','Comfort'), phrase('cold',"I’m cold",'Could you get me a blanket?','snow','Comfort'), phrase('bathroom','Bathroom','I need to use the bathroom.','person','Comfort'),
  phrase('partner','Call Robert','Please call Robert.','phone','People'), phrase('love','Love you','I love you.','heart','People'), phrase('tv','Television','Could you put the television on?','tv','Conversation'),
  phrase('medication','Medication','Could you help me with my medication?','pill','Medical'), phrase('suction','Suction','I need help with suction, please.','medical','Medical')
];
export const initialBoards: Board[] = [
  {id:'morning',name:'Morning routine',description:'A familiar start to the day.',buttons:quickPhrases.filter(p=>['coffee','water','bathroom','position','cold','medication'].includes(p.id))},
  {id:'food',name:'Food & drink',description:'The little things, just how you like them.',buttons:quickPhrases.filter(p=>p.category==='Food & drink')},
  {id:'care',name:'Comfort & care',description:'Make your needs heard.',buttons:quickPhrases.filter(p=>['Comfort','Medical'].includes(p.category))},
  {id:'conversation',name:'Conversation',description:'Stay part of the conversation.',buttons:quickPhrases.filter(p=>['Responses','Conversation','People'].includes(p.category))},
  {id:'people',name:'My people',description:'Family, friends and support.',buttons:quickPhrases.filter(p=>p.category==='People')}
];
export type TimelineEvent = {id:string;date:string;title:string;detail:string;category:string;source:string};
export const initialEvents: TimelineEvent[] = [
  {id:'e1',date:'1984–2008',title:'Automotive mechanic',detail:'Workshop work; potential contact with solvents, fuels and degreasers recalled.',category:'Life history',source:'Participant-reported'},
  {id:'e2',date:'2019',title:'First symptoms recalled',detail:'Persistent muscle twitching in the right calf.',category:'Symptoms',source:'Participant-reported'},
  {id:'e3',date:'March 2020',title:'Grip strength changes',detail:'Difficulty opening jars and using workshop tools.',category:'Symptoms',source:'Participant-reported'},
  {id:'e4',date:'November 2020',title:'GP referral',detail:'Referral for specialist assessment.',category:'Clinical',source:'Document-derived'},
  {id:'e5',date:'May 2021',title:'MND diagnosis',detail:'Limb-onset MND recorded in a fictional neurologist letter.',category:'Clinical',source:'Document-derived'},
  {id:'e6',date:'February 2022',title:'Communication planning',detail:'Speech pathology review and early voice banking discussion.',category:'Communication',source:'Participant-reported'},
  {id:'e7',date:'August 2023',title:'Respiratory support',detail:'Non-invasive ventilation introduced overnight in this fictional history.',category:'Respiratory',source:'Document-derived'},
  {id:'e8',date:'September 2026',title:'Care preferences updated',detail:'Communication passport and support contacts reviewed.',category:'Support',source:'Family-reported'}
];
