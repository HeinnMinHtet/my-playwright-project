import {test, expect} from '@playwright/test';

const URL = 'https://the-internet.herokuapp.com/login';

test('login success', async ({page}) => {
    await page.goto(URL);

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'SuperSecretPassword!');
    await page.click('button[type="submit"]');

    await expect(page.locator('#flash')).toContainText('You logged into a secure');
});

test('login failed (wrong password)', async ({page}) => {
    await page.goto(URL);

    await page.fill('#username', 'tomsmith');
    await page.fill('#password', 'WrongPassword!');
    await page.click('button[type="submit"]');

    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
});

test('brute-force simulation (multiple failed attempts)',async ({page}) => {
    await page.goto(URL);

    for (let i=0; i<9; i++) {
        await page.fill('#username', 'tomsmith');
        await page.fill('#password', 'WrongPassword!');
        await page.click('button[type="submit"]');

        //Add Delay
        await page.waitForTimeout(500);
    }
    await expect (page.locator('#flash')).toContainText('invalid');
});