/**
 * Centralized Independence Day Offer Campaign Configuration (25% OFF)
 * 
 * START: 14 August 2026 at 10:06 AM IST (2026-08-14T10:06:00+05:30)
 * END:   16 August 2026 at 8:00 PM IST  (2026-08-16T20:00:00+05:30)
 * TOTAL DURATION: ~58 Hours
 */

export const OFFER_START_ISO = "2026-08-14T10:06:00+05:30";
export const OFFER_END_ISO = "2026-08-16T20:00:00+05:30";

export const OFFER_START_TIME = new Date(OFFER_START_ISO).getTime();
export const OFFER_END_TIME = new Date(OFFER_END_ISO).getTime();

/**
 * Checks if the Independence Day Offer is currently active.
 * @param {number} [customNow] Optional timestamp for testing
 * @returns {boolean}
 */
export const isIndependenceOfferActive = (customNow) => {
  const now = customNow || Date.now();
  return now >= OFFER_START_TIME && now < OFFER_END_TIME;
};

/**
 * Calculates remaining time for the 3 campaign states:
 * 1. BEFORE_OFFER: Countdown to START
 * 2. ACTIVE_OFFER: Countdown to END (16 Aug 8:00 PM IST)
 * 3. EXPIRED: Offer finished
 * 
 * @param {number} [customNow] Optional timestamp for testing
 * @returns {{ state: string, active: boolean, expired: boolean, notStarted: boolean, totalSeconds: number, hours: number, minutes: number, seconds: number, formatted: string, label: string }}
 */
export const getTimeRemaining = (customNow) => {
  const now = customNow || Date.now();

  if (now < OFFER_START_TIME) {
    const diff = OFFER_START_TIME - now;
    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const formatted = `${hours}h ${minutes < 10 ? '0' : ''}${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;

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

  if (now >= OFFER_END_TIME) {
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

  const diff = OFFER_END_TIME - now;
  const totalSeconds = Math.floor(diff / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const formatted = `${hours}h ${minutes < 10 ? '0' : ''}${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;

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
 * 25% OFF Independence Day Offer Price Mapping (India INR)
 */
export const INDIA_OFFER_PRICES = {
  PLAN_1M_INR: { price: 374, originalPrice: 499, savings: '🎉 25% OFF • 🇮🇳 INDEPENDENCE OFFER' },
  PLAN_2M_INR: { price: 599, originalPrice: 799, savings: '🎉 25% OFF • 🇮🇳 INDEPENDENCE OFFER' },
  PLAN_3M_INR: { price: 749, originalPrice: 999, savings: '🎉 25% OFF • 🇮🇳 INDEPENDENCE OFFER' },
  PLAN_6M_INR: { price: 1124, originalPrice: 1499, savings: '🎉 25% OFF • 🇮🇳 INDEPENDENCE OFFER' },
  PLAN_12M_INR: { price: 1349, originalPrice: 1799, savings: '🎉 25% OFF • 🇮🇳 INDEPENDENCE OFFER' },
};
