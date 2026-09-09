# ✨ NovaMart — Modern Luxury E-Commerce Storefront

A modern, responsive, high-converting e-commerce web application built with **React 19**, **Vite**, **React Router v7**, **Lucide Icons**, and a custom-crafted luxury CSS design system.

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-emerald)

---

## 🌟 Key Highlights & Features

- **Luxury Design System**: Built with modern typography (`Plus Jakarta Sans` & `Playfair Display`), glassmorphism headers (`backdrop-filter: blur(16px)`), micro-interactions, and soft elevation tokens.
- **Dynamic Catalog Discovery**:
  - Horizontal category pills with instant filtering
  - Live search with instant debounce and clear button
  - Multi-criteria filtering (Department, Minimum Rating, Price Sort)
  - Active filter chips with 1-click reset
  - Grid View (4-column responsive) and List View toggle
- **Product Details Page**:
  - Interactive multi-image gallery with clickable thumbnail selector
  - Real-time stock urgency pills ("In Stock" or "Only X items left!")
  - Interactive quantity stepper
  - "Add to Bag", "Buy Now" (instant checkout), and Wishlist heart toggle
  - Collapsible specification accordions
  - "You May Also Like" related product recommendations
- **Cart & Checkout**:
  - Free Shipping Progress Meter (qualifies on orders > ₹5,000)
  - Interactive promo codes (`WELCOME10` for 10% off, `LUXURY20` for 20% off)
  - Multi-payment gateway simulation (Card, Instant UPI, Cash on Delivery)
  - 1-Click "Auto-fill Demo Details" helper for fast testing
- **Order Tracking & Dashboard**:
  - Celebratory order confirmation screen with order reference number (`#NM-XXXXXX`)
  - Estimated delivery timeline calculation
  - Persistent order history displayed in User Account Profile
- **Mobile Optimized**: Smooth slide-in mobile navigation drawer with responsive category links.
- **Global Toast Notification System**: Instant feedback for cart additions, wishlist updates, and applied coupons.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/satyadev3s/NovaMart.git
   cd NovaMart
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 📁 Project Architecture

```plaintext
ecommerce-app/
├── public/
├── src/
│   ├── components/
│   │   ├── CartItem.jsx          # Shopping bag item row
│   │   ├── EmptyState.jsx        # Illustrated empty state
│   │   ├── Footer.jsx            # Dark luxury footer with social & trust badges
│   │   ├── Loader.jsx            # Sleek CSS spinner loader
│   │   ├── Navbar.jsx            # Glassmorphic header & mobile navigation drawer
│   │   ├── ProductCard.jsx       # Modern e-commerce card with badges & hover zoom
│   │   ├── ProductGrid.jsx       # Grid / list view container
│   │   ├── QuantitySelector.jsx  # Stepper controls
│   │   ├── ScrollToTop.jsx       # Automatic route change scroll restoration
│   │   └── ToastContainer.jsx    # Floating notification snackbar
│   ├── context/
│   │   └── CartContext.jsx       # Cart, wishlist, coupon, orders & toast state
│   ├── data/
│   │   └── products.js           # Curated product catalog & departments
│   ├── hooks/
│   │   └── useProducts.js        # Data-fetching hook
│   ├── pages/
│   │   ├── About.jsx             # Brand storytelling & philosophy
│   │   ├── Auth.jsx              # Split-screen Login & Register with 1-click demo fill
│   │   ├── Cart.jsx              # Shopping bag with free shipping meter & coupons
│   │   ├── Checkout.jsx          # Multi-step checkout with address & payment cards
│   │   ├── Contact.jsx           # Concierge inquiry cards & responsive form
│   │   ├── Home.jsx              # Storefront index route
│   │   ├── Landing.jsx           # Split hero, social proof, category cards & newsletter
│   │   ├── NotFound.jsx          # Custom 404 page
│   │   ├── ProductDetails.jsx    # Gallery, accordions & related items
│   │   ├── Products.jsx          # Store catalog, live search & filter toolbar
│   │   ├── Profile.jsx           # Account dashboard & real order history
│   │   ├── Success.jsx           # Order confirmation & delivery timeline
│   │   └── Wishlist.jsx          # Saved items grid with Move to Bag action
│   ├── services/
│   │   └── api.js                # API abstraction layer
│   ├── utils/
│   │   └── currency.js           # INR currency formatter
│   ├── App.jsx                   # Route declarations & global providers
│   ├── index.css                 # Custom luxury design system & responsive styles
│   └── main.jsx                  # React application entry point
├── index.html                    # HTML5 shell, Google Fonts & meta tags
├── package.json
└── vite.config.js
```

---

## 🎨 Demo Credentials for Testing

- **1-Click Auto Fill**: On the `/login` page, click the **"1-Click Demo Fill"** button.
- **Test Email**: `alex.morgan@example.com`
- **Test Password**: `password123`
- **Sample Promo Codes**:
  - `WELCOME10` (10% discount)
  - `LUXURY20` (20% discount)

---

## 📄 License
This project is licensed under the MIT License.
