# Part A: Product Specification

This document outlines the vision, strategy, and technical principles for SkillHub. Its purpose is to align the team around building Vietnam's most trusted professional network, where a user's single, powerful profile is the foundation for all their professional activities.

## 1. Vision & Positioning

-   **Tagline**: SkillHub: Build Your Reputation. Hire with Trust.
-   **Description**: SkillHub is the platform for Vietnamese professionals to build a "Living CV"—a dynamic profile that proves their skill and credibility. The primary goal is to create this single, trusted professional identity. This same identity is then used to seamlessly find, verify, and hire other trusted experts from within the network.
-   **Core Principles**:
    -   **The Profile is the Core Asset**: The absolute priority is to help users build a powerful, credible, and shareable professional profile. All other features serve this primary asset.
    -   **Proof, Not Claims**: A SkillHub profile is built on verifiable "Proof Points" (reviews, metrics, badges), not just self-reported claims.
    -   **Community-Powered Verification**: Trust is generated authentically through a hyper-local network of neighbors, customers, and peers.
    -   **Zero Take Rate**: We empower professionals, we don't tax them. We will not charge a commission on their work.

## 2. Core Value & Differentiation

-   **The SkillHub Advantage**:
    -   **For Building Your Reputation**: A SkillHub profile is a dynamic, verifiable asset that is superior to a static CV or Facebook page. It proves your worth and builds your professional reputation over time, attracting more clients.
    -   **For Hiring with Confidence**: SkillHub eliminates the uncertainty of searching on Google or Facebook. It provides access to a network of professionals with structured profiles and community-verified trust signals, allowing you to hire with confidence using your own professional identity.
-   **Our Sustainable Competitive Advantage**:
    -   **The Trust Graph**: Our core differentiator is the data network of "Proof Points"—reviews, verifications, and contributions—that makes each profile uniquely credible and hard to replicate.
    -   **The Network Effect**: The platform's value grows exponentially as more professionals build their credible profiles, which in turn makes the network a more reliable place to hire from, creating a virtuous cycle.
    -   **Vietnamese Cultural Integration**: Our deep understanding of the local professional culture makes the platform authentic and effective for the Vietnamese market.

## 3. User Persona

-   **The SkillHub Professional**: Our single user persona is a skilled individual focused on building their professional reputation. This unified profile serves as their identity for all platform activities. For example, an IT expert uses their profile to get programming gigs, and also uses that same identity to find and hire a trusted electrician. There is no "switching roles," only different capabilities of a single professional identity.

## 4. The Operational Loop: Reputation & Discovery

The user experience is a virtuous cycle where all activities emanate from and contribute back to the user's professional profile.

1.  **Build Your Professional Identity**: This is the foundational first step. A user creates and enriches their single, powerful profile.
2.  **Showcase Your Expertise**: The user gets discovered and hired based on the strength of their profile. Each completed job adds new "Proof Points" (reviews, metrics) to their profile, increasing its value and credibility.
3.  **Hire with Your Professional Identity**: As a professional, the user can find and hire other experts on the platform. The strength of their own profile lends them credibility, and they in turn can assess the "Proof Points" of others to hire with confidence.
4.  **Contribute to the Network**: After hiring someone, the user leaves a structured review. This action enhances the other professional's profile, which strengthens the entire network and reinforces the value of credible profiles for everyone, including themselves.

## 5. Building Verifiable Proof (Trust & Safety)

A SkillHub profile is built from a stack of "Proof Points."

-   **Proof of Community Trust**:
    -   **Neighbor Verification (v1)**: A foundational badge earned when two users mutually confirm they are neighbors, providing a powerful, real-world trust signal.
-   **Proof of Skill & Heritage**:
    -   **Generational Skill Transfer (v1)**: The ability to tag a skill as a "Traditional Skill" and add its "story," creating verifiable proof of cultural and technical lineage.
-   **Proof of Professionalism**:
    -   **Structured Service Metrics**: Reviews are not just text. They are structured data points rating a professional on Punctuality, Professional Attitude, and Pricing Transparency.
-   **Standard Safety Layers**:
    -   Mandatory phone verification, anti-spam tools, and user reporting/blocking.

