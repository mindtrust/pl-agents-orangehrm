#!/bin/bash

# バックアップからSeedデータに復元
echo "🔄 データベースをSeedデータに復元中..."

docker exec -i orangehrm-mariadb mysql \
  -u orangehrm \
  -porangehrm \
  orangehrm < backups/seed-data.sql

echo "✅ 復元完了！"
