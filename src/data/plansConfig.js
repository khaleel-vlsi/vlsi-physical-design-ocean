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
        duration: '1 Month',
        price: 499,
        originalPrice: 998,
        savings: '🎉 50% OFF',
        validityText: 'Valid for 30 Days',
        theme: 'silver',
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
        price: 799,
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
        price: 999,
        originalPrice: 1998,
        savings: '🎉 50% OFF',
        validityText: 'Valid for 90 Days',
        theme: 'gold',
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
        price: 1499,
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
        price: 1799,
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
        price: 40,
        originalPrice: 80,
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
      },
      {
        id: 'PLAN_12M_USD',
        duration: '12 Months',
        price: 60,
        originalPrice: 120,
        savings: '🎉 LIMITED OFFER',
        badge: '🔥 SPECIAL LAUNCH OFFER',
        subBadge: '⏰ OFFER ENDS 20 JULY 11:59 PM',
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

export const getRegionKey = (country) => {
  return country === 'India' ? 'India' : 'International';
};
