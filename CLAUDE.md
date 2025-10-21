# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Playwright test automation project for OrangeHRM (version 5.7) running in Docker. The project uses **Playwright Agents** with Claude AI to generate and maintain end-to-end tests. It follows the Page Object Model (POM) pattern with custom fixtures for better test organization.

## Environment Setup

### Docker Environment
- OrangeHRM 5.7 runs on `http://localhost:8080`
- MariaDB 10.11 database on port 3306
- Docker Compose manages both services

**Start/Stop Commands:**
```bash
# Start OrangeHRM
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Reset completely (deletes all data)
docker-compose down -v
```

### Test Credentials
- **Admin Username:** `Admin`
- **Admin Password:** `Admin#0630#`

## Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific test file
npx playwright test tests/admin-seed.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Run with UI mode (interactive)
npx playwright test --ui

# View last test report
npx playwright show-report
```

## Architecture

### Page Object Model Structure

```
src/
├── pages/           # Page Object classes
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── AdminPage.ts
│   └── PIMPage.ts
└── fixtures/        # Playwright custom fixtures
    └── orangehrm-fixtures.ts
```

**Key architectural patterns:**

1. **Custom Fixtures**: The project uses `orangehrm-fixtures.ts` which extends Playwright's base test with:
   - Pre-configured page objects (`loginPage`, `dashboardPage`, `pimPage`, `adminPage`)
   - `authenticatedPage` fixture that automatically logs in before tests

2. **Page Objects**: Each page class encapsulates:
   - Locators as readonly class properties
   - Action methods (e.g., `login()`, `navigateToModule()`)
   - Assertion-friendly getters for elements

3. **Import Pattern**: Tests must import from the custom fixtures:
   ```typescript
   import { test, expect } from '../src/fixtures/orangehrm-fixtures';
   ```
   Note: The exact path depends on test file location. From `tests/` directory, use `'../src/fixtures/orangehrm-fixtures'`.

### OrangeHRM Module Structure

OrangeHRM has the following main modules (accessible via left sidebar):
- **Admin** - User management, job titles, organization structure
- **PIM** - Employee information management
- **Leave** - Leave management and approvals
- **Time** - Timesheets and attendance
- **Recruitment** - Job vacancies and candidates
- **Performance** - KPIs and reviews

Navigation between modules is handled by `DashboardPage.navigateToModule()`.

## Playwright Agents Integration

This project is configured to work with **Playwright Agents** (Claude-powered AI testing):

### Setup
```bash
npm init -y
npm install -D @playwright/test@latest
npx playwright init-agents --loop=claude
```

### Seed Tests
The `tests/admin-seed.spec.ts` file is a **seed test** designed to teach Playwright Agents about:
- How to use Page Object Model in this codebase
- Custom fixture usage patterns
- OrangeHRM application structure and navigation
- Common testing workflows (login, navigation, search)

**Important**: When working with Playwright Agents, the seed tests serve as learning examples. Do not modify them unless improving the training patterns.

## Development Guidelines

### Creating New Tests

1. **Use the custom fixtures** - Always import from `../src/fixtures/orangehrm-fixtures`:
   ```typescript
   import { test, expect } from '../src/fixtures/orangehrm-fixtures';
   ```

2. **Leverage existing fixtures** - Use `authenticatedPage` to skip login:
   ```typescript
   test('test name', async ({ authenticatedPage, dashboardPage }) => {
     // Already logged in
     await dashboardPage.navigateToModule('PIM');
   });
   ```

3. **Extend Page Objects** - When adding new pages:
   - Create a new class in `src/pages/`
   - Add it to `orangehrm-fixtures.ts`
   - Export it from the fixtures

### Adding New Page Objects

```typescript
// 1. Create the page class
export class NewPage {
  readonly page: Page;
  readonly someElement: Locator;

  constructor(page: Page) {
    this.page = page;
    this.someElement = page.locator('selector');
  }
}

// 2. Add to fixtures/orangehrm-fixtures.ts
type OrangeHRMFixtures = {
  // ... existing
  newPage: NewPage;
};

export const test = base.extend<OrangeHRMFixtures>({
  // ... existing fixtures
  newPage: async ({ page }, use) => {
    const newPage = new NewPage(page);
    await use(newPage);
  },
});
```

## Reference Documentation

- `specs/reference/admin-manual.md` - Comprehensive OrangeHRM administrator's guide
- `specs/reference/user-manual.md` - End-user documentation
- `Docker.md` - Detailed Docker setup and troubleshooting

These manuals describe OrangeHRM 3.0, but the core concepts apply to version 5.7 running in this environment.

## Testing Strategy

### Seed Tests (Pre-learning for Agents)
Located in `tests/admin-seed.spec.ts`, these demonstrate:
- Login and authentication patterns
- Module navigation
- Using Page Objects with fixtures
- Search functionality

### Test Organization
- Group related tests in `test.describe()` blocks
- Use descriptive test names that explain what's being tested
- Prefer `authenticatedPage` fixture over manual login for speed

## baseURL Configuration

The `playwright.config.ts` sets:
```typescript
baseURL: 'http://localhost:8080/'
```

All page navigation uses relative paths from this base (e.g., `page.goto('/')` goes to the login page).
