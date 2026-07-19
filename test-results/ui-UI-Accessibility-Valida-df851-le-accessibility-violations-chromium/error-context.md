# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui.spec.js >> UI & Accessibility Validation >> Should not have any automatically detectable accessibility violations
- Location: tests\ui.spec.js:8:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:5173/resume/edit/test-a11y-id", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import AxeBuilder from '@axe-core/playwright';
  3  | import { generateMockResume } from './fixtures/resumeGenerator.js';
  4  | import { mockAuth } from './fixtures/auth.js';
  5  | 
  6  | test.describe('UI & Accessibility Validation', () => {
  7  | 
  8  |   test('Should not have any automatically detectable accessibility violations', async ({ page }) => {
  9  |     const mockResume = generateMockResume('experienced');
  10 |     await page.route('**/rest/v1/resumes?*', async route => {
  11 |       const headers = route.request().headers();
  12 |       const isSingle = headers['accept'] && headers['accept'].includes('application/vnd.pgrst.object+json');
  13 |       const bodyObj = { id: 'test-a11y-id', title: 'Test A11y', sections: mockResume };
  14 |       await route.fulfill({
  15 |         status: 200,
  16 |         contentType: 'application/json',
  17 |         body: JSON.stringify(isSingle ? bodyObj : [bodyObj])
  18 |       });
  19 |     });
  20 | 
  21 |     await mockAuth(page);
> 22 |     await page.goto('/resume/edit/test-a11y-id');
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  23 |     await expect(page.locator('.rb2-input').first()).toHaveValue(/Test.*User/);
  24 | 
  25 |     const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
  26 |     
  27 |     // We expect 0 violations. If there are violations, the test will fail and print them.
  28 |     expect(accessibilityScanResults.violations).toEqual([]);
  29 |   });
  30 | 
  31 |   test('Should not have any console errors on render', async ({ page }) => {
  32 |     const consoleErrors = [];
  33 |     page.on('console', msg => {
  34 |       // Ignore warnings, only catch actual errors
  35 |       if (msg.type() === 'error') {
  36 |         consoleErrors.push(msg.text());
  37 |       }
  38 |     });
  39 | 
  40 |     const mockResume = generateMockResume('experienced');
  41 |     await page.route('**/rest/v1/resumes?*', async route => {
  42 |       const headers = route.request().headers();
  43 |       const isSingle = headers['accept'] && headers['accept'].includes('application/vnd.pgrst.object+json');
  44 |       const bodyObj = { id: 'test-ui-id', title: 'Test UI', sections: mockResume };
  45 |       await route.fulfill({
  46 |         status: 200,
  47 |         contentType: 'application/json',
  48 |         body: JSON.stringify(isSingle ? bodyObj : [bodyObj])
  49 |       });
  50 |     });
  51 | 
  52 |     await mockAuth(page);
  53 |     await page.goto('/resume/edit/test-ui-id');
  54 |     await expect(page.locator('.rb2-input').first()).toHaveValue(/Test.*User/);
  55 | 
  56 |     expect(consoleErrors.length).toBe(0);
  57 |   });
  58 | 
  59 | });
  60 | 
```