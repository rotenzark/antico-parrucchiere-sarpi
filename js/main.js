/* ===== L'ANTICO PARRUCCHIERE · main.js ===== */
(function(){
  'use strict';

  /* ---- INTRO ---- */
  var intro=document.getElementById('intro');
  function closeIntro(){ if(intro){intro.classList.add('done');document.body.style.overflow='';} }
  if(intro){
    document.body.style.overflow='hidden';
    var skip=document.getElementById('intro-skip');
    if(skip) skip.addEventListener('click',closeIntro);
    setTimeout(closeIntro,2000);
  }
  if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches){ if(intro){intro.classList.add('done');document.body.style.overflow='';} }

  /* ---- HEADER scroll ---- */
  var header=document.getElementById('site-header');
  function onScroll(){ if(header) header.classList.toggle('scrolled',window.scrollY>18); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* ---- BURGER ---- */
  var burger=document.getElementById('burger'), nav=document.querySelector('.nav');
  if(burger&&nav){
    burger.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      burger.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');});});
  }

  /* ---- REVEAL ---- */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

  /* ---- LIGHTBOX ---- */
  var lb=document.getElementById('lightbox'),lbImg=document.getElementById('lb-img'),lbClose=document.getElementById('lb-close');
  document.querySelectorAll('.g-item').forEach(function(it){
    it.addEventListener('click',function(){
      var full=it.getAttribute('data-full'); if(!full)return;
      lbImg.src=full; var im=it.querySelector('img'); lbImg.alt=im?im.alt:''; lb.classList.add('open');
    });
  });
  function closeLb(){lb.classList.remove('open');setTimeout(function(){lbImg.src='';},300);}
  if(lbClose) lbClose.addEventListener('click',closeLb);
  if(lb) lb.addEventListener('click',function(e){if(e.target===lb)closeLb();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lb.classList.contains('open'))closeLb();});

  /* ---- ORARI DINAMICI ---- */
  // getDay: 0=Dom..6=Sab. Mar–Sab 09–19:30 · Dom e Lun chiuso.
  var TABLE={0:[],1:[],2:[[9,19.5]],3:[[9,19.5]],4:[[9,19.5]],5:[[9,19.5]],6:[[9,19.5]]};
  function nowRome(){
    try{ var s=new Date().toLocaleString('en-US',{timeZone:'Europe/Rome'}); return new Date(s); }
    catch(e){ return new Date(); }
  }
  function fmt(h){var H=Math.floor(h),M=Math.round((h-H)*60);return H+':'+(M<10?'0'+M:''+M);}
  function updateLive(){
    var dot=document.getElementById('live-dot'), txt=document.getElementById('live-text');
    if(!dot||!txt)return;
    var d=nowRome(), day=d.getDay(), hr=d.getHours()+d.getMinutes()/60;
    var wins=TABLE[day]||[], openNow=false, closeAt=0, nextOpen=null;
    for(var i=0;i<wins.length;i++){ if(hr>=wins[i][0]&&hr<wins[i][1]){openNow=true;closeAt=wins[i][1];} if(hr<wins[i][0]&&nextOpen===null){nextOpen=wins[i][0];} }
    var LANG=document.documentElement.getAttribute('lang')||'it';
    if(openNow){
      dot.className='open';
      txt.textContent=(LANG==='en'?'Open now · until ':'Aperto ora · fino alle ')+fmt(closeAt);
    }else if(nextOpen!==null){
      dot.className='closed';
      txt.textContent=(LANG==='en'?'Closed · opens at ':'Chiuso · apre alle ')+fmt(nextOpen);
    }else{
      var names=LANG==='en'?['Sun','Mon','Tue','Wed','Thu','Fri','Sat']:['dom','lun','mar','mer','gio','ven','sab'];
      var nd=null,ndDay=null;
      for(var k=1;k<=7;k++){ var dd=(day+k)%7; if((TABLE[dd]||[]).length){ nd=TABLE[dd][0][0]; ndDay=dd; break; } }
      dot.className='closed';
      if(nd!==null) txt.textContent=(LANG==='en'?'Closed · opens ':'Chiuso · apre ')+names[ndDay]+' '+fmt(nd);
      else txt.textContent=(LANG==='en'?'Closed':'Chiuso');
    }
  }
  updateLive(); setInterval(updateLive,60000);

  /* ---- I18N ---- */
  var EN={
    'intro.skip':'Enter →',
    'brand.sub':'della Paolo Sarpi · since 1937',
    'nav.storia':'Since 1937','nav.marco':'Meet Marco','nav.servizio':'The shop','nav.dove':'Find us',
    'cta.book':'Book',
    'hero.eyebrow':'Via Paolo Sarpi 63 · Chinatown, Milan',
    'hero.script':'since 1937',
    'hero.sub':'The only barbershop that opens straight onto our beloved via Sarpi, since 1937. A historic shop of Milan: scissor cuts, beard trims and traditional shaves. No doubts — <b>always choose the original</b>.',
    'hero.cta1':'Book with Marco','hero.cta2':'The service',
    'hero.live':'Checking hours…','hero.f2':'★ 4.5 · A historic shop of Milan',
    'storia.kicker':'Since 1937',
    'storia.h2':'The original of<br>via Paolo Sarpi.',
    'storia.p1':'For <b>almost ninety years</b>, the same address, the same street. L’antico Parrucchiere della Paolo Sarpi is <b>the only barbershop that opens straight onto</b> via Sarpi, in the heart of Chinatown, since 1937.',
    'storia.p2':'Recognised as a <em>Historic Shop of Milan</em>, it’s the workshop of <b>Marco Regnetta</b>, master barber: steady hands, sharp scissors and a taste for doing things the old way.',
    'storia.s1':'since the same year','storia.s2':'years on the street','storia.s3':'and a historic shop',
    'marco.kicker':'Meet Marco',
    'marco.h2':'The cut,<br>and a good chat.',
    'marco.p1':'People come to Marco for the cut — <b>strictly with scissors</b>, truly excellent — but also just for the pleasure of a few words. He’s a man of <em>rare good humour</em>, and it shows.',
    'marco.p2':'A true professional, polite and kind, who looks after every customer. Getting your hair cut here, regulars have said for years, is simply a pleasure.',
    'marco.quote':'«No doubts: always choose the original.»',
    'servizio.kicker':'The shop','servizio.h2':'The service',
    'servizio.sub':'A few things, done properly. With products like Acqua di Parma and D.R. Harris. Honest prices: ask in the shop.',
    'serv.1t':'Classic cut','serv.1p':'The men’s cut, tailored to the face and the taste.',
    'serv.2t':'Scissor cut','serv.2p':'The house specialty: strictly with scissors, the old way.',
    'serv.3t':'Beard & trim','serv.3p':'Shaping and trimming the beard, with an eye for detail.',
    'serv.4t':'Traditional shave','serv.4p':'Hot towel, razor and classic products: the full ritual.',
    'serv.5t':'Cut & Beard','serv.5p':'The full package to get tidy from top to chin.',
    'serv.6t':'Kids’ cut','serv.6p':'The little ones too, with patience and a smile.',
    'gallery.kicker':'The shop','gallery.h2':'Inside the barbershop',
    'rev.kicker':'The word','rev.h2':'4.5 ★ · «simply a pleasure»',
    'dove.kicker':'Find us','dove.h2':'On via Sarpi,<br>at number 63.',
    'dove.addr':'Address','dove.addr2':'— Chinatown','dove.hours':'Hours','dove.hoursv':'Tue–Sat 9:00–19:30 · Sun & Mon closed',
    'dove.phone':'Phone','dove.book':'Appointments','dove.bookv':'Drop by the shop or call to book with Marco.',
    'dove.call':'Book with Marco','dove.route':'Get directions',
    'faq.h2':'Frequently asked questions',
    'faq.q1':'Where is the barbershop?','faq.a1':'At Via Paolo Sarpi 63, in the heart of Milan’s Chinatown: the only barbershop that opens straight onto the street, since 1937.',
    'faq.q2':'What services do you offer?','faq.a2':'Classic and scissor cuts, beard and trim, traditional hot-towel shave, cut & beard and kids’ cuts. With products like Acqua di Parma and D.R. Harris.',
    'faq.q3':'Do I need to book?','faq.a3':'You can drop by the shop or call 377 250 8102 to make an appointment with Marco.',
    'faq.q4':'When are you open?','faq.a4':'Tuesday to Saturday, from 9:00 to 19:30. Closed Sunday and Monday.',
    'foot.sub':'della Paolo Sarpi · since 1937 · Milan',
    'foot.where':'Where','foot.hours':'Hours','foot.hours2':'Tue–Sat 9–19:30','foot.hours3':'Sun & Mon closed','foot.contact':'Contact',
    'foot.disclaimer':'Demo website. Content and photos gathered from public sources (Google Maps); hours, services and prices are indicative, to be confirmed with the shop.',
    'rev.g1':'Google review · <span>★★★★★</span>','rev.g2':'Google review · <span>★★★★★</span>',
    'ab.call':'Book','ab.servizio':'Service','ab.route':'Directions'
  };
  var IT={};
  document.querySelectorAll('[data-i18n]').forEach(function(el){ IT[el.getAttribute('data-i18n')]=el.innerHTML; });
  function setLang(lang){
    var dict=lang==='en'?EN:IT;
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k=el.getAttribute('data-i18n'); if(dict[k]!=null) el.innerHTML=dict[k]; else if(IT[k]!=null) el.innerHTML=IT[k];
    });
    document.documentElement.setAttribute('lang',lang);
    document.querySelectorAll('.lang button').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-lang')===lang);});
    try{localStorage.setItem('ap_lang',lang);}catch(e){}
    updateLive();
  }
  document.querySelectorAll('.lang button').forEach(function(b){ b.addEventListener('click',function(){setLang(b.getAttribute('data-lang'));}); });
  var saved='it'; try{saved=localStorage.getItem('ap_lang')||'it';}catch(e){}
  if(saved==='en') setLang('en');

})();
