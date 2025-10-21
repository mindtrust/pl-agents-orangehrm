// spec: specs/test-plans/pim-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

test.describe('Add Employee - Login Details', () => {
  test('Create Employee with Login Details', async ({ page, authenticatedPage, dashboardPage, loginPage }) => {
    console.log('🎬 テスト開始: ログイン詳細を持つ従業員の作成');

    // ========================================
    // 前提条件: Add Employeeページに移動
    // ========================================
    
    // PIMモジュールに移動
    await page.getByRole('link', { name: 'PIM' }).click();
    console.log('✅ PIMモジュールに移動');

    // Add Employeeページに移動
    await page.getByRole('link', { name: 'Add Employee' }).click();
    console.log('✅ Add Employeeページに移動');

    // ========================================
    // ステップ1-2: 従業員名の入力
    // ========================================
    
    // 1. Enter First Name: "Test"
    await page.getByRole('textbox', { name: 'First Name' }).fill('Test');
    console.log('✅ ステップ1: First Name入力完了');

    // 2. Enter Last Name: "Employee"
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Employee');
    console.log('✅ ステップ2: Last Name入力完了');

    // ========================================
    // ステップ3-4: ログイン詳細の有効化
    // ========================================
    
    // 3. Check "Create Login Details" checkbox
    const createLoginCheckbox = page.locator('input[type="checkbox"]');
    await createLoginCheckbox.click({ force: true });
    console.log('✅ ステップ3: "Create Login Details"チェックボックスをチェック');

    // 4. Observe additional fields appear (verify Username field is visible)
    const usernameField = page.getByRole('textbox').nth(5);
    await expect(usernameField).toBeVisible();
    console.log('✅ ステップ4: ログイン詳細フィールドが表示されることを確認');

    // ========================================
    // ステップ5-8: ログイン認証情報の入力
    // ========================================
    
    // 5. Enter Username with timestamp for uniqueness
    const timestamp = Date.now();
    const username = `testuser_${timestamp}`;
    await usernameField.fill(username);
    console.log(`✅ ステップ5: Username入力完了 (${username})`);

    // 6. Keep Status as "Enabled" (デフォルトで選択済み)
    const enabledRadio = page.getByRole('radio', { name: 'Enabled' });
    await expect(enabledRadio).toBeChecked();
    console.log('✅ ステップ6: Statusが"Enabled"であることを確認');

    // 7. Enter Password: "TestPass123!"
    const passwordField = page.locator('input[type="password"]').first();
    await passwordField.fill('TestPass123!');
    console.log('✅ ステップ7: Password入力完了');

    // 8. Enter Confirm Password: "TestPass123!"
    const confirmPasswordField = page.locator('input[type="password"]').nth(1);
    await confirmPasswordField.fill('TestPass123!');
    console.log('✅ ステップ8: Confirm Password入力完了');

    // ========================================
    // ステップ9-10: 従業員の保存と検証
    // ========================================
    
    // 9. Click "Save" button
    await page.getByRole('button', { name: 'Save' }).click();
    console.log('✅ ステップ9: Saveボタンをクリック');

    // 10. Verify employee is created (success message and redirect to Personal Details)
    await expect(page.getByText('Successfully Saved')).toBeVisible();
    await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber/);
    await expect(page.getByRole('heading', { name: 'Test Employee' })).toBeVisible();
    console.log('✅ ステップ10: 従業員が正常に作成されたことを確認');

    // ========================================
    // ステップ11: ログアウト
    // ========================================
    
    // 11. Logout from current session
    await page.locator('span').filter({ hasText: 'Admin User' }).click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await expect(page).toHaveURL(/\/auth\/login/);
    console.log('✅ ステップ11: ログアウト完了');

    // ========================================
    // ステップ12-13: 新規ユーザーでログイン
    // ========================================
    
    // 12. Login with newly created credentials
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill('TestPass123!');
    await page.getByRole('button', { name: 'Login' }).click();
    console.log('✅ ステップ12: 新規ユーザーでログイン実行');

    // 13. Verify successful login
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'Test Employee' })).toBeVisible();
    await expect(page).toHaveURL(/\/dashboard\/index/);
    console.log('✅ ステップ13: 新規ユーザーでログイン成功を確認');

    // ========================================
    // 期待される結果の検証
    // ========================================
    
    // Verify user has appropriate default permissions (no Admin/PIM modules)
    await expect(page.getByRole('link', { name: 'Admin' })).not.toBeVisible();
    await expect(page.getByRole('link', { name: 'Leave' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'My Info' })).toBeVisible();
    console.log('✅ ユーザーが適切なデフォルト権限を持つことを確認');

    console.log('🎉 テスト完了: ログイン詳細を持つ従業員の作成成功');
  });
});
