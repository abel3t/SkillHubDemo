# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `pnpm dev` or `npm run dev`
- **Build for production**: `pnpm build` or `npm run build`
- **Start production server**: `pnpm start` or `npm run start`
- **Lint code**: `pnpm lint` or `npm run lint`

## Technology Stack

- **Framework**: Next.js 15.2.4 with App Router and TypeScript
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **UI Components**: Custom component library based on Radix UI primitives
- **Package Manager**: pnpm (preferred based on lockfile)
- **Font**: Geist Sans and Geist Mono
- **Icons**: Lucide React

## Architecture Overview

### Project Structure
- **`app/`**: Next.js App Router pages and layouts (4 core pages - "less is more")
  - `layout.tsx`: Root layout with Vietnamese locale and custom fonts
  - `page.tsx`: Professional networking feed with LinkedIn-style interface
  - `search/`: Unified smart discovery with list/map/grid view modes
  - `profile/`: Profile building & management (PRIMARY FOCUS)
  - `messages/`: Professional communication
- **`components/`**: Reusable UI components
  - `ui/`: Complete shadcn/ui component library with Radix UI primitives
  - `search/`: Unified discovery components (list, map, grid views)
  - `theme-provider.tsx`: Theme management
- **`lib/`**: Utility functions (cn helper for Tailwind class merging)
- **`hooks/`**: Custom React hooks (mobile detection, toast notifications)
- **`public/`**: Static assets including Vietnamese user avatars and service images

### Application Design
This is **SkillHub**, a community-focused social network for Vietnamese users to connect based on needs and abilities. The app emphasizes:

- **"LinkedIn for local skills"**: Professional profile building with skill showcases and community endorsements
- **Long-term community relationships**: Focus on building lasting connections over quick transactions
- **Mutual help platform**: Neighbors assisting each other vs transactional marketplace
- **Vietnamese interface** with culturally relevant terminology
- **No platform fees**: Users negotiate pricing directly, keeping the platform free

### Key Features
- **One-tap discovery**: Immediate access to help categories (electrical, piano, English, etc.)
- **Trust indicators**: Verification badges, neighbor endorsements, response times
- **Smart matching**: Mutual connections, local expertise, recent activity prioritization
- **Community feed**: Sharing experiences, asking for help, building connections

### Confirmed UI/UX Features & Decisions

#### First 30 Seconds User Journey
1. **Skill discovery feed** - Show nearby skilled people with abilities and success stories
2. **Search bar** - "What do you need help with?" for immediate need fulfillment
3. **Profile completion nudge** - Encourage new users to add skills for visibility
4. **Location controls** - Users can change location and distance settings in profile

#### Core Profile Features
- **Rich skill profiles** - LinkedIn-style with endorsements, portfolios, success stories
- **Availability calendar** - When users are free to help
- **Pricing transparency** - Clear rates for different services
- **Editable skills** - Users can modify their skill list anytime
- **Before/after photos** - Visual proof of work quality
- **Certificates & verification** - Multiple trust signals (community + formal verification)

#### Communication & Safety
- **Real-time chat** - Built-in messaging system with WhatsApp-quality experience
- **Direct negotiation** - No platform fees, users set their own prices
- **Simple verification** - Keep verification lightweight for beginner app (avoid complex ID verification initially)
- **Community-based trust** - Rely primarily on user reviews and endorsements

#### Real-time Chat System - TARGET FEATURE
**Target**: WhatsApp-quality messaging experience
**Components to Build**:
- ChatInterface - Main chat container with message history and input
- MessageBubble - Individual message styling with sender/receiver distinction
- MediaUpload - Photo, video, document sharing capabilities
- QuickReplies - Predefined response buttons for common messages
**Focus Areas**:
- Smooth animations and transitions between messages
- Instant delivery with real-time updates
- Rich media support (images, videos, documents)
- Professional yet friendly communication tone
**UX Goal**: Seamless communication that encourages professional networking while maintaining approachable, friendly interactions

#### Unified Smart Discovery System - TARGET FEATURE
**Target**: LinkedIn-quality professional discovery with location intelligence
**Core Philosophy**: Profile building is PRIMARY, smart location-aware discovery is secondary
**Components Built**:
- UnifiedSearch - Single intelligent search combining profiles, skills, and location
- ViewModeToggle - Seamless switching between list/map/grid views in one page
- ProfileCard - LinkedIn-style rich profile cards with location context
- LocationIntelligence - Smart distance filtering and Vietnamese transport awareness
- SmartRanking - Profile quality + skill match first, then distance + availability
**Focus Areas**:
- Profile-first discovery with location enhancement (not location-first)
- Intelligent ranking: Skills → Endorsements → Distance → Availability
- Multiple view modes without page changes (list/map/grid toggle)
- Vietnamese-specific features (motorbike travel times, neighborhood awareness)
- Rich professional profiles always shown, regardless of view mode
**UX Goal**: Users discover skilled professionals through rich profiles, enhanced by smart location context

