import assert from 'node:assert/strict';
import {readFileSync, existsSync, readdirSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
const config=JSON.parse(readFileSync('docs.json','utf8'));
const api=JSON.parse(readFileSync('openapi.json','utf8'));
const pages=config.navigation.tabs.flatMap(t=>t.groups.flatMap(g=>g.pages));
const targets=new Set(pages);
for(const p of pages) {
  assert.ok(existsSync(p+'.mdx'),`Missing page ${p}`);
  const text=readFileSync(p+'.mdx','utf8');
  const op=text.match(/^openapi: (GET|POST|PATCH|DELETE) (.+)$/m);
  if(op) assert.ok(api.paths[op[2]]?.[op[1].toLowerCase()],`Unknown endpoint ${p}`);
  for(const [,href] of text.matchAll(/(?:href="|\]\()(\/[^"\s)]+)(?:"|\))/g)) {
    const path=href.split('#')[0].slice(1);
    assert.ok(targets.has(path)||existsSync(path),`Broken link ${p}: ${href}`);
  }
}
for(const item of [config.logo.light,config.logo.dark,config.favicon,config.api.openapi]) assert.ok(existsSync(item.replace(/^\//,'')),`Missing asset ${item}`);
function refs(value) {
  if(!value||typeof value!=='object')return;
  if(value.$ref?.startsWith('#/')) {
    const found=value.$ref.slice(2).split('/').reduce((obj,key)=>obj?.[key.replaceAll('~1','/').replaceAll('~0','~')],api);
    assert.ok(found,`Unresolved schema ${value.$ref}`);
  }
  Object.values(value).forEach(refs);
}
refs(api);
const count=Object.values(api.paths).reduce((n,p)=>n+Object.keys(p).filter(k=>['get','post','patch','delete'].includes(k)).length,0);
assert.equal(pages.filter(p=>p.startsWith('api-reference/')).length,count);
console.log(`Validated ${pages.length} pages, ${count} REST operations, local links, assets, and schema references.`);
