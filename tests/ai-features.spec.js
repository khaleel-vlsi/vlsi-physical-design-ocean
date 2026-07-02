import { test, expect } from '@playwright/test';
import { generateMockResume } from './fixtures/resumeGenerator.js';
import { mockAuth } from './fixtures/auth.js';

test.describe('AI Features Validation', () => {

  test('Should validate AI Generation buttons are not placeholders', async ({ page }) => {
    const mockResume = generateMockResume('experienced');

    await page.route('**/rest/v1/resumes?*', async route => {
      const headers = route.request().headers();
      const isSingle = headers['accept'] && headers['accept'].includes('application/vnd.pgrst.object+json');
      const bodyObj = { id: 'test-ai-id', title: 'Test Resume', sections: mockResume };
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(isSingle ? bodyObj : [bodyObj])
      });
    });

    await mockAuth(page);
    await page.goto('/resume/edit/test-ai-id');
    
    // Wait for the UI to load
    await expect(page.locator('.rb2-input').first()).toHaveValue(/Test.*User/);

    // 1. Test "✨ Enhance with AI" button on Experience
    // We mock the Gemini API to prevent actual API calls during CI, but we ensure the UI connects properly.
    await page.route('https://generativelanguage.googleapis.com/**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          candidates: [{ content: { parts: [{ text: '• AI Generated Bullet 1\n• AI Generated Bullet 2' }] } }]
        })
      });
    });

    // Expand Experience Section
    await page.click('text="Work Experience"');
    
    // Find the first experience item and click "✨ Enhance with AI"
    // The button might be nested, so we look for the text
    const enhanceBtn = page.locator('button:has-text("✨ Enhance with AI")').first();
    await expect(enhanceBtn).toBeVisible();
    await enhanceBtn.click();

    // Wait for AI to populate the textarea (it should replace the text with our mock)
    await expect(page.locator('textarea:has-text("AI Generated Bullet 1")').first()).toBeVisible({ timeout: 10000 });
  });

});
