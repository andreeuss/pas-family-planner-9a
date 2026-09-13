/* PAS Family Planner v0.2.5.1 hotfix
 * - Dynamic active-week day detection (no hardcoded PAS dates)
 * - Avoids claiming "Hoy" when current date is outside the active PAS week
 * - 44x44px minimum touch target for settings icon buttons
 */
(function(){
  'use strict';

  function localIso(date){
    const y=date.getFullYear();
    const m=String(date.getMonth()+1).padStart(2,'0');
    const d=String(date.getDate()).padStart(2,'0');
    return `${y}-${m}-${d}`;
  }

  function weekDate(entry){
    if(entry && entry.iso){
      const m=String(entry.iso).match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if(m) return new Date(Number(m[1]),Number(m[2])-1,Number(m[3]));
    }
    const year=entry?.year ?? (typeof activePasMeta!=='undefined' ? activePasMeta.year : new Date().getFullYear());
    const month=entry?.month ?? (typeof activePasMeta!=='undefined' && activePasMeta.monthName ? ({enero:0,febrero:1,marzo:2,abril:3,mayo:4,junio:5,julio:6,agosto:7,septiembre:8,setiembre:8,octubre:9,noviembre:10,diciembre:11})[String(activePasMeta.monthName).toLowerCase()] : null);
    if(year!=null && month!=null && entry?.date!=null) return new Date(Number(year),Number(month),Number(entry.date));
    return null;
  }

  function resolveActiveDay(now=new Date()){
    if(typeof WEEK==='undefined' || !Array.isArray(WEEK) || !WEEK.length){
      return {key:'MON',inWeek:false,relation:'unknown'};
    }
    const iso=localIso(now);
    const exact=WEEK.find(x=>x.iso===iso || (weekDate(x) && localIso(weekDate(x))===iso));
    if(exact) return {key:exact.key,inWeek:true,relation:'current'};

    const dated=WEEK.map(x=>({entry:x,date:weekDate(x)})).filter(x=>x.date instanceof Date && !Number.isNaN(x.date.getTime()));
    if(!dated.length) return {key:WEEK[0].key||'MON',inWeek:false,relation:'unknown'};
    const today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    const first=dated[0].date,last=dated[dated.length-1].date;
    if(today<first) return {key:dated[0].entry.key,inWeek:false,relation:'before'};
    if(today>last) return {key:dated[dated.length-1].entry.key,inWeek:false,relation:'after'};
    const nearest=dated.reduce((best,x)=>Math.abs(x.date-today)<Math.abs(best.date-today)?x:best,dated[0]);
    return {key:nearest.entry.key,inWeek:false,relation:'between'};
  }

  // Replace the legacy hardcoded date resolver with one driven by WEEK.
  try{
    todayKey=function(){ return resolveActiveDay(new Date()).key; };
  }catch(_){ /* classic-script global may not be writable in some engines */ }

  function applyContext(){
    const ctx=resolveActiveDay(new Date());
    try{
      if(typeof state!=='undefined') state.day=ctx.key;
      if(typeof I18N!=='undefined'){
        if(I18N.es) I18N.es.today=ctx.inWeek?'Hoy':'Día seleccionado';
        if(I18N.en) I18N.en.today=ctx.inWeek?'Today':'Selected day';
      }
      if(typeof renderCurrent==='function') renderCurrent();
    }catch(_){ }

    const version=document.getElementById('versionText');
    if(version) version.textContent='PAS Family Planner · v0.2.5.1 · 13/09/2026';

    document.documentElement.dataset.pasHotfix='0.2.5.1';
  }

  const style=document.createElement('style');
  style.id='pas-hotfix-0251-style';
  style.textContent='.iconbtn{width:44px!important;height:44px!important;min-width:44px!important;min-height:44px!important}';
  document.head.appendChild(style);

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applyContext,{once:true});
  else applyContext();

  // Expose only for deterministic device-console verification.
  window.PasFamilyHotfix0251={resolveActiveDay,version:'0.2.5.1'};
})();
