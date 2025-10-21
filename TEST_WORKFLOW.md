# テストワークフロー

## 概要

OrangeHRMのテストを常にクリーンな状態から実行するためのワークフローです。

## 🎯 推奨ワークフロー

### 方法1: データベースバックアップ/リストア方式（推奨）

#### 初回セットアップ

```bash
# 1. OrangeHRMを初期化
npm run reset

# 2. ブラウザで http://localhost:8080 にアクセスし、セットアップウィザードを完了
#    管理者ユーザー名: Admin
#    管理者パスワード: Admin#0630#

# 3. クリーンな状態をバックアップ
npm run backup:clean
```

#### テスト実行（2回目以降）

```bash
# 方法A: 自動でリセット→Seed→テスト→リセット
npm run test:with-reset

# 方法B: 手動で段階的に実行
npm run restore:clean  # 1. クリーンな状態に復元
npm run seed          # 2. Seedデータ投入
npm run test:admin    # 3. テスト実行
npm run restore:clean  # 4. 再度クリーンな状態に復元（次回用）
```

### 方法2: 完全リセット方式（時間がかかる）

```bash
# 1. Dockerボリュームごと削除して完全リセット
npm run reset

# 2. ブラウザでセットアップウィザードを完了

# 3. Seedデータ投入
npm run seed

# 4. テスト実行
npm run test:admin
```

## 📦 利用可能なコマンド

### テスト実行

```bash
npm test                # すべてのテストを実行
npm run test:ui         # UIモードで実行（インタラクティブ）
npm run test:headed     # ヘッドモードで実行（ブラウザを表示）
npm run test:admin      # 管理モジュールのテストのみ実行
npm run test:with-reset # リセット→Seed→テスト→リセットを自動実行
```

### データ管理

```bash
npm run seed           # Seedデータを投入
npm run backup:clean   # 現在の状態をバックアップ
npm run restore:clean  # バックアップから復元
npm run reset          # 完全リセット（Dockerボリューム削除）
```

## 🔄 テストサイクル

### 日常的なテスト実行

```bash
# クリーンな状態から自動でテスト
npm run test:with-reset
```

このコマンドは以下を自動実行します：
1. データベースをクリーンな状態に復元
2. Seedデータを投入
3. テストを実行
4. テスト後、再度クリーンな状態に復元

### CI/CDでの利用

```bash
# CI環境では毎回完全リセット
npm run reset
# セットアップ完了を待つ（CI環境では自動化が必要）
npm run seed
npm run test:admin
```

## 📁 ディレクトリ構造

```
orangehrm-docker/
├── scripts/
│   ├── reset-orangehrm.sh          # 完全リセット
│   ├── backup-clean-state.sh       # バックアップ作成
│   ├── restore-clean-state.sh      # バックアップから復元
│   ├── seed-data.sh                # Seedデータ投入
│   └── run-tests-with-reset.sh     # 自動テストサイクル
├── backups/
│   └── clean-state.sql             # クリーンな状態のDB（初回セットアップ後に作成）
├── tests/
│   ├── admin-seed.spec.ts          # Seedテスト
│   └── admin/                      # 管理モジュールテスト
└── package.json
```

## ⚠️ 注意事項

### データベースバックアップについて

- **`backups/clean-state.sql`** は初回セットアップ後に作成してください
- このファイルはGitにコミット可能です（テストデータのため）
- または `.gitignore` に追加して各環境で作成することもできます

### OrangeHRMソースコードについて

**基本的にソースコードは不要です**。Dockerイメージを使用しているため、データベースのリセットで十分です。

ただし、以下の場合はソースコードが必要になります：
- OrangeHRMのコアコードを変更したい
- カスタムプラグインを開発したい
- SQLではできない特殊なデータ操作が必要

その場合は、以下のディレクトリに配置してください：

```
orangehrm-docker/
├── orangehrm-source/     # ← ここにソースコードを配置
│   ├── symfony/
│   ├── src/
│   └── ...
```

## 🐛 トラブルシューティング

### バックアップファイルが見つからない

```bash
# 初回セットアップをやり直す
npm run reset
# ブラウザでセットアップ完了後
npm run backup:clean
```

### テストが失敗する

```bash
# データベースをリセット
npm run restore:clean

# Seedデータを再投入
npm run seed

# テスト再実行
npm run test:admin
```

### Dockerコンテナが起動しない

```bash
# 完全クリーンアップ
docker-compose down -v
docker system prune -a

# 再起動
npm run reset
```

## 📊 テストプラン

詳細なテストプランは [specs/admin-module-test-plan.md](specs/admin-module-test-plan.md) を参照してください。

## 🔗 関連ドキュメント

- [CLAUDE.md](CLAUDE.md) - プロジェクト概要とアーキテクチャ
- [Docker.md](Docker.md) - Docker環境の詳細
- [specs/admin-module-test-plan.md](specs/admin-module-test-plan.md) - テスト計画書
