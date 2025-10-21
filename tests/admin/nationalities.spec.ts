// spec: specs/admin-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

test.describe('国籍管理（Nationalities）', () => {
  test('新規国籍の追加（正常系）', async ({ authenticatedPage, page }) => {
    console.log('🎬 テスト開始: 新規国籍の追加');

    // 1. Admin >> Nationalities に移動
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('link', { name: 'Nationalities' }).click();
    console.log('✅ ステップ1完了: Nationalitiesページに移動');

    // 2. ページに既存の国籍が表示されることを確認（デフォルトで193件）
    await expect(page.getByText('(193) Records Found')).toBeVisible();
    console.log('✅ ステップ2完了: 既存の国籍193件を確認');

    // 3. 「Add」ボタンをクリック
    await page.getByRole('button', { name: ' Add' }).click();
    await expect(page.getByRole('heading', { name: 'Add Nationality' })).toBeVisible();
    console.log('✅ ステップ3完了: 新規追加フォームを表示');

    // 4. フォームに入力: Nationality: "Martian"
    await page.locator('form').getByRole('textbox').fill('Martian');
    console.log('✅ ステップ4完了: 国籍名「Martian」を入力');

    // 5. 「Save」ボタンをクリック
    await page.getByRole('button', { name: 'Save' }).click();
    console.log('✅ ステップ5完了: 保存ボタンをクリック');

    // 期待結果: 成功メッセージが表示される
    await expect(page.getByText('Success')).toBeVisible();
    await expect(page.getByText('Successfully Saved')).toBeVisible();
    console.log('✅ 検証1: 成功メッセージを確認');

    // 期待結果: Nationalitiesリストページにリダイレクトされる
    await expect(page).toHaveURL(/.*\/admin\/nationality/);
    await expect(page.getByRole('heading', { name: 'Nationalities' })).toBeVisible();
    console.log('✅ 検証2: Nationalitiesリストページにリダイレクト');

    // 期待結果: レコード数が194に増加
    await expect(page.getByText('(194) Records Found')).toBeVisible();
    console.log('✅ 検証3: レコード数が194に増加');

    // 期待結果: 新規国籍「Martian」がテーブルに表示される
    // Martianはアルファベット順でページ3に表示される
    await page.getByRole('button', { name: '3' }).click();
    await expect(page.getByRole('cell', { name: 'Martian' })).toBeVisible();
    console.log('✅ 検証4: 新規国籍「Martian」がテーブルに表示');

    console.log('🎉 テスト完了: 新規国籍の追加が成功');
  });
});
