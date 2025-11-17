// script.js - English primary, manual switch to Hungarian, updates URL to /en or /hu (no reload)

(function () {
  const content = document.getElementById('content');
  const btnEn = document.getElementById('btn-en');
  const btnHu = document.getElementById('btn-hu');

  if (!content || !btnEn || !btnHu) return;

  const tpl = {
    en: `
      <div class="lang-block">
        <h1>BMV Ipari Vállalat</h1>
        <p>Of course we will do manufacturing.<br>Quality — you deserve it.<br><strong>Coming in 2028.</strong></p>
        <div class="contact">Temporary contact: <a href="mailto:banatiize@gmail.com">banatiize@gmail.com</a></div>
        <div class="sigil">bmvipari.hu – All rights reserved</div>
      </div>
    `,
    hu: `
      <div class="lang-block">
        <h1>BMV Ipari Vállalat</h1>
        <p>Természetesen gyártani fogunk.<br>Minőség, Önnek jár<br><strong>Érkezés: 2028</strong></p>
        <div class="contact">Ideiglenes kapcsolat: <a href="mailto:banatiize@gmail.com">banatiize@gmail.com</a></div>
        <div class="sigil">bmvipari.hu – Minden jog fenntartva</div>
      </div>
    `
  };

  // Helper to set content and UI state
  function render(lang, pushUrl = true) {
    // ensure valid lang
    lang = (lang === 'hu') ? 'hu' : 'en';
    // set document lang attribute
    document.documentElement.lang = (lang === 'hu') ? 'hu' : 'en';
    // inject HTML
    content.innerHTML = tpl[lang];
    // update pressed state
    btnEn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
    btnHu.setAttribute('aria-pressed', lang === 'hu' ? 'true' : 'false');
    // update URL path without reload: /en or /hu (root shows /en)
    if (pushUrl) {
      const base = window.location.origin + window.location.pathname.replace(/\/(en|hu)\/?$/, '');
      const newPath = (lang === 'hu') ? '/hu' : '/en';
      const url = base.endsWith('/') ? base.slice(0, -1) + newPath : base + newPath;
      history.replaceState({ lang }, '', url);
    }
  }

  // Determine initial language from URL path: /hu -> Hungarian, otherwise English
  function initialLangFromPath() {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/hu') || path === '/hu' || path.startsWith('/hu/')) return 'hu';
    return 'en';
  }

  // Event listeners for manual switching
  btnEn.addEventListener('click', () => render('en', true));
  btnHu.addEventListener('click', () => render('hu', true));

  // Handle back/forward navigation to keep language in sync
  window.addEventListener('popstate', (ev) => {
    const lang = (ev.state && ev.state.lang) ? ev.state.lang : initialLangFromPath();
    render(lang, false);
  });

  // Initial render
  render(initialLangFromPath(), true);
})();
