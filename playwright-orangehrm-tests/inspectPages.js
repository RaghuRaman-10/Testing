const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await Promise.all([page.waitForNavigation({waitUntil:'load'}), page.click('button[type=submit]')]);
  const menuItems = await page.$$eval('a.oxd-main-menu-item', nodes => nodes.map(n => n.textContent.trim()));
  console.log('MENU ITEMS:', JSON.stringify(menuItems, null, 2));
  const nav = ['Admin','PIM','Leave','Time','Recruitment','My Info','Performance','Directory','Maintenance','Buzz'];
  for (const text of nav) {
    const el = await page.$(`a.oxd-main-menu-item:has-text("${text}")`);
    if (!el) { console.log(`${text}: NOT FOUND`); continue; }
    await Promise.all([page.waitForNavigation({waitUntil:'load'}), el.click()]);
    const header = await page.$eval('.oxd-topbar-header-breadcrumb h6', el => el.textContent.trim()).catch(() => null);
    console.log(`${text}: ${page.url()} HEADER=${header}`);
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  }
  await browser.close();
})();
