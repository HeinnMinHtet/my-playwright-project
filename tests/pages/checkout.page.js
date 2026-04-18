export class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async addToCart(productId) {
    await this.page.click(`button[data-test="add-to-cart-${productId}"]`);
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
    await this.page.waitForURL('**/cart.html');
  }

  async proceedToCheckout() {
    await this.page.click('button[data-test="checkout"]');
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.page.fill('input[data-test="firstName"]', firstName);
    await this.page.fill('input[data-test="lastName"]', lastName);
    await this.page.fill('input[data-test="postalCode"]', postalCode);
    await this.page.click('input[data-test="continue"]');
    await this.page.waitForURL('**/checkout-step-two.html');
  }

  async verifyOrder(productName) {
    await this.page.locator('.inventory_item_name').filter({ hasText: productName }).waitFor();
  }

  async finishCheckout() {
    await this.page.click('button[data-test="finish"]');
    await this.page.waitForURL('**/checkout-complete.html');
  }

  async getSuccessMessage() {
    return this.page.locator('.complete-header');
  }
}