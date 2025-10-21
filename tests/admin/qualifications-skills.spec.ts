// spec: specs/admin-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

test.describe('Qualifications - Skills Management', () => {
  test('10.1 新規スキルの追加（正常系）', async ({ authenticatedPage, page }) => {
    console.log('🎬 テスト開始: 新規スキルの追加（正常系）');

    // 1. Admin >> Qualifications >> Skills に移動
    console.log('ステップ1: Admin >> Qualifications >> Skills に移動');
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByText('Qualifications').click();
    await page.getByRole('menuitem', { name: 'Skills' }).click();

    // 2. 「Add」ボタンをクリック
    console.log('ステップ2: 「Add」ボタンをクリック');
    await page.getByRole('button', { name: ' Add' }).click();

    // 3. フォームに入力
    console.log('ステップ3: フォームに入力');
    // Name: "JavaScript"
    await page.locator('form input').fill('JavaScript');
    // Description: "フロントエンド開発言語"
    await page.getByRole('textbox', { name: 'Type description here' }).fill('フロントエンド開発言語');

    // 4. 「Save」ボタンをクリック
    console.log('ステップ4: 「Save」ボタンをクリック');
    await page.getByRole('button', { name: 'Save' }).click();

    // 期待結果の検証
    console.log('検証: スキルが正常に追加されたことを確認');
    // Skillsリストページにリダイレクトされることを確認
    await expect(page).toHaveURL(/viewSkills/);
    
    // レコード数が表示されることを確認
    await expect(page.getByText('(1) Record Found')).toBeVisible();
    
    // 新規スキル「JavaScript」がテーブルに表示されることを確認
    await expect(page.getByText('JavaScript')).toBeVisible();
    
    // 説明「フロントエンド開発言語」がテーブルに表示されることを確認
    await expect(page.getByText('フロントエンド開発言語')).toBeVisible();

    console.log('✅ テスト完了: スキルが正常に追加されました');
  });
});
