# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: debug2.spec.js >> Debug All Network
- Location: tests\debug2.spec.js:5:1

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
  5  | test('Debug All Network', async ({ page }) => {
  6  |   page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  7  |   page.on('request', req => console.log('REQ:', req.method(), req.url()));
  8  | 
  9  |   const mockResume = generateMockResume('experienced');
  10 | 
  11 |   await page.route('**/rest/v1/resumes?*', async route => {
  12 |     const headers = route.request().headers();
  13 |     const isSingle = headers['accept'] && headers['accept'].includes('application/vnd.pgrst.object+json');
  14 |     const bodyObj = { id: 'test-ai-id', title: 'Test', sections: mockResume };
  15 |     await route.fulfill({
  16 |       status: 200,
  17 |       contentType: 'application/json',
  18 |       body: JSON.stringify(isSingle ? bodyObj : [bodyObj])
  19 |     });
  20 |   });
  21 | 
  22 |   await mockAuth(page);
> 23 |   await page.goto('/resume/edit/test-ai-id');
     |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
  24 |   await page.waitForTimeout(5000);
  25 | });
  26 | 
```