# 📰 Shele - Modern News Aggregator

> A fast, elegant, and feature-rich news aggregation platform built with Next.js 16, featuring real-time updates, advanced filtering, and intelligent bookmarking.


---

## 🌟 Project Overview

**Shele** is a production-ready news aggregator that delivers curated content from trusted global sources. Built with modern web technologies and best practices, it demonstrates proficiency in full-stack development, state management, API integration, and responsive UI/UX design.

### 🎯 Key Objectives

- Deliver real-time news updates from multiple international sources
- Provide an intuitive, accessible user experience across all devices
- Implement efficient state management and data caching strategies
- Showcase modern React patterns and Next.js 16 App Router features

---

## ✨ Features

### 🔍 Core Functionality

- **Real-Time News Feed**: Integration with NewsData.io API for live news updates
- **Advanced Filtering**: Filter by category (business, tech, sports, etc.), search queries, country, and language
- **Smart Bookmarking**: Save articles for later reading with persistent local storage
- **Responsive Layouts**: Multiple card variants (featured, default, compact) optimized for all screen sizes
- **Infinite Content**: Pagination support for browsing extensive article collections

### 🎨 User Experience

- **Dark/Light Theme Toggle**: System-aware theme with manual override
- **Skeleton Loading States**: Smooth loading experience with content placeholders
- **Staggered Animations**: Polished slide-up animations with cascading delays
- **Error Handling**: Graceful error states with retry mechanisms
- **Empty States**: Contextual empty state messages with clear CTAs

### ⚡ Performance & Optimization

- **React Query Integration**: Intelligent caching, background refetching, and request deduplication
- **Next.js SSR/ISR**: Server-side rendering with 5-minute revalidation for optimal SEO
- **Optimized Images**: Lazy loading and responsive image handling
- **Code Splitting**: Automatic route-based code splitting via Next.js App Router
- **Biome Linter**: Fast, modern linting and formatting for consistent code quality

---

## 🛠️ Tech Stack

