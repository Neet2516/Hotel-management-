# RoamReserve — Curated Architectural Stay Explorer

<p align="center">
  <img src="https://www.reshot.com/preview-assets/icons/RE94SX2WQV/hotel-RE94SX2WQV.svg" alt="RoamReserve Logo" width="80" height="80" />
</p>

<p align="center">
  <strong>RoamReserve</strong> is a premium, design-led editorial hotel stay explorer built for the quiet traveler who appreciates form, function, and visual silence. Inspired by Swiss minimalism and editorial magazine layouts, the design focuses on generous whitespace, high contrast, and structural symmetry.
</p>

<p align="center">
  <a href="https://hotel-management-theta-red.vercel.app/"><strong>Explore Deployed Application &rarr;</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-000000?style=flat&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8.1-000000?style=flat&logo=vite&logoColor=646CFF" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-v4.0-000000?style=flat&logo=tailwindcss&logoColor=06B6D4" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Framer%20Motion-12.0-000000?style=flat&logo=framer&logoColor=0055FF" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel&logoColor=FFFFFF" alt="Vercel Deployed" />
</p>

---

## 🖤 Design Aesthetics

| Core Principle | Implementation Details |
| :--- | :--- |
| **Monochrome Palette** | Strictly limited to grayscale (`#000000`, `#111111`, `#1C1C1C`, `#F5F5F5`, `#FFFFFF`). No gradients or neons. |
| **Typography** | Elegant Serif headings (**Cormorant Garamond**) paired with high-readability Sans-serif (**Inter**) body copy. |
| **Grayscale Transitions** | Every architectural image is loaded in pure grayscale, transitioning to full color on cursor hover. |
| **Visual Silence** | Sharp border layouts (`rounded-sm` / `rounded-lg`), zero box shadows, and generous whitespace. |

---

## Features

- **Asymmetrical Split Hero**: Strips out typical stock SaaS layouts for a minimal, magazine-style split interface.
- **Pinterest Masonry Grid**: Renders destination cards inside a dynamic column layout using staggered aspect ratios (`aspect-[3/4]`, `aspect-[4/3]`, `aspect-[1/1]`, and `aspect-[4/5]`).
- **Alternating Listing Monographs**: Stays directory presented as alternating media/info rows (even: image-left, odd: image-right) reminiscent of custom architecture portfolios.
- **Precision Filter Sidebar**: Direct query modifiers for regional search, custom price boundaries, and star rating thresholds. Converts to a slide-out drawer on mobile screens.
- **Persistent Wishlist**: Custom React Context store synced with `localStorage` to bookmark stays, paired with globally themed monochrome toast confirmations.
- **Explore Hash Scroll**: Navbar routing configured to perform smooth scroll animations to coordinate parameters and hotel grids.

---

## System Architecture

```
src/
├── assets/          # Static assets and graphic utilities
├── components/      # Modular layout elements
│   ├── FeaturedDestinations.jsx  # Staggered Masonry columns
│   ├── FilterSidebar.jsx         # Responsive sidebar & mobile drawers
│   ├── Footer.jsx                # Minimalist copyright strip
│   ├── Hero.jsx                  # Left-aligned editorial introduction
│   ├── HotelCard.jsx             # Grid-view thumbnail cards
│   ├── HotelGallery.jsx          # Carousel and showcase slideshows
│   ├── HotelGrid.jsx             # Alternating lists & grids orchestrator
│   ├── LoadingSkeleton.jsx       # Shimmer loading cards
│   ├── Navbar.jsx                # Header with transparent-solid scroll transitions
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

## API Specifications

RoamReserve communicates directly with the PythonAnywhere Hotels API:

- **Hotels Index**: `GET /hotels/`
  - *Query Parameters*: `search`, `name`, `location`, `min_price`, `max_price`, `min_rating`, `max_rating`
  - *Sorting*: `order_by` (`price`, `-price`, `rating`, `-rating`, `name`, `-name`)
  - *Pagination*: `limit`, `skip`
- **Hotel Details**: `GET /hotels/{id}/`

---

## Quick Start

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Neet2516/Hotel-management-.git
   cd Hotel-management-
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
   Static files will build inside the `/dist` directory.
