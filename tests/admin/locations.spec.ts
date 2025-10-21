// spec: specs/admin-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

test.describe('拠点管理（Locations）', () => {
  test('新規拠点の追加（正常系）', async ({ authenticatedPage, page }) => {
    console.log('🎬 テスト開始: 新規拠点の追加');

    // 1. Admin >> Organization >> Locations に移動
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByText('Organization').click();
    await page.getByRole('menuitem', { name: 'Locations' }).click();
    console.log('✅ ステップ1完了: Locationsページに移動');

    // 2. 「Add」ボタンをクリック
    await page.getByRole('button', { name: ' Add' }).click();
    console.log('✅ ステップ2完了: Add Locationフォーム表示');

    // 3. 「Name」フィールドに「東京本社」と入力
    await page.getByRole('textbox', { name: 'Type here' }).first().fill('東京本社');

    // 4. 「City」に「東京」と入力
    await page.getByRole('textbox', { name: 'Type here' }).nth(1).fill('東京');

    // 5. 「State/Province」に「東京都」と入力
    await page.getByRole('textbox', { name: 'Type here' }).nth(2).fill('東京都');

    // 6. 「Zip/Postal Code」に「100-0001」と入力
    await page.getByRole('textbox', { name: 'Type here' }).nth(3).fill('100-0001');

    // 7. 「Country」ドロップダウンから「Japan」を選択
    await page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2).click();
    await page.getByRole('option', { name: 'Japan' }).click();

    // 8. 「Phone」に「03-1234-5678」と入力
    await page.getByRole('textbox', { name: 'Type here' }).nth(4).fill('03-1234-5678');
    console.log('✅ ステップ3-8完了: フォーム入力完了');

    // 9. 「Save」ボタンをクリック
    await page.getByRole('button', { name: 'Save' }).click();
    console.log('✅ ステップ9完了: 保存ボタンクリック');

    // 期待結果の確認: 成功メッセージが表示される
    await expect(page.getByText('Successfully Saved')).toBeVisible();

    // 期待結果の確認: Locationsリストページにリダイレクトされる
    await expect(page).toHaveURL(/.*\/admin\/viewLocations/);

    // 期待結果の確認: 新規拠点「東京本社」がテーブルに表示される
    await expect(page.getByText('東京本社')).toBeVisible();

    // 期待結果の確認: レコード数が(1) Record Foundと表示される
    await expect(page.getByText('(1) Record Found')).toBeVisible();

    console.log('🎉 テスト完了: 新規拠点が正常に追加されました');
  });
});
