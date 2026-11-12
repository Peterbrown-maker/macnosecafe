import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom lacks a few browser APIs the site uses (framer-motion's whileInView,
// Radix's Sheet, smooth scrolling and Web Crypto for password hashing).
class MockObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.assign(window, { IntersectionObserver: MockObserver, ResizeObserver: MockObserver });
Element.prototype.scrollIntoView = () => {};
window.scrollTo = () => {};

import { webcrypto } from "node:crypto";
if (!globalThis.crypto?.subtle) {
  Object.defineProperty(globalThis, "crypto", { value: webcrypto, configurable: true });
}
