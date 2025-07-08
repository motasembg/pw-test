import { Page, Locator, expect } from "@playwright/test";

export class ShockRegisterPage {
  public title: Locator;
  public emailInput: Locator;
  public passwordInput: Locator;
  public ageInput: Locator;
  public toRegisterButton: Locator;
  public toBackButton: Locator;
  public withoutEmailText: Locator;
  public withoutPasswordText: Locator;
  public withoutAgeText: Locator;
  public invalidEmailText: Locator;
  public invalidPasswordText: Locator;
  public ageErrorText: Locator;
  public emailAlreadyExistsText: Locator;


  constructor(public readonly page: Page) {
    this.title = this.page.getByText('Регистрация в ШОКе', { exact: true });
    this.emailInput = this.page.getByTestId('register-email-input').getByPlaceholder('Email');
    this.passwordInput = this.page.getByTestId('register-password-input').getByPlaceholder('Пароль');
    this.ageInput = this.page.getByTestId('register-age-input').getByPlaceholder('Возраст');
    this.toRegisterButton = this.page.getByTestId('register-submit-button').getByText('Зарегистрироваться', { exact: true });
    this.toBackButton = this.page.getByTestId('register-back-button').getByText('Назад', { exact: true });
    this.withoutEmailText = this.page.getByText('Введите email', { exact: true });
    this.withoutPasswordText = this.page.getByText('Введите пароль', { exact: true });
    this.withoutAgeText = this.page.getByText('Введите возраст', { exact: true });
    this.invalidEmailText = this.page.getByText('Неправильный email-адрес', { exact: true });
    this.invalidPasswordText = this.page.getByText('Пароль должен содержать минимум 6 символов', { exact: true });
    this.emailAlreadyExistsText = this.page.getByText('Пользователь с таким email уже существует', { exact: true });
    this.ageErrorText = this.page.getByText('Возраст должен быть числом', { exact: true });
  }

  public async open() {
    await this.page.goto('/register');
  }
  public async toBackButtonClick() {
    await this.toBackButton.click();
  }
  

  public async register(email: string, password: string, age: string, shouldSucceed: boolean) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.ageInput.fill(age);
    await this.toRegisterButton.click();
    if (shouldSucceed) {
      await expect(this.page).toHaveURL('/');
    } else {
      await expect(this.page).toHaveURL('/register');
      if (!email) {
        await expect(this.withoutEmailText).toBeVisible();
      }
      if (!password) {
        await expect(this.withoutPasswordText).toBeVisible();
      }
      if (!age) {
        await expect(this.withoutAgeText).toBeVisible();
      }
    }
  }
  
  public async expectValidationErrors(errors: string[]) {
    for (const error of errors) {
        await expect(this.page.getByText(error, { exact: true })).toBeVisible();
    }
  }
} 