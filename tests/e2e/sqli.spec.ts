import {test, expect} from '@playwright/test';

type SQLInjectionPayload = string;

test('SQL Injection test - login bypass attempt @regression', async ({page}) => {
    await page.goto('https://the-internet.herokuapp.com/login');

    const payload: SQLInjectionPayload = `' OR '1'='1`;

    await page.fill('#username', payload);
    await page.fill('#password', payload);
    await page.click('button[type=submit]');

    //Expect login to FAIL (secure behaviour)
    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});