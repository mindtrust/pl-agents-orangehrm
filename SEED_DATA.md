# Seed Data Documentation

## 概要

OrangeHRM Admin Moduleのテストデータを自動投入するためのseedテストです。

## Seedテストファイル

### tests/seeds/admin-seed-data.spec.ts

管理モジュールの基本的なマスターデータを投入します。

#### 投入されるデータ

| カテゴリ | データ数 | 内容 |
|---------|---------|------|
| Job Titles (職位) | 2件 | ソフトウェアエンジニア、プロジェクトマネージャー |
| Employment Status (雇用ステータス) | 2件 | 正社員、契約社員 |
| Job Categories (職種カテゴリ) | 2件 | 技術部門、管理部門 |
| Skills (スキル) | 3件 | JavaScript, Python, SQL |
| Education (学歴) | 2件 | 学士、修士 |

**合計: 11件のマスターデータ**

## 使用方法

### 方法1: npmスクリプトを使用

```bash
# Seedデータを投入
npm run seed
```

### 方法2: Playwrightコマンドを直接実行

```bash
# Chromiumで実行（推奨）
npx playwright test tests/seeds/admin-seed-data.spec.ts --project=chromium

# ヘッドモードで実行（ブラウザを表示）
npx playwright test tests/seeds/admin-seed-data.spec.ts --project=chromium --headed

# UIモードで実行（インタラクティブ）
npx playwright test tests/seeds/admin-seed-data.spec.ts --project=chromium --ui
```

## テストワークフロー内での使用

### 初回セットアップ

```bash
# 1. OrangeHRMを完全リセット
npm run reset

# 2. ブラウザで http://localhost:8080 にアクセス
#    セットアップウィザードを完了
#    管理者ユーザー名: Admin
#    管理者パスワード: Admin#0630#

# 3. クリーンな状態をバックアップ（マスターデータなし）
npm run backup:clean

# 4. Seedデータを投入
npm run seed

# 5. Seedデータ投入後の状態をバックアップ（オプション）
docker exec orangehrm-mariadb mysqldump -u orangehrm -porangehrm orangehrm > backups/with-seed-data.sql
```

### 通常のテスト実行

```bash
# 方法A: 完全自動テストサイクル
npm run test:with-reset

# 方法B: 手動で段階的に実行
npm run restore:clean  # クリーンな状態に復元
npm run seed          # Seedデータ投入
npm run test:admin    # テスト実行
npm run restore:clean  # 再度クリーンな状態に復元
```

## Seedデータの詳細

### 1. Job Titles (職位)

| 職位名 | 説明 | 備考 |
|--------|------|------|
| ソフトウェアエンジニア | ソフトウェア開発業務 | - |
| プロジェクトマネージャー | プロジェクト管理業務 | - |

### 2. Employment Status (雇用ステータス)

- 正社員
- 契約社員

### 3. Job Categories (職種カテゴリ)

- 技術部門
- 管理部門

### 4. Skills (スキル)

| スキル名 | 説明 |
|---------|------|
| JavaScript | フロントエンド開発言語 |
| Python | バックエンド開発言語 |
| SQL | データベース操作言語 |

### 5. Education (学歴)

- 学士
- 修士

## カスタマイズ

Seedデータをカスタマイズしたい場合は、`tests/seeds/admin-seed-data.spec.ts` を直接編集してください。

### データ追加例

```typescript
// Job Titlesにデータを追加
const jobTitles = [
  { title: 'ソフトウェアエンジニア', description: 'ソフトウェア開発業務' },
  { title: 'プロジェクトマネージャー', description: 'プロジェクト管理業務' },
  { title: '新しい職位', description: '新しい職位の説明' },  // ← 追加
];
```

## その他のSeedテスト

プロジェクトには複数のseedテストがあります：

### tests/admin-seed.spec.ts
- Playwright Agents学習用のseedテスト
- アプリケーション構造の理解が目的
- データ投入は行わない

### tests/seeds/admin-module-seed.spec.ts
- より包括的なseedデータ（36件）
- 実行時間が長い
- 現在は使用していない

### tests/seeds/admin-seed-data.spec.ts ⭐️
- **現在使用中**
- 最小限だが実用的なデータ（11件）
- 高速で確実に動作

## トラブルシューティング

### Seedテストが失敗する

```bash
# OrangeHRMが起動しているか確認
docker-compose ps

# OrangeHRMを再起動
docker-compose restart

# 完全リセット
npm run reset
```

### データが重複エラー

```bash
# クリーンな状態に復元
npm run restore:clean

# 再度Seed実行
npm run seed
```

### タイムアウトエラー

OrangeHRMの起動が遅い場合、`tests/seeds/admin-seed-data.spec.ts` のタイムアウトを増やしてください：

```typescript
test('Admin Module Seed Data', async ({ authenticatedPage, page }) => {
  // テストコード
}, { timeout: 120000 });  // 120秒に延長
```

## 関連ドキュメント

- [TEST_WORKFLOW.md](TEST_WORKFLOW.md) - テストワークフロー全体の説明
- [CLAUDE.md](CLAUDE.md) - プロジェクト概要
- [specs/admin-module-test-plan.md](specs/admin-module-test-plan.md) - テスト計画書
