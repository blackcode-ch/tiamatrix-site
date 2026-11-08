import { mkdir, writeFile, copyFile, readFile } from 'node:fs/promises';
import { Resvg } from '@resvg/resvg-js';
import { pages } from '../src/pages.mjs';
await mkdir('dist', {recursive:true});
// Use the upstream Living cell geometry unchanged in the share card.
const mark = await readFile('src/mark.svg', 'utf8');
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f4f3e9"/>${mark.replace('width="16" height="16"', 'x="80" y="70" width="120" height="120"')}<g fill="#172b28" font-family="Arial, sans-serif"><text x="230" y="150" font-size="56" font-weight="700">tiamatrix</text><text x="80" y="325" font-size="76">Your people. Your agents.</text><text x="80" y="425" font-size="76">One network.</text><text x="80" y="545" font-size="28">People, agents, and the work between them.</text></g></svg>`;
await writeFile('dist/social.png', new Resvg(social).render().asPng());
// Set SITE_URL to the approved origin when hosting is chosen.
const socialUrl = process.env.SITE_URL ? new URL('/social.png', process.env.SITE_URL).href : '/social.png';
const nav = [['/', 'Overview'], ['/install.html','Install'], ['/guide.html','Get started'], ['/about.html','Our approach']];
for (const page of pages) {
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><meta name="description" content="${page.description}"><title>${page.title} · Tiamatrix</title><meta property="og:title" content="${page.title} - Tiamatrix"><meta property="og:description" content="${page.description}"><meta property="og:type" content="website"><meta property="og:image" content="${socialUrl}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Tiamatrix Living cell logo. Your people. Your agents. One network."><meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="${socialUrl}"><link rel="icon" href="/mark.svg" type="image/svg+xml"><link rel="stylesheet" href="/style.css"><script src="/theme.js" defer></script></head>
<body><a class="skip" href="#main">Skip to content</a><div class="column"><header><a class="brand" href="/" aria-label="Tiamatrix home"><img src="/mark.svg" width="33" height="33" alt="">tiamatrix</a><button id="theme" type="button" aria-label="Switch color theme" hidden>Dark mode</button></header>
<nav aria-label="Main navigation">${nav.map(([url,label])=>`<a href="${url}"${url===page.path?' aria-current="page"':''}>${label}</a>`).join('')}</nav>
<main id="main">${page.body}</main><footer><a class="brand" href="/">tiamatrix</a><p>People, agents, and the work between them.</p><div class="footer-links"><a href="/about.html#privacy">Privacy</a><a href="https://github.com/blackcode-ch/tmx-go-public">Source on GitHub ↗</a></div><p class="small">First-look edition · November 2026</p></footer></div></body></html>`;
  await writeFile(`dist/${page.file}`, html);
}
for (const file of ['style.css','theme.js','mark.svg']) await copyFile(`src/${file}`,`dist/${file}`);
console.log(`Built ${pages.length} static pages.`);
