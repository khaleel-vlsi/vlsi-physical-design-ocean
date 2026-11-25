import { getDynamicPlansConfig } from '../src/data/plansConfig.js';
import { getDiwaliTimeRemaining, isDiwaliOfferActive } from '../src/utils/diwaliOffer.js';

const t = (iso) => new Date(iso).getTime();
let fail = 0;
const check = (name, cond) => { console.log((cond ? 'PASS ' : 'FAIL ') + name); if (!cond) fail++; };

const before = t('2026-11-01T10:59:59+05:30');
const during = t('2026-11-01T11:46:00+05:30');
const lastSec = t('2026-11-07T12:29:59+05:30');
const after = t('2026-11-07T12:30:00+05:30');

check('inactive before start', !isDiwaliOfferActive(before));
check('active now', isDiwaliOfferActive(during));
check('active last second', isDiwaliOfferActive(lastSec));
check('inactive at end', !isDiwaliOfferActive(after));

const exp = { PLAN_1M_INR: 324, PLAN_2M_INR: 519, PLAN_3M_INR: 649, PLAN_6M_INR: 974, PLAN_12M_INR: 1169 };
const cfg = getDynamicPlansConfig(during);
cfg.India.plans.forEach(p => check(`${p.id} = Rs${exp[p.id]}`, p.price === exp[p.id]));
check('USD 6M unchanged = 40', cfg.International.plans[0].price === 40);
check('USD 12M unchanged = 60', cfg.International.plans[1].price === 60);

const post = getDynamicPlansConfig(after);
check('after expiry 1M back to 499', post.India.plans[0].price === 499);
check('banner expired after end', getDiwaliTimeRemaining(after).expired);
console.log('countdown now:', getDiwaliTimeRemaining(during).formatted);
process.exit(fail ? 1 : 0);
