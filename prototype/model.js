(function(root){
  'use strict';
  function rational(value){
    const s=String(value).trim().replace(',','.');
    if(s.length>24)throw Error('invalid');
    let n,d;
    if(/^-?\d{1,9}\/-?\d{1,9}$/.test(s)){
      const a=s.split('/');n=BigInt(a[0]);d=BigInt(a[1]);
      if(d===0n)throw Error('invalid');
    }else if(/^-?\d{1,9}(\.\d{1,8})?$/.test(s)){
      const negative=s.startsWith('-'),a=s.replace('-','').split('.');
      d=10n**BigInt((a[1]||'').length);n=BigInt(a[0]+(a[1]||''))*(negative?-1n:1n);
    }else throw Error('invalid');
    if(d<0n){n=-n;d=-d;}
    let a=n<0n?-n:n,b=d;while(b){const c=a%b;a=b;b=c;}
    return {n:n/(a||1n),d:d/(a||1n)};
  }
  function score(value,reference){
    try{const a=rational(value),b=rational(reference);return {valid:true,correct:a.n*b.d===b.n*a.d,normalised:a.d===1n?String(a.n):`${a.n}/${a.d}`};}
    catch(_){return {valid:false,correct:false};}
  }
  function submit(attempts,item,value,now){
    if(attempts[item.id])return {attempts,repeated:true,award:0,record:attempts[item.id]};
    const result=score(value,item.answer);if(!result.valid)return {attempts,invalid:true,award:0};
    const record={id:item.id,skill:item.skill,template:item.template,parameters:item.parameters,correct:result.correct,answer:String(value),independent:true,transfer:true,date:now||new Date().toISOString().slice(0,10),xp:10+(result.correct?5:0),contentVersion:1};
    return {attempts:{...attempts,[item.id]:record},award:record.xp,record};
  }
  function status(attempts,skill,justification,now){
    const today=now||new Date().toISOString().slice(0,10),ms=Date.parse(today+'T00:00:00Z');
    let rows=Object.values(attempts).filter(a=>a.skill===skill&&a.independent);
    if(!rows.length)return {key:'insufficient',n:0,correct:0,dates:0,templates:0,transfer:false,justified:justification===true};
    const latest=rows.map(a=>a.date).sort().at(-1);
    if((ms-Date.parse(latest+'T00:00:00Z'))/86400000>14)return {key:'stale',n:rows.length,correct:rows.filter(a=>a.correct).length,latest,dates:0,templates:0,transfer:false,justified:justification===true};
    rows=rows.filter(a=>(ms-Date.parse(a.date+'T00:00:00Z'))/86400000<=14);
    const seen=new Set();rows=rows.filter(a=>{const k=a.template+'|'+a.parameters;if(seen.has(k))return false;seen.add(k);return true;});
    const n=rows.length,correct=rows.filter(a=>a.correct).length,dates=new Set(rows.map(a=>a.date)).size,templates=new Set(rows.map(a=>a.template)).size;
    const hasTransfer=rows.some(a=>a.transfer),transfer=rows.some(a=>a.transfer&&a.correct),justified=justification===true;
    const evidence=n>=5&&dates>=2&&templates>=2&&hasTransfer&&typeof justification==='boolean';
    const key=!evidence?'insufficient':correct/n<.6?'review':correct/n<.8||!transfer||!justified?'developing':'confirmed';
    return {key,n,correct,dates,templates,transfer,justified,latest};
  }
  function reportFixture(now){
    const date=now||new Date().toISOString().slice(0,10),day=(n)=>new Date(Date.parse(date+'T00:00:00Z')-n*86400000).toISOString().slice(0,10);
    const attempts={},justifications={SK01:false,SK03:true,SK04:true,SK05:true};
    [['SK01',1],['SK03',4],['SK04',3],['SK05',4]].forEach(([skill,correct])=>{
      for(let i=0;i<5;i++){const id=`sample-${skill}-${i}`;attempts[id]={id,skill,template:'template-'+(i%2),parameters:String(i),independent:true,correct:i<correct,transfer:i===0,date:day(skill==='SK05'?18+(i%2):i%2),xp:0,contentVersion:1};}
    });
    return {attempts,justifications};
  }
  const api={rational,score,submit,status,reportFixture};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.MathVerityModel=api;
})(typeof globalThis!=='undefined'?globalThis:this);
