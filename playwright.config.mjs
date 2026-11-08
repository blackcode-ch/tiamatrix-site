import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir:'./tests', timeout:60000, retries:0, workers:2,
  reporter:[['list'],['html',{open:'never'}]],
  use:{baseURL:'http://127.0.0.1:4173',browserName:'chromium',trace:'retain-on-failure'},
  webServer:{command:'npm run serve',url:'http://127.0.0.1:4173',reuseExistingServer:false},
  projects:[
    {name:'phone-light',use:{viewport:{width:390,height:844},colorScheme:'light'}},
    {name:'phone-dark',use:{viewport:{width:390,height:844},colorScheme:'dark'}},
    {name:'desktop-light',use:{viewport:{width:1440,height:900},colorScheme:'light'}},
    {name:'desktop-dark',use:{viewport:{width:1440,height:900},colorScheme:'dark'}}
  ]
});
