# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: extreme-resume.spec.js >> Extreme Resume Builder Stress Test >> Should handle 20 projects, 10 jobs, and generate 5-page PDF without crashing
- Location: tests\extreme-resume.spec.js:7:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:5173/resume/edit/test-extreme-id", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { generateMockResume } from './fixtures/resumeGenerator.js';
  3  | import { mockAuth } from './fixtures/auth.js';
  4  | 
  5  | test.describe('Extreme Resume Builder Stress Test', () => {
  6  |   
  7  |   test('Should handle 20 projects, 10 jobs, and generate 5-page PDF without crashing', async ({ page }) => {
  8  |     // 1. Load the mock data
  9  |     const extremeResume = generateMockResume('extreme');
  10 |     
  11 |     // 2. Mock the Supabase API to inject the resume data directly 
  12 |     // (since we don't want to rely on the actual network or DB for the pure UI stress test)
  13 |     await page.route('**/rest/v1/resumes?*', async route => {
  14 |       const headers = route.request().headers();
  15 |       const isSingle = headers['accept'] && headers['accept'].includes('application/vnd.pgrst.object+json');
  16 |       const bodyObj = { id: 'test-extreme-id', title: 'Test Extreme Resume', sections: extremeResume };
  17 |       await route.fulfill({
  18 |         status: 200,
  19 |         contentType: 'application/json',
  20 |         body: JSON.stringify(isSingle ? bodyObj : [bodyObj])
  21 |       });
  22 |     });
  23 | 
  24 |     // 3. Navigate to the editor
  25 |     await mockAuth(page);
> 26 |     await page.goto('/resume/edit/test-extreme-id');
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  27 | 
  28 |     // 4. Verify the editor loaded the massive payload without crashing
  29 |     await expect(page.locator('.rb2-input').first()).toHaveValue(/Test.*User/);
  30 |     
  31 |     // 5. Take a screenshot of the deeply populated form
  32 |     await page.screenshot({ path: 'test-results/screenshots/extreme-form.png', fullPage: true });
  33 | 
  34 |     // 6. Test PDF Export
  35 |     // Wait for the preview to render (debounce is 600ms, plus pdf-lib generation time)
  36 |     // We expect the preview to exist
  37 |     const previewLocator = page.locator('[title="Resume Preview"]');
  38 |     await expect(previewLocator).toBeVisible({ timeout: 15000 });
  39 | 
  40 |     // 7. Click "Export As PDF"
  41 |     // Wait for any download event
  42 |     const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
  43 |     
  44 |     // Open Export Menu
  45 |     await page.click('text="Export As ▼"');
  46 |     
  47 |     // Click PDF Export
  48 |     await page.click('text="📄 PDF Document"');
  49 |     
  50 |     const download = await downloadPromise;
  51 |     
  52 |     // 8. Save the PDF artifact
  53 |     await download.saveAs('test-results/pdfs/extreme-resume.pdf');
  54 |     
  55 |     // 9. Basic verification that the download succeeded
  56 |     expect(download.suggestedFilename()).toContain('.pdf');
  57 |   });
  58 | 
  59 | });
  60 | 
```