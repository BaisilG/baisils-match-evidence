import assert from 'node:assert/strict';
import {once} from 'node:events';
import {createApp} from './server.mjs';
let mode='valid',calls=0;
const modelFetch=async(url,options)=>{
 if(url.endsWith('/api/tags'))return new Response(JSON.stringify({models:[{name:'phi4-mini:latest'}]}));
 calls++;const input=JSON.parse(options.body);const supplied=JSON.parse(input.messages[1].content);
 assert.equal(supplied.facts.after.shots,4);assert.equal(supplied.facts.after.pressure,17);
 if(mode==='offline')throw Error('Test model offline');
 return new Response(JSON.stringify({message:{content:JSON.stringify({explanation:'Northbridge increased their attacking activity in this window. The source events show shots and successful penalty-area entries.',evidence_ids:[mode==='invalid'?'EV-FAKE':supplied.facts.events[0].id]})}}));
};
const app=createApp({fetchModel:modelFetch});app.listen(0,'127.0.0.1');await once(app,'listening');const base=`http://127.0.0.1:${app.address().port}`;
const post=(payload,headers={})=>fetch(base+'/api/explain',{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(payload)});
try{
 assert.equal((await fetch(base+'/')).status,200);
 assert.equal((await (await fetch(base+'/api/health')).json()).ready,true);
 assert.equal((await post({momentIndex:99,audience:'simple'})).status,400);
 assert.equal((await post({momentIndex:1,audience:'simple'},{Origin:'https://example.com'})).status,403);
 mode='invalid';assert.equal((await post({momentIndex:1,audience:'simple'})).status,503);
 mode='offline';assert.equal((await post({momentIndex:1,audience:'simple'})).status,503);
 mode='valid';const good=await post({momentIndex:1,audience:'simple',facts:{shots:999}});assert.equal(good.status,200);const result=await good.json();assert.equal(result.source,'ollama-local');assert.equal(result.evidence_ids[0],'EV-065');
 const before=calls;assert.equal((await post({momentIndex:1,audience:'simple'})).status,200);assert.equal(calls,before);
 console.log('PASS: static page, model health, canonical match facts, invalid requests, cross-origin protection, invalid citations, offline errors and cache. Model calls were mocked; no real model inference tested.');
}finally{app.closeAllConnections();await new Promise(r=>app.close(r));}
