export async function mockAuth(page) {
  await page.addInitScript(() => {
    window.localStorage.setItem('sb-ygcvcyoynmyrplwrpisd-auth-token', JSON.stringify({
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      refresh_token: 'dummy-refresh-token',
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      token_type: 'bearer',
      user: { 
        id: 'test-user', 
        aud: 'authenticated',
        role: 'authenticated',
        email: 'test@example.com', 
        user_metadata: { full_name: 'Test experienced User', last_session_id: 'test-session-123' } 
      }
    }));
    window.localStorage.setItem('active_session_id', 'test-session-123');
  });

  // Mock the profile endpoint so hasPremiumAccess is true
  await page.route('**/rest/v1/profiles*', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        email: 'test@example.com',
        full_name: 'Test experienced User',
        course_active: true,
        placement_active: true,
        mock_remaining: 10
      })
    });
  });

  // Mock the user endpoint
  await page.route('https://ygcvcyoynmyrplwrpisd.supabase.co/auth/v1/**', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 'test-user',
        email: 'test@example.com',
        user_metadata: { last_session_id: 'test-session-123' }
      })
    });
  });
}
