## Playwright Agents のセットアップ

### playwright Agents の設定 (Claudeを利用)
```bash
npm init -y
npm install -D @playwright/test@latest
npx playwright init-agents --loop=claude
```
## seed.spec.ts の編集
```typescript
// seed.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    await page.goto('http://localhost:8080/');
  });
});
```

## この後は、VSCode Claude Codeを起動
モデルは Sonnet 4.5

