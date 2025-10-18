// fixtures/orangehrm-fixtures.ts
import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { DashboardPage } from '../../src/pages/DashboardPage';
import { PIMPage } from '../../src/pages/PIMPage';
import { AdminPage } from '../../src/pages/AdminPage';

// Fixture型定義
type OrangeHRMFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimPage: PIMPage;
  adminPage: AdminPage;
  authenticatedPage: Page;
};

// カスタムFixtureを定義
export const test = base.extend<OrangeHRMFixtures>({
  // LoginPageのFixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // DashboardPageのFixture
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  // PIMPageのFixture
  pimPage: async ({ page }, use) => {
    const pimPage = new PIMPage(page);
    await use(pimPage);
  },

  // AdminPageのFixture
  adminPage: async ({ page }, use) => {
    const adminPage = new AdminPage(page);
    await use(adminPage);
  },

  // 認証済みページ（ログイン処理を自動実行）
  authenticatedPage: async ({ page, loginPage, dashboardPage }, use) => {
    // ログインページに移動
    await loginPage.goto();

    // 管理者としてログイン
    await loginPage.login('Admin', 'Admin#0630#');

    // ダッシュボードが表示されるまで待機
    await loginPage.waitForLoginSuccess();

    // 認証済みページを提供
    await use(page);

    // クリーンアップ（必要に応じて）
    // await page.getByRole('button', { name: 'Logout' }).click();
  },
});

export { expect } from '@playwright/test';
