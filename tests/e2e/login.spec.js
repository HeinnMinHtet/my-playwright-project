import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

const URL = 'https://the-internet.herokuapp.com/login';

const users = [
  {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
    expectedMessage: 'You logged into a secure area!'
  },
  {
    username: 'tomsmith',
    password: 'WrongPassword',
    expectedMessage: 'Your password is invalid!'
  },
  {
    username: '',
    password: '123',
    expectedMessage: 'Your username is invalid!'
  }
];

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(URL);
  });

  for (const user of users) {
    test(`Login with ${user.username || 'empty'} should show "${user.expectedMessage}"`, async () => {
      await loginPage.login(user.username, user.password);
      await expect(loginPage.getFlashMessage()).toContainText(user.expectedMessage);
    });
  }
});