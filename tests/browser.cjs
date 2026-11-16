const puppeteer = require('puppeteer');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async () => {
 const browser = await puppeteer.launch({headless:true,executablePath:'/Users/rimjhimjain/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'});
 try {
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 fs.mkdirSync('outputs',{recursive:true});
 await page.setViewport({width:1440,height:1050,deviceScaleFactor:1});
 await page.goto('http://localhost:5173',{waitUntil:'networkidle0'});
 await page.evaluate(()=>document.fonts.ready);
 assert.match(await page.title(),/Vishalli/);
 assert.equal(await page.$eval('h1',e=>e.textContent),'Engineeringideas intoreal experiences.');
 assert.equal(await page.$$eval('img',els=>els.every(e=>e.complete&&e.naturalWidth>0)),true);
 await page.screenshot({path:'outputs/desktop.png',fullPage:true});
 await page.click('.mascot-trigger');await page.waitForSelector('dialog[open]');
 await page.click('.suggestions button');
 await page.waitForSelector('.chat-error');
 assert.match(await page.$eval('.chat-error',e=>e.textContent),/needs configuration/);
 assert.equal(await page.$$eval('.message.user',els=>els.length),1);
 await page.click('.chat-error button');await page.waitForSelector('.chat-error');
 assert.equal(await page.$$eval('.message.user',els=>els.length),1);
 await page.screenshot({path:'outputs/chat-desktop.png'});
 await page.keyboard.press('Escape');
 assert.equal(await page.$('dialog'),null);
 await page.click('.floating-chat');assert.equal(await page.$$eval('.message.user',els=>els.length),1);
 await page.click('[aria-label="Close recruiter"]');
 await page.click('summary');assert.equal(await page.$eval('details',e=>e.open),true);
 for (const width of [320,390,768,1024]) {
   await page.setViewport({width,height:844,deviceScaleFactor:1});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow at ${width}`);
 }
 await page.setViewport({width:390,height:844,deviceScaleFactor:1});
 await page.evaluate(()=>scrollTo(0,0));
 await page.screenshot({path:'outputs/mobile.png',fullPage:true});
 await page.click('.mobile-menu');assert.equal(await page.$eval('.site-header nav',e=>getComputedStyle(e).display),'flex');
 await page.click('.site-header nav a[href="#about"]');assert.equal(await page.$eval('.mobile-menu',e=>e.getAttribute('aria-expanded')),'false');
 await page.click('.floating-chat');
 const bounds=await page.$eval('dialog',e=>{const r=e.getBoundingClientRect();return {left:r.left,top:r.top,right:r.right,bottom:r.bottom}});
 assert.ok(bounds.left>=0&&bounds.top>=0&&bounds.right<=390&&bounds.bottom<=844);
 await page.screenshot({path:'outputs/chat-mobile.png'});
 await page.keyboard.press('Escape');
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 assert.equal(await page.$eval('.mascot-trigger>img',e=>getComputedStyle(e).animationName),'none');
 assert.deepEqual(errors,[]);
 console.log('PASS desktop/mobile, images, navigation, project details, chat open/close, missing-key response, retry without duplicates, history on reopen, dialog bounds, reduced motion, no browser exceptions');
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
