/**
 * Centralized AdSense Route Exclusion
 * Routes where ads must NOT be shown (home, auth, paid subscriber areas).
 * All other routes are considered free and eligible for ads.
 */

export const EXCLUDED_ROUTES = [
  '/',               // Home page – ad free for everyone
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/dashboard',
  '/paid-modules',
  '/resume',
  '/cloud-lab',
];

// Helper to check if a pathname starts with any excluded prefix
const startsWithAny = (path, prefixes) => prefixes.some(p => path.startsWith(p));

// Determines if ads are allowed on the given pathname.
// Returns true for any route NOT in the exclusion list.
export const isApprovedFreeAdRoute = (pathname) => {
  if (!pathname) return false;

  // Normalize (remove trailing slash unless root)
  const normalized = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  // Exact match exclusion
  if (EXCLUDED_ROUTES.includes(normalized)) return false;

  // Prefix‑based exclusions (e.g., /paid-modules/*, /dashboard/*)
  const prefixExclusions = ['/paid-modules/', '/dashboard/', '/resume/', '/cloud-lab/'];
  if (startsWithAny(normalized, prefixExclusions)) return false;

  // All other routes are approved for ads
  return true;
};
