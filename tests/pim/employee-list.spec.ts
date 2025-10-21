// spec: specs/test-plans/pim-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

/**
 * PIM Module - Employee List Tests
 * 
 * Test Case 6.1: View Employee List
 * Priority: High
 */
test.describe('Employee List - Search and Filter', () => {
  
  test('View Employee List', async ({ authenticatedPage, dashboardPage }) => {
    console.log('🎬 テスト開始: View Employee List');

    // ========================================
    // 1. Navigate to PIM > Employee List
    // ========================================
    await dashboardPage.navigateToModule('PIM');
    console.log('✅ ステップ1完了: PIMモジュールに移動');

    // ========================================
    // 検証: "Employee Information" ページが正常に読み込まれる
    // ========================================
    await expect(dashboardPage.page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
    console.log('✅ 検証完了: Employee Informationページが表示されている');

    // ========================================
    // 検証: 検索フォームのフィールドが表示される
    // ========================================
    // Employee Name (autocomplete)
    await expect(dashboardPage.page.getByText('Employee Name')).toBeVisible();
    const employeeNameInput = dashboardPage.page.getByRole('textbox', { name: 'Type for hints...' }).first();
    await expect(employeeNameInput).toBeVisible();
    console.log('✅ Employee Name フィールド確認完了');

    // Employee Id
    await expect(dashboardPage.page.getByText('Employee Id')).toBeVisible();
    console.log('✅ Employee Id フィールド確認完了');

    // ========================================
    // 検索フォーム内のフィールドを確認
    // Note: "Employment Status", "Job Title", "Sub Unit" はテーブルヘッダーにも存在するため、
    // 検索フォームのセクションにスコープを絞る
    // ========================================
    const searchForm = dashboardPage.page.locator('form').first();

    // Employment Status (dropdown) - 検索フォーム内
    await expect(searchForm.getByText('Employment Status')).toBeVisible();
    console.log('✅ Employment Status ドロップダウン確認完了');

    // Include (dropdown with "Current Employees Only" default)
    await expect(searchForm.getByText('Include')).toBeVisible();
    await expect(searchForm.getByText('Current Employees Only')).toBeVisible();
    console.log('✅ Include ドロップダウン確認完了（デフォルト値: Current Employees Only）');

    // Supervisor Name (autocomplete)
    await expect(searchForm.getByText('Supervisor Name')).toBeVisible();
    console.log('✅ Supervisor Name フィールド確認完了');

    // Job Title (dropdown) - 検索フォーム内
    await expect(searchForm.getByText('Job Title')).toBeVisible();
    console.log('✅ Job Title ドロップダウン確認完了');

    // Sub Unit (dropdown) - 検索フォーム内
    await expect(searchForm.getByText('Sub Unit')).toBeVisible();
    console.log('✅ Sub Unit ドロップダウン確認完了');

    // ========================================
    // 検証: ResetとSearchボタンが表示される
    // ========================================
    const resetButton = dashboardPage.page.getByRole('button', { name: 'Reset' });
    const searchButton = dashboardPage.page.getByRole('button', { name: 'Search' });
    
    await expect(resetButton).toBeVisible();
    await expect(searchButton).toBeVisible();
    console.log('✅ ResetとSearchボタン確認完了');

    // ========================================
    // 検証: 従業員テーブルの列ヘッダーが表示される
    // ========================================
    // テーブル要素を取得
    const employeeTable = dashboardPage.page.getByRole('table');
    await expect(employeeTable).toBeVisible();

    // 列ヘッダーを確認（columnheader roleを使用）
    // Id
    await expect(dashboardPage.page.getByRole('columnheader', { name: /Id/ })).toBeVisible();

    // First (& Middle) Name
    await expect(dashboardPage.page.getByRole('columnheader', { name: /First.*Middle.*Name/ })).toBeVisible();

    // Last Name
    await expect(dashboardPage.page.getByRole('columnheader', { name: /Last Name/ })).toBeVisible();

    // Job Title (table column)
    await expect(dashboardPage.page.getByRole('columnheader', { name: /Job Title/ })).toBeVisible();

    // Employment Status (table column)
    await expect(dashboardPage.page.getByRole('columnheader', { name: /Employment Status/ })).toBeVisible();

    // Sub Unit (table column)
    await expect(dashboardPage.page.getByRole('columnheader', { name: /Sub Unit/ })).toBeVisible();

    // Supervisor (table column)
    await expect(dashboardPage.page.getByRole('columnheader', { name: /Supervisor/ })).toBeVisible();

    // Actions
    await expect(dashboardPage.page.getByRole('columnheader', { name: /Actions/ })).toBeVisible();
    console.log('✅ テーブル列ヘッダー確認完了');

    // ========================================
    // 検証: レコード数が表示される
    // ========================================
    const recordCount = dashboardPage.page.getByText(/\(\d+\) Records? Found/);
    await expect(recordCount).toBeVisible();
    console.log('✅ レコード数表示確認完了');

    // ========================================
    // 検証: Addボタンが表示される
    // ========================================
    const addButton = dashboardPage.page.getByRole('button', { name: 'Add' });
    await expect(addButton).toBeVisible();
    console.log('✅ Addボタン確認完了');

    console.log('🎉 テスト完了: View Employee List - すべての要素が正常に表示されています');
  });
});
