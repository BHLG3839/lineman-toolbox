# Lineman Tool Box — Printful Shop Setup

## 1. Environment variables (Vercel)
In the **lineman-toolbox** project → Settings → Environment Variables:

```
PRINTFUL_API_KEY=your_token_here
```

(Add Stripe keys later if you want real checkout.)

## 2. Printful product
- Create the Bella+Canvas 3001 Unisex Tee
- Colors: Black, Dark Grey, Olive, Navy, Yellow
- Upload front logo + back design
- Note the `sync_variant_id` values for each size/color (from the API or dashboard)

## 3. Drop these files into your project
```
app/
  api/
    printful/
      products/route.ts   ← fetches products
      orders/route.ts     ← creates orders
  shop/
    page.tsx              ← shop page
```

Also copy your mockup image into `public/lineman-toolbox-mockup.jpg`.

## 4. Next steps for real checkout
1. Add Stripe (recommended):
   - Create a Checkout Session API route
   - On success webhook, call the Printful orders endpoint with the real `sync_variant_id`
2. Map the color + size selectors to the correct Printful variant IDs.
3. Add a simple cart or direct buy button.

## Quick test
After deploying:
- Visit `/shop`
- The page will try to load products from your Printful store
- Order creation endpoint is ready once you have recipient + items data

Need the Stripe checkout route or variant ID mapper next? Just say the word.
