// spec: Test saving without waiting for success message
// seed: tests/seeds/seed-test-simple.spec.ts

import { test, expect } from '../../src/fixtures/orangehrm-fixtures';

test.describe('Admin Module - Job Title Save (No Success Wait)', () => {
  test('Add Job Title Without Waiting for Success Message', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    // Navigate to job title list page
    await page.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList');

    // Get initial record count
    const initialCountText = await page.getByText(/\(\d+\) Records? Found/).textContent();
    console.log('Initial count:', initialCountText);

    // Click Add button
    await page.getByRole('button', { name: ' Add' }).click();

    // Fill in the form
    await page.getByRole('textbox').nth(1).fill('No Wait Test');
    await page.getByRole('textbox', { name: 'Type description here' }).fill('Testing without wait');
    await page.getByRole('textbox', { name: 'Add note' }).fill('No wait note');

    // Click Save
    await page.getByRole('button', { name: 'Save' }).click();

    // Just wait for navigation back to list page (if it happens)
    await page.waitForURL('**/viewJobTitleList', { timeout: 10000 }).catch(() => {
      console.log('Did not navigate back to list page automatically');
    });

    // Or manually navigate
    await page.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList');

    // Check if the data appears
    await expect(page.getByText('No Wait Test')).toBeVisible({ timeout: 5000 });

    // Get final record count
    const finalCountText = await page.getByText(/\(\d+\) Records? Found/).textContent();
    console.log('Final count:', finalCountText);

    console.log('✅ Data saved successfully!');
  });
});
