#!/bin/bash

# バックアップからクリーンな状態に復元
echo "🔄 データベースをクリーンな状態に復元中..."

docker exec -i orangehrm-mariadb mysql \
  -u orangehrm \
  -porangehrm \
  orangehrm < backups/clean-state.sql

echo "✅ 復元完了！"
