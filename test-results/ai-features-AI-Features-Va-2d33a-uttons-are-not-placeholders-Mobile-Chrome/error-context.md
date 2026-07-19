# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ai-features.spec.js >> AI Features Validation >> Should validate AI Generation buttons are not placeholders
- Location: tests\ai-features.spec.js:7:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:5173/resume/edit/test-ai-id", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { generateMockResume } from './fixtures/resumeGenerator.js';
  3  | import { mockAuth } from './fixtures/auth.js';
  4  | 
  5  | test.describe('AI Features Validation', () => {
  6  | 
  7  |   test('Should validate AI Generation buttons are not placeholders', async ({ page }) => {
  8  |     const mockResume = generateMockResume('experienced');
  9  | 
  10 |     await page.route('**/rest/v1/resumes?*', async route => {
  11 |       const headers = route.request().headers();
  12 |       const isSingle = headers['accept'] && headers['accept'].includes('application/vnd.pgrst.object+json');
  13 |       const bodyObj = { id: 'test-ai-id', title: 'Test Resume', sections: mockResume };
  14 |       await route.fulfill({
  15 |         status: 200,
  16 |         contentType: 'application/json',
  17 |         body: JSON.stringify(isSingle ? bodyObj : [bodyObj])
  18 |       });
  19 |     });
  20 | 
  21 |     await mockAuth(page);
> 22 |     await page.goto('/resume/edit/test-ai-id');
     |                ^ Error: page.goto: Test timeout of 30000ms exceeded.
  23 |     
  24 |     // Wait for the UI to load
  25 |     await expect(page.locator('.rb2-input').first()).toHaveValue(/Test.*User/);
  26 | 
  27 |     // 1. Test "✨ Enhance with AI" button on Experience
  28 |     // We mock the Gemini API to prevent actual API calls during CI, but we ensure the UI connects properly.
  29 |     await page.route('https://generativelanguage.googleapis.com/**', async route => {
  30 |       await route.fulfill({
  31 |         status: 200,
  32 |         contentType: 'application/json',
  33 |         body: JSON.stringify({
  34 |           candidates: [{ content: { parts: [{ text: '• AI Generated Bullet 1\n• AI Generated Bullet 2' }] } }]
  35 |         })
  36 |       });
  37 |     });
  38 | 
  39 |     // Expand Experience Section
  40 |     await page.click('text="Work Experience"');
  41 |     
  42 |     // Find the first experience item and click "✨ Enhance with AI"
  43 |     // The button might be nested, so we look for the text
  44 |     const enhanceBtn = page.locator('button:has-text("✨ Enhance with AI")').first();
  45 |     await expect(enhanceBtn).toBeVisible();
  46 |     await enhanceBtn.click();
  47 | 
  48 |     // Wait for AI to populate the textarea (it should replace the text with our mock)
  49 |     await expect(page.locator('textarea:has-text("AI Generated Bullet 1")').first()).toBeVisible({ timeout: 10000 });
  50 |   });
  51 | 
  52 | });
  53 | 
```