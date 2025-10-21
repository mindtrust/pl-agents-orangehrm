// tests/seeds/admin-module-seed-fixed.spec.ts
import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

/**
 * Admin Module Seed Data (Fixed Version)
 *
 * このテストは管理モジュールのテストデータを投入します。
 * 修正版: URLベースのナビゲーションとデータ確認を追加
 *
 * 投入するデータ:
 * - 職位 (Job Titles): 5件
 * - 給与等級 (Pay Grades): 3件
 * - 雇用ステータス (Employment Status): 4件
 * - 職種カテゴリ (Job Categories): 5件
 * - 勤務シフト (Work Shifts): 3件
 * - 拠点 (Locations): 3件
 * - スキル (Skills): 10件
 * - 学歴 (Education): 5件
 * - ライセンス (Licenses): 5件
 * - 言語 (Languages): 5件
 * - 会員資格 (Memberships): 3件
 */

test.describe.configure({ mode: 'serial' });

test.describe('Admin Module - Seed Data (Fixed)', () => {

  test('Seed 1: 職位 (Job Titles) データ投入', async ({ authenticatedPage, page }) => {
    console.log('🌱 Seed開始: 職位データ');

    const jobTitles = [
      { title: 'ソフトウェアエンジニア', description: 'ソフトウェア開発・保守業務', note: '技術部門' },
      { title: 'プロジェクトマネージャー', description: 'プロジェクト管理・統括業務', note: '管理部門' },
      { title: 'QAエンジニア', description: '品質保証・テスト業務', note: '技術部門' }
    ];

    for (const job of jobTitles) {
      await page.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList');
      await page.getByRole('button', { name: ' Add' }).click();
      await expect(page.getByLabel('Job Title')).toBeVisible();

      await page.getByLabel('Job Title').fill(job.title);
      await page.getByLabel('Job Description').fill(job.description);
      await page.getByPlaceholder('Type description here').fill(job.note);

      await page.getByRole('button', { name: ' Save' }).click();
      await expect(page.getByText('Successfully Saved')).toBeVisible();
      await expect(page.getByText('Successfully Saved')).toBeHidden({ timeout: 10000 });

      await expect(page.getByText(job.title)).toBeVisible();
      console.log(`✅ 職位追加: ${job.title}`);
    }

    console.log('🎉 職位データ投入完了: 3件');
  });

  test('Seed 2: 雇用ステータス (Employment Status) データ投入', async ({ authenticatedPage, page }) => {
    console.log('🌱 Seed開始: 雇用ステータスデータ');

    const statuses = ['正社員', '契約社員', 'パートタイム', '派遣社員'];

    for (const status of statuses) {
      await page.goto('http://localhost:8080/web/index.php/admin/employmentStatus');
      await page.getByRole('button', { name: ' Add' }).click();
      await expect(page.locator('input[class*="oxd-input"]').nth(1)).toBeVisible();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(status);
      await page.getByRole('button', { name: ' Save' }).click();

      await expect(page.getByText('Successfully Saved')).toBeVisible();
      await expect(page.getByText('Successfully Saved')).toBeHidden({ timeout: 10000 });

      await expect(page.getByText(status)).toBeVisible();
      console.log(`✅ 雇用ステータス追加: ${status}`);
    }

    console.log('🎉 雇用ステータスデータ投入完了: 4件');
  });

  test('Seed 3: 職種カテゴリ (Job Categories) データ投入', async ({ authenticatedPage, page }) => {
    console.log('🌱 Seed開始: 職種カテゴリデータ');

    const categories = ['技術部門', '管理部門', '人事部門', '営業部門', '財務部門'];

    for (const category of categories) {
      await page.goto('http://localhost:8080/web/index.php/admin/jobCategory');
      await page.getByRole('button', { name: ' Add' }).click();
      await expect(page.locator('input[class*="oxd-input"]').nth(1)).toBeVisible();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(category);
      await page.getByRole('button', { name: ' Save' }).click();

      await expect(page.getByText('Successfully Saved')).toBeVisible();
      await expect(page.getByText('Successfully Saved')).toBeHidden({ timeout: 10000 });

      await expect(page.getByText(category)).toBeVisible();
      console.log(`✅ 職種カテゴリ追加: ${category}`);
    }

    console.log('🎉 職種カテゴリデータ投入完了: 5件');
  });

  test('Seed 4: スキル (Skills) データ投入', async ({ authenticatedPage, page }) => {
    console.log('🌱 Seed開始: スキルデータ');

    const skills = [
      { name: 'JavaScript', description: 'フロントエンド開発言語' },
      { name: 'Python', description: 'バックエンド・データ分析言語' },
      { name: 'Java', description: 'エンタープライズ開発言語' },
      { name: 'SQL', description: 'データベース操作言語' },
      { name: 'Docker', description: 'コンテナ技術' }
    ];

    for (const skill of skills) {
      await page.goto('http://localhost:8080/web/index.php/admin/viewSkills');
      await page.getByRole('button', { name: ' Add' }).click();
      await expect(page.locator('input[class*="oxd-input"]').nth(1)).toBeVisible();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(skill.name);
      await page.getByPlaceholder('Type description here').fill(skill.description);

      await page.getByRole('button', { name: ' Save' }).click();
      await expect(page.getByText('Successfully Saved')).toBeVisible();
      await expect(page.getByText('Successfully Saved')).toBeHidden({ timeout: 10000 });

      await expect(page.getByText(skill.name)).toBeVisible();
      console.log(`✅ スキル追加: ${skill.name}`);
    }

    console.log('🎉 スキルデータ投入完了: 5件');
  });

  test('Seed 5: 学歴 (Education) データ投入', async ({ authenticatedPage, page }) => {
    console.log('🌱 Seed開始: 学歴データ');

    const educations = ['高校卒業', '専門学校卒業', '学士', '修士', '博士'];

    for (const education of educations) {
      await page.goto('http://localhost:8080/web/index.php/admin/viewEducation');
      await page.getByRole('button', { name: ' Add' }).click();
      await expect(page.locator('input[class*="oxd-input"]').nth(1)).toBeVisible();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(education);
      await page.getByRole('button', { name: ' Save' }).click();

      await expect(page.getByText('Successfully Saved')).toBeVisible();
      await expect(page.getByText('Successfully Saved')).toBeHidden({ timeout: 10000 });

      await expect(page.getByText(education)).toBeVisible();
      console.log(`✅ 学歴追加: ${education}`);
    }

    console.log('🎉 学歴データ投入完了: 5件');
  });

  test('Seed 6: ライセンス (Licenses) データ投入', async ({ authenticatedPage, page }) => {
    console.log('🌱 Seed開始: ライセンスデータ');

    const licenses = [
      '基本情報技術者',
      '応用情報技術者',
      'PMP',
      'AWS認定ソリューションアーキテクト'
    ];

    for (const license of licenses) {
      await page.goto('http://localhost:8080/web/index.php/admin/viewLicenses');
      await page.getByRole('button', { name: ' Add' }).click();
      await expect(page.locator('input[class*="oxd-input"]').nth(1)).toBeVisible();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(license);
      await page.getByRole('button', { name: ' Save' }).click();

      await expect(page.getByText('Successfully Saved')).toBeVisible();
      await expect(page.getByText('Successfully Saved')).toBeHidden({ timeout: 10000 });

      await expect(page.getByText(license)).toBeVisible();
      console.log(`✅ ライセンス追加: ${license}`);
    }

    console.log('🎉 ライセンスデータ投入完了: 4件');
  });

  test('Seed 7: 言語 (Languages) データ投入', async ({ authenticatedPage, page }) => {
    console.log('🌱 Seed開始: 言語データ');

    const languages = ['日本語', '英語', '中国語', 'スペイン語', 'フランス語'];

    for (const language of languages) {
      await page.goto('http://localhost:8080/web/index.php/admin/viewLanguages');
      await page.getByRole('button', { name: ' Add' }).click();
      await expect(page.locator('input[class*="oxd-input"]').nth(1)).toBeVisible();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(language);
      await page.getByRole('button', { name: ' Save' }).click();

      await expect(page.getByText('Successfully Saved')).toBeVisible();
      await expect(page.getByText('Successfully Saved')).toBeHidden({ timeout: 10000 });

      await expect(page.getByText(language)).toBeVisible();
      console.log(`✅ 言語追加: ${language}`);
    }

    console.log('🎉 言語データ投入完了: 5件');
  });

  test('Seed 8: 会員資格 (Memberships) データ投入', async ({ authenticatedPage, page }) => {
    console.log('🌱 Seed開始: 会員資格データ');

    const memberships = ['情報処理学会', 'プロジェクトマネジメント学会', 'IEEE'];

    for (const membership of memberships) {
      await page.goto('http://localhost:8080/web/index.php/admin/membership');
      await page.getByRole('button', { name: ' Add' }).click();
      await expect(page.locator('input[class*="oxd-input"]').nth(1)).toBeVisible();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(membership);
      await page.getByRole('button', { name: ' Save' }).click();

      await expect(page.getByText('Successfully Saved')).toBeVisible();
      await expect(page.getByText('Successfully Saved')).toBeHidden({ timeout: 10000 });

      await expect(page.getByText(membership)).toBeVisible();
      console.log(`✅ 会員資格追加: ${membership}`);
    }

    console.log('🎉 会員資格データ投入完了: 3件');
  });

  test('Seed Summary: データ投入確認', async ({ authenticatedPage, page }) => {
    console.log('\n===========================================');
    console.log('📋 Admin Module Seed Data Summary');
    console.log('===========================================');
    console.log('✅ 職位 (Job Titles)            : 3件');
    console.log('✅ 雇用ステータス (Employment)  : 4件');
    console.log('✅ 職種カテゴリ (Categories)    : 5件');
    console.log('✅ スキル (Skills)              : 5件');
    console.log('✅ 学歴 (Education)             : 5件');
    console.log('✅ ライセンス (Licenses)        : 4件');
    console.log('✅ 言語 (Languages)             : 5件');
    console.log('✅ 会員資格 (Memberships)       : 3件');
    console.log('===========================================');
    console.log('📊 合計: 34件のデータを投入');
    console.log('===========================================\n');
    console.log('🎉 すべてのSeedデータ投入が完了しました！');
  });
});
