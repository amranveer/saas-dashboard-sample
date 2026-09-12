# Nexus Analytics - Enterprise SaaS Dashboard 📈

A production-ready, dark-mode B2B SaaS dashboard engineered to demonstrate advanced frontend architecture, complex state management, and high-end micro-interactions.

![Nexus Dashboard Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop)

## 🚀 Tech Stack & Architecture

This project was built with a strict focus on modern React paradigms and enterprise-grade libraries:

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Visualization**: Recharts
- **Data Grids**: TanStack Table (React Table v8)
- **Icons**: Lucide React

## ✨ Key Features & Implementations

### 1. Complex Data Architecture (TanStack Table)
The Analytics route (`/analytics`) features a fully headless data grid built with **TanStack Table v8**.
- **Pagination & Offsets**: Handles 50+ mocked API requests with strict page boundaries.
- **Row Selection**: Global header checkbox and row-level checkboxes tied directly to React state for bulk actions (e.g., "Delete Selected").
- **Global Fuzzy Filtering**: A search input that recursively filters the entire data model across all columns and pages.
- **JSON Slide-Over Inspector**: Clicking a row triggers a `framer-motion` sliding panel that formats and syntax-highlights the raw `application/json` payload for that specific request.

### 2. Global State Management (Zustand)
- **Command Menu (`Cmd+K`)**: A global, interceptable command palette overlay managed via a central Zustand store (`useAppStore.ts`).
- **Global Toast System**: A beautifully animated notification system that can be triggered from anywhere in the component tree to provide immediate UI feedback.

### 3. Deep Micro-Interactions (Framer Motion)
- **Active Navigation Tracking**: The sidebar uses Framer Motion's `layoutId` to physically slide the active background highlight between routes, rather than snapping.
- **Staggered Layout Cascades**: Dashboard metric cards mount using staggered delay animations (`delay: i * 0.1`) to create a cascading entrance effect.
- **Stateful Modals**: The "Add Customer" form and "Help & Support" overlays utilize `<AnimatePresence>` for flawless mounting/unmounting transitions with blurred backdrops.

### 4. Advanced Data Visualization (Recharts)
- **Custom Area Charts**: The overview dashboard utilizes Recharts `<AreaChart>` with custom SVG `<linearGradient>` definitions to create glowing, Vercel-inspired activity graphs.
- **Radial Usage Gauges**: The Usage route (`/usage`) utilizes customized `<PieChart>` components to act as radial progress rings, tracking API limits, Storage, and Bandwidth against simulated quota thresholds.

### 5. Multi-Tenancy Settings Architecture
The Settings route (`/settings`) features a robust, vertical-tab architecture common in enterprise SaaS:
- **Profile & Team Management**: Includes highly styled data tables for managing workspace access (Owner vs Developer roles).
- **Billing & Subscriptions**: Simulates Pro Tier subscription management and payment method displays.

## 🛠 Getting Started

First, install the dependencies (including TanStack Table and Recharts):

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💡 Why This Project Exists

This repository serves as a portfolio piece demonstrating the ability to build data-dense, highly interactive user interfaces. It proves competency in moving beyond simple CRUD applications into the realm of complex state tracking, headless UI architectures, and polished UX motion design required by top-tier SaaS companies.
