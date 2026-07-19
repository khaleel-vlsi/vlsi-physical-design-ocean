export const plansConfig = {
  India: {
    title: "INDIA SUBSCRIPTION PLANS",
    flag: "🇮🇳",
    currency: 'INR',
    currencySymbol: '₹',
    gateway: 'razorpay',
    plans: [
      {
        id: 'PLAN_1M_INR',
        duration: '6 Months',
        price: 499,
        originalPrice: 2994,
        savings: '🎉 LIMITED OFFER',
        badge: '🔥 SPECIAL LAUNCH OFFER',
        subBadge: '⏰ OFFER ENDS 20 JULY 11:59 PM',
        validityText: 'Valid for 180 Days',
        theme: 'gold',
        features: [
          'Full Premium Access',
          'All Recorded Classes',
          'All Features Included',
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
        id: 'PLAN_1M_INR',
        duration: '6 Months',
        price: 499,
        originalPrice: 2994,
        savings: '🎉 LIMITED OFFER',
        badge: '🔥 SPECIAL LAUNCH OFFER',
        subBadge: '⏰ OFFER ENDS TONIGHT 11:59 PM',
        validityText: 'Valid for 180 Days',
        theme: 'gold',
        features: [
          'Full Premium Access',
          'All Recorded Classes',
          'All Features Included',
          'Future Updates'
        ]
      }
    ]
  }
};

export const getRegionKey = (country) => {
  return country === 'India' ? 'India' : 'International';
};
