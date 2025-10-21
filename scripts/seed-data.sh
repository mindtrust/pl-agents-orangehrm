#!/bin/bash

echo "🌱 Seedデータを投入中..."

# Admin Module Seedデータを投入
# 動作確認済みのadmin-seed-data.spec.tsを使用
npx playwright test tests/seeds/admin-seed-data.spec.ts --project=chromium

echo "✅ Seedデータ投入完了！"
