/**
 * Centralized AdSense Route Whitelist
 * Defines approved genuinely public/free educational content routes where ads are allowed.
 * 
 * STRICT EXCLUSIONS (ALWAYS RETURN FALSE):
 * - Homepage "/" (100% Ad-Free for everyone)
 * - Private / Paid Subscriber routes (/dashboard, /paid-modules/*, /resume/*, /cloud-lab/*)
 * - Authentication routes (/login, /register, /forgot-password, /reset-password)
 */

export const APPROVED_FREE_ROUTES = [
  '/modules',
  '/modules/1',
  '/modules/2',
  '/modules/3',
  '/modules/4',
  '/modules/5',
  '/modules/6',
  '/modules/7',
  '/interview',
  '/study-materials',
  '/pnr-execution',
  '/pnr-workshop',
  '/user-guides',
  '/reviews',
  '/about',
  '/contact',
  '/test-videos',
  '/test-video-playlist',
  '/test-quiz-modules',
  '/test-quiz-playlist',
  '/quiz-practice',
];

/**
 * Checks if a given pathname is an approved free content route.
 * @param {string} pathname 
 * @returns {boolean}
 */
export const isApprovedFreeAdRoute = (pathname) => {
  if (!pathname || pathname === '/') return false;

  // Normalize pathname (remove trailing slash if not root)
  const normalized = pathname.length > 1 && pathname.endsWith('/') 
    ? pathname.slice(0, -1) 
    : pathname;

  // Exact match check
  if (APPROVED_FREE_ROUTES.includes(normalized)) {
    return true;
  }

  // Prefix match check for dynamic sub-routes like /test-video-playlist/1 or /test-quiz-playlist/2
  const prefixRoutes = ['/test-video-playlist/', '/test-quiz-playlist/', '/modules/'];
  for (const prefix of prefixRoutes) {
    if (normalized.startsWith(prefix)) {
      // For /modules/:id, only allow preview modules 1-7
      if (prefix === '/modules/') {
        const idStr = normalized.replace('/modules/', '');
        const id = parseInt(idStr, 10);
        return !isNaN(id) && id >= 1 && id <= 7;
      }
      return true;
    }
  }

  return false;
};
