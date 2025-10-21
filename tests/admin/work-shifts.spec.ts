// spec: specs/admin-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

test.describe('勤務シフト管理（Work Shifts）', () => {
  test('新規勤務シフトの追加（正常系）', async ({ authenticatedPage, page }) => {
    console.log('🎬 テスト開始: 新規勤務シフトの追加');

    // 1. Admin >> Job >> Work Shifts に移動
    console.log('ステップ1: Admin >> Job >> Work Shiftsに移動');
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByText('Job').click();
    await page.getByRole('menuitem', { name: 'Work Shifts' }).click();

    // 2. 「Add」ボタンをクリック
    console.log('ステップ2: Addボタンをクリック');
    await page.getByRole('button', { name: ' Add' }).click();

    // 3. 「Shift Name」フィールドに「日勤」と入力
    console.log('ステップ3: Shift Nameに「日勤」と入力');
    await page.getByRole('textbox').nth(1).fill('日勤');

    // 4. 「From」時刻に「09:00」と入力（デフォルトで09:00 AMなのでそのまま）
    console.log('ステップ4: From時刻は09:00 AMのまま');
    await page.getByRole('textbox', { name: 'hh:mm' }).first().click();

    // 5. 「To」時刻に「18:00」と入力
    console.log('ステップ5: To時刻を18:00に設定');
    await page.getByRole('textbox', { name: 'hh:mm' }).nth(1).click();
    await page.getByRole('textbox').nth(4).fill('06');
    await page.getByRole('textbox').nth(1).click();

    // 6. 「Assigned Employees」から従業員を選択（任意、スキップ）
    console.log('ステップ6: Assigned Employeesはスキップ');

    // 7. 「Save」ボタンをクリック
    console.log('ステップ7: Saveボタンをクリック');
    await page.getByRole('button', { name: 'Save' }).click();

    // 期待結果: 成功メッセージが表示される
    console.log('検証: 成功メッセージの表示を確認');
    await expect(page.getByText('Successfully Saved')).toBeVisible();
    await page.getByText('Successfully Saved').first().waitFor({ state: 'hidden' });

    // 期待結果: Work Shiftsリストページにリダイレクトされる
    console.log('検証: Work Shiftsリストページへのリダイレクトを確認');
    await expect(page).toHaveURL(/\/admin\/workShift/);

    // 期待結果: 新規シフト「日勤」がテーブルに表示される
    console.log('検証: 新規シフト「日勤」がテーブルに表示されることを確認');
    await expect(page.getByText('日勤')).toBeVisible();

    // 期待結果: レコード数が表示される
    console.log('検証: レコード数の表示を確認');
    await expect(page.getByText('(1) Record Found')).toBeVisible();

    console.log('✅ テスト完了: 新規勤務シフトの追加が成功しました');
  });
});
