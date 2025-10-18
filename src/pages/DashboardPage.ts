// src/pages/DashboardPage.ts
import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeading: Locator;
  readonly adminLink: Locator;
  readonly pimLink: Locator;
  readonly leaveLink: Locator;
  readonly timeLink: Locator;
  readonly recruitmentLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.adminLink = page.getByRole('link', { name: 'Admin' });
    this.pimLink = page.getByRole('link', { name: 'PIM' });
    this.leaveLink = page.getByRole('link', { name: 'Leave' });
    this.timeLink = page.getByRole('link', { name: 'Time' });
    this.recruitmentLink = page.getByRole('link', { name: 'Recruitment' });
  }

  /**
   * 指定したモジュールに移動
   */
  async navigateToModule(moduleName: 'Admin' | 'PIM' | 'Leave' | 'Time' | 'Recruitment') {
    const linkMap = {
      'Admin': this.adminLink,
      'PIM': this.pimLink,
      'Leave': this.leaveLink,
      'Time': this.timeLink,
      'Recruitment': this.recruitmentLink,
    };

    await linkMap[moduleName].click();
  }
}
