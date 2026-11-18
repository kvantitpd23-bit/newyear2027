const icon = (body) => `<svg class="tile-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
const icons = {
  bio: icon('<path d="M9 4c13 0 10 24 14 24M23 4C10 4 13 28 9 28M10 8h12M8 13h16M8 19h16M10 24h12"/>'),
  nano: icon('<circle cx="16" cy="8" r="4"/><circle cx="8" cy="21" r="4"/><circle cx="24" cy="23" r="3"/><path d="m13.8 11-3.6 6.5m9.5-5.7 2.6 7.1M12 21h9"/>'),
  code: icon('<path d="m11 8-7 8 7 8M21 8l7 8-7 8M19 5l-6 22"/>'),
  robo: icon('<path d="m7 25 10-13 9 5M7 25h14M10 25v-5l-5-1 2-4 5-1 5-5 8 5"/><circle cx="17" cy="12" r="2"/><circle cx="26" cy="17" r="2"/><circle cx="17" cy="8" r="2"/>'),
  aero: icon('<path d="M16 16 7 8c-3-3-6 1-3 4l9 5-8 6c-3 3 1 6 4 3l7-8 8 7c3 3 6-1 3-4l-9-6 8-6c3-3-1-6-4-3z"/><circle cx="16" cy="16" r="3"/>'),
  design: icon('<path d="m16 3 12 7-12 7-12-7zM4 10v13l12 7 12-7V10M16 17v13"/>'),
  media: icon('<path d="M11 6c-1-1-3 0-3 2v16c0 2 2 3 4 2l14-8c2-1 2-3 0-4z"/>'),
  tech: icon('<rect x="7" y="7" width="18" height="18" rx="2"/><path d="M12 2v3m8-3v3M12 27v3m8-3v3M2 12h3m-3 8h3m22-8h3m-3 8h3"/>'),
  space: icon('<ellipse cx="16" cy="16" rx="14" ry="5" transform="rotate(-25 16 16)"/><circle cx="16" cy="16" r="7"/><path d="m22 8 2-3M8 23l-2 3"/>'),
  vr: icon('<path d="M4 10a3 3 0 0 1 3-3h18a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-5l-4-4-4 4H7a3 3 0 0 1-3-3zM7 11h5m-5 3h4"/><circle cx="11" cy="17" r="3"/><circle cx="21" cy="17" r="3"/>'),
  photon: icon('<path d="M2 17c4 0 5-8 9-8s5 15 9 15 5-15 10-15M2 22c4 0 5-7 9-7s5 11 9 11 5-11 10-11"/>')
};
const groups = {
  mainGroups: [{name:'БИО',icon:'bio'},{name:'НАНО',icon:'nano'},{name:'АЙТИ',icon:'code'}],
  smallGroups: [{name:'РОБО',icon:'robo'},{name:'АЭРО',icon:'aero'},{name:'ПРОМЫШЛЕННЫЙ ДИЗАЙН',icon:'design'},{name:'МЕДИА',icon:'media'},{name:'ХАЙТЕК',icon:'tech'},{name:'КОСМО',icon:'space'}],
  wideGroups: [{name:'VR',icon:'vr'},{name:'ФОТОНИКА',icon:'photon'}]
};
const state = new Map();
function renderTile(item, size){
  const selected=state.get(item.name)||false;
  return `<button class="tile tile-${size}${selected?' selected':''}" type="button" aria-pressed="${selected}" aria-label="${item.name}: ${selected?'выбрано':'не выбрано'}" data-name="${item.name}">${icons[item.icon]}<span class="tile-name">${item.name}</span><span class="tile-lamp"></span></button>`;
}
document.getElementById('mainGroups').innerHTML=groups.mainGroups.map(x=>renderTile(x,'main')).join('');
document.getElementById('smallGroups').innerHTML=groups.smallGroups.map(x=>renderTile(x,'small')).join('');
document.getElementById('wideGroups').innerHTML=groups.wideGroups.map(x=>renderTile(x,'wide')).join('');
const toast=document.getElementById('toast');let toastTimer;
document.querySelectorAll('.tile').forEach(button=>button.addEventListener('click',()=>{
  const name=button.dataset.name;const selected=!state.get(name);state.set(name,selected);
  button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));button.setAttribute('aria-label',`${name}: ${selected?'выбрано':'не выбрано'}`);
  toast.textContent=selected?`${name} — направление выбрано`:`${name} — направление закрыто`;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),1900);
}));
let busy=false;
document.getElementById('power').addEventListener('click',()=>{
  if(busy)return;busy=true;const app=document.body;const fill=document.getElementById('progressFill');const percent=document.getElementById('loadPercent');const text=document.getElementById('loadingText');const button=document.getElementById('power');
  const duration=60000;const startedAt=performance.now();
  app.style.setProperty('--reboot-progress','0%');app.classList.add('rebooting');button.disabled=true;text.textContent='ПЕРЕЗАГРУЗКА КВАНТОРИУМА…';fill.style.width='0%';percent.textContent='0%';
  const timer=setInterval(()=>{
    const elapsed=performance.now()-startedAt;const progress=Math.min(100,elapsed/duration*100);
    app.style.setProperty('--reboot-progress',`${progress}%`);percent.textContent=`${Math.floor(progress)}%`;
    if(progress>=100){clearInterval(timer);app.style.removeProperty('--reboot-progress');app.classList.remove('rebooting');fill.style.width='100%';percent.textContent='100%';text.textContent='СИСТЕМА ГОТОВА К ОТКРЫТИЯМ';button.disabled=false;busy=false;toast.textContent='Кванториум перезапущен. Вперёд к открытиям!';toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2400)}
  },100);
});
function updateClock(){document.getElementById('clock').textContent=new Intl.DateTimeFormat('ru-RU',{hour:'2-digit',minute:'2-digit',timeZone:'Asia/Yekaterinburg'}).format(new Date())}updateClock();setInterval(updateClock,30000);
