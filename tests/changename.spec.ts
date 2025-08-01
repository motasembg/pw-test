import { expect } from '@playwright/test';
import { test } from '../Pages/fixtures';
import { faker } from '@faker-js/faker';

test.use({ storageState: './setup/auth.json' });

test('edit profile test', async ({ editPage, profilePage, page }) => {
    await editPage.open();
    const randomName = faker.person.firstName();
    await editPage.nameInput.fill(randomName);
    await editPage.toSaveButtonClick();
    await editPage.toCancelButtonClick();
    await expect(page).toHaveURL('/');
    await expect(profilePage.userName).toHaveText(randomName);
})