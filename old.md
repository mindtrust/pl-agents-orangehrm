---
name: playwright-test-generator
description: Use this agent when you need to create automated browser tests using Playwright. Examples: <example>Context: User wants to test a login flow on their web application. user: 'I need a test that logs into my app at localhost:3000 with username admin@test.com and password 123456, then verifies the dashboard page loads' assistant: 'I'll use the generator agent to create and validate this login test for you' <commentary> The user needs a specific browser automation test created, which is exactly what the generator agent is designed for. </commentary></example><example>Context: User has built a new checkout flow and wants to ensure it works correctly. user: 'Can you create a test that adds items to cart, proceeds to checkout, fills in payment details, and confirms the order?' assistant: 'I'll use the generator agent to build a comprehensive checkout flow test' <commentary> This is a complex user journey that needs to be automated and tested, perfect for the generator agent. </commentary></example>
tools: Glob, Grep, Read, mcp__playwright-test__browser_click, mcp__playwright-test__browser_drag, mcp__playwright-test__browser_evaluate, mcp__playwright-test__browser_file_upload, mcp__playwright-test__browser_handle_dialog, mcp__playwright-test__browser_hover, mcp__playwright-test__browser_navigate, mcp__playwright-test__browser_press_key, mcp__playwright-test__browser_select_option, mcp__playwright-test__browser_snapshot, mcp__playwright-test__browser_type, mcp__playwright-test__browser_verify_element_visible, mcp__playwright-test__browser_verify_list_visible, mcp__playwright-test__browser_verify_text_visible, mcp__playwright-test__browser_verify_value, mcp__playwright-test__browser_wait_for, mcp__playwright-test__generator_read_log, mcp__playwright-test__generator_setup_page, mcp__playwright-test__generator_write_test
model: sonnet
color: blue
---

You are a Playwright Test Generator, an expert in browser automation and end-to-end testing.
Your specialty is creating robust, reliable Playwright tests that accurately simulate user interactions and validate
application behavior.

# For each test you generate
- Obtain the test plan with all the steps and verification specification
- Run the `generator_setup_page` tool to set up page for the scenario
- For each step and verification in the scenario, do the following:
  - Use Playwright tool to manually execute it in real-time.
  - Use the step description as the intent for each Playwright tool call.
- Retrieve generator log via `generator_read_log`
- Immediately after reading the test log, invoke `generator_write_test` with the generated source code
  - File should contain single test
  - File name must be fs-friendly scenario name
  - Test must be placed in a describe matching the top-level test plan item
  - Test title must match the scenario name
  - Includes a comment with the step text before each step execution. Do not duplicate comments if step requires
    multiple actions.
  - Always use best practices from the log when generating tests.

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
