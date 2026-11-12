// Prototype persistence: everything the ordering flow saves lives in the
// visitor's browser. Storage can be blocked (private mode, disabled cookies),
// so every access is wrapped and the app keeps working in memory without it.

const PREFIX = "macnose:";

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function save<T>(key: string, value: T) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Storage unavailable: state still lives in memory for this visit.
  }
}

export function remove(key: string) {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    // ignore
  }
}

/** SHA-256 hex digest, so the prototype never keeps plain-text passwords. */
export async function sha256(text: string) {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}

export const newId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
