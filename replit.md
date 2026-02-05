# Grant Costello Portfolio

## Overview

A polished, modern portfolio website with an interactive homepage featuring a topographic background and animated path with clickable points representing different portfolio sections. Includes gamification through progress tracking (sections visited) and an Info Pack unlock system. Content is data-driven through JSON files for easy editing. The visual design uses topographic elements for aesthetics while keeping all text/labels neutral and professional.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming (light/dark mode support)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion with `prefers-reduced-motion` accessibility support
- **State Management**: React Query for server state, React hooks for local state
- **Icons**: Lucide React and React Icons (for brand icons like GitHub, LinkedIn)

### Content Management
All portfolio content lives in editable JSON files under `client/src/content/`:
- `profile.json` - Personal info, education, contact details
- `experience.json` - Work history and roles
- `projects.json` - Portfolio projects with media support
- `skills.json` - Technical skills by category
- `interests.json` - Personal interests and activities

The `client/src/lib/content.ts` module provides typed accessors for all content files.

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Build**: esbuild for server bundling, Vite for client
- **Storage**: In-memory storage implementation with interface for future database integration
- **Database Schema**: Drizzle ORM with PostgreSQL dialect (schema in `shared/schema.ts`)
- **Session Management**: express-session with connect-pg-simple for PostgreSQL sessions

### Key Design Patterns
- **Trail Progress Gamification**: LocalStorage-based tracking of visited sections with unlock threshold (3 stops unlocks Info Pack)
- **Drawer-based Navigation**: Desktop uses right-side drawer for section previews, mobile uses list view
- **Theme System**: CSS variables with light/dark mode toggle, persisted to localStorage
- **Responsive Design**: Mobile-first with `useIsMobile` hook for breakpoint detection
- **Accessibility**: ARIA labels, keyboard navigation, reduced motion support
- **SEO Optimization**: Each page has unique meta tags, Open Graph, Twitter cards, and JSON-LD structured data via the `SEO` component
- **Page Prefetching**: Homepage prefetches all linked pages using `<link rel="prefetch">` with 24-hour cache expiration stored in localStorage

### Route Structure
- `/` - Trail map home page
- `/education`, `/projects`, `/experience`, `/skills`, `/interests`, `/contact` - Section pages

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle ORM**: Type-safe database queries and migrations
- **Drizzle Kit**: Schema push and migration tooling

### UI Libraries
- **Radix UI**: Accessible primitive components (dialog, dropdown, tooltip, etc.)
- **shadcn/ui**: Pre-built component collection using Radix primitives
- **Framer Motion**: Animation library
- **Embla Carousel**: Carousel functionality
- **React Day Picker**: Calendar component
- **cmdk**: Command palette functionality

### Build & Dev Tools
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server-side bundling
- **TypeScript**: Type checking across client, server, and shared code
- **Tailwind CSS**: Utility-first styling with PostCSS

### Replit-specific
- `@replit/vite-plugin-runtime-error-modal`: Development error overlay
- `@replit/vite-plugin-cartographer`: Development tooling
- `@replit/vite-plugin-dev-banner`: Development banner
