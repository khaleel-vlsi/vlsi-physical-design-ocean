import React from 'react';
import AdUnit from './AdUnit';

/**
 * AdSlot renders an AdUnit unless the user is a paid subscriber.
 * It receives a `slot` identifier and a boolean `isPaidUser` prop.
 * When `isPaidUser` is true, no ad is rendered (returns null).
 */
const AdSlot = ({ slot, isPaidUser }) => {
  if (isPaidUser) return null;
  return <AdUnit slotId={slot} />;
};

export default AdSlot;