### Frontend Framework
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router, RSC, and advanced caching
- **[React 19.2](https://react.dev/)** - Latest React with improved hooks and concurrent features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development with strict mode

### Styling & UI
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first CSS with custom design system
- **[Lucide React](https://lucide.dev/)** - Beautiful, consistent icon library (550+ icons)
- **Custom CSS Variables** - Theme-aware design tokens for consistent styling

### State Management
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Lightweight, scalable state management (< 1KB)
- **[Zustand Persist](https://github.com/pmndrs/zustand)** - Local storage persistence middleware
- **[TanStack Query v5](https://tanstack.com/query)** - Server state management with caching

### Development Tools
- **[Biome](https://biomejs.dev/)** - Fast, modern linter and formatter (Rust-based)
- **[clsx](https://github.com/lukeed/clsx)** - Utility for conditional className composition

### API Integration
- **[NewsData.io API](https://newsdata.io/)** - Real-time news aggregation from 100+ countries

---

## 📁 Project Structure

```
shele/
├── public/                    # Static assets
│   ├── file.svg
│   ├── globe.svg
│   └── ...
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── bookmarks/         # Bookmarks page
│   │   │   └── page.tsx
│   │   ├── globals.css        # Global styles & CSS variables
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Home page with news feed
│   │
│   ├── components/            # React components
│   │   ├── EmptyState.tsx     # Reusable empty/error states
│   │   ├── Footer.tsx         # App footer
│   │   ├── Header.tsx         # Navigation & filters
│   │   ├── NewsCard.tsx       # Article card (3 variants)
│   │   ├── NewsCardSkeleton.tsx  # Loading skeletons
│   │   └── index.ts           # Component exports
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useNews.ts         # React Query hook for news fetching
│   │
│   ├── lib/                   # Utility functions
│   │   └── api.ts             # API client & helpers
│   │
│   ├── providers/             # Context providers
│   │   ├── QueryProvider.tsx  # TanStack Query provider
│   │   └── ThemeProvider.tsx  # Theme management
│   │
│   ├── store/                 # Global state
│   │   └── newsStore.ts       # Zustand store (filters, bookmarks, theme)
│   │
│   └── types/                 # TypeScript types
│       └── news.ts            # API types & interfaces
│
├── biome.json                 # Biome configuration
├── next.config.ts             # Next.js configuration
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0 or higher
- **npm/yarn/pnpm**: Latest stable version
- **NewsData.io API Key**: [Get your free key](https://newsdata.io/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shele.git
   cd shele
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_NEWSDATA_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

### Linting & Formatting

```bash
# Check for issues
npm run lint

# Format code
npm run format
```

---

## 🏗️ Architecture & Design Patterns

### State Management Strategy

**Local UI State**: Zustand with persistence middleware
- Filters (category, search, country, language)
- Bookmarks (saved articles)
- Theme preference (dark/light mode)
- Mobile menu state

**Server State**: TanStack Query
- News API responses with 5-minute stale time
- Automatic background refetching
- Request deduplication
- Optimistic UI updates

### Component Architecture

- **Composition Pattern**: Small, reusable components with clear responsibilities
- **Variants Pattern**: Single component with multiple visual variants (NewsCard)
- **Render Props**: Flexible component interfaces for different use cases
- **Custom Hooks**: Abstracted business logic from presentation layer

### API Integration

```typescript
// Clean separation of concerns
src/lib/api.ts        → API client & utilities
src/hooks/useNews.ts  → React Query integration
src/types/news.ts     → TypeScript contracts
```

### Performance Optimizations

1. **Caching Strategy**
   - Next.js: 5-minute ISR revalidation
   - React Query: Stale-while-revalidate pattern
   - Zustand: Selective persistence

2. **Bundle Optimization**
   - Tree-shaking with ES modules
   - Dynamic imports for route-based splitting
   - Minimal third-party dependencies

3. **Rendering Strategy**
   - Server Components for static content
   - Client Components only where needed
   - Lazy loading for images

---

## 🎨 Design System

### Color Tokens
```css
--color-primary: Rose 500 (#E11D48)
--color-surface: Dynamic (theme-aware)
--color-ink: Semantic text colors
```

### Component Patterns
- **Cards**: Elevated surfaces with hover states
- **Buttons**: Primary, secondary, icon variants
- **Badges**: Category labels and metadata
- **Skeletons**: Animated loading placeholders

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 🔌 API Reference

### NewsData.io Integration

```typescript
interface NewsArticle {
  article_id: string;
  title: string;
  description: string | null;
  link: string;
  image_url: string | null;
  pubDate: string;
  source_name: string;
  category: NewsCategory[];
  // ... more fields
}
```

**Endpoints Used**:
- `GET /api/1/latest` - Fetch latest news articles

**Query Parameters**:
- `apikey` - Authentication
- `category` - Filter by category
- `country` - ISO country code
- `language` - ISO language code
- `q` - Search query
- `page` - Pagination token

---

## 🧪 Testing Approach

### Manual Testing Coverage
- ✅ Responsive layouts (mobile, tablet, desktop)
- ✅ Theme switching (light/dark mode)
- ✅ Filter combinations (category + search + country)
- ✅ Bookmark persistence across sessions
- ✅ Error states and retry mechanisms
- ✅ Loading states and skeleton screens

### Future Testing Goals
- Unit tests with Jest & React Testing Library
- E2E tests with Playwright
- Visual regression testing

---

## 📊 Key Technical Decisions

### Why Next.js 16?
- **App Router**: Superior routing with layouts and nested routes
- **React Server Components**: Reduced bundle size and improved performance
- **Built-in Optimizations**: Image optimization, font loading, and more

### Why Zustand over Redux?
- **Simplicity**: No boilerplate, no providers
- **Size**: < 1KB vs Redux's 11KB+
- **TypeScript**: First-class TypeScript support
- **Middleware**: Easy persistence with zustand/middleware

### Why TanStack Query?
- **Caching**: Intelligent request deduplication
- **Background Sync**: Automatic data freshness
- **DevTools**: Excellent debugging experience
- **Optimistic Updates**: Smooth UX for mutations

### Why Biome over ESLint?
- **Performance**: 25x faster than ESLint (Rust-based)
- **All-in-One**: Linting + formatting in one tool
- **Sensible Defaults**: Works great out of the box

---

## 🚧 Future Enhancements

### Planned Features
- [ ] User authentication (Google, GitHub OAuth)
- [ ] Personalized news feed based on reading history
- [ ] Social sharing capabilities
- [ ] Reading time estimates
- [ ] Multi-language UI support
- [ ] PWA capabilities (offline mode)
- [ ] Push notifications for breaking news
- [ ] Article summarization with AI

### Technical Improvements
- [ ] E2E testing with Playwright
- [ ] Storybook for component documentation
- [ ] Performance monitoring (Sentry, Vercel Analytics)
- [ ] A/B testing framework
- [ ] GraphQL integration for better data fetching

---

## 📚 Learning Outcomes

This project demonstrates proficiency in:

✅ **Modern React Patterns**: Hooks, Server Components, Suspense  
✅ **Next.js 16 App Router**: File-based routing, layouts, and RSC  
✅ **TypeScript**: Strict typing, interfaces, generics  
✅ **State Management**: Global state with Zustand, server state with React Query  
✅ **API Integration**: RESTful API consumption with error handling  
✅ **Responsive Design**: Mobile-first CSS with Tailwind  
✅ **Performance**: Caching strategies, lazy loading, code splitting  
✅ **Developer Experience**: Modern tooling (Biome, TypeScript, etc.)  
✅ **Accessibility**: ARIA labels, semantic HTML, keyboard navigation  
✅ **UX Design**: Loading states, error boundaries, empty states  

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Your Name**
- Portfolio: [yourportfolio.com](https://yourportfolio.com)
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [NewsData.io](https://newsdata.io/) - For providing the news API
- [Vercel](https://vercel.com/) - For hosting and deployment
- [Lucide](https://lucide.dev/) - For the beautiful icon library
- [Next.js Team](https://nextjs.org/) - For an amazing framework

---

<div align="center">
  <sub>Built with ❤️ using Next.js, TypeScript, and modern web technologies</sub>
</div>
