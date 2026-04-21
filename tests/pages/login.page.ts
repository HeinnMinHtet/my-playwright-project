import { Page } from '@playwright/test';

export class LoginPage {
  private usernameInput = '#username';
  private passwordInput = '#password';
  private loginButton = 'button[type="submit"]';
  private flashMessage = '#flash';

  constructor(private page: Page) {}

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  getFlashMessage() {
    return this.page.locator(this.flashMessage);
  }
}