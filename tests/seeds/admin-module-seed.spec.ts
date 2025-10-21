// tests/seeds/admin-module-seed.spec.ts
import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

/**
 * Admin Module Seed Data
 *
 * このテストは管理モジュールのテストデータを投入します。
 * テスト実行前にクリーンなデータベース状態から開始してください。
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

test.describe('Admin Module - Seed Data', () => {

  test('Seed 1: 職位 (Job Titles) データ投入', async ({ authenticatedPage, dashboardPage, page }) => {
    console.log('🌱 Seed開始: 職位データ');

    const jobTitles = [
      { title: 'ソフトウェアエンジニア', description: 'ソフトウェア開発・保守業務', note: '技術部門' },
      { title: 'プロジェクトマネージャー', description: 'プロジェクト管理・統括業務', note: '管理部門' },
      { title: 'QAエンジニア', description: '品質保証・テスト業務', note: '技術部門' },
      { title: '人事マネージャー', description: '人事管理・採用業務', note: '人事部門' },
      { title: '営業担当', description: '営業・顧客対応業務', note: '営業部門' }
    ];

    for (const job of jobTitles) {
      // Job Titles ページに直接移動
      await page.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList');

      // Add ボタンをクリック
      await page.getByRole('button', { name: ' Add' }).click();

      // フォームが表示されるまで待機
      await expect(page.getByRole('textbox').nth(1)).toBeVisible();

      // フォーム入力
      await page.getByRole('textbox').nth(1).fill(job.title);
      await page.getByRole('textbox', { name: 'Type description here' }).fill(job.description);
      await page.getByRole('textbox', { name: 'Add note' }).fill(job.note);

      // Save
      await page.getByRole('button', { name: ' Save' }).click();

      // リストページへの遷移を待つ
      await page.waitForURL('**/viewJobTitleList', { timeout: 5000 }).catch(async () => {
        await page.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList');
      });

      // リストページで追加したデータを確認
      await expect(page.getByText(job.title)).toBeVisible();
      console.log(`✅ 職位追加: ${job.title}`);
    }

    console.log('🎉 職位データ投入完了: 5件');
  });

  test('Seed 2: 給与等級 (Pay Grades) データ投入', async ({ authenticatedPage, dashboardPage, page }) => {
    console.log('🌱 Seed開始: 給与等級データ');

    const payGrades = [
      { name: 'Grade 1 - Junior' },
      { name: 'Grade 2 - Mid-Level' },
      { name: 'Grade 3 - Senior' }
    ];

    for (const grade of payGrades) {
      // Pay Grades ページに直接移動
      await page.goto('http://localhost:8080/web/index.php/admin/viewPayGrades');

      console.log('✅ 給与等級名を入力: ${grade.name}');

      // Add ボタンをクリック
      await page.getByRole('button', { name: ' Add' }).click();

      // フォームが表示されるまで待機
      await expect(page.getByRole('textbox').nth(1)).toBeVisible();

      // 給与等級名を入力
      await page.locator('form').getByRole('textbox').fill(grade.name);

      // Save
      await page.getByRole('button', { name: ' Save' }).click();

      // リストページに戻って確認
      await page.waitForURL('**/viewPayGrades', { timeout: 5000 }).catch(async () => {
        await page.goto('http://localhost:8080/web/index.php/admin/viewPayGrades');
      });
      await expect(page.getByText(grade.name)).toBeVisible();
      console.log(`✅ 給与等級追加: ${grade.name}`);
    }

    console.log('🎉 給与等級データ投入完了: 3件');
  });

  test('Seed 3: 雇用ステータス (Employment Status) データ投入', async ({ authenticatedPage, dashboardPage, page }) => {
    console.log('🌱 Seed開始: 雇用ステータスデータ');

    const statuses = ['正社員', '契約社員', 'パートタイム', '派遣社員'];

    // await dashboardPage.navigateToModule('Admin');

      // Pay Grades ページに直接移動
      await page.goto('http://localhost:8080/web/index.php/admin/employmentStatus');

    for (const status of statuses) {
      await page.getByRole('button', { name: 'Add' }).click();

      // フォームが表示されるまで待機
      await expect(page.getByRole('textbox').nth(1)).toBeVisible();

      await page.locator('form').getByRole('textbox').fill(status);
      await page.getByRole('button', { name: 'Save' }).click();

      // リストページに戻って確認
      await page.waitForURL('**/employmentStatus', { timeout: 5000 }).catch(async () => {
        await page.goto('http://localhost:8080/web/index.php/admin/employmentStatus');
      });
      await expect(page.getByText(status)).toBeVisible();

      console.log(`✅ 雇用ステータス追加: ${status}`);
    }

    console.log('🎉 雇用ステータスデータ投入完了: 4件');
  });

  test('Seed 4: 職種カテゴリ (Job Categories) データ投入', async ({ authenticatedPage, dashboardPage, page }) => {
    console.log('🌱 Seed開始: 職種カテゴリデータ');

    const categories = ['技術部門', '管理部門', '人事部門', '営業部門', '財務部門'];

     // Job Categories ページに直接移動
      await page.goto('http://localhost:8080/web/index.php/admin/jobCategory');

    for (const category of categories) {
      await page.getByRole('button', { name: 'Add' }).click();

      await page.locator('form').getByRole('textbox').fill(category);
      await page.getByRole('button', { name: 'Save' }).click();

      // リストページに戻って確認
      await page.waitForURL('**/jobCategory', { timeout: 5000 }).catch(async () => {
        await page.goto('http://localhost:8080/web/index.php/admin/jobCategory');
      });
      await expect(page.getByText(category)).toBeVisible();
      console.log(`✅ 職種カテゴリ追加: ${category}`);
    }

    console.log('🎉 職種カテゴリデータ投入完了: 5件');
  });

  test('Seed 5: 勤務シフト (Work Shifts) データ投入', async ({ authenticatedPage, dashboardPage, page }) => {
    console.log('🌱 Seed開始: 勤務シフトデータ');

    const shifts = [
      { name: '日勤', from: '09:00 AM', to: '06:00 PM' },
      { name: '夜勤', from: '06:00 PM', to: '11:00 PM' },
      { name: 'フレックス', from: '10:00 AM', to: '07:00 PM' }
    ];

     // Job Categories ページに直接移動
     await page.goto('http://localhost:8080/web/index.php/admin/workShift');


    for (const shift of shifts) {
      await page.getByRole('button', { name: 'Add' }).click();

      // フォームが表示されるまで待機
      await expect(page.getByRole('textbox').nth(1)).toBeVisible();

      await page.getByRole('textbox').nth(1).fill(shift.name);
      await page.getByRole('textbox').nth(1).click();

      await page.getByRole('textbox', { name: 'hh:mm' }).nth(0).fill(shift.from);
      await page.getByRole('textbox', { name: 'hh:mm' }).nth(0).click();
      await page.getByRole('textbox', { name: 'hh:mm' }).nth(1).fill(shift.to);
      await page.getByRole('textbox', { name: 'hh:mm' }).nth(1).click();

      await page.getByRole('button', { name: 'Save' }).click();

      // リストページに戻って確認
      await page.waitForURL('**/workShift', { timeout: 5000 }).catch(async () => {
        await page.goto('http://localhost:8080/web/index.php/admin/workShift');
      });
      await expect(page.getByText(shift.name)).toBeVisible();
      console.log(`✅ 勤務シフト追加: ${shift.name}`);
    }

    console.log('🎉 勤務シフトデータ投入完了: 3件');
  });

  test('Seed 6: 拠点 (Locations) データ投入', async ({ authenticatedPage, dashboardPage, page }) => {
    console.log('🌱 Seed開始: 拠点データ');

    const locations = [
      { name: '東京本社', city: '東京', state: '東京都', zip: '100-0001', country: 'Japan', phone: '03-1234-5678' },
      { name: '大阪支社', city: '大阪', state: '大阪府', zip: '530-0001', country: 'Japan', phone: '06-1234-5678' },
      { name: '名古屋支社', city: '名古屋', state: '愛知県', zip: '450-0001', country: 'Japan', phone: '052-123-4567' }
    ];

    // Locations ページに直接移動
     await page.goto('http://localhost:8080/web/index.php/admin/viewLocations');

    for (const location of locations) {
      await page.getByRole('button', { name: 'Add' }).click();

      // フォーム入力
      await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill(location.name);
      await page.locator('div').filter({ hasText: /^City$/ }).getByRole('textbox').fill(location.city);
      await page.locator('div').filter({ hasText: /^State\/Province$/ }).getByRole('textbox').fill(location.state);
      await page.locator('div').filter({ hasText: /^Zip\/Postal Code$/ }).getByRole('textbox').fill(location.zip);
      await page.getByText('-- Select --').click();
      await page.getByRole('option', { name: location.country }).click();
      await page.locator('div').filter({ hasText: /^Phone$/ }).getByRole('textbox').fill(location.phone);

      await page.getByRole('button', { name: 'Save' }).click();

      // リストページに戻って確認
      await page.waitForURL('**/viewLocations', { timeout: 5000 }).catch(async () => {
        await page.goto('http://localhost:8080/web/index.php/admin/viewLocations');
      });
      await expect(page.getByText(location.name)).toBeVisible();
      console.log(`✅ 拠点追加: ${location.name}`);
    }

    console.log('🎉 拠点データ投入完了: 3件');
  });

  test('Seed 7: スキル (Skills) データ投入', async ({ authenticatedPage, dashboardPage, page }) => {
    console.log('🌱 Seed開始: スキルデータ');

    const skills = [
      { name: 'JavaScript', description: 'フロントエンド開発言語' },
      { name: 'TypeScript', description: 'JavaScript型付き言語' },
      { name: 'Python', description: 'バックエンド・データ分析言語' },
      { name: 'Java', description: 'エンタープライズ開発言語' },
      { name: 'React', description: 'フロントエンドフレームワーク' },
      { name: 'Node.js', description: 'JavaScriptランタイム環境' },
      { name: 'SQL', description: 'データベース操作言語' },
      { name: 'Docker', description: 'コンテナ技術' },
    ];


    // Locations ページに直接移動
    await page.goto('http://localhost:8080/web/index.php/admin/viewSkills');

    for (const skill of skills) {
      await page.getByRole('button', { name: 'Add' }).click();

      await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill(skill.name);
      await page.getByPlaceholder('Type description here').fill(skill.description);

      await page.getByRole('button', { name: 'Save' }).click();

      // リストページに戻って確認
      await page.waitForURL('**/viewSkills', { timeout: 10000 }).catch(async () => {
        await page.goto('http://localhost:8080/web/index.php/admin/viewSkills');
      });
      await expect(page.getByText(skill.name, { exact: true })).toBeVisible();
      console.log(`✅ スキル追加: ${skill.name}`);
    }

    console.log('🎉 スキルデータ投入完了: 10件');
  });

  test('Seed 8: 学歴 (Education) データ投入', async ({ authenticatedPage, dashboardPage, page }) => {
    console.log('🌱 Seed開始: 学歴データ');

    const educations = ['高校卒業', '専門学校卒業', '学士', '修士', '博士'];

    await page.goto('http://localhost:8080/web/index.php/admin/viewEducation');

    for (const education of educations) {
      await page.getByRole('button', { name: 'Add' }).click();

      await page.locator('div').filter({ hasText: /^Level$/ }).getByRole('textbox').fill(education);
      await page.getByRole('button', { name: 'Save' }).click();

      // リストページに戻って確認
      await page.waitForURL('**/viewEducation', { timeout: 5000 }).catch(async () => {
        await page.goto('http://localhost:8080/web/index.php/admin/viewEducation');
      });
      await expect(page.getByText(education)).toBeVisible();
      console.log(`✅ 学歴追加: ${education}`);
    }

    console.log('🎉 学歴データ投入完了: 5件');
  });

  test('Seed 9: ライセンス (Licenses) データ投入', async ({ authenticatedPage, dashboardPage, page }) => {
    console.log('🌱 Seed開始: ライセンスデータ');

    const licenses = [
      '基本情報技術者',
      '応用情報技術者',
      'PMP (Project Management Professional)',
      'AWS認定ソリューションアーキテクト',
      'TOEIC 800点以上'
    ];


    await page.goto('http://localhost:8080/web/index.php/admin/viewLicenses');

    for (const license of licenses) {
      await page.getByRole('button', { name: 'Add' }).click();

      await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill(license);
      await page.getByRole('button', { name: 'Save' }).click();

      // リストページに戻って確認
      await page.waitForURL('**/viewLicenses', { timeout: 5000 }).catch(async () => {
        await page.goto('http://localhost:8080/web/index.php/admin/viewLicenses');
      });
      await expect(page.getByText(license)).toBeVisible();
      console.log(`✅ ライセンス追加: ${license}`);
    }

    console.log('🎉 ライセンスデータ投入完了: 5件');
  });

  test('Seed 10: 言語 (Languages) データ投入', async ({ authenticatedPage, dashboardPage, page }) => {
    console.log('🌱 Seed開始: 言語データ');

    const languages = ['日本語', '英語', '中国語', 'スペイン語', 'フランス語'];

    await page.goto('http://localhost:8080/web/index.php/admin/viewLanguages');

    for (const language of languages) {
      await page.getByRole('button', { name: 'Add' }).click();

      await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill(language);
      await page.getByRole('button', { name: 'Save' }).click();

      // リストページに戻って確認
      await page.waitForURL('**/viewLanguages', { timeout: 5000 }).catch(async () => {
        await page.goto('http://localhost:8080/web/index.php/admin/viewLanguages');
      });
      await expect(page.getByText(language)).toBeVisible();
      console.log(`✅ 言語追加: ${language}`);
    }

    console.log('🎉 言語データ投入完了: 5件');
  });

  test('Seed 11: 会員資格 (Memberships) データ投入', async ({ authenticatedPage, dashboardPage, page }) => {
    console.log('🌱 Seed開始: 会員資格データ');

    const memberships = ['情報処理学会', 'プロジェクトマネジメント学会', 'IEEE'];

    await page.goto('http://localhost:8080/web/index.php/admin/membership');

    for (const membership of memberships) {

      await page.getByRole('button', { name: 'Add' }).click();


      await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill(membership);
      await page.getByRole('button', { name: 'Save' }).click();

      // リストページに戻って確認
      await page.waitForURL('**/membership', { timeout: 5000 }).catch(async () => {
        await page.goto('http://localhost:8080/web/index.php/admin/membership');
      });
      await expect(page.getByText(membership)).toBeVisible();
      console.log(`✅ 会員資格追加: ${membership}`);
    }

    console.log('🎉 会員資格データ投入完了: 3件');
  });

  test('Seed Summary: データ投入確認', async ({ authenticatedPage, dashboardPage, page }) => {
    console.log('📊 Seed Summary: 投入データの確認');

    const dataCount = {
      'Job Titles': 5,
      'Pay Grades': 3,
      'Employment Status': 4,
      'Job Categories': 5,
      'Work Shifts': 3,
      'Locations': 3,
      'Skills': 10,
      'Education': 5,
      'Licenses': 5,
      'Languages': 5,
      'Memberships': 3
    };

    console.log('\n===========================================');
    console.log('📋 Admin Module Seed Data Summary');
    console.log('===========================================');

    for (const [key, value] of Object.entries(dataCount)) {
      console.log(`✅ ${key.padEnd(20)} : ${value}件`);
    }

    console.log('===========================================');
    console.log(`📊 合計: ${Object.values(dataCount).reduce((a, b) => a + b, 0)}件のデータを投入`);
    console.log('===========================================\n');

    console.log('🎉 すべてのSeedデータ投入が完了しました！');
  });
});
