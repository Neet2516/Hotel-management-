# RoamReserve — Curated Architectural Stay Explorer

RoamReserve is an ultra-premium, design-led editorial hotel stay catalog built with **React 19**, **Vite**, and styled with **Tailwind CSS**. It is inspired by Swiss minimalism, high-end editorial magazines, and design aesthetics from COS, Aman Resorts, and Leica.

The application connects directly to the PythonAnywhere Hotels API to provide an understated, seamless stay exploration interface.

**Live Demo**: [hotel-management-theta-red.vercel.app](https://hotel-management-theta-red.vercel.app/)

---

## 🖤 Design Philosophy
- **Minimalist Palette**: Strictly black, white, and grayscale (`#000000`, `#111111`, `#1C1C1C`, `#F5F5F5`, `#FFFFFF`). No gradients or decorative neons.
- **Contrast & Silence**: Generous margins, clean whitespace, and sharp corners (`rounded-sm` / `rounded-lg`).
- **Swiss Typography**: Clean Sans-serif body copy (**Inter**) paired with elegant, light Serif headlines (**Cormorant Garamond**).
- **Interactive Grayscale**: All images (hero, destinations, hotel lists, and galleries) are rendered in high-contrast black-and-white, smoothly transitioning to full color only when hovered.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite (JavaScript)
- **Styling**: Tailwind CSS (CSS-first architecture)
- **Transitions**: Framer Motion
- **Icons**: Lucide React + React Icons (social indicators)
- **Toasts**: React Hot Toast (monochrome global config)
- **Routing**: React Router DOM (lazy loaded routes)
- **HTTP Client**: Axios

---

## 🔍 Features
1. **Asymmetrical Split Hero**: Bold uppercase labels, large italic headlines, and outline CTA buttons paired with a full-height Leica-style resort cover.
2. **Pinterest Masonry Grid**: A staggered, multi-column Masonry board layout displaying featured destinations with dynamic aspect ratios (`aspect-[3/4]`, `aspect-[4/3]`, `aspect-[1/1]`, and `aspect-[4/5]`).
3. **Alternating Index Listings**: The main hotel directory renders as alternating rows (image-left/text-right, then image-right/text-left), creating a layout that feels like reading a premium travel monograph.
4. **Interactive Filters**: Instant side-bar queries (price limits, city checks, and guest rating thresholds) that adapt to a slide-out drawer on mobile screens.
5. **Private Wishlist**: Context-driven favorites diary synced with `localStorage` and configured with global monochrome toast animations.
6. **Smooth Hash Scroll**: The header `Explore` action triggers a smooth transition directly to the coordinates query board.
7. **Details Showcase**: Complete detail pages with thumbnail-driven image galleries, verified stay badges, custom copy coordinates triggers, and booking requests.

---

## 📁 Codebase Directory Map

```
src/
├── assets/          # Static elements and icons
├── components/      # Reusable editorial components
│   ├── FeaturedDestinations.jsx  # Staggered Pinterest grid
│   ├── FilterSidebar.jsx         # Regions, price, and star filters
│   ├── Footer.jsx                # Ultra-minimal bottom strip
│   ├── Hero.jsx                  # Asymmetrical brand introduction
│   ├── HotelCard.jsx             # Grid-view thumbnail cards
│   ├── HotelGallery.jsx          # Carousel and slideshow
│   ├── HotelGrid.jsx             # Alternating lists & grids orchestrator
│   ├── LoadingSkeleton.jsx       # Shimmer loading cards
│   ├── Navbar.jsx                # Glassmorphism/Scroll-solid header
│   ├── Pagination.jsx            # Skip & limit pagination controller
│   ├── RatingStars.jsx           # Clean star layout
│   ├── SearchBar.jsx             # Minimal autocomplete inputs
│   ├── SortDropdown.jsx          # Ordering dropdown selection
│   ├── Stats.jsx                 # "Why RoamReserve" counter animations
│   └── Testimonials.jsx          # Blockquote columns
├── context/
│   └── FavoritesContext.jsx      # Global favorites store
├── hooks/
│   ├── useDebounce.js            # Keypress delay handler
│   └── useHotels.js              # State aggregator for API queries
├── pages/
│   ├── Favorites.jsx             # Bookmarked sanctuary list
│   ├── Home.jsx                  # Main dashboard layout flow
│   ├── HotelDetails.jsx          # Deep property specifications
│   └── NotFound.jsx              # Custom minimal 404 page
└── services/
    └── api.js                    # Axios instance & endpoints client
```

---

## 🌐 API Integrations

- **Base URL**: `https://demohotelsapi.pythonanywhere.com`
- **Hotel Listings**: `GET /hotels/`
  - Supports query filters: `search`, `name`, `location`, `min_price`, `max_price`, `min_rating`, `max_rating`
  - Sorting parameters: `order_by` (`price`, `-price`, `rating`, `-rating`, `name`, `-name`)
  - Pagination limits: `limit`, `skip`
- **Hotel Details**: `GET /hotels/{id}/`

---

## 🚀 How to Run Locally

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Neet2516/Hotel-management-.git
cd Hotel-management-
npm install
```

### 2. Launch Local Dev Server
```bash
npm run dev
```

### 3. Compile Production Bundle
```bash
npm run build
```
The compiled files will build directly inside the `dist/` directory.
