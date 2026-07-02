import { test, expect } from '@playwright/test';
import { generateMockResume } from './fixtures/resumeGenerator.js';
import { mockAuth } from './fixtures/auth.js';

test.describe('Extreme Resume Builder Stress Test', () => {
  
  test('Should handle 20 projects, 10 jobs, and generate 5-page PDF without crashing', async ({ page }) => {
    // 1. Load the mock data
    const extremeResume = generateMockResume('extreme');
    
    // 2. Mock the Supabase API to inject the resume data directly 
    // (since we don't want to rely on the actual network or DB for the pure UI stress test)
    await page.route('**/rest/v1/resumes?*', async route => {
      const headers = route.request().headers();
      const isSingle = headers['accept'] && headers['accept'].includes('application/vnd.pgrst.object+json');
      const bodyObj = { id: 'test-extreme-id', title: 'Test Extreme Resume', sections: extremeResume };
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(isSingle ? bodyObj : [bodyObj])
      });
    });

    // 3. Navigate to the editor
    await mockAuth(page);
    await page.goto('/resume/edit/test-extreme-id');

    // 4. Verify the editor loaded the massive payload without crashing
    await expect(page.locator('.rb2-input').first()).toHaveValue(/Test.*User/);
    
    // 5. Take a screenshot of the deeply populated form
    await page.screenshot({ path: 'test-results/screenshots/extreme-form.png', fullPage: true });

    // 6. Test PDF Export
    // Wait for the preview to render (debounce is 600ms, plus pdf-lib generation time)
    // We expect the preview to exist
    const previewLocator = page.locator('[title="Resume Preview"]');
    await expect(previewLocator).toBeVisible({ timeout: 15000 });

    // 7. Click "Export As PDF"
    // Wait for any download event
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
    
    // Open Export Menu
    await page.click('text="Export As ▼"');
    
    // Click PDF Export
    await page.click('text="📄 PDF Document"');
    
    const download = await downloadPromise;
    
    // 8. Save the PDF artifact
    await download.saveAs('test-results/pdfs/extreme-resume.pdf');
    
    // 9. Basic verification that the download succeeded
    expect(download.suggestedFilename()).toContain('.pdf');
  });

});
