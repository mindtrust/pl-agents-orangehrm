// src/pages/PIMPage.ts
import { Page, Locator } from '@playwright/test';

export class PIMPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly addButton: Locator;
  readonly employeeTable: Locator;
  readonly searchButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'PIM' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.employeeTable = page.getByRole('table');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.searchInput = page.getByPlaceholder('Type for hints...').first();
  }

  /**
   * 従業員追加画面に移動
   */
  async navigateToAddEmployee() {
    await this.addButton.click();
  }

  /**
   * 従業員を検索
   */
  async searchEmployee(name: string) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }
}
