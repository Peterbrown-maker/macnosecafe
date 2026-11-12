# MacNose Cafe Website

The website for MacNose Cafe, a pub & restaurant in Short Left, Soshanguve (est. 2007): traditional Monday meals, grills, oxtail, seafood platters, oysters and a full bar. Built with Vite, React, TypeScript, Tailwind CSS and shadcn/ui.

## Run it

```sh
npm install
npm run dev
```

## Update the content

The full food and drinks menu with prices, opening hours, address, social links, specials posters, gallery and FAQs all live in `src/data/macnose.ts`. The page title and social preview text are in `index.html`. Photos and the logo are in `public/images/macnose/`.

## Online ordering (prototype)

The site has a full front-end ordering journey: add to cart from the menu, cart drawer, sign up / log in, checkout (collect or dine-in, ASAP or a scheduled time inside opening hours, kitchen notes, pay on collection or a demo card form), an order confirmation page with a status tracker, and an account page with order history and reorder.

There is **no backend**: accounts, the cart and orders are saved in the visitor's browser (`localStorage`), order progress is simulated, and no payment is taken. Passwords are only stored as SHA-256 hashes. The storage lives behind three providers in `src/context/` (`auth.tsx`, `cart.tsx`, `orders.tsx`), so a real backend can replace them later without touching the pages.

Tests for the journey and the opening-hours rules: `npm test`.

## Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md).
"# macnosecafe" 
