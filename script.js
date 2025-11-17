// script.js - robust geolocation-based language injection
(async function () {
  const content = document.getElementById('content');

  const tpl = {
    hu: `
      <div class="lang-block">
        <h1>BMV Ipari Vállalat</h1>
        <p>Természetesen gyártani fogunk.<br>Minőség, Önnek jár<br><strong>Érkezés: 2028</strong></p>
        <div class="contact">Ideiglenes kapcsolat: <a href="mailto:banatiize@gmail.com">banatiize@gmail.com</a></div>
        <div class="sigil">bmvipari.hu – Minden jog fenntartva</div>
      </div>
    `,
    en: `
      <div class="lang-block">
        <h1>BMV Ipari Vállalat</h1>
        <p>Of course we will do manufacturing.<br>Quality — you deserve it.<br><strong>Coming in 2028.</strong></p>
        <div class="contact">Temporary contact: <a href="mailto:banatiize@gmail.com">banatiize@gmail.com</a></div>
        <div class="sigil">bmvipari.hu – All rights reserved</div>
      </div>
    `
  };

  // Inject a minimal loading placeholder immediately
  content.innerHTML = `<div class="loading"><p>Loading…</p></div>`;

  // Helper: race fetch with timeout
  function fetchWithTimeout(url, options = {}, timeout = 2500) {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout))
    ]);
  }

  // Determine country via ipapi.co, fallback to 'en'
  try {
    const res = await fetchWithTimeout('https://ipapi.co/json/', {}, 2500);
    if (!res.ok) throw new Error('non-200');
    const data = await res.json();
    const lang = (data && data.country === 'HU') ? 'hu' : 'en';

    // set document language attribute for accessibility & SEO
    document.documentElement.lang = (lang === 'hu') ? 'hu' : 'en';

    // inject chosen language HTML
    content.innerHTML = tpl[lang];

  } catch (e) {
    // On any failure, show English immediately and set lang attribute
    document.documentElement.lang = 'en';
    content.innerHTML = tpl.en;
  }
})();
