import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { credentials } from '../utils/testData';

test.describe('OrangeHRM Dashboard Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(credentials.valid.username, credentials.valid.password);
    await page.waitForURL(/dashboard/);
  });

  test('TC-006: should land on dashboard after login', async ({ page }) => {
    await expect(page).toHaveURL(/dashboard/);
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.dashboardHeader).toHaveText('Dashboard');
  });

  test('TC-007: should display all expected main menu items', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const expectedMenuItems = [
      'Admin',
      'PIM',
      'Leave',
      'Time',
      'Recruitment',
      'My Info',
      'Performance',
      'Dashboard',
      'Directory',
      'Maintenance',
      'Buzz',
    ];

    const actualMenuItems = await dashboardPage.getMenuItemTexts();
    for (const menuText of expectedMenuItems) {
      expect(actualMenuItems).toContain(menuText);
    }
  });

  test('TC-008: should navigate to Admin page from menu', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.adminMenu.click();
    await expect(page).toHaveURL(/admin/);
  });

  test('TC-009: should navigate to PIM page from menu', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.pimMenu.click();
    await expect(page).toHaveURL(/pim/);
  });

  test('TC-010: should display key dashboard widgets', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.dashboardHeader).toBeVisible({ timeout: 10000 });
    await expect(dashboardPage.timeAtWorkWidget).toBeVisible({ timeout: 10000 });
    await expect(dashboardPage.myActionsWidget).toBeVisible({ timeout: 10000 });
  });

  test('TC-011: should show expected number of main menu items', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const menuItemCount = await dashboardPage.getMenuItemCount();
    expect(menuItemCount).toBeGreaterThanOrEqual(10);
  });

  test('TC-012: should logout from dashboard successfully', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.logout();
    await expect(page).toHaveURL(/auth\/login/);
  });
});
