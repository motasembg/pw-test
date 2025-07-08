import { test as base } from '@playwright/test';
import { ShockMainPage } from './MainPage';
import { ShockLoginPage } from './LoginPage';
import { ShockRegisterPage } from './RegisterPage';
import { ShockProfilePage } from './ProfilePage';
import { ShockEditPage } from './EditPage';

type ShockFixtures = {
  mainPage: ShockMainPage;
  loginPage: ShockLoginPage;
  registerPage: ShockRegisterPage;
  profilePage: ShockProfilePage;
  editPage: ShockEditPage;
};

export const test = base.extend<ShockFixtures>({
  mainPage: async ({ page }, use) => {
    const mainPage = new ShockMainPage(page);
    await use(mainPage); // ✅ await is required
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new ShockLoginPage(page);
    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new ShockRegisterPage(page);
    await use(registerPage);
  },
  profilePage: async ({ page }, use) => {
    const profilePage = new ShockProfilePage(page);
    await use(profilePage);
  },
  editPage: async ({ page }, use) => {
    const editPage = new ShockEditPage(page);
    await use(editPage);
  },
});

export { expect } from '@playwright/test'; // Optional but useful