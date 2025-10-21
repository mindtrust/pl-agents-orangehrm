// spec: specs/admin-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

test.describe('雇用ステータス管理（Employment Status）', () => {
  test('新規雇用ステータスの追加（正常系）', async ({ authenticatedPage, page }) => {
    console.log('🎬 テスト開始: 新規雇用ステータスの追加');

    // 1. Admin >> Job >> Employment Status に移動
    console.log('ステップ1: Admin >> Job >> Employment Status に移動');
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByText('Job').click();
    await page.getByRole('menuitem', { name: 'Employment Status' }).click();

    // URLが正しいことを確認
    await expect(page).toHaveURL(/.*\/admin\/employmentStatus/);
    console.log('✅ Employment Statusページに到達');

    // 2. 「Add」ボタンをクリック
    console.log('ステップ2: Addボタンをクリック');
    await page.getByRole('button', { name: ' Add' }).click();

    // Add Employment Statusページが表示されることを確認
    await expect(page.getByRole('heading', { name: 'Add Employment Status' })).toBeVisible();
    console.log('✅ Add Employment Statusフォームが表示された');

    // 3. 「Name」フィールドに「正社員」と入力
    console.log('ステップ3: Nameフィールドに「正社員」と入力');
    await page.locator('form').getByRole('textbox').fill('正社員');

    // 4. 「Save」ボタンをクリック
    console.log('ステップ4: Saveボタンをクリック');
    await page.getByRole('button', { name: 'Save' }).click();

    // 期待結果の検証
    // - 成功メッセージが表示される
    await expect(page.getByText('Successfully Saved')).toBeVisible();
    console.log('✅ 成功メッセージが表示された');

    // - Employment Statusリストページにリダイレクトされる
    await expect(page).toHaveURL(/.*\/admin\/employmentStatus/);
    console.log('✅ Employment Statusリストページにリダイレクトされた');

    // - 新規雇用ステータス「正社員」がテーブルに表示される
    await expect(page.getByText('正社員')).toBeVisible();
    console.log('✅ 新規雇用ステータス「正社員」がテーブルに表示された');

    // - レコード数が更新される
    await expect(page.getByText('(1) Record Found')).toBeVisible();
    console.log('✅ レコード数が(1) Record Foundに更新された');

    console.log('🎉 テスト完了: 新規雇用ステータスの追加成功');
  });
});
