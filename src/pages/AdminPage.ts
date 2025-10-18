// src/pages/AdminPage.ts
import { Page, Locator } from '@playwright/test';

export class AdminPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly addButton: Locator;
  readonly userTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Admin' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.userTable = page.getByRole('table');
  }
}
