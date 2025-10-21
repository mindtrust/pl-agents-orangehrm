#!/bin/bash

echo "🧪 テストを実行します（完全リセット付き）"
echo "============================================"

# 1. データベースをクリーンな状態に復元
echo ""
echo "ステップ1: データベースをクリーンな状態に復元"
./scripts/restore-clean-state.sh

# 2. Seedデータを投入
echo ""
echo "ステップ2: Seedデータを投入"
./scripts/seed-data.sh

# 3. テスト実行
echo ""
echo "ステップ3: テストを実行"
npx playwright test tests/admin/

# 4. テスト後のクリーンアップ（オプション）
echo ""
echo "ステップ4: データベースをクリーンな状態に復元（次回テスト用）"
./scripts/restore-clean-state.sh

echo ""
echo "✅ すべて完了！"
