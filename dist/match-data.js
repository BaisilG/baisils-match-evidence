(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.MatchData=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
const events=[];
function add(minute,team,type,x,y,endX,endY){events.push({id:'',minute,team,type,x,y,endX,endY});}
for(let m=1;m<=90;m++){const team=m%3===0?'Eastport':'Northbridge';add(m,team,'pass',20+(m*17)%55,15+(m*13)%70,25+(m*19)%50,15+(m*23)%70);}
// Quiet windows precede each intentionally contrasting spell.
for(const [start,team,shots,entries] of [[21,'Eastport',3,4],[56,'Northbridge',4,5],[76,'Eastport',3,5]]){
 for(let i=0;i<shots;i++)add(start+i,team,'shot',83,25+i*12,98,50);
 for(let i=0;i<entries;i++)add(start+i*.7,team,'box_entry',66,20+i*11,87,28+i*9);
}
add(29,'Eastport','goal',89,47,100,50);add(65,'Northbridge','goal',90,55,100,50);add(84,'Eastport','goal',88,39,100,50);
events.sort((a,b)=>a.minute-b.minute);events.forEach((e,i)=>e.id=`EV-${String(i+1).padStart(3,'0')}`);
function windowStats(team,start,end){const list=events.filter(e=>e.team===team&&e.minute>=start&&e.minute<end);const shots=list.filter(e=>e.type==='shot').length;const entries=list.filter(e=>e.type==='box_entry').length;return {shots,entries,pressure:shots*3+entries,evidence:list.filter(e=>e.type==='shot'||e.type==='box_entry')};}
function detectMoments(){const candidates=[];for(let start=6;start<=81;start+=5){for(const team of ['Northbridge','Eastport']){const before=windowStats(team,start-5,start),after=windowStats(team,start,start+5),delta=after.pressure-before.pressure;if(delta>=10)candidates.push({team,start,end:start+5,before,after,delta});}}return candidates.sort((a,b)=>b.delta-a.delta).slice(0,3).sort((a,b)=>a.start-b.start);}

const moments=detectMoments();
return {events,moments,windowStats};
});
