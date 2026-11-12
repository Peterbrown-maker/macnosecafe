// Opening hours as data the checkout can reason about (times in local time).
// Mon–Thu 10:00–22:00 · Fri–Sat 10:00–02:00 (next day) · Sun 10:00–23:00.
// Keep in sync with OPENING_HOURS in src/data/macnose.ts.

const OPEN_HOUR = 10;
/** Closing hour by weekday (0 = Sunday). Values past 24 run into the next day. */
const CLOSE_HOUR = [23, 22, 22, 22, 22, 26, 26];

/** Orders need this much time before closing. */
const LAST_ORDER_MINUTES = 30;
/** Earliest a scheduled order can be ready. */
const LEAD_MINUTES = 30;
const SLOT_MINUTES = 15;

function windowFor(day: Date) {
  const open = new Date(day);
  open.setHours(OPEN_HOUR, 0, 0, 0);
  const close = new Date(day);
  close.setHours(0, 0, 0, 0);
  close.setMinutes(CLOSE_HOUR[day.getDay()] * 60);
  return { open, close };
}

/** Business-day windows from yesterday (for after-midnight hours) to a few days ahead. */
function windows(now: Date, days = 3) {
  return Array.from({ length: days + 1 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() + i - 1);
    return windowFor(d);
  });
}

/** True when the kitchen is open and still taking orders. */
export function isTakingOrders(now = new Date()) {
  return windows(now).some(({ open, close }) => now >= open && now.getTime() <= close.getTime() - LAST_ORDER_MINUTES * 60_000);
}

/** Upcoming pickup / table times in 15-minute steps, inside opening hours. */
export function pickupSlots(now = new Date(), max = 24): Date[] {
  const earliest = now.getTime() + LEAD_MINUTES * 60_000;
  const slots: Date[] = [];
  for (const { open, close } of windows(now)) {
    const last = close.getTime() - LAST_ORDER_MINUTES * 60_000 + LEAD_MINUTES * 60_000 - SLOT_MINUTES * 60_000;
    for (let t = open.getTime() + LEAD_MINUTES * 60_000; t <= last && slots.length < max; t += SLOT_MINUTES * 60_000) {
      if (t >= earliest) slots.push(new Date(t));
    }
  }
  return slots;
}

export const formatSlot = (d: Date, now = new Date()) => {
  const time = d.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", hour12: false });
  const sameDay = d.toDateString() === now.toDateString();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (sameDay) return `Today, ${time}`;
  if (d.toDateString() === tomorrow.toDateString()) return `Tomorrow, ${time}`;
  return `${d.toLocaleDateString("en-ZA", { weekday: "long" })}, ${time}`;
};
