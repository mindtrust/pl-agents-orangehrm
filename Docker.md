## OrangeHRM Docker環境構築手順

### 公式Docker Composeを使用（推奨）

#### 1. 必要なファイルを作成

まず、プロジェクトディレクトリを作成します：

```bash
mkdir orangehrm-docker
cd orangehrm-docker
```

#### 2. docker-compose.ymlを作成

```yaml
version: '3.8'

services:
  mariadb:
    image: mariadb:10.11
    container_name: orangehrm-mariadb
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: orangehrm
      MYSQL_USER: orangehrm
      MYSQL_PASSWORD: orangehrm
    volumes:
      - mariadb_data:/var/lib/mysql
    ports:
      - "3306:3306"
    networks:
      - orangehrm-network
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5

  orangehrm:
    image: orangehrm/orangehrm:5.7
    container_name: orangehrm-app
    depends_on:
      mariadb:
        condition: service_healthy
    environment:
      ORANGEHRM_DATABASE_HOST: mariadb
      ORANGEHRM_DATABASE_PORT: 3306
      ORANGEHRM_DATABASE_NAME: orangehrm
      ORANGEHRM_DATABASE_USER: orangehrm
      ORANGEHRM_DATABASE_PASSWORD: orangehrm
    ports:
      - "8080:80"
      - "8443:443"
    volumes:
      - orangehrm_data:/var/www/html
    networks:
      - orangehrm-network

volumes:
  mariadb_data:
  orangehrm_data:

networks:
  orangehrm-network:
    driver: bridge
```

#### 3. 起動

```bash
# コンテナを起動
docker-compose up -d

# ログを確認
docker-compose logs -f

# 起動確認
docker-compose ps
```

#### 4. セットアップ

ブラウザで以下にアクセス：
```
http://localhost:8080
```

初回アクセス時にインストールウィザードが表示されます：

**インストール設定：**
- Database Host: `mariadb`
- Database Name: `orangehrm`
- Database User: `orangehrm`
- Database Password: `orangehrm`
- Admin Username: `admin`
- Admin Password: `admin123`（任意）

#### 5. 停止・削除

```bash
# 停止
docker-compose stop

# 停止して削除
docker-compose down

# データも含めて完全削除（データベースもリセット）
docker-compose down -v
```

---

## トラブルシューティング

### 1. ポートが既に使用されている場合

```bash
# ポート使用状況を確認
lsof -i :8080

# docker-compose.ymlのポートを変更
ports:
  - "8081:80"  # 8080 → 8081に変更
```

### 2. データベース接続エラー

```bash
# コンテナのログを確認
docker-compose logs mariadb
docker-compose logs orangehrm

# データベースに直接接続して確認
docker exec -it orangehrm-mariadb mysql -u orangehrm -p
# パスワード: orangehrm
```

### 3. インストールウィザードが表示されない

```bash
# コンテナを再起動
docker-compose restart

# キャッシュをクリアして再構築
docker-compose down -v
docker-compose up -d --build
```

### 4. 権限エラーが発生する場合

```bash
# ボリュームの権限を確認
docker exec -it orangehrm ls -la /var/www/html

# 権限を修正
docker exec -it orangehrm chown -R www-data:www-data /var/www/html
```

---

## Playwright テスト用の設定

Docker環境でのテスト設定例：

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'http://localhost:8080',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  
  webServer: {
    command: 'docker-compose up',
    url: 'http://localhost:8080',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
```

```typescript
// tests/orangehrm.spec.ts
import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Docker環境テスト', () => {
  test('ローカル環境でのログイン', async ({ page }) => {
    await page.goto('http://localhost:8080');
    
    await page.getByPlaceholder('Username').fill('admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page).toHaveURL(/dashboard/);
  });
});
```

---

## 便利なコマンド集

```bash
# コンテナの状態確認
docker-compose ps

# ログをリアルタイム表示
docker-compose logs -f orangehrm

# データベースのバックアップ
docker exec orangehrm-mariadb mysqldump -u orangehrm -porangehrm orangehrm > backup.sql

# データベースのリストア
docker exec -i orangehrm-mariadb mysql -u orangehrm -porangehrm orangehrm < backup.sql

# コンテナ内に入る
docker exec -it orangehrm bash

# データベースに接続
docker exec -it orangehrm-mariadb mysql -u orangehrm -porangehrm orangehrm
```

---

## テストデータの初期化

テスト用に毎回クリーンな状態から始めたい場合：

```bash
# リセット用スクリプト reset-orangehrm.sh
#!/bin/bash

echo "OrangeHRMをリセットします..."

# コンテナとボリュームを削除
docker-compose down -v

# 再起動
docker-compose up -d

echo "リセット完了！ http://localhost:8080 でセットアップしてください"
```

```bash
chmod +x reset-orangehrm.sh
./reset-orangehrm.sh
```

---

## おすすめの構成

**開発・テスト用途：**
```bash
# 方法1のdocker-compose.ymlを使用
docker-compose up -d
```

これで、`http://localhost:8080` でOrangeHRMにアクセスできます！
