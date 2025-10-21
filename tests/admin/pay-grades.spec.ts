// spec: specs/admin-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

test.describe('給与等級管理（Pay Grades）', () => {
  test('新規給与等級の追加（正常系）', async ({ authenticatedPage, page }) => {
    console.log('🎬 テスト開始: 新規給与等級の追加');

    // 1. Admin >> Job >> Pay Grades に移動
    console.log('ステップ1: Admin >> Job >> Pay Grades に移動');
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByText('Job').click();
    await page.getByRole('menuitem', { name: 'Pay Grades' }).click();

    // Pay Gradesページが表示されることを確認
    await expect(page.getByRole('heading', { name: 'Pay Grades' })).toBeVisible();
    console.log('✅ Pay Gradesページに移動完了');

    // 2. 「Add」ボタンをクリック
    console.log('ステップ2: Addボタンをクリック');
    await page.getByRole('button', { name: ' Add' }).click();

    // Add Pay Gradeフォームが表示されることを確認
    await expect(page.getByRole('heading', { name: 'Add Pay Grade' })).toBeVisible();
    console.log('✅ Add Pay Gradeフォームが表示された');

    // 3. 「Name」フィールドに「Grade 1」と入力
    console.log('ステップ3: Nameフィールドに "Grade 1" と入力');
    await page.locator('form').getByRole('textbox').fill('Grade 1');
    console.log('✅ Nameフィールドに入力完了');

    // 4. 「Save」ボタンをクリック
    console.log('ステップ4: Saveボタンをクリック');
    await page.getByRole('button', { name: 'Save' }).click();

    // 期待結果の検証
    console.log('検証: 期待結果を確認中...');

    // 給与等級の詳細ページが表示される
    await expect(page.getByRole('heading', { name: 'Edit Pay Grade' })).toBeVisible();
    console.log('✅ 給与等級の詳細ページが表示された');

    // Nameフィールドに「Grade 1」が表示される
    await expect(page.locator('form').getByRole('textbox')).toHaveValue('Grade 1');
    console.log('✅ 給与等級名が正しく保存された');

    // 「Currencies」セクションが表示される
    await expect(page.getByRole('heading', { name: 'Currencies' })).toBeVisible();
    console.log('✅ Currenciesセクションが表示された');

    // Currencies セクションのAddボタンが表示される
    const currenciesSection = page.locator('div').filter({ hasText: /^Currencies Add$/ });
    await expect(currenciesSection.getByRole('button', { name: 'Add' })).toBeVisible();
    console.log('✅ 通貨情報を追加可能な状態');

    console.log('🎉 テスト完了: 新規給与等級が正常に追加されました');
  });
});
