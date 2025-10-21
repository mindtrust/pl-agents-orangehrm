// spec: Admin Module Seed Data Test
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

test.describe('Admin Module Seed Data', () => {
  test('Insert Admin Module Test Data', async ({ authenticatedPage, page }) => {
    console.log('🎬 Admin Module Seed Data Test 開始');

    // 1. Navigate to Job Titles page
    await page.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList');
    console.log('✅ Job Titles ページに移動');

    // 2. Add Job Title: "プロジェクトマネージャー" with description "プロジェクト管理業務"
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByRole('textbox').nth(1).fill('プロジェクトマネージャー');
    await page.getByRole('textbox', { name: 'Type description here' }).fill('プロジェクト管理業務');
    await page.getByRole('button', { name: 'Save' }).click();

    // Wait for save to complete (either auto-navigation or manual)
    await page.waitForURL('**/viewJobTitleList', { timeout: 5000 }).catch(async () => {
      await page.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList');
    });
    await expect(page.getByText('プロジェクトマネージャー')).toBeVisible();
    console.log('✅ Job Title追加: プロジェクトマネージャー');

    // 3. Navigate to Employment Status page
    await page.goto('http://localhost:8080/web/index.php/admin/employmentStatus');
    console.log('✅ Employment Status ページに移動');

    // 4. Add Employment Status: "契約社員"
    await page.getByRole('button', { name: ' Add' }).click();
    await page.locator('form').getByRole('textbox').fill('契約社員');
    await page.getByRole('button', { name: 'Save' }).click();

    // Wait for save to complete
    await page.waitForURL('**/employmentStatus', { timeout: 5000 }).catch(async () => {
      await page.goto('http://localhost:8080/web/index.php/admin/employmentStatus');
    });
    await expect(page.getByText('契約社員')).toBeVisible();
    console.log('✅ Employment Status追加: 契約社員');

    // 5. Navigate to Job Categories page
    await page.goto('http://localhost:8080/web/index.php/admin/jobCategory');
    console.log('✅ Job Categories ページに移動');

    // 6. Add Job Category: "管理部門"
    await page.getByRole('button', { name: ' Add' }).click();
    await page.locator('form').getByRole('textbox').fill('管理部門');
    await page.getByRole('button', { name: 'Save' }).click();

    // Wait for save to complete
    await page.waitForURL('**/jobCategory', { timeout: 5000 }).catch(async () => {
      await page.goto('http://localhost:8080/web/index.php/admin/jobCategory');
    });
    await expect(page.getByText('管理部門')).toBeVisible();
    console.log('✅ Job Category追加: 管理部門');

    // 7. Navigate to Skills page
    await page.goto('http://localhost:8080/web/index.php/admin/viewSkills');
    console.log('✅ Skills ページに移動');

    // 8. Add Skill: "Python" with description "バックエンド開発言語"
    await page.getByRole('button', { name: ' Add' }).click();
    await page.locator('form input').fill('Python');
    await page.getByRole('textbox', { name: 'Type description here' }).fill('バックエンド開発言語');
    await page.getByRole('button', { name: 'Save' }).click();

    // Wait for save to complete
    await page.waitForURL('**/viewSkills', { timeout: 5000 }).catch(async () => {
      await page.goto('http://localhost:8080/web/index.php/admin/viewSkills');
    });
    await expect(page.getByText('Python')).toBeVisible();
    console.log('✅ Skill追加: Python');

    // 9. Add Skill: "SQL" with description "データベース操作言語"
    await page.goto('http://localhost:8080/web/index.php/admin/viewSkills');
    await page.getByRole('button', { name: ' Add' }).click();
    await page.locator('form input').fill('SQL');
    await page.getByRole('textbox', { name: 'Type description here' }).fill('データベース操作言語');
    await page.getByRole('button', { name: 'Save' }).click();

    // Wait for save to complete
    await page.waitForURL('**/viewSkills', { timeout: 5000 }).catch(async () => {
      await page.goto('http://localhost:8080/web/index.php/admin/viewSkills');
    });
    await expect(page.getByText('SQL')).toBeVisible();
    console.log('✅ Skill追加: SQL');

    // 10. Navigate to Education page
    await page.goto('http://localhost:8080/web/index.php/admin/viewEducation');
    console.log('✅ Education ページに移動');

    // 11. Add Education: "学士"
    await page.getByRole('button', { name: ' Add' }).click();
    await page.locator('form').getByRole('textbox').fill('学士');
    await page.getByRole('button', { name: 'Save' }).click();

    // Wait for save to complete
    await page.waitForURL('**/viewEducation', { timeout: 5000 }).catch(async () => {
      await page.goto('http://localhost:8080/web/index.php/admin/viewEducation');
    });
    await expect(page.getByText('学士')).toBeVisible();
    console.log('✅ Education追加: 学士');

    // 12. Add Education: "修士"
    await page.goto('http://localhost:8080/web/index.php/admin/viewEducation');
    await page.getByRole('button', { name: ' Add' }).click();
    await page.locator('form').getByRole('textbox').fill('修士');
    await page.getByRole('button', { name: 'Save' }).click();

    // Wait for save to complete
    await page.waitForURL('**/viewEducation', { timeout: 5000 }).catch(async () => {
      await page.goto('http://localhost:8080/web/index.php/admin/viewEducation');
    });
    await expect(page.getByText('修士')).toBeVisible();
    console.log('✅ Education追加: 修士');

    console.log('🎉 Admin Module Seed Data Test 完了');
    console.log('📊 挿入されたデータ:');
    console.log('   - Job Titles: 2件 (ソフトウェアエンジニア, プロジェクトマネージャー)');
    console.log('   - Employment Status: 2件 (正社員, 契約社員)');
    console.log('   - Job Categories: 2件 (技術部門, 管理部門)');
    console.log('   - Skills: 3件 (JavaScript, Python, SQL)');
    console.log('   - Education: 2件 (学士, 修士)');
  });
});
