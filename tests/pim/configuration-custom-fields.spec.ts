// spec: specs/test-plans/pim-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

/**
 * PIM Module - Configuration - Custom Fields
 * 
 * Test Case 2.1: View Custom Fields List
 * カスタムフィールド一覧の表示を検証
 */
test.describe('PIM Configuration - Custom Fields', () => {
  
  test('Test Case 2.1: View Custom Fields List', async ({ 
    authenticatedPage, 
    dashboardPage 
  }) => {
    console.log('🎬 Test Case 2.1 開始: カスタムフィールド一覧の表示');
    
    // ========================================
    // ステップ1: PIMモジュールに移動
    // ========================================
    await dashboardPage.navigateToModule('PIM');
    console.log('✅ ステップ1: PIMモジュールに移動');
    
    // ========================================
    // ステップ2: Configurationメニューをクリック
    // ========================================
    await authenticatedPage.getByText('Configuration').click();
    console.log('✅ ステップ2: Configurationメニューを開く');
    
    // ========================================
    // ステップ3: Custom Fieldsメニュー項目をクリック
    // ========================================
    await authenticatedPage.getByRole('menuitem', { name: 'Custom Fields' }).click();
    console.log('✅ ステップ3: Custom Fieldsページに移動');
    
    // ========================================
    // 検証: ページ見出しの確認
    // ========================================
    const heading = authenticatedPage.getByRole('heading', { name: 'Custom Fields' });
    await expect(heading).toBeVisible();
    console.log('✅ 検証: "Custom Fields"見出しが表示されている');
    
    // ========================================
    // 検証: 残りのカスタムフィールド数メッセージの確認
    // ========================================
    const remainingMessage = authenticatedPage.getByText('Remaining number of custom fields: 10');
    await expect(remainingMessage).toBeVisible();
    console.log('✅ 検証: "Remaining number of custom fields: 10"メッセージが表示されている');
    
    // ========================================
    // 検証: テーブル列ヘッダーの確認
    // ========================================
    const columnCustomFieldName = authenticatedPage.getByRole('columnheader', { name: 'Custom Field Name' });
    await expect(columnCustomFieldName).toBeVisible();
    console.log('✅ 検証: "Custom Field Name"列ヘッダーが表示されている');
    
    const columnScreen = authenticatedPage.getByRole('columnheader', { name: 'Screen' });
    await expect(columnScreen).toBeVisible();
    console.log('✅ 検証: "Screen"列ヘッダーが表示されている');
    
    const columnFieldType = authenticatedPage.getByRole('columnheader', { name: 'Field Type' });
    await expect(columnFieldType).toBeVisible();
    console.log('✅ 検証: "Field Type"列ヘッダーが表示されている');
    
    const columnActions = authenticatedPage.getByRole('columnheader', { name: 'Actions' });
    await expect(columnActions).toBeVisible();
    console.log('✅ 検証: "Actions"列ヘッダーが表示されている');
    
    // ========================================
    // 検証: Addボタンの確認
    // ========================================
    const addButton = authenticatedPage.getByRole('button', { name: 'Add' });
    await expect(addButton).toBeVisible();
    console.log('✅ 検証: "Add"ボタンが表示されている');
    
    // ========================================
    // 検証: No Records Foundメッセージの確認
    // ========================================
    const noRecordsMessage = authenticatedPage.getByText('No Records Found');
    await expect(noRecordsMessage).toBeVisible();
    console.log('✅ 検証: "No Records Found"メッセージが表示されている（カスタムフィールドが存在しない場合）');
    
    console.log('🎉 Test Case 2.1 完了: すべての検証が成功しました');
  });
});
