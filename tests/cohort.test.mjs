import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeSyntheticCohort,filterCohort,aggregateCount } from '../src/cohort.ts';
const all={onset:'Any',age:'Any',occupation:'Any',exposure:'Any'};
test('research aggregation excludes non-consenting records',()=>{const rows=makeSyntheticCohort();const found=filterCohort(rows,all);assert.equal(rows.length,240);assert.ok(found.length<rows.length);assert.ok(found.every(r=>r.consent));assert.equal(found.length,rows.filter(r=>r.consent).length)});
test('combined filters constrain every dimension',()=>{const filters={onset:'Limb',age:'Under 60',occupation:'Automotive',exposure:'Solvents'};const found=filterCohort(makeSyntheticCohort(),filters);assert.ok(found.length>0);assert.ok(found.every(r=>r.age<60&&r.onset==='Limb'&&r.occupation==='Automotive'&&r.exposure==='Solvents'&&r.consent))});
test('small cohorts suppress aggregate counts',()=>{const rows=makeSyntheticCohort();assert.equal(aggregateCount(rows.slice(0,9)),null);assert.equal(aggregateCount(rows.slice(0,10)),10)});
test('synthetic dataset is deterministic and has no patient identifiers',()=>{const rows=makeSyntheticCohort();assert.deepEqual(rows,makeSyntheticCohort());assert.ok(rows.every(r=>!('name' in r)&&!('email' in r)&&!('id' in r)))});
