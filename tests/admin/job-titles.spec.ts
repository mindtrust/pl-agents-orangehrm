// spec: specs/admin-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

test.describe('職位管理（Job Titles）', () => {
  test('新規職位の追加（正常系）', async ({ authenticatedPage, page }) => {
    console.log('🎬 テスト開始: 新規職位の追加');

    // 1. Admin >> Job >> Job Titles に移動
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByText('Job').click();
    await page.getByRole('menuitem', { name: 'Job Titles' }).click();
    console.log('✅ ステップ1完了: Job Titlesページに移動');

    // 2. 「Add」ボタンをクリック
    await page.getByRole('button', { name: ' Add' }).click();
    console.log('✅ ステップ2完了: 追加フォームを開く');

    // 3. フォームに入力
    // Job Title: "ソフトウェアエンジニア"
    await page.getByRole('textbox').nth(1).fill('ソフトウェアエンジニア');
    
    // Job Description: "ソフトウェア開発業務"
    await page.getByRole('textbox', { name: 'Type description here' }).fill('ソフトウェア開発業務');
    
    // Note: "技術部門" (任意)
    await page.getByRole('textbox', { name: 'Add note' }).fill('技術部門');
    console.log('✅ ステップ3完了: フォーム入力完了');

    // 4. 「Save」ボタンをクリック
    await page.getByRole('button', { name: 'Save' }).click();
    console.log('✅ ステップ4完了: 保存ボタンをクリック');

    // 期待結果の検証
    // - 成功メッセージが表示される
    await expect(page.getByText('Successfully Saved')).toBeVisible();
    console.log('✅ 検証1: 成功メッセージが表示された');

    // - Job Titlesリストページにリダイレクトされる
    await expect(page).toHaveURL(/\/admin\/viewJobTitleList/);
    console.log('✅ 検証2: Job Titlesリストページにリダイレクトされた');

    // - レコード数が表示される
    await expect(page.getByText('(1) Record Found')).toBeVisible();
    console.log('✅ 検証3: レコード数が表示された');

    // - 新規職位「ソフトウェアエンジニア」がテーブルに表示される
    await expect(page.getByRole('cell', { name: 'ソフトウェアエンジニア' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'ソフトウェア開発業務' })).toBeVisible();
    console.log('✅ 検証4: 新規職位がテーブルに表示された');

    console.log('🎉 テスト完了: 新規職位の追加が成功しました');
  });
});
