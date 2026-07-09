import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../utils/testData';

test.describe('OrangeHRM Login Tests', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-001: should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(credentials.valid.username, credentials.valid.password);
    await expect(page).toHaveURL(/dashboard/);
  });

  test('TC-002: should display error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(credentials.invalid.username, credentials.invalid.password);
    await expect(loginPage.errorMessage).toHaveText('Invalid credentials');
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('TC-003: should display required errors when both fields are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(credentials.empty.username, credentials.empty.password);
    const requiredErrors = page.locator('.oxd-input-field-error-message');
    await expect(requiredErrors).toHaveCount(2);
    await expect(requiredErrors.nth(0)).toHaveText('Required');
    await expect(requiredErrors.nth(1)).toHaveText('Required');
  });

  test('TC-004: should display required error for empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', credentials.valid.password);
    const usernameError = page.locator('.oxd-input-field-error-message').first();
    await expect(usernameError).toHaveText('Required');
  });

  test('TC-005: should display required error for empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(credentials.valid.username, '');
    const passwordError = page.locator('.oxd-input-field-error-message').first();
    await expect(passwordError).toHaveText('Required');
  });
});
