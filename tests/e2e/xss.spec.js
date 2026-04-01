/*
import {test, expec} from '@playwright/test';

test('XSS test - input field should not execute script', async ({page}) => {
    await page.goto ('https://the-internet.herokuapp.com/inputs');

    const payload = '<script>alert("XSS")</script>';

    await page.fill('input[type=number]', payload);

    const value = await page.locator('input[type=number]').inputValue();

    await expect(value).not.toContain('<script>');
});
*/


import {test, expect} from '@playwright/test';

test('XSS test -should not execute script in text input', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    const payload = '<script>alert("XSS")</script>';

    await page.fill('#username', payload);
    await page.fill('#password', 'test');
    await page.click('button[type="submit"]');

    //Check script is NOT executed and treated as text
    await expect(page.locator('#flash')).toBeVisible();
});
