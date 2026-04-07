import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://phyueducation.com/');
  await page.locator('div').filter({ hasText: 'PHYU EDUCATION AND CONSULTANT' }).first().click();
  await page.getByRole('link').filter({ hasText: /^$/ }).nth(3).click();
  await page.getByRole('link', { name: 'Login Page' }).click();
  await page.getByRole('textbox', { name: 'Your username or email' }).click();
  await page.getByRole('textbox', { name: 'Your username or email' }).fill('helloworld@gmail.com');
  await page.locator('form > div:nth-child(2)').first().click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('helloworld');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.getByText('Home Login Page').click();
});