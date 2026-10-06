export type Region = {id:string;name:string;state:string;lon:number;lat:number;weight:number;occupation:string;exposure:string};
export const regions:Region[] = [
 ['sydney','Sydney','NSW',151.21,-33.87,150,'Healthcare','None recorded'],
 ['hunter','Hunter','NSW',151.78,-32.93,125,'Automotive','Solvents'],
 ['illawarra','Illawarra','NSW',150.89,-34.43,70,'Automotive','Dust'],
 ['riverina','Riverina','NSW',147.35,-35.11,65,'Agriculture','Pesticides'],
 ['northern-rivers','Northern Rivers','NSW',153.56,-28.86,60,'Agriculture','Pesticides'],
 ['melbourne','Melbourne','VIC',144.96,-37.81,155,'Education','None recorded'],
 ['geelong','Geelong','VIC',144.36,-38.15,100,'Automotive','Solvents'],
 ['gippsland','Gippsland','VIC',146.5,-38.1,75,'Agriculture','Pesticides'],
 ['ballarat','Ballarat','VIC',143.85,-37.56,55,'Automotive','Dust'],
 ['brisbane','Brisbane','QLD',153.03,-27.47,130,'Healthcare','None recorded'],
 ['darling-downs','Darling Downs','QLD',151.95,-27.56,100,'Agriculture','Pesticides'],
 ['townsville','Townsville','QLD',146.82,-19.26,60,'Automotive','Dust'],
 ['cairns','Cairns','QLD',145.77,-16.92,55,'Agriculture','Pesticides'],
 ['sunshine-coast','Sunshine Coast','QLD',153.06,-26.65,65,'Education','None recorded'],
 ['adelaide','Adelaide','SA',138.6,-34.92,95,'Healthcare','None recorded'],
 ['southeast-sa','South East','SA',140.78,-37.83,45,'Agriculture','Pesticides'],
 ['perth','Perth','WA',115.86,-31.95,110,'Automotive','Solvents'],
 ['southwest-wa','South West','WA',115.64,-33.33,70,'Agriculture','Pesticides'],
 ['pilbara','Pilbara','WA',118.6,-20.31,60,'Automotive','Dust'],
 ['hobart','Hobart','TAS',147.33,-42.88,50,'Education','None recorded'],
 ['launceston','Launceston','TAS',147.13,-41.44,40,'Agriculture','Dust'],
 ['darwin','Darwin','NT',130.85,-12.46,35,'Healthcare','None recorded'],
 ['alice-springs','Alice Springs','NT',133.88,-23.7,30,'Other','Dust'],
 ['canberra','Canberra','ACT',149.13,-35.28,45,'Healthcare','None recorded']
].map(([id,name,state,lon,lat,weight,occupation,exposure])=>({id,name,state,lon,lat,weight,occupation,exposure})) as Region[];
export const states=['NSW','VIC','QLD','SA','WA','TAS','NT','ACT'];
export const occupations=['Automotive','Agriculture','Education','Healthcare','Other'];
export const exposures=['Solvents','Pesticides','Dust','None recorded'];
export const syntheticCaseTotal=2400;
export type CohortRow = {age:number;onset:string;occupation:string;exposure:string;state:string;region:string;priorRegion:string;diagnosisYear:number;consent:boolean};
export type CohortFilters = {onset:string;age:string;occupation:string;exposure:string;state?:string;region?:string;period?:string};
export const allFilters:CohortFilters={onset:'Any',age:'Any',occupation:'Any',exposure:'Any',state:'Any',region:'Any',period:'Any'};
export function makeSyntheticCohort():CohortRow[] {
 let seed=94721;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
 const total=regions.reduce((n,r)=>n+r.weight,0);
 return Array.from({length:syntheticCaseTotal},()=>{
  let pick=random()*total;const region=regions.find(r=>(pick-=r.weight)<0)??regions[0];
  // Deliberately planted regional patterns for a demonstration, not epidemiology.
  const occupation=random()<.65?region.occupation:occupations[Math.floor(random()*occupations.length)];
  const exposure=random()<.65?region.exposure:exposures[Math.floor(random()*exposures.length)];
  const priorRegion=random()<.58?region.id:regions[Math.floor(random()*regions.length)].id;
  return {age:35+Math.floor(random()*45),onset:['Limb','Bulbar','Other'][Math.floor(random()*3)],occupation,exposure,state:region.state,region:region.id,priorRegion,diagnosisYear:2015+Math.floor(random()*12),consent:random()>.2};
 });
}
export function filterCohort(rows:CohortRow[],filters:CohortFilters) {
 const years=filters.period&&filters.period!=='Any'?filters.period.split('–').map(Number):null;
 return rows.filter(r=>r.consent&&(filters.onset==='Any'||r.onset===filters.onset)&&(filters.age==='Any'||(filters.age==='Under 60'?r.age<60:r.age>=60))&&(filters.occupation==='Any'||r.occupation===filters.occupation)&&(filters.exposure==='Any'||r.exposure===filters.exposure)&&(!filters.state||filters.state==='Any'||r.state===filters.state)&&(!filters.region||filters.region==='Any'||r.region===filters.region)&&(!years||(r.diagnosisYear>=years[0]&&r.diagnosisYear<=years[1])));
}
export function aggregateCount(rows:unknown[]):number|null{return rows.length<10?null:rows.length;}
export function groupCases(rows:CohortRow[],key:'state'|'region'|'occupation'|'exposure'|'diagnosisYear') {
 const groups=new Map<string,CohortRow[]>();
 for(const row of rows.filter(r=>r.consent)){const value=String(row[key]);groups.set(value,[...(groups.get(value)??[]),row]);}
 return [...groups].map(([label,members])=>({label,count:aggregateCount(members)})).sort((a,b)=>(b.count??0)-(a.count??0)||a.label.localeCompare(b.label));
}
export function sharedFactors(a:CohortRow,b:CohortRow):string[] {
 const shared:string[]=[];
 if(a.region===b.region)shared.push('Same region');
 if(a.occupation===b.occupation&&a.occupation!=='Other')shared.push(a.occupation+' work');
 if(a.exposure===b.exposure&&a.exposure!=='None recorded')shared.push(a.exposure+' recorded');
 if(a.priorRegion===b.priorRegion)shared.push('Prior place: '+(regions.find(r=>r.id===a.priorRegion)?.name??a.priorRegion));
 if(a.diagnosisYear===b.diagnosisYear)shared.push('Diagnosis year '+a.diagnosisYear);
 return shared;
}
export function relatedCases(rows:CohortRow[],focus:CohortRow,limit=12) {
 if(!focus.consent||aggregateCount(rows.filter(r=>r.consent))===null)return [];
 return rows.map((row,index)=>({row,index,shared:sharedFactors(focus,row)})).filter(item=>item.row.consent&&item.row!==focus&&item.shared.length>0).sort((a,b)=>b.shared.length-a.shared.length||a.index-b.index).slice(0,limit);
}
