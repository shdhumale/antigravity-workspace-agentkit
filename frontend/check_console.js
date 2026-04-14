const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
    await page.goto('http://localhost:4200', { waitUntil: 'load' });
    await page.waitForTimeout(2000);
    const html = await page.evaluate(() => document.body.innerHTML);
    console.log('HTML:', html.trim());
    await browser.close();
})();
