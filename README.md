# 🛒 বাজার দর (BazarDor)

**Daily essential-goods prices of Bangladesh, at a glance.**

BazarDor is a responsive price-tracking web app for everyday essentials such as rice, lentils, oil, vegetables, fish, meat, eggs, milk and spices. It shows today's price, the daily change, and a market-by-market price breakdown for each product, all in Bangla.

🔗 **Live demo:** [market-price-project.vercel.app](https://market-price-project.vercel.app)
📦 **Repository:** [github.com/mdSaifurRahman25/market-price](https://github.com/mdSaifurRahman25/market-price)

---

## ✨ Key Features

1. **Live price ticker:** an infinitely scrolling strip under the navbar shows each product's emoji, name, price per unit and the ▲/▼ change percentage.
2. **Risers and fallers:** the home page highlights the top 6 products whose price went up (▲) and the top 6 whose price went down (▼) today.
3. **Browse all products and categories:** a responsive grid lists every product, and each category (rice, lentils, oil, vegetables, fish, meat, eggs and milk, spices) has its own page with skeleton loading, an empty state and a sort control.
4. **Smart sorting with Bangla numerals:** sort by default, price low to high, or price high to low. Prices written in Bangla digits are converted to numbers first, so sorting is numeric, not alphabetical.
5. **Market-wise price details:** each product page shows the minimum, maximum and average price, plus today's price in different markets. This page is a **protected route**.
6. **Authentication with Better Auth:** email and password sign-up and sign-in, Google and GitHub social login, protected routes, and sign-out.
7. **Profile management:** a My Profile page lets a signed-in user update their name through Better Auth's update-user API.
8. **Polished UX:** toast notifications for every auth action, validation error and protected-route redirect, skeleton loaders while data loads, and a friendly 404 page with a button back to the home page.
9. **Fully responsive:** the layout, navbar, ticker, hero and card grid adapt to mobile, tablet and desktop screens.

---

## 🧰 Tech Stack

| Area | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com/) with DaisyUI |
| Authentication | [Better Auth](https://better-auth.com/) + MongoDB (email/password, Google, GitHub) |
| Notifications | [react-hot-toast](https://react-hot-toast.com/) |
| Data | BazarDor REST API (see below) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🗺️ Pages and Routes

| Route | Description | Access |
|---|---|---|
| `/` | Hero, price ticker, risers, fallers and all products | Public |
| `/category/[id]` | Products of one category, with sorting | Public |
| `/product/[id]` | Price summary and market-wise prices | **Protected** |
| `/signin` | Sign in with email, Google or GitHub | Public |
| `/signup` | Create a new account | Public |
| `/profile` | View account information | **Protected** |
| `/profile/update` | Update your name | **Protected** |
| `*` | Custom 404 page | Public |

---

## 🌐 API

Product and category data comes from the BazarDor API.

- Base URL: `https://openapi.programming-hero.com/api/bazardor`
- Alternatives: `https://api.api-store.workers.dev/api/bazardor`, `https://api.abcz.workers.dev/api/bazardor`

| Endpoint | Purpose |
|---|---|
| `GET /products` | All products |
| `GET /products?category=chal` | Products filtered by category |
| `GET /products/:id` | A single product |
| `GET /categories` | All categories |
| `GET /categories/:slug` | A single category |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or later
- npm (or pnpm / yarn)
- Google and GitHub OAuth apps (for social login)

### Installation

```bash
# 1. Clone the repository
git clone <your-repository-url>
cd <project-folder>

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the project root. Never commit this file.

```env
# Better Auth
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_URI=http://localhost:3000

# MongoDB Database
MONGODB_URI=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 home page
│   ├── loading.tsx              home loading skeleton
│   ├── not-found.tsx            custom 404 page
│   ├── category/[id]/           category pages with price sorting
│   ├── product/[id]/            product details (protected)
│   ├── signin/  signup/         authentication pages
│   ├── profile/                 profile and update form (protected)
│   └── api/auth/[...all]/       Better Auth handler
├── components/                  Header, Navbar, Marquee, Hero, ProductCard, Footer
└── lib/                         Better Auth server & client config
```

---

## 🔐 Authentication Flow

- **Sign up:** name, email and password. On success the user is sent to the sign-in page.
- **Sign in:** email and password, or Google / GitHub. On success the user is sent to the home page. Errors appear as toast messages.
- **Protected routes:** visiting a protected page while signed out redirects to the sign-in page with a toast message.
- Email verification and password reset are intentionally not included.

---

## ☁️ Deployment

The app is deployed on Vercel. Dynamic routes such as `/category/[slug]` and `/product/[slug]` work after a page reload. When deploying your own copy:

1. Import the repository into Vercel.
2. Add all environment variables from the section above.
3. Set `BETTER_AUTH_URL` to your live URL.
4. Add the live URL's callback address to your Google and GitHub OAuth apps.

---

## 🛣️ Possible Improvements

- Price history charts for each product
- Favourite products and price alerts
- Search and filter by market
- English language toggle

---

## 👤 Author

**Md Saifur Rahman**

- GitHub: <!-- UPDATE: your GitHub profile link -->
- LinkedIn: <!-- UPDATE: your LinkedIn profile link -->

---

<sub>All prices are indicative and may change depending on market conditions.</sub>
