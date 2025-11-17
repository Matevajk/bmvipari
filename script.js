function showLanguageBlock(lang) {
  document.querySelector('.lang-' + lang).style.display = 'block';
}

fetch("https://ipapi.co/json/")
  .then(response => response.json())
  .then(data => {
    const isHungary = data.country === "HU";
    showLanguageBlock(isHungary ? 'hu' : 'en');
  })
  .catch(() => {
    showLanguageBlock('en');
  });
