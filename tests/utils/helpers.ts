// Helper functions for Playwright tests
import type { Page } from '@playwright/test';

/**
 * Generates a random string of specified length
 * @param {number} length - Length of the random string
 * @returns {string} Random string
 */
export function generateRandomString(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generates random user information for testing
 * @returns {object} Object with firstName, lastName, postalCode
 */
export function generateRandomUserInfo(): { firstName: string; lastName: string; postalCode: string } {
  return {
    firstName: generateRandomString(5),
    lastName: generateRandomString(7),
    postalCode: (Math.floor(Math.random() * 90000) + 10000).toString() // 5-digit postal code as string
  };
}

/**
 * Waits for an element to be visible with a custom timeout
 * @param {Page} page - Playwright page object
 * @param {string} selector - CSS selector
 * @param {number} timeout - Timeout in milliseconds (default 5000)
 */
export async function waitForElementVisible(page: Page, selector: string, timeout: number = 5000): Promise<void> {
  await page.waitForSelector(selector, { state: 'visible', timeout });
}

/**
 * Clicks an element and waits for navigation or action
 * @param {Page} page - Playwright page object
 * @param {string} selector - CSS selector
 * @param {string} expectedUrl - Expected URL after click (optional)
 */
export async function clickAndWait(page: Page, selector: string, expectedUrl: string | null = null): Promise<void> {
  await page.click(selector);
  if (expectedUrl) {
    await page.waitForURL(expectedUrl);
  }
}

/**
 * Fills a form field and verifies the value
 * @param {Page} page - Playwright page object
 * @param {string} selector - CSS selector
 * @param {string} value - Value to fill
 */
export async function fillAndVerify(page: Page, selector: string, value: string): Promise<void> {
  await page.fill(selector, value);
  await page.waitForFunction(
    (sel, val) => (document.querySelector(sel) as HTMLInputElement).value === val,
    selector,
    value
  );
}