#### Home Feed & Discovery System - CURRENT FOCUS
**Target**: A rich, engaging community feed, similar to LinkedIn or Facebook.
**Core Idea**: The homepage (`/`) should be the central hub for all community activity, encouraging interaction and connection, not just transactions.
**Feed Content Strategy**: The feed should be a mix of different content types to keep it dynamic and interesting:
- **Community Posts**: Questions, success stories, tips, and general updates from users.
- **Helper Listings**: Profiles of skilled individuals should be intelligently mixed into the feed.
- **Community Highlights**: Featuring top-rated helpers, successful projects, or trending skills.
**Components to Build/Refine**:
- **`PostComposer`**: A rich text editor for creating engaging posts.
- **`FeedPost`**: A component to display various post types (text, images, links).
- **`InfiniteScrollFeed`**: To ensure a seamless browsing experience.
- **`HelperCard`**: To showcase helpers within the feed.
**UX Goal**: Create a vibrant, endlessly scrollable "village square" where users feel connected to their community, can ask for help, share their successes, and discover skilled neighbors organically.
**Status**: The basic `InfiniteScrollFeed` is implemented on the homepage. The next step is to enrich the feed with diverse content types and a robust post composer. Professional discovery is unified in `/search` with multiple view modes.

#### Privacy & Location Controls - CRITICAL PRIVACY FEATURE
- **General location only by default** - Users can only see general location (ward, city, district) of other users
- **No exact location visibility** - Precise GPS coordinates are NEVER shown without explicit permission
- **Opt-in location sharing** - Users must explicitly allow and send exact location to specific people when they need help
- **Location control in chat/settings** - Users control location sharing through chat interface or privacy settings
- **Privacy-first approach** - Location visibility is user-controlled, not platform-controlled

#### Unified Discovery & Matching Philosophy
- **Profile-first approach** - Professional profiles drive discovery, not location
- **Multiple view modes** - List (LinkedIn-style), Map (geographical), Grid (compact)
- **Smart ranking algorithm** - Skills + Endorsements + Profile Quality → Distance + Availability
- **Location enhancement** - Adds context without dominating search results
- **Vietnamese-optimized** - Motorbike travel times, neighborhood clustering
- **One search system** - No separate pages, unified intelligent discovery

#### App Architecture - Simplified Navigation
**Core Philosophy**: "Less is more" - 4 essential pages only
**Navigation Structure**:
1. **`/` (Home)** - Professional networking feed, community posts, profile building nudges
2. **`/search`** - Unified smart discovery with list/map/grid toggle in ONE page
3. **`/profile`** - Profile building & management (PRIMARY FOCUS)
4. **`/messages`** - Professional communication

**Key Decision**: Consolidated `/map` and `/search` into single intelligent search page
- Eliminates redundancy and confusion
- Maintains all functionality in unified interface
- Supports multiple view modes without page switching
- Profile-first approach with location intelligence enhancement

#### Community Building
- **Local community feed** - Tips sharing, thank you posts, before/after photos
- **Skill-based groups** - Professional communities for knowledge sharing
- **Monthly highlights** - Featured helpers and success stories

### UI Development Strategy - MEMORIZED TARGET

**CRITICAL GOAL**: Create UI/UX that is BETTER than LinkedIn and Facebook
- **UX Priority**: User experience is MORE important than visual design
- **Component Strategy**: Build reusable React components for scalability
- **Focus**: PERFECT UI/UX for MVP to attract users to build profiles
- **Why Users Join**: App is FREE + PERFECT UX + improves customer opportunities

#### Step 1: Enhanced Profile Pages - CURRENT FOCUS
**Target**: LinkedIn-quality BUT BETTER - users feel PROUD to share their profile
**Components to Build**:
- ProfileHeader - Cover photo, avatar, name, location, verification status
- SkillCard - Individual skill with endorsement count, level indicator, pricing
- PortfolioGallery - Before/after photos, work samples, certificates  
- EndorsementSection - Community recommendations with photos and testimonials
- AvailabilityCalendar - Clean calendar showing free time slots
- PricingCard - Transparent pricing for different services

**UX Standards**:
- Visual hierarchy BETTER than LinkedIn
- Professional look but approachable 
- Easy skill editing (inline editing)
- Smooth animations and transitions
- Mobile-first responsive design
- Load time under 2 seconds

### UI/UX Principles
- **Minimalist design** with compressed layouts for maximum content visibility
- **Non-tech-savvy user focus** with simplified navigation
- **Mobile-first interactions** with touch-friendly interfaces
- **Vietnamese cultural context** in messaging and terminology

### Color Scheme
- **Primary**: Emerald green (`#059669`) for trust and connection elements
- **Secondary**: Lighter emerald (`#10b981`) for accents
- **Background**: Light gray (`#f1f5f9`) for cards and muted elements
- **Text**: Slate gray (`#475569`) for readability

### Component Patterns
- Uses shadcn/ui component library with consistent styling
- Custom component configuration in `components.json`
- Responsive design with desktop-first approach
- Extensive use of TypeScript for type safety

### Development Notes
- ESLint and TypeScript errors are ignored during builds (see `next.config.mjs`)
- Images are unoptimized for deployment flexibility
- Custom CSS variables defined in `app/globals.css` for theming
- Path aliases configured: `@/` maps to project root