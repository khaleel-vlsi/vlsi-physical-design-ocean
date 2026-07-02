import { test, expect } from '@playwright/test';
import { mockAuth } from './fixtures/auth.js';
import { generateMockResume } from './fixtures/resumeGenerator.js';

test('Debug Resume Load', async ({ page }) => {
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('requestfailed', request => console.log('FAILED REQ:', request.url(), request.failure().errorText));

  const mockResume = generateMockResume('experienced');

  await page.route('**/rest/v1/resumes?*', async route => {
    console.log('Intercepted resumes request:', route.request().url());
    
    // Check if it's a single or list request based on Accept header
    const headers = route.request().headers();
    const isSingle = headers['accept'] && headers['accept'].includes('application/vnd.pgrst.object+json');
    
    const bodyObj = { id: 'test-ai-id', title: 'Test', sections: mockResume };
    
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(isSingle ? bodyObj : [bodyObj])
    });
  });

  await mockAuth(page);
  await page.goto('/resume/edit/test-ai-id');
  
  // wait a bit
  await page.waitForTimeout(5000);
  
  // check body
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('BODY TEXT EXTRACT:', bodyText.substring(0, 500));
});
