const fs=require('fs'),vm=require('vm'),assert=require('assert');
const nodes={};function node(id){return nodes[id]??={value:id==='audience'?'simple':'450',innerHTML:'',textContent:'',dataset:{},setAttribute(k,v){this[k]=v;}};}
const context={document:{getElementById:node,querySelectorAll:()=>[]},setInterval,clearInterval,setTimeout,URL,Blob};vm.createContext(context);vm.runInContext(fs.readFileSync(__dirname+'/dist/app.js','utf8'),context);
const result=vm.runInContext(`({moments: moments.map(m=>({start:m.start,delta:m.delta,shots:m.after.shots,entries:m.after.entries})),count:events.length,ids:new Set(events.map(e=>e.id)).size})`,context);
assert.equal(result.moments.length,3);assert.equal(result.count,result.ids);assert.deepEqual(Array.from(result.moments,m=>m.start),[21,56,76]);assert.deepEqual(Array.from(result.moments,m=>m.delta),[13,17,14]);
vm.runInContext('minute=90;renderReplay()',context);assert.equal(nodes.score.innerHTML,'1 <span>:</span> 2');vm.runInContext('minute=0;renderReplay()',context);assert.equal(nodes.score.innerHTML,'0 <span>:</span> 0');
console.log('PASS: 117 unique synthetic events, three computed shifts, and correct initial/final scores.');
