// spec: specs/admin-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../src/fixtures/orangehrm-fixtures';

test.describe('ユーザー管理', () => {
  test('新規ユーザーの追加（正常系）', async ({ authenticatedPage, dashboardPage, adminPage }) => {
    console.log('🎬 テスト開始: 新規ユーザーの追加（正常系）');

    // 1. 左サイドバーの「Admin」をクリック
    await dashboardPage.navigateToModule('Admin');
    await expect(adminPage.heading).toBeVisible();
    console.log('✅ ステップ1完了: Adminモジュールに移動');

    // 2-3. トップメニューの「User Management」>> 「Users」は既に表示されている
    // （デフォルトでSystem Usersページが表示される）
    await expect(authenticatedPage.getByRole('heading', { name: 'System Users' })).toBeVisible();
    console.log('✅ ステップ2-3完了: System Usersページ表示確認');

    // 4. 「Add」ボタンをクリック
    await adminPage.addButton.click();
    await expect(authenticatedPage.getByRole('heading', { name: 'Add User' })).toBeVisible();
    console.log('✅ ステップ4完了: Add Userフォーム表示');

    // 5. 「User Role」ドロップダウンから「Admin」を選択
    await authenticatedPage.locator('div').filter({ hasText: /^-- Select --$/ }).first().click();
    await authenticatedPage.getByRole('option', { name: 'Admin' }).click();
    console.log('✅ ステップ5完了: User Roleに「Admin」を選択');

    // 6. 「Employee Name」フィールドに「Admin User」と入力（オートコンプリート）
    await authenticatedPage.getByRole('textbox', { name: 'Type for hints...' }).pressSequentially('Admin User');
    await authenticatedPage.getByRole('option', { name: 'Admin User' }).click();
    console.log('✅ ステップ6完了: Employee Nameに「Admin User」を選択');

    // 7. 「Status」ドロップダウンから「Enabled」を選択
    await authenticatedPage.locator('div').filter({ hasText: /^-- Select --$/ }).nth(1).click();
    await authenticatedPage.getByRole('option', { name: 'Enabled' }).click();
    console.log('✅ ステップ7完了: Statusに「Enabled」を選択');

    // 8. 「Username」フィールドに「testuser001」と入力
    await authenticatedPage.getByRole('textbox').nth(2).fill('testuser001');
    console.log('✅ ステップ8完了: Usernameに「testuser001」を入力');

    // 9. 「Password」フィールドに「Test@1234」と入力
    await authenticatedPage.getByRole('textbox').nth(3).fill('Test@1234');
    console.log('✅ ステップ9完了: Passwordに「Test@1234」を入力');

    // 10. 「Confirm Password」フィールドに「Test@1234」を入力
    await authenticatedPage.getByRole('textbox').nth(4).fill('Test@1234');
    console.log('✅ ステップ10完了: Confirm Passwordに「Test@1234」を入力');

    // 11. 「Save」ボタンをクリック
    await authenticatedPage.getByRole('button', { name: 'Save' }).click();
    console.log('✅ ステップ11完了: Saveボタンをクリック');

    // 期待結果: System Usersリストページにリダイレクトされる
    await expect(authenticatedPage.getByRole('heading', { name: 'System Users' })).toBeVisible({ timeout: 10000 });
    console.log('✅ 期待結果1: System Usersリストページにリダイレクトされた');

    // 期待結果: 成功メッセージが表示される
    await expect(authenticatedPage.getByText('Successfully Saved')).toBeVisible();
    console.log('✅ 期待結果2: 成功メッセージが表示された');

    // 期待結果: 新規ユーザー「testuser001」がテーブルに表示される
    await expect(adminPage.userTable.getByText('testuser001')).toBeVisible();
    console.log('✅ 期待結果3: 新規ユーザー「testuser001」がテーブルに表示された');

    // 期待結果: ユーザー情報が正しく保存される（Username: testuser001, User Role: Admin, Status: Enabled）
    const testUserRow = adminPage.userTable.getByRole('row', { name: /testuser001/ });
    await expect(testUserRow.getByText('Admin')).toBeVisible();
    await expect(testUserRow.getByText('Enabled')).toBeVisible();
    console.log('✅ 期待結果4: ユーザー情報が正しく保存された（Username: testuser001, User Role: Admin, Status: Enabled）');

    console.log('🎉 テスト完了: 新規ユーザーの追加（正常系）');
  });
});
