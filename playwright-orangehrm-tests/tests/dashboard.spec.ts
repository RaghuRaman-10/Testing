import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../utils/testData';

test.describe('OrangeHRM Dashboard Tests', () => {

      test('TC-004: should display the dashboard after successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(
    credentials.valid.username,
    credentials.valid.password
  );

  await expect(page).toHaveURL(/dashboard/);

  await expect(
    page.locator('.oxd-topbar-header-breadcrumb-module')
  ).toHaveText('Dashboard');
});
})