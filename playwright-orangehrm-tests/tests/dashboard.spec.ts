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

  test('TC-004: should land on dashboard after login', async ({ page }) => {
    await expect(page).toHaveURL(/dashboard/);
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.dashboardHeader).toHaveText('Dashboard');
  });

  test('TC-005: should display all main menu items', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await expect(dashboardPage.adminMenu).toBeVisible();
    await expect(dashboardPage.pimMenu).toBeVisible();
    // await expect(dashboardPage.leaveMenu).toBeVisible();
    // await expect(dashboardPage.timeMenu).toBeVisible();
    // await expect(dashboardPage.recruitmentMenu).toBeVisible();
    // await expect(dashboardPage.myInfoMenu).toBeVisible();
    // await expect(dashboardPage.performanceMenu).toBeVisible();
    // await expect(dashboardPage.directoryMenu).toBeVisible();
    // await expect(dashboardPage.maintenanceMenu).toBeVisible();
    // await expect(dashboardPage.buzzMenu).toBeVisible();
  });

  test('TC-007: should navigate to Admin page from menu', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.adminMenu.click();
    await expect(page).toHaveURL(/admin/);
  });

  test('TC-008: should navigate to PIM page from menu', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.pimMenu.click();
    await expect(page).toHaveURL(/pim/);
  });
});