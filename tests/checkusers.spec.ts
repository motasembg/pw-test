import { test, expect } from '../Pages/fixtures';

test('check valid email', async ({ mainPage }) => {
  await mainPage.open();
  await mainPage.checkEmail('anastasiagurtovykh@yandex.ru', true);
});

test('check invalid email - non-existing user', async ({ mainPage }) => {
  await mainPage.open();
  await mainPage.checkEmail('nonexistent@example.com', false);
});

test('check invalid email format', async ({ mainPage }) => {
  await mainPage.open();
  await mainPage.checkEmail('invalid-email-format', false);
});
