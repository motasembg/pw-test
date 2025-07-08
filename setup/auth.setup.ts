import { chromium } from '@playwright/test';
import { expect } from '@playwright/test';
const filePath = './setup/auth.json';
const url = 'https://yavshok.ru/login';

async function globalSetup () {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(url);

  await page.getByTestId('login-email-input').fill('abogsysa@yandex.ru');
  await page.getByTestId('login-password-input').fill('12345678m');

  //login
  await page.getByTestId('login-submit-button').click();

  //checking
  await expect(page.getByTestId('user-logout-button')).toBeVisible();

  await page.context().storageState({ path: filePath });
  await browser.close();
};
export default globalSetup;
