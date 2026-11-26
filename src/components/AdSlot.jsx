import React from 'react';
import AdUnit from './AdUnit';

/**
 * AdSlot renders an AdUnit unless the user is a paid subscriber.
 * It receives a `slot` identifier and a boolean `isPaidUser` prop.
 * When `isPaidUser` is true, no ad is rendered (returns null).
 * Non-numeric slot names (e.g. "top728") fall back to the default AdSense slot.
 */
const AdSlot = ({ slot, isPaidUser }) => {
  if (isPaidUser) return null;
  const slotId = /^\d+$/.test(String(slot || '')) ? slot : undefined;
  return <AdUnit slotId={slotId} />;
};

export default AdSlot;
