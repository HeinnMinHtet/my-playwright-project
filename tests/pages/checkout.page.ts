import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async addToCart(productId: string): Promise<void> {
    await this.page.click(`button[data-test="add-to-cart-${productId}"]`);
  }

  async goToCart(): Promise<void> {
    await this.page.click('.shopping_cart_link');
    await this.page.waitForURL('**/cart.html');
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.click('button[data-test="checkout"]');
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.fill('input[data-test="firstName"]', firstName);
    await this.page.fill('input[data-test="lastName"]', lastName);
    await this.page.fill('input[data-test="postalCode"]', postalCode);
    await this.page.click('input[data-test="continue"]');
    await this.page.waitForURL('**/checkout-step-two.html');
  }

  async verifyOrder(productName: string): Promise<void> {
    await this.page.locator('.inventory_item_name').filter({ hasText: productName }).waitFor();
  }

  async finishCheckout(): Promise<void> {
    await this.page.click('button[data-test="finish"]');
    await this.page.waitForURL('**/checkout-complete.html');
  }

  async getSuccessMessage() {
    return this.page.locator('.complete-header');
  }
}