## 6. Business Model (Zero Take Rate)

-   **Core Principle**: Our business model is designed to help dedicated professionals enhance their profiles, not to tax their earnings. We will never charge a commission on services.
-   **Revenue Streams**:
    -   **Profile Enhancement**: Optional "Pro" subscriptions for professionals to boost their profile visibility and unlock advanced profile analytics.
    -   **Advanced Verification Services**: Paid options for formal background checks or certification validation, adding another layer of "Proof Points."
    -   **Platform Utilities**: Premium features for users who hire frequently (e.g., businesses), such as advanced search tools or project management features.
    -   **Targeted Ads & Partnerships**: Highly relevant ads for tools, materials, and partnerships for training or business insurance.

## 7. MVP Scope (3–6 Weeks)

-   **Primary Goal**: Launch a platform where a user can immediately begin building a credible professional profile and successfully find another trusted professional to hire.
-   **In-Scope for MVP**:
    -   A single, rich profile builder (skills, portfolio, bio).
    -   Auth (phone + social).
    -   Core search by skill/location.
    -   Simple "Request" posting.
    -   Structured reviews (Service Metrics).
    -   The first "Proof Point" badges: Neighbor Verification v1 and Traditional Skills v1.
-   **Out-of-Scope for MVP**: In-app payments, complex trust graph analysis, advanced monetization.

## 8. Success Metrics

-   **User Success & Network Health**:
    -   `Profile Completion Rate (>80%)`
    -   `Average # of "Proof Points" per Active Profile`
    -   `Search-to-Contact Rate` (Measures hiring effectiveness)
    -   `User Activity Breadth`: % of users who have both received a review and written a review.
    -   `4 and 8-week Blended Retention`

## 9. Roadmap (3 Phases)

-   **Phase 1 (Foundation): Build the Ultimate Profile Core.** Deliver the MVP focused on creating a profile that is more trustworthy than any alternative, and ensure the core hiring loop is functional and reliable.
-   **Phase 2 (Intelligence & Engagement):** Introduce semantic search, a "Request Heatmap" for market demand, video portfolios, and more advanced contribution/reputation badges to further enrich the profiles.
-   **Phase 3 (The Network Standard):** Become the default professional network. Develop the multi-level trust graph, introduce APIs for business integration, and make the SkillHub profile the default "Living CV" for skilled professionals in Vietnam.

## 10. Design & Tech Principles

-   **The Profile is the Product**: Every technical and design decision must be evaluated on one question: "Does this make our users' profiles more valuable, credible, and shareable?"
-   **Unified Identity**: The UI must present a seamless experience where hiring others is a natural capability of the user's single professional identity, not a separate "mode."
-   **Performance & Accessibility**: The platform must be fast, mobile-first, and accessible to all.
-   **Privacy & Control**: Users own their data and have full control over their profile visibility and information.

## 11. Glossary / Key Terms

-   **Living CV / Dynamic Capability Profile (Living Profile)**: A dynamic, verifiable record of a professional's skills, reputation, and contributions that serves as their primary professional identity for all platform activities.
-   **Proof Point**: Any verifiable piece of data that adds credibility to a profile (e.g., a structured review, a "Neighbor Verified" badge).
-   **Request**: A public post created by a user outlining a specific need for which they want to hire another professional.
-   **Service Metrics**: A set of structured criteria (Punctuality, Attitude, Pricing Transparency) used for reviews, which serve as key "Proof Points."

---

# Part B: Technical & Development Guide

This section provides guidance to Claude Code (claude.ai/code) and other developers when working with code in this repository.

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

- **`GenerationalSkillTransfer`**: A dedicated feature to facilitate the transfer of knowledge and skills between users of different generations, fostering mentorship.
- **`NeighborhoodDnaVerification`**: An advanced verification system to build deep trust by confirming a user's authentic connection to their local neighborhood.
- **`ContributionTracker` & `CommunityLeaderboard`**: Systems to track, recognize, and showcase top contributors, encouraging active participation and community engagement.
- **`LocalIntelligence`**: A component that provides nuanced, location-aware context throughout the app, not just within search, to enrich the user experience.

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