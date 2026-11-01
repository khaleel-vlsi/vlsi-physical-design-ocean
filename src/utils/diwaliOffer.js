/**
 * Centralized Diwali Offer Campaign Configuration (35% OFF)
 *
 * START: 1 November 2026 at 11:00 AM IST (2026-11-01T11:00:00+05:30)
 * END:   7 November 2026 at 12:30 PM IST (2026-11-07T12:30:00+05:30)
 * TOTAL DURATION: ~6 days 1.5 hours
 */

export const DIWALI_OFFER_START_ISO = "2026-11-01T11:00:00+05:30";
export const DIWALI_OFFER_END_ISO   = "2026-11-07T12:30:00+05:30";

export const DIWALI_OFFER_START_TIME = new Date(DIWALI_OFFER_START_ISO).getTime();
export const DIWALI_OFFER_END_TIME   = new Date(DIWALI_OFFER_END_ISO).getTime();

const pad = (n) => (n < 10 ? `0${n}` : `${n}`);

/** Formats seconds as "6d 01h 05m 09s" (days omitted when zero). */
export const formatCountdown = (totalSeconds) => {
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return days > 0
    ? `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`
    : `${hours}h ${pad(minutes)}m ${pad(seconds)}s`;
};

/**
 * Checks if the Diwali Offer is currently active.
 * @param {number} [customNow] Optional timestamp for testing
 * @returns {boolean}
 */
export const isDiwaliOfferActive = (customNow) => {
  const now = customNow || Date.now();
  return now >= DIWALI_OFFER_START_TIME && now < DIWALI_OFFER_END_TIME;
};

/**
 * Calculates remaining time for 3 campaign states:
 * 1. BEFORE_OFFER: Countdown to START
 * 2. ACTIVE_OFFER: Countdown to END (7 Nov 12:30 PM IST)
 * 3. EXPIRED: Offer finished
 *
 * @param {number} [customNow] Optional timestamp for testing
 * @returns {{ state: string, active: boolean, expired: boolean, notStarted: boolean, totalSeconds: number, hours: number, minutes: number, seconds: number, formatted: string, label: string }}
 */
export const getDiwaliTimeRemaining = (customNow) => {
  const now = customNow || Date.now();

  if (now < DIWALI_OFFER_START_TIME) {
    const diff = DIWALI_OFFER_START_TIME - now;
    const totalSeconds = Math.floor(diff / 1000);
    const hours   = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const formatted = formatCountdown(totalSeconds);

    return {
      state: 'BEFORE_OFFER',
      active: false,
      expired: false,
      notStarted: true,
      totalSeconds,
      hours,
      minutes,
      seconds,
      formatted,
      label: 'STARTS IN:',
    };
  }

  if (now >= DIWALI_OFFER_END_TIME) {
    return {
      state: 'EXPIRED',
      active: false,
      expired: true,
      notStarted: false,
      totalSeconds: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      formatted: 'Offer Expired',
      label: 'EXPIRED',
    };
  }

  const diff = DIWALI_OFFER_END_TIME - now;
  const totalSeconds = Math.floor(diff / 1000);
  const hours   = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const formatted = formatCountdown(totalSeconds);

  return {
    state: 'ACTIVE_OFFER',
    active: true,
    expired: false,
    notStarted: false,
    totalSeconds,
    hours,
    minutes,
    seconds,
    formatted,
    label: 'ENDS IN:',
  };
};

/**
 * 35% OFF Diwali Offer Price Mapping (India INR)
 * Base prices × 0.65, rounded to nearest ₹1
 *   499  × 0.65 = 324
 *   799  × 0.65 = 519
 *   999  × 0.65 = 649
 *  1499  × 0.65 = 974
 *  1799  × 0.65 = 1169
 */
export const INDIA_DIWALI_PRICES = {
  PLAN_1M_INR:  { price: 324,  originalPrice: 499,  savings: '🎉 35% OFF • 🪔 DIWALI OFFER' },
  PLAN_2M_INR:  { price: 519,  originalPrice: 799,  savings: '🎉 35% OFF • 🪔 DIWALI OFFER' },
  PLAN_3M_INR:  { price: 649,  originalPrice: 999,  savings: '🎉 35% OFF • 🪔 DIWALI OFFER' },
  PLAN_6M_INR:  { price: 974,  originalPrice: 1499, savings: '🎉 35% OFF • 🪔 DIWALI OFFER' },
  PLAN_12M_INR: { price: 1169, originalPrice: 1799, savings: '🎉 35% OFF • 🪔 DIWALI OFFER' },
};
