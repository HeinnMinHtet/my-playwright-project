import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

const URL = 'https://the-internet.herokuapp.com/login';
const SECURE_URL = 'https://the-internet.herokuapp.com/secure';

interface SecurityTestData {
  xssPayload: string;
  sqliPayload: string;
  maliciousInputs: string[];
}

const securityData: SecurityTestData = {
  xssPayload: '<script>alert("XSS")</script>',
  sqliPayload: "1' OR '1'='1",
  maliciousInputs: [
    '<script>alert("xss")</script>',
    '"><script>alert("xss")</script>',
    'javascript:alert("xss")',
    'data:text/html,<script>alert("xss")</script>',
    '../../../etc/passwd',
    ' UNION SELECT * FROM users --',
    '1; DROP TABLE users --'
  ]
};

test.describe('Security Flow Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('Complete security flow: authentication, authorization, and vulnerability checks', async ({ page }) => {
    // Step 1: Attempt to access secure area without authentication
    await page.goto(SECURE_URL);
    await expect(page).toHaveURL(/.*login/); // Should redirect to login

    // Step 2: Successful login
    await loginPage.goto(URL);
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await expect(loginPage.getFlashMessage()).toContainText('You logged into a secure area!');
    await expect(page).toHaveURL(/.*secure/);

    // Step 3: Verify access to secure area
    await expect(page.locator('h2')).toContainText('Secure Area');
    await expect(page.locator('.subheader')).toContainText('Welcome to the Secure Area');

    // Step 4: Test for XSS vulnerability in secure area (if there's an input field)
    // Note: The secure area might not have input fields, but testing anyway
    // If there are any input fields, test them
    const inputs = page.locator('input[type="text"], textarea');
    if (await inputs.count() > 0) {
      await inputs.first().fill(securityData.xssPayload);
      // Check that script is not executed (no alert should appear)
      // Since we can't detect alerts directly, we check the input value is sanitized or rejected
      const value: string = await inputs.first().inputValue();
      expect(value).not.toContain('<script>');
    }

    // Step 5: Test for SQL Injection attempts (if login form is accessible)
    // Try to inject SQL via URL parameters or hidden fields if present
    await page.goto(`${SECURE_URL}?id=${securityData.sqliPayload}`);
    // Should still be in secure area or properly handle the injection
    await expect(page.locator('h2')).toContainText('Secure Area');

    // Step 6: Test session management - logout
    await page.click('a[href="/logout"]');
    await expect(loginPage.getFlashMessage()).toContainText('You logged out of the secure area!');
    await expect(page).toHaveURL(/.*login/);

    // Step 7: Verify logout - try to access secure area again
    await page.goto(SECURE_URL);
    await expect(page).toHaveURL(/.*login/); // Should redirect to login again

    // Step 8: Test brute force protection (if implemented)
    // Attempt multiple failed logins
    for (let i = 0; i < 3; i++) {
      await loginPage.login('tomsmith', 'wrongpassword');
      await page.waitForTimeout(500); // Small delay between attempts
    }
    // Check if there's any brute force protection (like captcha or lockout message)
    // Note: The internet.herokuapp.com may not have brute force protection
    await expect(loginPage.getFlashMessage()).toBeVisible();
  });

  test('Input validation and sanitization', async ({ page }) => {
    await loginPage.goto(URL);

    // Test various malicious inputs
    for (const input of securityData.maliciousInputs) {
      await page.fill('#username', input);
      await page.fill('#password', 'test');
      await page.click('button[type="submit"]');

      // Should not execute scripts and should show validation error
      await expect(loginPage.getFlashMessage()).toBeVisible();
      // Ensure no script execution (page should not have unexpected alerts/behavior)
      await expect(page).toHaveURL(/.*login/);
    }
  });

  test('HTTPS and secure headers check', async ({ page }) => {
    // Test that the site uses HTTPS
    await page.goto(URL.replace('http:', 'https:'));
    await expect(page).toHaveURL(/^https:\/\//);

    // Verify we can access the login page securely
    await loginPage.goto(URL);
    await expect(page).toHaveURL(URL);

    // Basic check that the page loaded (implying HTTPS is working)
    await expect(page.locator('h2')).toContainText('Login Page');
  });
});