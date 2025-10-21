// tests/seeds/admin-module-seed-simple.spec.ts
import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

/**
 * Admin Module Seed Data (Simplified Version)
 *
 * シンプルで確実に動作するSeedデータ投入テスト
 * 全データを1つのテストケースで順次投入します
 */

test.describe('Admin Module - Seed Data (Simple)', () => {

  test('投入: すべてのAdmin Moduleデータ', async ({ authenticatedPage, dashboardPage, page }) => {
    console.log('\n🌱 Admin Module Seed Data 投入開始\n');
    console.log('==========================================');

    // ========================================
    // 1. 職位 (Job Titles)
    // ========================================
    console.log('\n📋 1. 職位 (Job Titles) データ投入');

    const jobTitles = [
      { title: 'ソフトウェアエンジニア', description: 'ソフトウェア開発・保守業務', note: '技術部門' },
      { title: 'プロジェクトマネージャー', description: 'プロジェクト管理・統括業務', note: '管理部門' },
      { title: 'QAエンジニア', description: '品質保証・テスト業務', note: '技術部門' }
    ];

    for (const job of jobTitles) {
      await page.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList');
      await page.getByRole('button', { name: ' Add' }).click();

      await page.getByLabel('Job Title').fill(job.title);
      await page.getByLabel('Job Description').fill(job.description);
      await page.getByPlaceholder('Type description here').fill(job.note);

      await page.getByRole('button', { name: ' Save' }).click();
      await expect(page.getByText('Successfully Saved')).toBeVisible();

      console.log(`   ✅ ${job.title}`);
    }

    // ========================================
    // 2. 雇用ステータス (Employment Status)
    // ========================================
    console.log('\n📋 2. 雇用ステータス (Employment Status) データ投入');

    const statuses = ['正社員', '契約社員', 'パートタイム', '派遣社員'];

    for (const status of statuses) {
      await page.goto('http://localhost:8080/web/index.php/admin/employmentStatus');
      await page.getByRole('button', { name: ' Add' }).click();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(status);

      await page.getByRole('button', { name: ' Save' }).click();
      await expect(page.getByText('Successfully Saved')).toBeVisible();

      console.log(`   ✅ ${status}`);
    }

    // ========================================
    // 3. 職種カテゴリ (Job Categories)
    // ========================================
    console.log('\n📋 3. 職種カテゴリ (Job Categories) データ投入');

    const categories = ['技術部門', '管理部門', '人事部門', '営業部門', '財務部門'];

    for (const category of categories) {
      await page.goto('http://localhost:8080/web/index.php/admin/jobCategory');
      await page.getByRole('button', { name: ' Add' }).click();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(category);

      await page.getByRole('button', { name: ' Save' }).click();
      await expect(page.getByText('Successfully Saved')).toBeVisible();

      console.log(`   ✅ ${category}`);
    }

    // ========================================
    // 4. 拠点 (Locations)
    // ========================================
    console.log('\n📋 4. 拠点 (Locations) データ投入');

    const locations = [
      { name: '東京本社', city: '東京', state: '東京都', zip: '100-0001', country: 'Japan', phone: '03-1234-5678' },
      { name: '大阪支社', city: '大阪', state: '大阪府', zip: '530-0001', country: 'Japan', phone: '06-1234-5678' }
    ];

    for (const location of locations) {
      await page.goto('http://localhost:8080/web/index.php/admin/viewLocations');
      await page.getByRole('button', { name: ' Add' }).click();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(location.name);
      await page.locator('input[class*="oxd-input"]').nth(2).fill(location.city);
      await page.locator('input[class*="oxd-input"]').nth(3).fill(location.state);
      await page.locator('input[class*="oxd-input"]').nth(4).fill(location.zip);

      await page.locator('div[class*="oxd-select-text"]').first().click();
      await page.getByRole('option', { name: location.country }).click();

      await page.locator('input[class*="oxd-input"]').nth(5).fill(location.phone);

      await page.getByRole('button', { name: ' Save' }).click();
      await expect(page.getByText('Successfully Saved')).toBeVisible();

      console.log(`   ✅ ${location.name}`);
    }

    // ========================================
    // 5. スキル (Skills)
    // ========================================
    console.log('\n📋 5. スキル (Skills) データ投入');

    const skills = [
      { name: 'JavaScript', description: 'フロントエンド開発言語' },
      { name: 'Python', description: 'バックエンド・データ分析言語' },
      { name: 'Java', description: 'エンタープライズ開発言語' },
      { name: 'React', description: 'フロントエンドフレームワーク' },
      { name: 'SQL', description: 'データベース操作言語' }
    ];

    for (const skill of skills) {
      await page.goto('http://localhost:8080/web/index.php/admin/viewSkills');
      await page.getByRole('button', { name: ' Add' }).click();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(skill.name);
      await page.getByPlaceholder('Type description here').fill(skill.description);

      await page.getByRole('button', { name: ' Save' }).click();
      await expect(page.getByText('Successfully Saved')).toBeVisible();

      console.log(`   ✅ ${skill.name}`);
    }

    // ========================================
    // 6. 学歴 (Education)
    // ========================================
    console.log('\n📋 6. 学歴 (Education) データ投入');

    const educations = ['高校卒業', '専門学校卒業', '学士', '修士', '博士'];

    for (const education of educations) {
      await page.goto('http://localhost:8080/web/index.php/admin/viewEducation');
      await page.getByRole('button', { name: ' Add' }).click();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(education);

      await page.getByRole('button', { name: ' Save' }).click();
      await expect(page.getByText('Successfully Saved')).toBeVisible();

      console.log(`   ✅ ${education}`);
    }

    // ========================================
    // 7. ライセンス (Licenses)
    // ========================================
    console.log('\n📋 7. ライセンス (Licenses) データ投入');

    const licenses = [
      '基本情報技術者',
      '応用情報技術者',
      'PMP',
      'AWS認定ソリューションアーキテクト'
    ];

    for (const license of licenses) {
      await page.goto('http://localhost:8080/web/index.php/admin/viewLicenses');
      await page.getByRole('button', { name: ' Add' }).click();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(license);

      await page.getByRole('button', { name: ' Save' }).click();
      await expect(page.getByText('Successfully Saved')).toBeVisible();

      console.log(`   ✅ ${license}`);
    }

    // ========================================
    // 8. 言語 (Languages)
    // ========================================
    console.log('\n📋 8. 言語 (Languages) データ投入');

    const languages = ['日本語', '英語', '中国語', 'スペイン語', 'フランス語'];

    for (const language of languages) {
      await page.goto('http://localhost:8080/web/index.php/admin/viewLanguages');
      await page.getByRole('button', { name: ' Add' }).click();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(language);

      await page.getByRole('button', { name: ' Save' }).click();
      await expect(page.getByText('Successfully Saved')).toBeVisible();

      console.log(`   ✅ ${language}`);
    }

    // ========================================
    // 9. 会員資格 (Memberships)
    // ========================================
    console.log('\n📋 9. 会員資格 (Memberships) データ投入');

    const memberships = ['情報処理学会', 'プロジェクトマネジメント学会', 'IEEE'];

    for (const membership of memberships) {
      await page.goto('http://localhost:8080/web/index.php/admin/membership');
      await page.getByRole('button', { name: ' Add' }).click();

      await page.locator('input[class*="oxd-input"]').nth(1).fill(membership);

      await page.getByRole('button', { name: ' Save' }).click();
      await expect(page.getByText('Successfully Saved')).toBeVisible();

      console.log(`   ✅ ${membership}`);
    }

    // ========================================
    // Summary
    // ========================================
    console.log('\n==========================================');
    console.log('📊 Seed Data Summary');
    console.log('==========================================');
    console.log('✅ 職位 (Job Titles)            : 3件');
    console.log('✅ 雇用ステータス (Employment)  : 4件');
    console.log('✅ 職種カテゴリ (Categories)    : 5件');
    console.log('✅ 拠点 (Locations)             : 2件');
    console.log('✅ スキル (Skills)              : 5件');
    console.log('✅ 学歴 (Education)             : 5件');
    console.log('✅ ライセンス (Licenses)        : 4件');
    console.log('✅ 言語 (Languages)             : 5件');
    console.log('✅ 会員資格 (Memberships)       : 3件');
    console.log('==========================================');
    console.log('📊 合計: 36件のデータを投入');
    console.log('==========================================\n');
    console.log('🎉 すべてのSeedデータ投入が完了しました！\n');
  });
});
