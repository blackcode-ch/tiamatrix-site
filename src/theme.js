const control = document.querySelector('#theme');
const dark = () => document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
const update = () => { control.textContent = dark() ? 'Light mode' : 'Dark mode'; control.setAttribute('aria-label', `Switch to ${dark() ? 'light' : 'dark'} mode`); };
control.hidden = false;
update();
control.addEventListener('click', () => { document.documentElement.dataset.theme = dark() ? 'light' : 'dark'; update(); });
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', update);
