# Pinta Digital website

A one-page static site built with Next.js (static export), three.js for the background and Motion (Framer Motion) for animation. No server, no database, no CMS.

## Editing content

Every word, price, FAQ answer and contact detail lives in [`content/site.ts`](content/site.ts). Edit it (GitHub's web editor works fine), commit to `main`, and the site redeploys on its own.

The social preview image is [`app/opengraph-image.png`](app/opengraph-image.png) (1200 × 630). Replace the file to change it.

## Contact form (Web3Forms)

The form sends submissions to an email inbox through [Web3Forms](https://web3forms.com). It is free for about 250 submissions a month.

1. Go to web3forms.com and create an access key with the email address that should receive enquiries.
2. Paste the key into `web3formsAccessKey` in `content/site.ts`.

The key is public by design, so committing it is fine. Until a key is set, the form tells visitors to email `site.email` instead of pretending to send.

Spam protection uses hCaptcha through Web3Forms' free shared site key (`hcaptchaSiteKey` in `content/site.ts`), plus a hidden honeypot field. In the Web3Forms dashboard, open the form's settings and turn on hCaptcha so submissions without a solved check are rejected. Google reCAPTCHA is a paid Web3Forms Pro feature.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
npm run lint
```

Requires Node.js 20.9 or newer.

## Deploying

### GitHub Pages (current)

1. In the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Push to `main`. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and publishes the site.

The workflow sets `PAGES_BASE_PATH` so the site works under `https://<user>.github.io/<repo>/`, and `NEXT_PUBLIC_SITE_URL` for canonical URLs, the sitemap and social previews.

### Cloudflare (later)

Either connect the repo in the Cloudflare dashboard (**Workers & Pages → Create → Import a repository**, build command `npm run build`, deploy command `npx wrangler deploy`), or deploy from a terminal:

```bash
npx wrangler login
npm run deploy
```

[`wrangler.jsonc`](wrangler.jsonc) serves the `out` folder as static assets, which is free on Cloudflare. On Cloudflare the site lives at the domain root, so leave `PAGES_BASE_PATH` unset. Set `NEXT_PUBLIC_SITE_URL` to the real domain (for example `https://pintadigital.com`) as a build variable, and update the `url` default in `content/site.ts`.

When a custom domain is ready, add it under the Worker's **Settings → Domains & Routes**.

## Project layout

- `content/site.ts`: all copy and settings
- `app/`: page, privacy page, layout, metadata, icon, robots and sitemap
- `components/DriftBackground.tsx`: the three.js background (loaded after the page, lighter on phones, still for visitors who prefer reduced motion)
- `components/Motion.tsx`: reveal, magnetic button and count-up helpers built on `motion/react`
- `components/ContactForm.tsx`: the Web3Forms form
