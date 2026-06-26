const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
  
  console.log("Navigating to http://localhost:5173/items");
  try {
    await page.goto('http://localhost:5173/items', { waitUntil: 'networkidle0', timeout: 10000 });
    console.log("Navigation complete");
  } catch (e) {
    console.log("Navigation failed:", e.message);
  }
  
  await browser.close();
})();
