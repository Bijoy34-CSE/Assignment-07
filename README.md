# 🛒 BazarDor (বাজার দর)

BazarDor is a price tracking web app for everyday essentials in Bangladesh. It shows today's prices of rice, lentils, oil, vegetables, fish, meat, eggs & dairy, and spices, along with how much each price has gone up or down, and a market-by-market price comparison on every product page.

🔗 **Live Site:** [Add your Vercel link here]
📦 **GitHub Repository:** [https://github.com/Bijoy34-CSE/Assignment-07]

---

## ✨ Key Features

1. **Live Price Ticker:** An infinitely scrolling strip below the navbar shows each product's emoji, name, price per unit, and a ▲/▼ percentage change.
2. **Price Movers on the Home Page:** The top 6 products whose prices rose today and the top 6 whose prices fell are shown in separate sections, followed by the full product list.
3. **Category Pages with Sorting:** Every category has its own page. Products can be sorted by price (low to high or high to low). Sorting uses the numeric value, so it works correctly with Bengali numerals.
4. **Protected Product Details:** Product details are available only to logged-in users. The page shows the minimum, maximum, and average price, plus a table of prices across 12 markets grouped by division.
5. **Authentication with BetterAuth:** Sign up and sign in with email and password, or continue with Google or GitHub. Every action gives feedback through toast notifications.
6. **Profile Management:** Logged-in users can view their profile and update their name from a separate update page.
7. **Loading, Empty and Error States:** Skeleton loaders appear while data is loading, and invalid URLs show a friendly 404 page with a link back home.
8. **Fully Responsive:** The layout works on mobile, tablet, and desktop screens.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) (App Router) | UI, routing, and server-side data fetching |
| TypeScript | Type-safe code |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [DaisyUI](https://daisyui.com/) | UI components (buttons, inputs, select, skeleton, table) |
| [BetterAuth](https://better-auth.com/) | Authentication (email/password, Google, GitHub) |
| MongoDB Atlas | Storage for users and sessions |
| [react-hot-toast](https://react-hot-toast.com/) | Toast notifications |
| react-marquee-text | Price ticker |
| react-icons | Icons |

---

## 🌐 API

Product and category data comes from this API:

```
Base URL: https://api.api-store.workers.dev/api/bazardor

GET /products
GET /products/:id
GET /categories
GET /categories/:slug
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone <https://github.com/Bijoy34-CSE/Assignment-07>
cd <project-folder>

# 2. Install dependencies
npm install

# 3. Create a .env.local file (see below)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file in the project root with the following keys (see `.env.example`):

```
MONGODB_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

OAuth callback URLs:

- Google: `{BETTER_AUTH_URL}/api/auth/callback/google`
- GitHub: `{BETTER_AUTH_URL}/api/auth/callback/github`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/   # BetterAuth route handler
│   ├── category/[slug]/     # Category page
│   ├── product/[slug]/      # Product details (protected)
│   ├── profile/             # Profile and update pages (protected)
│   ├── signin/ signup/      # Auth pages
│   └── page.tsx             # Home page
├── components/              # Navbar, Ticker, ProductCard, forms, etc.
├── lib/                     # API helpers, auth config, formatters
└── proxy.ts                 # Protected route guard
```

---

## 🔒 Protected Routes

`/product/[slug]` and `/profile` cannot be opened without logging in. Visitors who are not logged in are redirected to the sign in page and see a toast message. After a successful login, the user is taken back to the page they originally wanted to open.

---

## 👨‍💻 Author

**Bijoy Kumar Paul**
