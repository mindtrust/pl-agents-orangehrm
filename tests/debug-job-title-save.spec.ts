// spec: Debug OrangeHRM Job Title Save Issue
// seed: tests/seeds/seed-test-simple.spec.ts

import { test, expect } from '../src/fixtures/orangehrm-fixtures';

test.describe('Debug OrangeHRM Job Title Save Issue', () => {
  test('Investigation Steps', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    // 1. Navigate to job title list page
    await page.goto('http://localhost:8080/web/index.php/admin/viewJobTitleList');

    // 2. Click Add button (with potential leading space)
    await page.getByRole('button', { name: ' Add' }).click();

    // 3. Fill in Job Title field with "Debug Test"
    await page.getByRole('textbox').nth(1).fill('Debug Test');

    // 4. Fill in Job Description field with "Testing save"
    await page.getByRole('textbox', { name: 'Type description here' }).fill('Testing save');

    // 5. Fill in Note field with "Debug note"
    await page.getByRole('textbox', { name: 'Add note' }).fill('Debug note');

    // 6. Click Save button
    await page.getByRole('button', { name: 'Save' }).click();

    // 7. Wait for and verify "Successfully Saved" message appears
    await expect(page.getByText('Successfully Saved')).toBeVisible();

    // 8. Wait for success message to disappear
    await expect(page.getByText('Successfully Saved')).toBeHidden({ timeout: 10000 });

    // 10. Verify "Debug Test" appears in the job titles list
    await expect(page.getByText('Debug Test')).toBeVisible();

    // 11. Verify the record count increased to 2
    await expect(page.getByText('(2) Records Found')).toBeVisible();
  });
});
