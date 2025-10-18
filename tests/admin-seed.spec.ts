// tests/admin-seed.spec.ts
import { test, expect } from '../src/fixtures/orangehrm-fixtures';

/**
 * Seed test with Page Object Model
 *
 * このテストはPlaywright Agentsが実行し、以下を学習します：
 * 1. Page Objectの使い方
 * 2. Fixtureの使い方
 * 3. アプリケーションの基本的な構造
 */
test.describe('Admin Seed - Page Object Pattern', () => {

  test('seed - ログインと基本的なナビゲーション', async ({
    loginPage,
    dashboardPage
  }) => {
    console.log('🎬 Seed test開始: ログインとナビゲーション');

    // ========================================
    // ステップ1: ログイン
    // ========================================
    await loginPage.goto();
    await loginPage.login('Admin', 'Admin#0630#');
    await loginPage.waitForLoginSuccess();

    console.log('✅ ステップ1完了: ログイン成功');

    // ========================================
    // ステップ2: 各モジュールへのアクセス
    // ========================================
    const modules = ['Admin', 'PIM', 'Leave', 'Time', 'Recruitment'] as const;

    for (const module of modules) {
      await dashboardPage.navigateToModule(module);
      await expect(dashboardPage.page).toHaveURL(new RegExp(module.toLowerCase()));
      console.log(`✅ ${module}モジュール: アクセス成功`);
    }

    console.log('🎉 Seed test完了: すべてのモジュールにアクセス可能');
  });

  test('seed - 認証済みFixtureを使用した探索', async ({
    authenticatedPage,
    dashboardPage,
    pimPage,
    adminPage
  }) => {
    console.log('🎬 Seed test開始: 認証済みFixtureでの探索');

    // authenticatedPage は既にログイン済み
    await expect(dashboardPage.dashboardHeading).toBeVisible();
    console.log('✅ ダッシュボード表示確認');

    // ========================================
    // PIMモジュールの探索
    // ========================================
    await dashboardPage.navigateToModule('PIM');
    await expect(pimPage.heading).toBeVisible();
    await expect(pimPage.employeeTable).toBeVisible();
    await expect(pimPage.addButton).toBeVisible();
    console.log('✅ PIMモジュール: 基本要素確認完了');

    // ========================================
    // Adminモジュールの探索
    // ========================================
    await dashboardPage.navigateToModule('Admin');
    await expect(adminPage.heading).toBeVisible();
    await expect(adminPage.userTable).toBeVisible();
    await expect(adminPage.addButton).toBeVisible();
    console.log('✅ Adminモジュール: 基本要素確認完了');

    console.log('🎉 Seed test完了: Page Objectを使った探索成功');
  });

  test('seed - 検索機能の動作確認', async ({
    authenticatedPage,
    dashboardPage,
    pimPage
  }) => {
    console.log('🎬 Seed test開始: 検索機能');

    // PIMモジュールに移動
    await dashboardPage.navigateToModule('PIM');

    // 検索フィールドとボタンの存在確認
    await expect(pimPage.searchInput).toBeVisible();
    await expect(pimPage.searchButton).toBeVisible();

    console.log('✅ 検索機能: 利用可能');
  });
});
