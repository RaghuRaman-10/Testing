import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { credentials } from '../utils/testData';

test.describe('OrangeHRM Login Tests' , () => {
    test('TC-001: should login with valid credentials', async({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(credentials.valid.username, credentials.valid.password);
        await expect(page).toHaveURL(/dashboard/);
    });

       test('TC-002: should display error message with invalid credentials', async({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(credentials.invalid.username, credentials.invalid.password);
        const error = await loginPage.getErrorMessage();
        expect(error).toBe('Invalid credentials');
    });

    test('TC-003: should display error message with empty credentials', async({page}) =>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(credentials.empty.username, credentials.empty.password);
     const requiredError = page.locator('.oxd-input-field-error-message');
     await expect(requiredError).toHaveCount(2);
       
    })



})