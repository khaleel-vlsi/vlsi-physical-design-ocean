# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: debug.spec.js >> Debug Resume Load
- Location: tests\debug.spec.js:5:1

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
  2  | import { mockAuth } from './fixtures/auth.js';
  3  | import { generateMockResume } from './fixtures/resumeGenerator.js';
  4  | 
  5  | test('Debug Resume Load', async ({ page }) => {
  6  |   page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  7  |   page.on('requestfailed', request => console.log('FAILED REQ:', request.url(), request.failure().errorText));
  8  | 
  9  |   const mockResume = generateMockResume('experienced');
  10 | 
  11 |   await page.route('**/rest/v1/resumes?*', async route => {
  12 |     console.log('Intercepted resumes request:', route.request().url());
  13 |     
  14 |     // Check if it's a single or list request based on Accept header
  15 |     const headers = route.request().headers();
  16 |     const isSingle = headers['accept'] && headers['accept'].includes('application/vnd.pgrst.object+json');
  17 |     
  18 |     const bodyObj = { id: 'test-ai-id', title: 'Test', sections: mockResume };
  19 |     
  20 |     await route.fulfill({
  21 |       status: 200,
  22 |       contentType: 'application/json',
  23 |       body: JSON.stringify(isSingle ? bodyObj : [bodyObj])
  24 |     });
  25 |   });
  26 | 
  27 |   await mockAuth(page);
> 28 |   await page.goto('/resume/edit/test-ai-id');
     |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
  29 |   
  30 |   // wait a bit
  31 |   await page.waitForTimeout(5000);
  32 |   
  33 |   // check body
  34 |   const bodyText = await page.evaluate(() => document.body.innerText);
  35 |   console.log('BODY TEXT EXTRACT:', bodyText.substring(0, 500));
  36 | });
  37 | 
```