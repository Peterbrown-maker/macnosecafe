import { MENU, type MenuItem } from "@/data/macnose";

/** A menu item that can go in the cart: it has a stable id and a numeric price. */
export interface OrderableItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  sectionId: string;
  sectionName: string;
  kind: "food" | "drinks";
}

const slug = (s: string) =>
  s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Stable id for an item. Includes the group because a few names repeat inside a
 * section (e.g. "R&R" is both a dry red and a dry white).
 */
export const itemId = (sectionId: string, groupName: string | undefined, name: string) =>
  [sectionId, slug(groupName ?? "main"), slug(name)].join("/");

export const ORDERABLE = new Map<string, OrderableItem>();
for (const section of MENU) {
  for (const group of section.groups) {
    for (const item of group.items) {
      if (typeof item.price !== "number") continue; // e.g. "R35 each / R180": order with the waitron
      const id = itemId(section.id, group.name, item.name);
      ORDERABLE.set(id, {
        id,
        name: item.name,
        price: item.price,
        description: item.description,
        sectionId: section.id,
        sectionName: section.name,
        kind: section.kind,
      });
    }
  }
}

export const isOrderable = (item: MenuItem) => typeof item.price === "number";
