import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml'};
http.createServer(async(req,res)=>{
  try {
    const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const target=resolve(root, '.'+(path==='/'?'/index.html':path));
    if(!target.startsWith(root+sep)){res.writeHead(403).end();return;}
    const data=await readFile(target);
    res.writeHead(200,{'Content-Type':types[extname(target)]||'application/octet-stream'}).end(data);
  }catch{res.writeHead(404).end('Not found');}
}).listen(4173,'127.0.0.1',()=>console.log('Static test server ready on 4173'));
