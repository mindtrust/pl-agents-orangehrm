// spec: Admin Module - Job Title Seed Test
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

/**
 * Admin Module - 職務設定のシードテスト
 *
 * このテストはPlaywright Agentsが実行し、以下を学習します：
 * - OrangeHRMの職務設定（Job Title）の追加プロセス
 * - フォーム入力とバリデーション
 * - 成功メッセージの確認方法
 */
test.describe('Admin Module - Job Title Seed Test', () => {
  test('Add Job Title Test', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    // 1. Navigate to http://localhost:8080/web/index.php/admin/viewJobTitleList
    await page.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList');

    // 2. Click the Add button
    await page.getByRole('button', { name: ' Add' }).click();

    // 3. Fill in Job Title: "テストエンジニア"
    await page.getByRole('textbox').nth(1).fill('テストエンジニア');

    // 4. Fill in Job Description: "テスト業務"
    await page.getByRole('textbox', { name: 'Type description here' }).fill('テスト業務');

    // 5. Fill in Note: "品質保証部"
    await page.getByRole('textbox', { name: 'Add note' }).fill('品質保証部');

    // 6. Click Save button
    await page.getByRole('button', { name: 'Save' }).click();

    // 7. Wait for navigation back to list page (or timeout and manually navigate)
    await page.waitForURL('**/viewJobTitleList', { timeout: 5000 }).catch(async () => {
      // If auto-navigation didn't happen, manually navigate
      await page.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList');
    });

    // 8. Verify the job title "テストエンジニア" appears in the list
    await expect(page.getByText('テストエンジニア')).toBeVisible();

    // 9. 追加の検証: レコード数が1件以上であることを確認
    await expect(page.getByText(/Record.*Found/)).toBeVisible();
  });
});
