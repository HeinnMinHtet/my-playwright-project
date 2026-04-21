import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async isProductAvailable(productName: string): Promise<boolean> {
    const productElements = this.page.locator('.inventory_item_name');
    const count = await productElements.count();
    for (let i = 0; i < count; i++) {
      const text = await productElements.nth(i).textContent();
      if (text && text.toLowerCase().includes(productName.toLowerCase())) {
        return true;
      }
    }
    return false;
  }
}