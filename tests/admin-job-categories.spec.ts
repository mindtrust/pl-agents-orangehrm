// spec: specs/admin-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../src/fixtures/orangehrm-fixtures';

/**
 * 職種カテゴリ管理（Job Categories）のテスト
 * 
 * このテストはOrangeHRM管理モジュールの職種カテゴリ機能を検証します。
 */
test.describe('職種カテゴリ管理（Job Categories）', () => {

  test('5.1 新規職種カテゴリの追加（正常系）', async ({
    authenticatedPage,
    dashboardPage
  }) => {
    console.log('🎬 テスト開始: 新規職種カテゴリの追加');

    // 1. Admin >> Job >> Job Categories に移動
    await dashboardPage.page.getByRole('link', { name: 'Admin' }).click();
    console.log('✅ ステップ1: Adminモジュールに移動');

    await dashboardPage.page.getByText('Job').click();
    await dashboardPage.page.getByRole('menuitem', { name: 'Job Categories' }).click();
    await expect(dashboardPage.page).toHaveURL(/\/admin\/jobCategory$/);
    console.log('✅ ステップ1: Job Categoriesページに移動完了');

    // 2. 「Add」ボタンをクリック
    await dashboardPage.page.getByRole('button', { name: ' Add' }).click();
    await expect(dashboardPage.page).toHaveURL(/\/admin\/saveJobCategory$/);
    console.log('✅ ステップ2: Add Job Categoryフォームを表示');

    // 3. 「Name」フィールドに「技術部門」と入力
    const nameInput = dashboardPage.page.locator('form').getByRole('textbox');
    await nameInput.fill('技術部門');
    console.log('✅ ステップ3: Name フィールドに「技術部門」を入力');

    // 4. 「Save」ボタンをクリック
    await dashboardPage.page.getByRole('button', { name: 'Save' }).click();
    console.log('✅ ステップ4: Saveボタンをクリック');

    // 期待結果の検証
    // - 職種カテゴリが正常に追加される
    // - Job Categoriesリストページにリダイレクトされる
    await dashboardPage.page.getByText('Job Categories').first().waitFor({ state: 'visible' });
    await expect(dashboardPage.page).toHaveURL(/\/admin\/jobCategory$/);
    console.log('✅ 検証: Job Categoriesリストページにリダイレクトされた');

    // - 成功メッセージが表示される
    await expect(dashboardPage.page.getByText('Success')).toBeVisible();
    console.log('✅ 検証: 成功メッセージが表示された');

    // - 新規カテゴリ「技術部門」がテーブルに表示される
    await expect(dashboardPage.page.getByText('技術部門')).toBeVisible();
    console.log('✅ 検証: 新規カテゴリ「技術部門」がテーブルに表示された');

    console.log('🎉 テスト完了: 職種カテゴリが正常に追加されました');
  });

});
