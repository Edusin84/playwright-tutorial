import { test, expect } from '@playwright/test';
import LoginPage from '../pages/Login';
import LandingPage from '../pages/Landing';
import data from '../data/users.json';

let loginPage: LoginPage;
let landingPage: LandingPage;

test('Register with used email', async ({ page }) => {

  loginPage = new LoginPage(page);
  landingPage = new LandingPage(page);

  await page.goto('https://automationexercise.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Automation Exercise/);

  await landingPage.closeCookiesModal();

  await landingPage.goToLoginPage();

  await loginPage.completeSignupError(data.users.incorrect);

  await landingPage.goToLoginPage();

  await loginPage.completeSignup(data.users.incorrect);

});