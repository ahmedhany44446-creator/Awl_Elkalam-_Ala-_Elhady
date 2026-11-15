(function () {
  'use strict';

  var WA = '201011321758';

  var levels = [
      { n: '01', ar: 'مبتدئ', en: 'Beginner', label: 'مبتدئ · Beginner', desc: 'لسه بتبدأ أو بتتكسف تنطق؟ هنبني الأساس سوا خطوة خطوة وبهدوء.', p1: 'أساسيات الإنجليزي المحكي', p2: 'مفردات أساسية', p3: 'تحيات وجمل بسيطة', h: 150 },
      { n: '02', ar: 'متوسط', en: 'Intermediate', label: 'متوسط · Intermediate', desc: 'عارف شوية بس لسانك مش بيطاوعك؟ هنبني الطلاقة بمحادثات من الحياة اليومية.', p1: 'بناء الطلاقة', p2: 'محادثات الحياة اليومية', p3: 'أساسيات القواعد', h: 230 },
      { n: '03', ar: 'محادثة', en: 'Conversation', label: 'محادثة · Conversation', desc: 'هنا بنتكلم بجد: حوار من الواقع ونقاشات بتبني ثقتك قدام أي حد.', p1: 'حوار من مواقف حقيقية', p2: 'بناء الثقة', p3: 'نقاش وتدريب مستمر', h: 320 }
];
var prompts = [
      { en: 'Tell me about yourself.', ar: 'احكيلي عن نفسك.', st: 'I recently graduated from … and I’m excited about …', tip: 'ابدأ بدراستك، وبعدين قول إيه اللي بيشدك في الوظيفة. تلات جمل كفاية.' },
      { en: 'Why do you want to work with us?', ar: 'ليه عايز تشتغل معانا؟', st: 'I’m drawn to this company because …', tip: 'اربط اللي بتحبه في الشركة باللي تقدر تقدمه فيها.' },
      { en: 'What is your biggest strength?', ar: 'إيه أكبر نقطة قوة عندك؟', st: 'I’d say my biggest strength is …', tip: 'اختار نقطة واحدة وادعمها بموقف حقيقي حصل معاك.' },
      { en: 'Tell me about a challenge you faced.', ar: 'احكيلي عن تحدي واجهته.', st: 'One challenge I faced was … so I …', tip: 'قول التحدي كان إيه، وعملت إيه، وإيه كانت النتيجة.' },
      { en: 'Where do you see yourself in five years?', ar: 'شايف نفسك فين بعد ٥ سنين؟', st: 'In five years, I hope to …', tip: 'اتكلم عن تطورك وتعلمك، مش عن منصب بعينه.' }
];
var faqData = [
      { q: 'مستواي ضعيف جدًا، ينفع أبدأ؟', a: 'أكيد. مستوى المبتدئ بيبدأ من أساسيات الإنجليزي المحكي: مفردات بسيطة وتحيات وجمل أولى، وهتحس إنك مش متأخر عن حد.' },
      { q: 'هنذاكر قواعد كتير؟', a: 'لأ. الكورس عملي ومبني على الكلام والممارسة، مش على القواعد المعقدة. بنوصّلك أساسيات القواعد اللي محتاجها بس، في المستوى المتوسط.' },
      { q: 'الكورس ده لمين؟', a: 'لأي حد عايز يتكلم إنجليزي بثقة، وبالأخص خريجي الكليات النظرية والباحثين عن شغل اللي مقبلين على مقابلات.' },
      { q: 'هطلع بإيه في الآخر؟', a: 'لسان متعوّد على الكلام، وثقة في المواقف الحقيقية، وتدريب فعلي على أسئلة المقابلات بشخصيتك إنت.' },
      { q: 'بكام السيشن وبتبقى امتى؟', a: 'السيشن بـ ٤٠ جنيه، وبتبقى كل يوم أحد الساعة ٣ عصراً.' },
      { q: 'لو الميعاد مش مناسب معايا؟', a: 'عادي. الميعاد الأساسي كل أحد الساعة ٣ عصراً، ولو مش مناسب معاك بنحدد ميعاد تاني معاك على واتساب.' },
      { q: 'فين المكان؟', a: 'في iki عند القرية الأولمبية.' },
      { q: 'الكورس أونلاين ولا أوفلاين؟', a: 'أوفلاين (حضوري)، وفي متابعة بعد السيشن على جروب واتساب.' },
      { q: 'الحجز بيتم إزاي؟', a: 'اعمل اختبار المستوى، وبعدها املا فورم الحجز وهتتحوّل علطول على واتساب ببياناتك ونتيجتك.' }
];


    var PLUS = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#17104F" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M12 4v16M4 12h16"/></svg>';

  var st = { lvl: 0, q: 0, faq: 0, busy: false };

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function mk(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function setB(key, val) { $$('[data-b="' + key + '"]').forEach(function (e) { e.textContent = val; }); }
  function show(key, on) { $$('[data-if="' + key + '"]').forEach(function (e) { e.hidden = !on; }); }
  function slot(name) { var s = $('[data-slot="' + name + '"]'); if (s) s.textContent = ''; return s; }
  function restart(el, cls) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }
  function reduced() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

  /* ---------- levels ---------- */
  function renderLevels(animate) {
    var tabs = slot('tabs');
    levels.forEach(function (l, i) {
      var b = mk('button', 'tab' + (st.lvl === i ? ' on' : ''), l.label);
      b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', st.lvl === i ? 'true' : 'false');
      b.addEventListener('click', function () { st.lvl = i; renderLevels(true); });
      tabs.appendChild(b);
    });
    var stairs = slot('stairs');
    levels.forEach(function (l, i) {
      var a = mk('div', 'arch' + (st.lvl === i ? ' on' : ''), l.n);
      a.style.width = '30%'; a.style.maxWidth = '170px'; a.style.height = l.h + 'px';
      stairs.appendChild(a);
    });
    var c = levels[st.lvl];
    setB('cur.n', c.n); setB('cur.en', c.en); setB('cur.ar', c.ar); setB('cur.desc', c.desc);
    setB('cur.p1', c.p1); setB('cur.p2', c.p2); setB('cur.p3', c.p3);
    if (animate) restart($('[data-anim="lv"]'), 'lv-swap-a');
  }

  /* ---------- mock interview ---------- */
  function renderPrompt(animate) {
    var p = prompts[st.q];
    setB('pCount', (st.q + 1) + ' / ' + prompts.length);
    setB('p.en', p.en); setB('p.ar', p.ar); setB('p.st', p.st); setB('p.tip', p.tip);
    if (animate) restart($('[data-anim="p"]'), 'swap-a');
  }

  /* ---------- faq ---------- */
  function renderFaq() {
    var box = slot('faqs');
    faqData.forEach(function (f, i) {
      var open = st.faq === i;
      var wrap = mk('div'); wrap.style.borderBottom = '1.5px solid rgba(23,16,79,.14)';
      var h = mk('h3'); h.style.margin = '0';
      var b = mk('button', 'faq-q' + (open ? ' open' : '')); b.type = 'button'; b.setAttribute('aria-expanded', open ? 'true' : 'false');
      b.appendChild(mk('span', null, f.q));
      var pl = mk('span', 'pl'); pl.setAttribute('aria-hidden', 'true'); pl.innerHTML = PLUS; b.appendChild(pl);
      var body = mk('div', 'faq-a' + (open ? ' open' : ''));
      var inner = mk('div'); var p = mk('p', null, f.a);
      p.style.cssText = 'margin:0;padding:0 0 28px;font-size:18px;line-height:2;color:var(--muted)';
      inner.appendChild(p); body.appendChild(inner);
      b.addEventListener('click', function () {
        var was = $$('.faq-q', box)[i].classList.contains('open');
        $$('.faq-q', box).forEach(function (x, k) {
          var on = (k === i) && !was;
          x.classList.toggle('open', on); x.setAttribute('aria-expanded', on ? 'true' : 'false');
          $$('.faq-a', box)[k].classList.toggle('open', on);
        });
        st.faq = was ? -1 : i;
      });
      h.appendChild(b); wrap.appendChild(h); wrap.appendChild(body); box.appendChild(wrap);
    });
  }

  /* ---------- placement assistant hooks (logic lives in coach.js) ---------- */
  function syncCoach() {
    var R = window.AKCoach && window.AKCoach.result;
    show('testDone', !!R); show('testNotDone', !R);
    if (R) setB('levelText', R.level + ' · ' + R.levelAr + ' (' + R.score + '/' + R.total + ') — ' + R.goal);
  }
  window.addEventListener('ak:done', syncCoach);
  window.addEventListener('ak:reset', syncCoach);

  /* ---------- booking form ---------- */
  function toEnDigits(s) {
    return s.replace(/[٠-٩]/g, function (d) { return String(d.charCodeAt(0) - 0x0660); })
            .replace(/[۰-۹]/g, function (d) { return String(d.charCodeAt(0) - 0x06F0); });
  }
  function cleanName(s) { return s.replace(/[\u0000-\u001F\u007F<>]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60); }
  function cleanPhone(s) {
    var d = toEnDigits(s).replace(/[\s\-().]/g, '');
    if (/^\+?20/.test(d)) d = '0' + d.replace(/^\+?20/, '');
    return /^01[0125]\d{8}$/.test(d) ? d : '';
  }
  function err(msg) { setB('errMsg', msg || ''); show('errMsg', !!msg); }
  function onSubmit(e) {
    e.preventDefault();
    var form = e.target;
    var name = cleanName(form.elements.name.value);
    var phone = cleanPhone(form.elements.phone.value);
    var R = window.AKCoach && window.AKCoach.result;
    if (!R) { err('لازم تخلّص اختبار المستوى الأول.'); return; }
    if (name.length < 2) { err('من فضلك اكتب اسمك.'); return; }
    if (!phone) { err('رقم الواتساب لازم يكون رقم موبايل مصري صحيح (مثال: 01012345678).'); return; }
    err('');
    var msg = 'أهلًا، أنا ' + name + '\nرقمي: ' + phone +
      '\nهدفي من الإنجليزي: ' + R.goal +
      '\nتقييمي لنفسي: ' + R.est +
      '\nنتيجة اختبار المستوى: ' + R.level + ' (' + R.levelAr + ') — ' + R.score + '/' + R.total +
      '\nالمستوى المناسب في الكورس: ' + R.course +
      (R.strong.length ? '\nنقاط القوة: ' + R.strong.join('، ') : '') +
      (R.weak.length ? '\nمحتاج تركيز على: ' + R.weak.join('، ') : '') +
      '\nعايز أحجز في أول الكلام.';
    var url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
    var fb = $('#waFallback'); if (fb) fb.href = url;
    setB('sentName', name);
    show('showForm', false); show('sent', true);
    var w = null;
    try { w = window.open(url, '_blank'); } catch (x) { w = null; }
    if (w) { try { w.opener = null; } catch (y) {} } else { window.location.href = url; }
  }

  /* ---------- mobile menu ---------- */
  function setMenu(on) {
    var b = $('#burger'), m = $('#mmenu'); if (!b || !m) return;
    b.classList.toggle('open', on); m.classList.toggle('open', on);
    b.setAttribute('aria-expanded', on ? 'true' : 'false');
  }

  /* ---------- page transition on in-page links ---------- */
  function go(id) {
    var el = document.getElementById(id); if (!el) return;
    var c = $('#curtain');
    if (reduced() || !c) { el.scrollIntoView(); return; }
    if (st.busy) return;
    st.busy = true; c.className = 'curtain in';
    setTimeout(function () {
      try { el.scrollIntoView({ behavior: 'instant', block: 'start' }); } catch (e) { el.scrollIntoView(); }
      c.className = 'curtain out';
      var fix = function () {
        var d = el.getBoundingClientRect().top - 84;
        if (Math.abs(d) > 2) { try { window.scrollBy({ top: d, behavior: 'instant' }); } catch (e) { window.scrollBy(0, d); } }
      };
      setTimeout(fix, 250); setTimeout(fix, 700); setTimeout(fix, 1200);
    }, 900);
    setTimeout(function () { c.className = 'curtain'; st.busy = false; }, 1800);
    try { history.replaceState(null, '', '#' + id); } catch (e2) {}
  }

  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var act = t.closest('[data-act]');
    if (act) {
      var a = act.getAttribute('data-act');
      if (a === 'toggleMenu') setMenu(!$('#burger').classList.contains('open'));
      else if (a === 'nextPrompt') { st.q = (st.q + 1) % prompts.length; renderPrompt(true); }
      return;
    }
    var link = t.closest('a[href^="#"]');
    if (link) {
      var h = link.getAttribute('href');
      if (h.length > 1) { e.preventDefault(); setMenu(false); go(h.slice(1)); }
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  var form = $('#bookForm'); if (form) form.addEventListener('submit', onSubmit);

  renderLevels(false); renderPrompt(false); renderFaq(); syncCoach();
  show('showForm', true); show('sent', false); show('errMsg', false);
  try { sessionStorage.setItem('ak-seen', '1'); } catch (e3) {}
})();
