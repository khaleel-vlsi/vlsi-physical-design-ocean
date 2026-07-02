import { test, expect } from '@playwright/test';
import { generateMockResume } from './fixtures/resumeGenerator.js';
import { mockAuth } from './fixtures/auth.js';

test.describe('Export Functionality Tests', () => {

  test('Should export JSON, TXT, and DOCX without errors', async ({ page }) => {
    const mockResume = generateMockResume('experienced');
    
    // Inject mock data
    await page.route('**/rest/v1/resumes?*', async route => {
      const headers = route.request().headers();
      const isSingle = headers['accept'] && headers['accept'].includes('application/vnd.pgrst.object+json');
      const bodyObj = { id: 'test-export-id', title: 'Test Export Resume', sections: mockResume };
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(isSingle ? bodyObj : [bodyObj])
      });
    });

    await mockAuth(page);
    await page.goto('/resume/edit/test-export-id');
    
    // Wait for load
    await expect(page.locator('.rb2-input').first()).toHaveValue(/Test.*User/);

    // Test JSON Export
    const jsonPromise = page.waitForEvent('download');
    await page.click('text="Export As ▼"');
    await page.click('text="💾 JSON Backup"');
    const jsonDownload = await jsonPromise;
    expect(jsonDownload.suggestedFilename()).toContain('.json');

    // Test TXT Export
    const txtPromise = page.waitForEvent('download');
    await page.click('text="Export As ▼"');
    await page.click('text="📋 Plain Text"');
    const txtDownload = await txtPromise;
    expect(txtDownload.suggestedFilename()).toContain('.txt');

    // Test DOCX Export
    const docxPromise = page.waitForEvent('download');
    await page.click('text="Export As ▼"');
    await page.click('text="📝 Word (DOCX)"');
    const docxDownload = await docxPromise;
    expect(docxDownload.suggestedFilename()).toContain('.docx');
  });

});
