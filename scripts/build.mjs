import { mkdir, writeFile, copyFile } from 'node:fs/promises';
import { pages } from '../src/pages.mjs';
await mkdir('dist', {recursive:true});
const nav = [['/', 'Overview'], ['/install.html','Install'], ['/guide.html','Get started'], ['/about.html','Our approach']];
for (const page of pages) {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="description" content="${page.description}"><title>${page.title} · Tiamatrix</title><link rel="icon" href="/mark.svg" type="image/svg+xml"><link rel="stylesheet" href="/style.css"><script src="/theme.js" defer></script></head>
<body><a class="skip" href="#main">Skip to content</a><div class="column"><header><a class="brand" href="/" aria-label="Tiamatrix home"><img src="/mark.svg" width="33" height="33" alt="">tiamatrix<span class="brand-dot" aria-hidden="true">✳</span></a><button id="theme" type="button" aria-label="Switch color theme" hidden>Dark mode</button></header>
<nav aria-label="Main navigation">${nav.map(([url,label])=>`<a href="${url}"${url===page.path?' aria-current="page"':''}>${label}</a>`).join('')}</nav>
<main id="main">${page.body}</main><footer><a class="brand" href="/">tiamatrix</a><p>People, agents, and the work between them.</p><div class="footer-links"><a href="/about.html#privacy">Privacy</a><a href="https://github.com/blackcode-ch/tmx-go-public">Source on GitHub ↗</a></div><p class="small">First-look edition · November 2026</p></footer></div></body></html>`;
  await writeFile(`dist/${page.file}`, html);
}
for (const file of ['style.css','theme.js','mark.svg']) await copyFile(`src/${file}`,`dist/${file}`);
console.log(`Built ${pages.length} static pages.`);
