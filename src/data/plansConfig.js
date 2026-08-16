import { isIndependenceOfferActive, INDIA_OFFER_PRICES } from '../utils/independenceOffer.js';

export const basePlansConfig = {
  India: {
    title: "INDIA SUBSCRIPTION PLANS",
    flag: "🇮🇳",
    currency: 'INR',
    currencySymbol: '₹',
    gateway: 'razorpay',
    plans: [
      {
        id: 'PLAN_1M_INR',
        duration: '1 Month',
        basePrice: 499,
        originalPrice: 998,
        savings: '🎉 50% OFF',
        validityText: 'Valid for 30 Days',
        theme: 'iron',
        features: [
          'Full Premium Access',
          'All Recorded Classes',
          'All Features Included',
          'Future Updates'
        ]
      },
      {
        id: 'PLAN_2M_INR',
        duration: '2 Months',
        basePrice: 799,
        originalPrice: 1598,
        savings: '🎉 50% OFF',
        validityText: 'Valid for 60 Days',
        theme: 'copper',
        features: [
          'Full Premium Access',
          'All Recorded Classes',
          'All Features Included',
          'Future Updates'
        ]
      },
      {
        id: 'PLAN_3M_INR',
        duration: '3 Months',
        basePrice: 999,
        originalPrice: 1998,
        savings: '🎉 50% OFF',
        validityText: 'Valid for 90 Days',
        theme: 'silver',
        features: [
          'Full Premium Access',
          'All Recorded Classes',
          'All Features Included',
          'Future Updates'
        ]
      },
      {
        id: 'PLAN_6M_INR',
        duration: '6 Months',
        basePrice: 1499,
        originalPrice: 2998,
        savings: '🎉 50% OFF',
        validityText: 'Valid for 180 Days',
        theme: 'gold',
        features: [
          'Full Premium Access',
          'All Recorded Classes',
          'All Features Included',
          'Future Updates'
        ]
      },
      {
        id: 'PLAN_12M_INR',
        duration: '12 Months',
        basePrice: 1799,
        originalPrice: 3598,
        savings: '🎉 50% OFF',
        badge: '👑 BEST VALUE PLAN',
        validityText: 'Valid for 365 Days',
        theme: 'diamond',
        features: [
          'Complete Premium Access',
          'All Recorded Classes',
          'ICC2 Tool Execution',
          'Interview Preparation',
          'Job Finder',
          'Study Materials',
          'Future Updates'
        ]
      }
    ]
  },
  International: {
    title: "INTERNATIONAL SUBSCRIPTION PLANS",
    flag: "🌐",
    currency: 'USD',
    currencySymbol: '$',
    gateway: 'razorpay',
    plans: [
      {
        id: 'PLAN_6M_USD',
        duration: '6 Months',
        basePrice: 40,
        originalPrice: 80,
        savings: '🎉 LIMITED OFFER',
        badge: '🔥 SPECIAL LAUNCH OFFER',
        subBadge: '⏰ SPECIAL PROMO',
        validityText: 'Valid for 180 Days',
        theme: 'gold',
        features: [
          'Full Premium Access',
          'All Recorded Classes',
          'All Features Included',
          'Future Updates'
        ]
      },
      {
        id: 'PLAN_12M_USD',
        duration: '12 Months',
        basePrice: 60,
        originalPrice: 120,
        savings: '🎉 LIMITED OFFER',
        badge: '🔥 SPECIAL LAUNCH OFFER',
        subBadge: '⏰ SPECIAL PROMO',
        validityText: 'Valid for 365 Days',
        theme: 'diamond',
        features: [
          'Complete Premium Access',
          'All Recorded Classes',
          'ICC2 Tool Execution',
          'Interview Preparation',
          'Job Finder',
          'Study Materials',
          'Future Updates'
        ]
      }
    ]
  }
};

/**
 * Returns dynamic plansConfig based on current offer state.
 * During 14-16 Aug 2026 Independence Offer (56h campaign):
 * - 1M  -> ₹374 (Struck-through original: ₹499)
 * - 2M  -> ₹599 (Struck-through original: ₹799)
 * - 3M  -> ₹749 (Struck-through original: ₹999)
 * - 6M  -> ₹1124 (Struck-through original: ₹1499)
 * - 12M -> ₹1349 (Struck-through original: ₹1799)
 */
export const getDynamicPlansConfig = (customNow) => {
  const isOfferActive = isIndependenceOfferActive(customNow);

  const indiaPlans = basePlansConfig.India.plans.map((p) => {
    if (isOfferActive && INDIA_OFFER_PRICES[p.id]) {
      const offerData = INDIA_OFFER_PRICES[p.id];
      return {
        ...p,
        price: offerData.price,
        originalPrice: offerData.originalPrice,
        savings: offerData.savings,
        badge: p.badge ? `🇮🇳 ${p.badge}` : '🇮🇳 INDEPENDENCE DAY 25% OFF',
        subBadge: '⏰ 56H OFFER ENDS 16 AUG 8:00 PM IST',
      };
    }
    return {
      ...p,
      price: p.basePrice,
    };
  });

  const intlPlans = basePlansConfig.International.plans.map((p) => ({
    ...p,
    price: p.basePrice,
  }));

  return {
    India: {
      ...basePlansConfig.India,
      title: isOfferActive ? "🇮🇳 INDEPENDENCE DAY OFFER — 25% OFF PLANS" : basePlansConfig.India.title,
      plans: indiaPlans,
    },
    International: {
      ...basePlansConfig.International,
      plans: intlPlans,
    }
  };
};

// Export proxy getter object for existing imports using plansConfig['India']
export const plansConfig = new Proxy({}, {
  get(target, prop) {
    const config = getDynamicPlansConfig();
    return config[prop];
  }
});

export const getRegionKey = (country) => {
  return country === 'India' ? 'India' : 'International';
};
