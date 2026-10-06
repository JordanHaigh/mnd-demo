export type CohortRow = {age:number;onset:string;occupation:string;exposure:string;state:string;consent:boolean};
export type CohortFilters = {onset:string;age:string;occupation:string;exposure:string};
export function makeSyntheticCohort():CohortRow[] {
 let seed=94721;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
 return Array.from({length:240},()=>({age:35+Math.floor(random()*45),onset:['Limb','Bulbar','Other'][Math.floor(random()*3)],occupation:['Automotive','Agriculture','Education','Healthcare','Other'][Math.floor(random()*5)],exposure:['Solvents','Pesticides','Dust','None recorded'][Math.floor(random()*4)],state:['NSW','VIC','QLD','SA','WA','TAS'][Math.floor(random()*6)],consent:random()>0.2}));
}
export function filterCohort(rows:CohortRow[],filters:CohortFilters) {return rows.filter(r=>r.consent&&(filters.onset==='Any'||r.onset===filters.onset)&&(filters.age==='Any'||(filters.age==='Under 60'?r.age<60:r.age>=60))&&(filters.occupation==='Any'||r.occupation===filters.occupation)&&(filters.exposure==='Any'||r.exposure===filters.exposure));}
export function aggregateCount(rows:CohortRow[]):number|null{return rows.length<10?null:rows.length;}
