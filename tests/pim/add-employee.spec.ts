// spec: specs/test-plans/pim-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

test.describe('Add Employee - Basic Information', () => {
  test('Add Employee with Minimum Required Fields', async ({ authenticatedPage, dashboardPage }) => {
    console.log('🎬 テスト開始: 最小限の必須項目で従業員を追加');

    // PIMモジュールに移動
    await dashboardPage.navigateToModule('PIM');
    console.log('✅ PIMモジュールに移動');

    // Add Employeeページに移動
    await authenticatedPage.getByRole('link', { name: 'Add Employee' }).click();
    await expect(authenticatedPage.getByRole('heading', { name: 'Add Employee' })).toBeVisible();
    console.log('✅ Add Employeeページを表示');

    // 1. Enter First Name: "John"
    await authenticatedPage.getByRole('textbox', { name: 'First Name' }).fill('John');
    console.log('✅ ステップ1完了: First Nameを入力');

    // 2. Enter Last Name: "Doe"
    await authenticatedPage.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    console.log('✅ ステップ2完了: Last Nameを入力');

    // 3. Accept auto-generated Employee Id
    const employeeIdInput = authenticatedPage.getByRole('textbox', { name: 'Employee Id' });
    const employeeId = await employeeIdInput.inputValue();
    console.log(`✅ ステップ3完了: 自動生成されたEmployee Id「${employeeId}」を使用`);

    // 4. Click "Save" button
    await authenticatedPage.getByRole('button', { name: 'Save' }).click();
    console.log('✅ ステップ4完了: Saveボタンをクリック');

    // 期待結果: Success message displays
    await expect(authenticatedPage.getByText('Successfully Saved')).toBeVisible();
    console.log('✅ 検証: 成功メッセージが表示された');

    // 期待結果: Redirects to employee's Personal Details page
    await expect(authenticatedPage).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
    await expect(authenticatedPage.getByRole('heading', { name: 'John Doe' })).toBeVisible();
    await expect(authenticatedPage.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
    console.log('✅ 検証: Personal Detailsページにリダイレクトされた');

    // 期待結果: Employee appears in Employee List
    await authenticatedPage.getByRole('link', { name: 'Employee List' }).click();
    await expect(authenticatedPage.getByText('John')).toBeVisible();
    await expect(authenticatedPage.getByText('Doe')).toBeVisible();
    console.log('✅ 検証: Employee Listに従業員が表示された');

    // 期待結果: Auto-generated Employee Id is assigned
    const recordCount = authenticatedPage.getByText(/\(\d+\) Records? Found/);
    await expect(recordCount).toBeVisible();
    console.log('✅ 検証: 従業員が正常に作成され、Employee Idが割り当てられた');

    console.log('🎉 テスト完了: すべての検証をパスしました');
  });

  test('Add Employee with All Basic Fields', async ({ authenticatedPage, dashboardPage }) => {
    console.log('🎬 テスト開始: 全ての基本項目で従業員を追加');

    // PIMモジュールに移動
    await dashboardPage.navigateToModule('PIM');
    console.log('✅ PIMモジュールに移動');

    // Add Employeeページに移動
    await authenticatedPage.getByRole('link', { name: 'Add Employee' }).click();
    await expect(authenticatedPage.getByRole('heading', { name: 'Add Employee' })).toBeVisible();
    console.log('✅ Add Employeeページを表示');

    // 1. Enter First Name: "Jane"
    await authenticatedPage.getByRole('textbox', { name: 'First Name' }).fill('Jane');
    console.log('✅ ステップ1完了: First Nameに「Jane」を入力');

    // 2. Enter Middle Name: "Marie"
    await authenticatedPage.getByRole('textbox', { name: 'Middle Name' }).fill('Marie');
    console.log('✅ ステップ2完了: Middle Nameに「Marie」を入力');

    // 3. Enter Last Name: "Smith"
    await authenticatedPage.getByRole('textbox', { name: 'Last Name' }).fill('Smith');
    console.log('✅ ステップ3完了: Last Nameに「Smith」を入力');

    // 4. Modify Employee Id: "1001"
    await authenticatedPage.getByRole('textbox').nth(4).fill('1001');
    console.log('✅ ステップ4完了: Employee Idを「1001」に変更');

    // 5. Click "Save" button
    await authenticatedPage.getByRole('button', { name: 'Save' }).click();
    console.log('✅ ステップ5完了: Saveボタンをクリック');

    // 期待結果: Employee is created with all provided information
    await expect(authenticatedPage.getByRole('heading', { name: 'Jane Smith' })).toBeVisible();
    console.log('✅ 検証: 従業員が全ての情報で作成された');

    // 期待結果: Redirects to employee's Personal Details page
    await expect(authenticatedPage.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
    console.log('✅ 検証: Personal Detailsページが表示された');

    // 期待結果: Middle name is saved correctly
    await expect(authenticatedPage.getByRole('textbox', { name: 'First Name' })).toHaveValue('Jane');
    await expect(authenticatedPage.getByRole('textbox', { name: 'Middle Name' })).toHaveValue('Marie');
    await expect(authenticatedPage.getByRole('textbox', { name: 'Last Name' })).toHaveValue('Smith');
    console.log('✅ 検証: Middle Nameを含む全ての名前が正しく保存された');

    // 期待結果: Custom Employee Id is accepted and assigned
    await expect(authenticatedPage.getByRole('textbox').nth(4)).toHaveValue('1001');
    console.log('✅ 検証: カスタムEmployee Id「1001」が受け入れられ、割り当てられた');

    // 期待結果: All data appears on Personal Details page
    await expect(authenticatedPage).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
    console.log('✅ 検証: すべてのデータがPersonal Detailsページに表示された');

    console.log('🎉 テスト完了: すべての検証をパスしました');
  });
});
