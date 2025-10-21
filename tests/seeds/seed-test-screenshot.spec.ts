// spec: Test to capture screenshot after save
import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

test.describe('Admin Module - Screenshot After Save', () => {
  test('Capture screenshot immediately after clicking Save', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await page.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList');

    await page.getByRole('button', { name: ' Add' }).click();

    await page.getByRole('textbox').nth(1).fill('Screenshot Test');
    await page.getByRole('textbox', { name: 'Type description here' }).fill('Testing screenshot');
    await page.getByRole('textbox', { name: 'Add note' }).fill('Screenshot note');

    // Click Save
    await page.getByRole('button', { name: 'Save' }).click();

    // Wait a moment
    await page.waitForTimeout(1000);

    // Take screenshot
    await page.screenshot({ path: 'test-results/after-save.png', fullPage: true });

    console.log('Screenshot saved to test-results/after-save.png');

    // Check page HTML for success message
    const bodyHTML = await page.locator('body').innerHTML();
    console.log('Looking for success message in HTML...');

    if (bodyHTML.includes('Successfully Saved')) {
      console.log('✅ Found "Successfully Saved" in page HTML');
    } else {
      console.log('❌ "Successfully Saved" NOT found in page HTML');
    }

    if (bodyHTML.includes('Success')) {
      console.log('✅ Found "Success" in page HTML');
    } else {
      console.log('❌ "Success" NOT found in page HTML');
    }
  });
});
