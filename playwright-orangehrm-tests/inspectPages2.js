const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'networkidle' });
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type=submit]');
  await page.waitForSelector('.oxd-topbar-header-breadcrumb h6', { timeout: 30000 });
  const menuRoot = await page.$('.oxd-sidepanel-body');
  const menuHtml = menuRoot ? await menuRoot.innerHTML() : 'NO MENU ROOT';
  console.log('MENU ROOT HTML START');
  console.log(menuHtml.slice(0, 5000));
  console.log('MENU ROOT HTML END');
  const items = await page.$$eval('a.oxd-main-menu-item', els => els.map(el => ({ text: el.textContent.trim(), href: el.href, class: el.className })));
  console.log('MENU ITEMS:', JSON.stringify(items, null, 2));
  await browser.close();
})().catch(err => {
  console.error(err);
  process.exit(1);
});
