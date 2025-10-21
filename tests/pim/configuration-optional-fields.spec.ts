// spec: specs/test-plans/pim-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

test.describe('PIM Configuration - Optional Fields', () => {
  test('Test Case 1.1: View Optional Fields Configuration', async ({ 
    authenticatedPage,
    dashboardPage 
  }) => {
    console.log('🎬 テスト開始: Optional Fields Configuration表示確認');

    // ========================================
    // ステップ1: PIMモジュールに移動
    // ========================================
    await dashboardPage.navigateToModule('PIM');
    console.log('✅ ステップ1完了: PIMモジュールに移動');

    // ========================================
    // ステップ2: Configurationメニューをクリック
    // ========================================
    await authenticatedPage.getByText('Configuration').click();
    console.log('✅ ステップ2完了: Configurationメニューを開く');

    // ========================================
    // ステップ3: Optional Fieldsを選択
    // ========================================
    await authenticatedPage.getByRole('menuitem', { name: 'Optional Fields' }).click();
    console.log('✅ ステップ3完了: Optional Fieldsページに遷移');

    // ========================================
    // 検証: ページが正常にロードされることを確認
    // ========================================
    await expect(authenticatedPage).toHaveURL(/\/pim\/configurePim/);
    console.log('✅ 検証1: URLが正しい');

    // ========================================
    // 検証: "Optional Fields"見出しが表示されることを確認
    // ========================================
    await expect(authenticatedPage.getByText('Optional Fields')).toBeVisible();
    console.log('✅ 検証2: "Optional Fields"見出しが表示される');

    // ========================================
    // 検証: "Show Deprecated Fields"セクションが表示されることを確認
    // ========================================
    await expect(authenticatedPage.getByRole('heading', { name: 'Show Deprecated Fields' })).toBeVisible();
    await expect(authenticatedPage.getByText('Show Nick Name, Smoker and Military Service in Personal Details')).toBeVisible();
    console.log('✅ 検証3: "Show Deprecated Fields"セクションが表示される');

    // ========================================
    // 検証: "Country Specific Information"セクションが表示されることを確認
    // ========================================
    await expect(authenticatedPage.getByRole('heading', { name: 'Country Specific Information' })).toBeVisible();
    console.log('✅ 検証4: "Country Specific Information"見出しが表示される');

    // ========================================
    // 検証: 3つの国固有チェックボックスが表示されることを確認
    // ========================================
    await expect(authenticatedPage.getByText('Show SSN field in Personal Details')).toBeVisible();
    await expect(authenticatedPage.getByText('Show SIN field in Personal Details')).toBeVisible();
    await expect(authenticatedPage.getByText('Show US Tax Exemptions menu')).toBeVisible();
    console.log('✅ 検証5: 3つの国固有チェックボックスが表示される');

    // ========================================
    // 検証: Saveボタンが表示されることを確認
    // ========================================
    await expect(authenticatedPage.getByRole('button', { name: 'Save' })).toBeVisible();
    console.log('✅ 検証6: Saveボタンが表示される');

    console.log('🎉 テスト完了: すべての検証が成功');
  });
});
