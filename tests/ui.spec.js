import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { generateMockResume } from './fixtures/resumeGenerator.js';
import { mockAuth } from './fixtures/auth.js';

test.describe('UI & Accessibility Validation', () => {

  test('Should not have any automatically detectable accessibility violations', async ({ page }) => {
    const mockResume = generateMockResume('experienced');
    await page.route('**/rest/v1/resumes?*', async route => {
      const headers = route.request().headers();
      const isSingle = headers['accept'] && headers['accept'].includes('application/vnd.pgrst.object+json');
      const bodyObj = { id: 'test-a11y-id', title: 'Test A11y', sections: mockResume };
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(isSingle ? bodyObj : [bodyObj])
      });
    });

    await mockAuth(page);
    await page.goto('/resume/edit/test-a11y-id');
    await expect(page.locator('.rb2-input').first()).toHaveValue(/Test.*User/);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    // We expect 0 violations. If there are violations, the test will fail and print them.
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Should not have any console errors on render', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      // Ignore warnings, only catch actual errors
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const mockResume = generateMockResume('experienced');
    await page.route('**/rest/v1/resumes?*', async route => {
      const headers = route.request().headers();
      const isSingle = headers['accept'] && headers['accept'].includes('application/vnd.pgrst.object+json');
      const bodyObj = { id: 'test-ui-id', title: 'Test UI', sections: mockResume };
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(isSingle ? bodyObj : [bodyObj])
      });
    });

    await mockAuth(page);
    await page.goto('/resume/edit/test-ui-id');
    await expect(page.locator('.rb2-input').first()).toHaveValue(/Test.*User/);

    expect(consoleErrors.length).toBe(0);
  });

});
