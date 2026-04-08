import { test, expect } from '@playwright/test';

const URL = 'https://the-internet.herokuapp.com/login';

/*
test('login success', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});
*/

const users = [
  { username: 'tomsmith', password: 'SuperSecretPassword!', expected: 'success' },
  { username: 'tomsmith', password: 'WrongPassword!', expected: 'fail' },
  { username: '', password: '123', expected: 'fail' }
];

for (const user of users) {
  test(`login test - ${user.username || 'empty'} - ${user.expected}`, async ({ page }) => {
    await page.goto(URL);

    await page.fill('#username', user.username);
    await page.fill('#password', user.password);
    await page.click('button[type="submit"]');

    if (user.expected === 'success') {
        await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
    } else {
        await expect(page.locator('#flash')).toContainText('Your username is invalid!');
    }
  });
}