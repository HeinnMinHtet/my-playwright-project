import { test, expect } from '@playwright/test';
import { SauceDemoLoginPage } from '../pages/saucedemo-login.page';
import { CheckoutPage } from '../pages/checkout.page';
import { generateRandomUserInfo } from '../utils/helpers';
import { users, products, checkoutInfo } from '../fixtures/testData';

test.describe('Checkout Tests', () => {
  let loginPage: SauceDemoLoginPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new SauceDemoLoginPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Complete checkout process', async ({ page }) => {
    // Add a product to cart
    const firstProduct = products[0];
    if (!firstProduct) {
      throw new Error('No products available for testing');
    }
    await checkoutPage.addToCart(firstProduct.id);

    // Go to cart
    await checkoutPage.goToCart();

    // Proceed to checkout
    await checkoutPage.proceedToCheckout();

    // Fill checkout information with random data
    const userInfo = generateRandomUserInfo();
    await checkoutPage.fillCheckoutInfo(userInfo.firstName, userInfo.lastName, userInfo.postalCode);

    // Verify checkout overview
    await checkoutPage.verifyOrder(firstProduct.name);

    // Finish checkout
    await checkoutPage.finishCheckout();
    await expect(page.locator('.complete-header')).toContainText('Thank you for your order!');
  });
});