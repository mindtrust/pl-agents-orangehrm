#!/bin/bash

echo "🔄 OrangeHRMを初期状態にリセットします..."

# コンテナとボリュームを完全削除
echo "📦 コンテナとデータベースを削除中..."
docker-compose down -v

# 再起動
echo "🚀 OrangeHRMを再起動中..."
docker-compose up -d

echo "⏳ OrangeHRMの起動を待機中（約30秒）..."
sleep 30

echo "✅ リセット完了！"
echo "📍 http://localhost:8080 でOrangeHRMにアクセスできます"
echo ""
echo "⚠️  初回アクセス時はセットアップウィザードが表示されます"
echo "    管理者ユーザー名: Admin"
echo "    管理者パスワード: Admin#0630#"
