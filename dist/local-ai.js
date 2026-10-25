const aiResults=new Map();let aiReady=false,aiBusy=false,aiModel='phi4-mini';
function renderAI(){
 const key=`${selected}:${$('audience').value}`,result=aiResults.get(key);
 $('generate-ai').disabled=!aiReady||aiBusy;
 $('generate-ai').textContent=aiBusy?'Generating…':'Generate AI explanation';
 $('ai-output').textContent=result?result.explanation:'';
 $('ai-citations').textContent=result?`Model: ${result.model} · source: ${result.source} · cited events: ${result.evidence_ids.join(', ')}`:'';
}
async function connectAI(){
 try{const response=await fetch('/api/health',{signal:AbortSignal.timeout(5000)});if(!response.ok)throw Error();const status=await response.json();aiReady=status.ready;aiModel=status.model;$('ai-status').textContent=aiReady?`${aiModel} is available locally. Select a moment and generate an explanation.`:`Local server connected. Install Ollama and run: ollama pull ${aiModel}. Then reload this page.`;}
 catch{$('ai-status').textContent='Local AI is not connected. To enable it, download the repository, install Ollama, pull phi4-mini, and run node server.mjs. The hosted preview keeps the calculated explanations.';}
 renderAI();
}
$('generate-ai').onclick=async()=>{
 const index=selected,audience=$('audience').value;aiBusy=true;renderAI();$('ai-status').textContent=`Generating with ${aiModel}. First load may take a while…`;
 try{const response=await fetch('/api/explain',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({momentIndex:index,audience}),signal:AbortSignal.timeout(180000)});const result=await response.json();if(!response.ok)throw Error(result.error||'Generation failed');aiResults.set(`${index}:${audience}`,result);$('ai-status').textContent='Model-generated explanation. Event references passed validation; review the wording against the evidence.';}
 catch(error){$('ai-status').textContent=`AI unavailable: ${error.message}. The calculated explanation above remains available.`;}
 finally{aiBusy=false;renderAI();}
};
connectAI();
