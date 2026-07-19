# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: export.spec.js >> Export Functionality Tests >> Should export JSON, TXT, and DOCX without errors
- Location: tests\export.spec.js:7:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:5173/resume/edit/test-export-id", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { generateMockResume } from './fixtures/resumeGenerator.js';
  3  | import { mockAuth } from './fixtures/auth.js';
  4  | 
  5  | test.describe('Export Functionality Tests', () => {
  6  | 
  7  |   test('Should export JSON, TXT, and DOCX without errors', async ({ page }) => {
  8  |     const mockResume = generateMockResume('experienced');
  9  |     
  10 |     // Inject mock data
  11 |     await page.route('**/rest/v1/resumes?*', async route => {
  12 |       const headers = route.request().headers();
  13 |       const isSingle = headers['accept'] && headers['accept'].includes('application/vnd.pgrst.object+json');
  14 |       const bodyObj = { id: 'test-export-id', title: 'Test Export Resume', sections: mockResume };
  15 |       await route.fulfill({
  16 |         status: 200,
  17 |         contentType: 'application/json',
  18 |         body: JSON.stringify(isSingle ? bodyObj : [bodyObj])
  19 |       });
  20 |     });
  21 | 
  22 |     await mockAuth(page);
> 23 |     await page.goto('/resume/edit/test-export-id');
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  24 |     
  25 |     // Wait for load
  26 |     await expect(page.locator('.rb2-input').first()).toHaveValue(/Test.*User/);
  27 | 
  28 |     // Test JSON Export
  29 |     const jsonPromise = page.waitForEvent('download');
  30 |     await page.click('text="Export As ▼"');
  31 |     await page.click('text="💾 JSON Backup"');
  32 |     const jsonDownload = await jsonPromise;
  33 |     expect(jsonDownload.suggestedFilename()).toContain('.json');
  34 | 
  35 |     // Test TXT Export
  36 |     const txtPromise = page.waitForEvent('download');
  37 |     await page.click('text="Export As ▼"');
  38 |     await page.click('text="📋 Plain Text"');
  39 |     const txtDownload = await txtPromise;
  40 |     expect(txtDownload.suggestedFilename()).toContain('.txt');
  41 | 
  42 |     // Test DOCX Export
  43 |     const docxPromise = page.waitForEvent('download');
  44 |     await page.click('text="Export As ▼"');
  45 |     await page.click('text="📝 Word (DOCX)"');
  46 |     const docxDownload = await docxPromise;
  47 |     expect(docxDownload.suggestedFilename()).toContain('.docx');
  48 |   });
  49 | 
  50 | });
  51 | 
```