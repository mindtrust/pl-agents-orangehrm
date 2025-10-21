#!/bin/bash

# クリーンな状態のデータベースをバックアップ
echo "💾 クリーンな状態のデータベースをバックアップ中..."

docker exec orangehrm-mariadb mysqldump \
  -u orangehrm \
  -porangehrm \
  orangehrm > backups/clean-state.sql

echo "✅ バックアップ完了: backups/clean-state.sql"
