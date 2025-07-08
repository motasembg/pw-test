import { expect } from '@playwright/test';
import { test } from '../Pages/fixtures';
import { faker } from '@faker-js/faker';

test.use({ storageState: './setup/auth.json' });
const mockYoung = {
  "flags": {
        "age": {
            "enabled": true,
            "young": {
                "from": 0,
                "to": 21
            },
            "adult": {
                "from": 22,
                "to": 68
            },
            "old": {
                "from": 69,
                "to": 99
            },
            "oldFrom": 35,
            "youngFrom": 2
        }
    }
}
const mockOld = {
  "flags": {
        "age": {
            "enabled": true,
            "young": {
                "from": 0,
                "to": 21
            },
            "adult": {
                "from": 22,
                "to": 68
            },
            "old": {
                "from": 69,
                "to": 99
            },
            "oldFrom": 30,
            "youngFrom": 2
        }
    }
}
const mockAdult = {
  "flags": {
        "age": {
            "enabled": true,
            "young": {
              "from": 0,
              "to": 21
          },
            "adult": {
                "from": 22,
                "to": 68
            },
            "old": {
                "from": 69,
                "to": 99
            },
            "oldFrom": 69,
            "adultFrom": 22,
            "youngFrom": 2
        }
    }
}

test.describe('User Status Tests', () => {
  const mockConfigs = {
      young: mockYoung,
      old: mockOld,
      adult: mockAdult
  }
  });
  test('displays young user status', async ({ page }) => {
    await page.goto('/');
    await page.route('https://api.yavshok.ru/experiments', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(mockOld)
      });
    });
});

test('displays old user status', async ({ page }) => {
    await page.goto('/');
    await page.route('https://api.yavshok.ru/experiments', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(mockOld)
      });
});
});

await page.reload();
    await expect(page.getByText(expectedText)).toBeVisible();



// test('login status adult', async ({ page }) => {
//   await page.goto('/');
//   await page.route('https://api.yavshok.ru/experiments', (route) => {
//     route.fulfill({
//       status: 200,
//       body: JSON.stringify(mockAdult)
//     });
//   });

//   await expect(page.getByText('Ты взрослый котик')).toBeVisible();
// });


test('login status old', async ({ page }) => {
  await page.goto('/');
  await page.route('https://api.yavshok.ru/experiments', (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify(mockOld)
    });
  });

  await expect(page.getByText(' Ты старый котик')).toBeVisible();
});

test.describe('negative tests', () => {
  const email = 'anastasiagurtovykh@yandex.ru';

  test('unregistered user', async ({ loginPage, page }) => {
    await page.route('https://api.yavshok.ru/auth/login', (route) => {
      route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Произошла ошибка' })
      });
    });
    await loginPage.open();
    await loginPage.login(faker.internet.email(), faker.internet.password());
    await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
  });

  test('wrong password for existing user', async ({ loginPage, page }) => {
    await page.route('https://api.yavshok.ru/auth/login', (route) => {
      route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Произошла ошибка' })
      });
    });
    await loginPage.open();
    await loginPage.login(email, faker.internet.password());
    await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
  });

  test('empty fields', async ({ loginPage, page }) => {
    await page.route('https://api.yavshok.ru/auth/login', (route) => {
      route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Произошла ошибка' })
      });
    });
    await loginPage.open();
    await loginPage.login('', '');
    await expect(loginPage.page.getByText('Введите email')).toBeVisible();
    await expect(loginPage.page.getByText('Введите пароль')).toBeVisible();
  });

  test('invalid email format (no @)', async ({ loginPage, page }) => {
    await page.route('https://api.yavshok.ru/auth/login', (route) => {
      route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Произошла ошибка' })
      });
    });
    await loginPage.open();
    await loginPage.login(faker.lorem.word(), faker.internet.password());
    await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
  });

  test('invalid email format (no domain)', async ({ loginPage, page }) => {
    await page.route('https://api.yavshok.ru/auth/login', (route) => {
      route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Произошла ошибка' })
      });
    });
    await loginPage.open();
    await loginPage.login(faker.person.firstName() + '@', faker.internet.password());
    await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
  });

  test('too long password', async ({ loginPage, page }) => {
    await page.route('https://api.yavshok.ru/auth/login', (route) => {
      route.fulfill({
        status: 422,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Произошла ошибка' })
      });
    });
    await loginPage.open();
    await loginPage.login(email, faker.lorem.words(100));
    await expect(loginPage.page.getByText('Произошла ошибка')).toBeVisible();
  });
});