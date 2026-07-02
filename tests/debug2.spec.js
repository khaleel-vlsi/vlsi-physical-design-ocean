import { test, expect } from '@playwright/test';
import { mockAuth } from './fixtures/auth.js';
import { generateMockResume } from './fixtures/resumeGenerator.js';

test('Debug All Network', async ({ page }) => {
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('request', req => console.log('REQ:', req.method(), req.url()));

  const mockResume = generateMockResume('experienced');

  await page.route('**/rest/v1/resumes?*', async route => {
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
  await page.waitForTimeout(5000);
});
