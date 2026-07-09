import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { credentials } from '../utils/testData';

test.describe('OrangeHRM Page Navigation', () => {
  const pagesToCheck = [
    { name: 'Admin', urlPattern: /admin/ },
    { name: 'PIM', urlPattern: /pim/ },
    { name: 'Leave', urlPattern: /leave/ },
    { name: 'Time', urlPattern: /time/ },
    { name: 'Recruitment', urlPattern: /recruitment/ },
    { name: 'My Info', urlPattern: /pim\/viewEmployeeList|myInfo/ },
    { name: 'Performance', urlPattern: /performance/ },
    { name: 'Directory', urlPattern: /directory/ },
    { name: 'Maintenance', urlPattern: /maintenance/ },
    { name: 'Buzz', urlPattern: /buzz/ },
  ];

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(credentials.valid.username, credentials.valid.password);
    await page.waitForURL(/dashboard/);
  });

  for (const pageData of pagesToCheck) {
    test(`should navigate to ${pageData.name} page`, async ({ page }) => {
      const dashboardPage = new DashboardPage(page);
      await dashboardPage.gotoMenu(pageData.name);
      await expect(page).toHaveURL(pageData.urlPattern);
      const headerText = await dashboardPage.dashboardHeader.textContent();
      expect(headerText).toBeTruthy();
    });
  }
});
