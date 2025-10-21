# Changelog

## 2025-10-19 (Latest Fix - CRITICAL)

### Fixed
- **CRITICAL FIX: データ保存問題を解決**
  - 問題: Saveボタンをクリック後、すぐに次のページに遷移していたため、保存処理が完了せずデータが保存されていなかった
  - 原因: 成功メッセージ `page.getByText('Successfully Saved')` の表示/非表示が非常に高速（< 5秒）で、`toBeVisible()` が間に合わなかった
  - 解決策: 成功メッセージの待機を削除し、代わりに以下を実装:
    1. Saveボタンクリック後、リストページへの自動遷移を待つ（5秒タイムアウト）
    2. タイムアウトした場合は手動でリストページに遷移
    3. 保存したデータがリストに表示されることを確認

  ```typescript
  // 修正前（動作しない）
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Successfully Saved')).toBeVisible();
  await expect(page.getByText('Successfully Saved')).toBeHidden({ timeout: 10000 });

  // 修正後（動作する）
  await page.getByRole('button', { name: 'Save' }).click();

  // リストページへの遷移を待つ
  await page.waitForURL('**/viewJobTitleList', { timeout: 5000 }).catch(async () => {
    await page.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList');
  });

  // データがリストに表示されることを確認
  await expect(page.getByText('保存したデータ名')).toBeVisible();
  ```

### Modified Files
- `tests/seeds/admin-seed-data.spec.ts` - 全7箇所の保存処理を修正 ✅
- `tests/seeds/seed-test-simple.spec.ts` - テストケースとして修正 ✅
- `tests/seeds/admin-module-seed.spec.ts` - 成功メッセージ待機を削除（一部修正済み）

### Test Results
- ✅ `admin-seed-data.spec.ts` - **全データ保存成功（7件）** - 推奨！
- ✅ `seed-test-simple.spec.ts` - テスト合格
- ⚠️ `admin-module-seed.spec.ts` - Seed 1 (Job Titles)のみテスト成功（5件）
  - 残りのSeed 3〜11はメニューベースのナビゲーションに問題あり（前回と同じ問題）
  - このファイルは51件の大量データなので、実行時間が非常に長い
  - **推奨**: `admin-seed-data.spec.ts`（7件、高速、安定）を使用してください

### Investigation
- Playwright Agentでの手動実行では成功メッセージが見えていたが、`npx playwright test` 実行時はタイミングが合わず失敗
- スクリーンショット調査により、成功メッセージは緑色のトースト通知として表示されることを確認
- HTMLには "Successfully Saved" が含まれているが、表示が高速すぎて `toBeVisible()` が検出できない

---

## 2025-10-19

### Added
- Admin Module用の包括的なseedデータテスト
  - `tests/seeds/admin-seed-data.spec.ts` - 推奨（11件の基本データ、高速）
  - `tests/seeds/admin-module-seed.spec.ts` - 包括的（51件の詳細データ）
  - `tests/seeds/admin-module-seed-simple.spec.ts` - シンプル版（試作）

### Changed
- **tests/seeds/admin-module-seed.spec.ts の改善（第2弾）**
  - **すべてのAddボタンにフォーム表示待機を追加**（NEW!）
    - 各Addボタンクリック後に、フォームの主要入力フィールドが表示されるまで待機
    - `await expect(page.locator(...)).toBeVisible()` でフォームの読み込み完了を確認
    - これにより、フォームが完全にロードされる前に入力を開始するエラーを防止
  - **すべての保存処理に成功メッセージの待機処理を追加**
    - 各保存後に `await expect(page.getByText('Successfully Saved')).toBeVisible()` で成功を確認
    - さらに `await expect(page.getByText('Successfully Saved')).toBeHidden({ timeout: 10000 })` でメッセージが消えるまで待機
    - これにより、次の処理に進む前に確実に保存が完了することを保証

### Fixed
- 給与等級の最初の保存処理に成功メッセージ確認が欠けていた問題を修正
- 成功メッセージが消える前に次の処理が実行される可能性があった問題を修正
- Addボタンクリック後、フォームがロードされる前に入力を開始する可能性があった問題を修正

## 修正内容の詳細

### Addボタンの修正

#### 修正前
```typescript
await page.getByRole('button', { name: 'Add' }).click();
await page.locator('input[class*="oxd-input"]').nth(1).fill(data);
```

#### 修正後
```typescript
await page.getByRole('button', { name: 'Add' }).click();

// フォームが表示されるまで待機
await expect(page.locator('input[class*="oxd-input"]').nth(1)).toBeVisible();

await page.locator('input[class*="oxd-input"]').nth(1).fill(data);
```

### Saveボタンの修正

#### 修正前
```typescript
await page.getByRole('button', { name: 'Save' }).click();
await expect(page.getByText('Successfully Saved')).toBeVisible();
console.log(`✅ データ追加: ${name}`);
```

#### 修正後
```typescript
await page.getByRole('button', { name: 'Save' }).click();

// 成功メッセージ確認
await expect(page.getByText('Successfully Saved')).toBeVisible();
// 成功メッセージが消えるまで待機
await expect(page.getByText('Successfully Saved')).toBeHidden({ timeout: 10000 });
console.log(`✅ データ追加: ${name}`);
```

## 影響を受けたテストケース

以下のすべてのSeedテストに修正を適用:
1. Seed 1: 職位 (Job Titles) - 5件
2. Seed 2: 給与等級 (Pay Grades) - 3件 × 2回の保存（等級名 + 通貨情報）
3. Seed 3: 雇用ステータス (Employment Status) - 4件
4. Seed 4: 職種カテゴリ (Job Categories) - 5件
5. Seed 5: 勤務シフト (Work Shifts) - 3件
6. Seed 6: 拠点 (Locations) - 3件
7. Seed 7: スキル (Skills) - 10件
8. Seed 8: 学歴 (Education) - 5件
9. Seed 9: ライセンス (Licenses) - 5件
10. Seed 10: 言語 (Languages) - 5件
11. Seed 11: 会員資格 (Memberships) - 3件

**合計の修正箇所:**
- **Addボタン後の待機: 13箇所**（給与等級の通貨追加含む）
- **Saveボタン後の待機: 54箇所**（全保存処理）

## メリット

### Addボタンの待機追加によるメリット
1. **フォームロード完了の保証**: フォームが完全に表示されてから入力を開始
2. **入力エラーの防止**: 要素が存在しない状態での入力試行を防止
3. **テスト安定性の向上**: フォーム表示のタイミングに依存しない確実な動作

### Saveボタンの待機追加によるメリット
1. **確実性の向上**: すべての保存が完了してから次の処理に進む
2. **エラー削減**: 保存中に次の処理が実行されるエラーを防止
3. **可読性の向上**: コメントにより処理の意図が明確
4. **デバッグ容易性**: 成功メッセージの表示/非表示で保存状態を追跡可能

### 全体的な効果
- **テスト実行の安定性が大幅に向上**
- **タイミング依存のエラーがほぼゼロに**
- **デバッグ時の問題箇所特定が容易に**
