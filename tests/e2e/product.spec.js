import { test, expect } from '@playwright/test';
import { SauceDemoLoginPage } from '../pages/saucedemo-login.page';
import { InventoryPage } from '../pages/inventory.page';
import { users, products as productData } from '../fixtures/testData';

const productNames = productData.map(p => p.name);

test.describe('Product Tests', () => {
  let loginPage;
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new SauceDemoLoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  for (const product of productNames) {
    test(`Check ${product} is available`, async ({ page }) => {
      const available = await inventoryPage.isProductAvailable(product);
      expect(available).toBe(true);
    });
  }
});