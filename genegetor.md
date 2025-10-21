@generator

**テスト計画:** specs/test-plans/admin-module-test-plan.md

この計画書から、OrangeHRM Admin Moduleの実行可能なPlaywrightテストを生成してください。

---

## Seed testとパターン

**Seed test:** tests/admin-seed.spec.ts

このSeed testのコーディングスタイルと構造を踏襲してください：
- Page Object Model (POM) パターン
- カスタムFixtureの使用
- TypeScriptの型安全性
- 明確なコメントとログ出力

---

## 使用するPage Object

以下の既存Page Objectを使用してください：

**認証・ナビゲーション:**
- `LoginPage` - ログイン処理
- `DashboardPage` - モジュール間のナビゲーション

**Admin Module:**
- `AdminPage` - Admin Moduleの基本操作

**必要に応じて新規作成:**
- `UserManagementPage` - ユーザー管理機能（追加が必要な場合）
- `OrganizationPage` - 組織構造管理
- `QualificationsPage` - 資格管理

新しいPage Objectが必要な場合は、src/pages/ に作成してください。

---

## Fixture使用方法

**基本:** `fixtures/orangehrm-fixtures.ts` をインポート
```typescript
import { test, expect } from '../../fixtures/orangehrm-fixtures';
```

**推奨するFixture:**
- `authenticatedPage` - 管理者として既にログイン済みのページ
- 既存のPage Objectもfixtureとして利用可能

---

## コーディング規約

### 1. ファイル構成
```
tests/admin/
├── user-management.spec.ts      # ユーザー管理
├── organization.spec.ts          # 組織構造
├── qualifications.spec.ts        # 資格管理
├── nationality.spec.ts           # 国籍
└── configuration.spec.ts         # 設定
```

### 2. テスト構造
```typescript
// spec: specs/test-plans/admin-module-test-plan.md
// seed: tests/admin-seed.spec.ts

import { test, expect } from '../../fixtures/orangehrm-fixtures';

test.describe('[機能名]', () => {
  test.beforeEach(async ({ dashboardPage }) => {
    // 必要に応じて事前処理
    await dashboardPage.navigateToModule('Admin');
  });

  test('[テストケース名]', async ({ authenticatedPage, adminPage }) => {
    // Arrange（準備）
    // テストデータの準備
    
    // Act（実行）
    // 操作を実行
    
    // Assert（検証）
    // 期待結果を確認
    
    console.log('✅ テスト完了: [テストケース名]');
  });
});
```

### 3. ロケーター戦略（優先順位）
1. `getByRole()` - アクセシビリティロール優先
2. `getByLabel()` - フォーム要素
3. `getByPlaceholder()` - プレースホルダー
4. `getByText()` - 表示テキスト
5. `getByTestId()` - テスト用ID
6. `locator()` - 上記で対応できない場合のみ

### 4. アサーション
- 画面遷移: `await expect(page).toHaveURL(/pattern/)`
- 要素の表示: `await expect(locator).toBeVisible()`
- テキスト確認: `await expect(locator).toContainText('...')`
- 成功メッセージ: 必ず確認する

### 5. エラーハンドリング
- タイムアウトは明示的に設定: `{ timeout: 10000 }`
- 重要な操作の前後でログ出力
- スクリーンショットは自動（失敗時のみ）

### 6. テストデータ
- ハードコードせず、変数で定義
- ユニークなデータを生成（タイムスタンプ使用など）
- クリーンアップは不要（各テストは独立）

---

## 出力要件

**出力先:** tests/admin/

**生成するファイル:**
1. user-management.spec.ts - ユーザー管理のテスト
2. organization.spec.ts - 組織構造のテスト
3. qualifications.spec.ts - 資格管理のテスト
4. nationality.spec.ts - 国籍のテスト
5. configuration.spec.ts - 設定のテスト

**必要に応じて:**
- 新しいPage Objectクラス（src/pages/）
- Fixtureの拡張（fixtures/orangehrm-fixtures.ts）

---

## その他の要求

- **日本語でのコメント**: コードには日本語コメントを付ける
- **console.log**: 主要なステップでログ出力
- **型安全性**: TypeScriptの型を適切に使用
- **DRY原則**: 重複コードは避ける

---

## 実装の優先順位

1. **High:** ユーザー管理（追加、編集、削除）
2. **Medium:** 組織構造、資格管理
3. **Low:** 国籍、設定

まず優先度Highから実装してください。
