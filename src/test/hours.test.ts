import { describe, expect, it } from "vitest";
import { isTakingOrders, pickupSlots } from "@/lib/hours";

// November 2026: the 9th is a Monday.
const at = (day: number, h: number, m = 0) => new Date(2026, 10, day, h, m);

describe("opening hours", () => {
  it("takes orders during the day", () => {
    expect(isTakingOrders(at(11, 12))).toBe(true); // Wednesday lunch
  });

  it("stops taking orders 30 minutes before closing", () => {
    expect(isTakingOrders(at(9, 21, 29))).toBe(true); // Monday, closes 22:00
    expect(isTakingOrders(at(9, 21, 31))).toBe(false);
  });

  it("is closed before 10:00", () => {
    expect(isTakingOrders(at(11, 9, 30))).toBe(false);
  });

  it("stays open after midnight on Friday and Saturday nights", () => {
    expect(isTakingOrders(at(14, 1, 0))).toBe(true); // Saturday 01:00 (Friday night)
    expect(isTakingOrders(at(15, 1, 0))).toBe(true); // Sunday 01:00 (Saturday night)
    expect(isTakingOrders(at(14, 1, 45))).toBe(false); // past last orders at 01:30
    expect(isTakingOrders(at(10, 1, 0))).toBe(false); // Tuesday 01:00 is closed
  });

  it("offers the next morning's slots when closed", () => {
    const slots = pickupSlots(at(9, 23)); // Monday 23:00
    expect(slots[0]).toEqual(at(10, 10, 30)); // Tuesday 10:30
    expect(slots.every((s) => s > at(9, 23))).toBe(true);
  });

  it("offers slots at least 30 minutes ahead, in 15-minute steps, before closing", () => {
    const slots = pickupSlots(at(11, 21, 0), 50); // Wednesday 21:00, closes 22:00
    expect(slots[0]).toEqual(at(11, 21, 30));
    expect(slots[1]).toEqual(at(11, 21, 45));
    expect(slots[2]).toEqual(at(12, 10, 30)); // then Thursday morning
  });
});
