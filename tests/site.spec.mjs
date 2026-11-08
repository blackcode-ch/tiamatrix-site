import { test, expect } from '@playwright/test';
import { readdir, mkdir } from 'node:fs/promises';
const files=(await readdir('dist')).filter(name=>name.endsWith('.html'));
for(const file of files){
  test(`${file}: render, links, accessibility basics and theme`,async({page,request},info)=>{
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    page.on('requestfailed',r=>errors.push(`Request failed: ${r.url()}`));
    page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
    expect((await page.goto('/'+file)).status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main')).toBeVisible();
    expect(await page.locator('html').getAttribute('lang')).toBe('en');
    expect(await page.evaluate(()=>parseFloat(getComputedStyle(document.body).fontSize))).toBeGreaterThanOrEqual(19);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const links=await page.locator('a[href]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
    for(const href of new Set(links.filter(x=>x.startsWith('/')||x.startsWith('#')))){
      const url=new URL(href,page.url());
      const response=await request.get(url.href);
      expect(response.ok(),`Broken internal link ${href}`).toBe(true);
      if(url.hash){const html=await response.text();expect(html,`Missing anchor ${href}`).toContain(`id="${url.hash.slice(1)}"`);}
    }
    const socialPath = await page.locator('meta[property="og:image"]').getAttribute('content');
    const socialResponse = await request.get(socialPath);
    expect(socialResponse.ok(), 'Social image is available').toBe(true);
    expect(socialResponse.headers()['content-type']).toContain('image/png');
    await page.evaluate(()=>document.fonts.ready);
    await mkdir('screenshots',{recursive:true});
    await page.screenshot({path:`screenshots/${file.replace('.html','')}-${info.project.name}.png`,fullPage:true});
    const before=await page.locator('#theme').textContent();
    await page.locator('#theme').click();
    await expect(page.locator('#theme')).not.toHaveText(before);
    await page.keyboard.press('Tab');
    expect(errors).toEqual([]);
  });
}
test('every external destination resolves',async({request},info)=>{
  test.skip(info.project.name!=='desktop-light','Check external destinations once per build');
  test.setTimeout(180000);
  const {readFile}=await import('node:fs/promises');
  const links=new Set();
  for(const file of files){for(const match of (await readFile(`dist/${file}`,'utf8')).matchAll(/href="(https:\/\/[^"#]+)(?:#[^"]*)?"/g))links.add(match[1]);}
  for(const url of links){
    let response;
    for(let attempt=0;attempt<3;attempt++){
      response=await request.get(url,{timeout:30000});
      if(response.ok())break;
      await new Promise(r=>setTimeout(r,2000*(attempt+1)));
    }
    // PR #44 adds these three files to the next public snapshot. Only their
    // temporary 404s are allowed; every other destination/status still fails.
    const pendingPublicDocs = new Set([
      'https://github.com/blackcode-ch/tmx-go-public/blob/main/LICENSE',
      'https://github.com/blackcode-ch/tmx-go-public/blob/main/docs/INSTALL.md',
      'https://github.com/blackcode-ch/tmx-go-public/blob/main/docs/PHONE-PAIRING.md',
    ]);
    if (response.status() === 404 && pendingPublicDocs.has(url)) {
      test.info().annotations.push({type:'pending-public-doc', description:url});
      continue;
    }
    expect(response.ok(),`Broken external link ${url}: ${response.status()}`).toBe(true);
  }
});
