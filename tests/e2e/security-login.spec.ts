import {test, expect} from '@playwright/test';

const URL = 'https://the-internet.herokuapp.com/login';

interface LoginCredentials {
  username: string;
  password: string;
}

interface TestCase {
  name: string;
  credentials: LoginCredentials;
  expectedText: string;
}

const testCases: TestCase[] = [
  {
    name: 'login success',
    credentials: { username: 'tomsmith', password: 'SuperSecretPassword!' },
    expectedText: 'You logged into a secure area!'
  },
  {
    name: 'login failed (wrong password)',
    credentials: { username: 'tomsmith', password: 'WrongPassword!' },
    expectedText: 'Your password is invalid!'
  }
];

for (const testCase of testCases) {
  test(testCase.name, async ({page}) => {
    await page.goto(URL);

    await page.fill('#username', testCase.credentials.username);
    await page.fill('#password', testCase.credentials.password);
    await page.click('button[type="submit"]');

    await expect(page.locator('#flash')).toContainText(testCase.expectedText);
  });
}

test('brute-force simulation (multiple failed attempts)',async ({page}) => {
    await page.goto(URL);

    const credentials: LoginCredentials = { username: 'tomsmith', password: 'WrongPassword!' };

    for (let i = 0; i < 9; i++) {
        await page.fill('#username', credentials.username);
        await page.fill('#password', credentials.password);
        await page.click('button[type="submit"]');
    }
    await expect (page.locator('#flash')).toContainText('invalid');
});