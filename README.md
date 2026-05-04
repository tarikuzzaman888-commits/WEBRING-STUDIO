# WEBRING — AI Product Photography & Brand Visual Studio

> **"We Don't Just Edit. We Engineer Reality."**

A premium, production-ready agency website for WEBRING — an AI-powered e-commerce product photography & branding studio based in Bangladesh, serving clients worldwide.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square)
![Sanity](https://img.shields.io/badge/Sanity-v3-red?style=flat-square)

---

## Tech Stack

| Category       | Technology                              |
|----------------|----------------------------------------|
| Framework      | Next.js 14 (App Router, TypeScript)    |
| Styling        | Tailwind CSS (dark mode: class)        |
| CMS            | Sanity v3 (headless, embedded studio)  |
| Animations     | Framer Motion                          |
| Forms          | react-hook-form + Zod                  |
| Email          | Resend                                 |
| Icons          | Lucide React                           |
| Carousel       | Embla Carousel                         |
| Toasts         | Sonner                                 |
| Theme          | next-themes (dark/light/system)        |

---

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Create a Sanity Account

1. Go to [sanity.io](https://www.sanity.io) and create a free account
2. Create a new project or use an existing one
3. Note your **Project ID** from the Sanity dashboard

### 3. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Fill in the values:

| Variable                         | Where to Get It                                   |
|----------------------------------|--------------------------------------------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID`  | Sanity Dashboard → Project Settings              |
| `NEXT_PUBLIC_SANITY_DATASET`     | Usually `production`                              |
| `SANITY_API_TOKEN`               | Sanity Dashboard → API → Add Token (Editor role) |
| `RESEND_API_KEY`                 | [resend.com](https://resend.com) → API Keys      |
| `CONTACT_EMAIL`                  | Your team email                                   |
| `NEXT_PUBLIC_SITE_URL`           | Your deployed URL                                 |

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/studio](http://localhost:3000/studio) for Sanity Studio.

---

## Sanity Studio Usage Guide

Access the content management studio at `/studio`.

### Content Setup (Recommended Order)

1. **Site Settings** (📋 Content → Site Settings)
   - Set company name, email, location
   - Upload logo (light + dark versions)
   - Add social media URLs
   - Add client brand logos

2. **Home Page** (📋 Content → Home Page)
   - Set hero text, subtitle, CTAs
   - Upload hero images (max 6)
   - Set marquee text
   - Configure stats (200+ Brands, 5000+ Images, etc.)
   - Set CTA banner text

3. **Team Members** (👥 Team)
   - Add 3 team members with photos, roles, responsibilities

4. **Services** (🛠️ Services)
   - Add 5 services with descriptions, features, icons, pricing

5. **Portfolio** (🖼️ Portfolio)
   - Add projects with images, categories, tags
   - Mark featured items for homepage display
   - Add before/after images for comparison slider

6. **Pricing** (💰 Pricing)
   - Set up 3 tiers: Starter, Growth, Enterprise
   - Set highlighted=true for the "Popular" tier
   - Set price=0 for custom pricing display

7. **Testimonials** (⭐ Testimonials)
   - Add client testimonials with ratings
   - Mark as featured for homepage display

8. **Available Dates** (📋 Content → Available Dates)
   - Add dates when team is available for calls
   - Set available time slots

9. **Bookings** (📬 Bookings)
   - View all submitted bookings (read-only)
   - Update booking status: pending → confirmed → completed

---

## Deployment (Vercel)

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → Import Project
2. Select your GitHub repository
3. Add all environment variables from `.env.local`
4. Click **Deploy**

### 3. Add CORS Origins

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project → API → CORS Origins
3. Add your Vercel URL: `https://your-app.vercel.app`
4. Check "Allow credentials"

### 4. Deploy Sanity Studio

```bash
npx sanity deploy
```

Choose a hostname (e.g., `webring`). Your studio will be available at `webring.sanity.studio`.

---

## Features

- ✅ Dual theme (dark/light) with OS auto-detect
- ✅ Custom gold cursor on desktop
- ✅ Loading screen on first visit
- ✅ Grain texture overlay
- ✅ Live GMT+6 clock in navbar
- ✅ 5-step booking wizard with calendar
- ✅ Before/After image comparison slider
- ✅ Animated stats counters
- ✅ Infinite marquee strips
- ✅ Testimonial carousel
- ✅ Portfolio with category filters
- ✅ Rate-limited API routes
- ✅ ISR with 1-hour revalidation
- ✅ Full Sanity CMS integration
- ✅ Email notifications via Resend
- ✅ Mobile responsive (375px → 1440px)
- ✅ SEO optimized with metadata

---

## Team

| Name                  | Role                | Responsibilities                           |
|-----------------------|--------------------|--------------------------------------------|
| Shiekh Mariful        | CEO                | Creative Final Decision Maker, Consultation |
| Many                  | Co-Founder         | Lead Generation, Consultation              |
| Tarikuzzaman Sabbir   | HR & Manager       | Creative Initial Decision Maker, Editor    |

---

## License

© 2024 WEBRING. All rights reserved.
