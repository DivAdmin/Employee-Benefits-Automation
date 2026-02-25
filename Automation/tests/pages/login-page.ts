import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('//input[@id="Username"]');
    this.passwordInput = page.locator('//input[@id="Password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }

  async goto() {
    const baseURL= process.env.APP_BASE_URL;
    await this.page.goto(
      baseURL as string, { waitUntil: 'networkidle' }
    );
    // await this.page.goto(
    //   'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login', { waitUntil: 'networkidle' }
    // );
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    // Wait for dashboard to load
    await this.page.waitForURL('**/Prod/Benefits');
  }
}
