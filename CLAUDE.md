# CLAUDE.md — CyberCheck

## Project Overview

CyberCheck is a full-stack Next.js quiz app focused on intersectional cybersecurity.
Target audience: students (school + university) and professionals.
Stack: Next.js 14 App Router · TypeScript · shadcn/ui · Tailwind · Mongoose · MongoDB · NextAuth.js v5

## Guiding Principles

- YAGNI: Only build what is listed here. No admin panel, analytics, social features, real-time, OAuth, email, file uploads.
- DRY: Shared server actions in actions/, shared types in types/index.ts, shared components in components/. No duplicated DB queries.
- shadcn/ui first: Before writing any UI component, check if shadcn has it. Never rebuild Button, Dialog, Form, Badge, Card, RadioGroup, etc. Components live in components/ui/ — never edit manually.

## Tech Stack

Next.js 14 (App Router) + React 18 + TypeScript 5
Tailwind CSS 3 + shadcn/ui
Mongoose + MongoDB Atlas
NextAuth.js v5 (credentials, JWT sessions)
next-themes (dark mode)
Zod + React Hook Form

## File Structure

app/          — routes, layouts, pages, loading.tsx
components/   — shared components (ui/ = shadcn, never edit)
actions/      — all server actions
types/        — index.ts, shared TypeScript types
lib/          — auth.ts, db.ts, utils.ts
models/       — Mongoose schemas

## Environment Variables (see .env.example)

MONGODB_URI, NEXTAUTH_SECRET, NEXTAUTH_URL

## Commands

npm run dev          — dev server
npm run db:seed      — seed questions

## Conventions

- event not e as parameter name
- Descriptive variable names, no abbreviations
- Explicit over clever — no smart shortcuts
- Server Actions over API routes where possible
- Always use Zod for validation before DB write

## Auth

- Credentials provider (email + password, bcryptjs)
- JWT sessions — no DB session table, no Mongoose adapter needed
- Protected: /bookmarks, /collections/*, /add-question, /profile
- Session: { user: { id, email, username } }
- Guests can browse / and /try; bookmark + collection icons hidden entirely (no toast, no locked state)

## Guest Experience

UX philosophy: no manipulation, no frustration-based locking.

- Hide bookmark and collection icons from guests entirely — no locked icons, no toast prompts
- Show a clear inviting banner on the homepage for guests: "Create a free account to bookmark questions, build collections, and track your progress."
- After successful login → redirect to /profile with a "Welcome back, [username]!" message

## Quiz Card Behavior

1. Select option → "Show Answer" (green/red feedback) OR "Try Again" (reset)
2. Card state is local and ephemeral
3. Bookmark: auth-gated; "Add to Collection": auth-gated — icons hidden from guests entirely
4. Answer feedback uses --color-success and --color-warning CSS vars

## Collections

- Named groups; CollectionItem has position for ordered practice cycling
- Practice mode: /collections/[id] → PracticeMode component (one card at a time)

## User-Submitted Questions

- Submit via /add-question → UserQuestionSubmission (PENDING)
- No admin UI — YAGNI

## Question Categories (seeded, never user-created)

digital-privacy-surveillance · online-harassment-safety · algorithmic-bias-ai-ethics
digital-accessibility-inclusion · data-sovereignty-rights · gender-based-cyber-violence
childrens-online-safety · workplace-digital-rights · identity-access-authentication · digital-equity

## CSS / Styling

- Tailwind utilities for all layout/spacing
- globals.css: shadcn CSS vars (:root light + .dark) + --color-success + --color-warning
- Dark mode: next-themes + Tailwind darkMode: ["class"]
- <html suppressHydrationWarning> required

## Git Workflow

- Never commit directly to main
- For each phase, create a feature branch: feature/phase-1-scaffold, feature/phase-2-database, etc.
- Commit messages in English, imperative: "Add QuizCard component"
- Commit at logical checkpoints, not after every file change

## Workflow Rules

- Complete one phase at a time
- After each phase: run the app, verify it works, commit to the feature branch
- Then STOP and ask: "Phase X complete. Ready for Phase X+1?"
- Never start the next phase without explicit confirmation
- If something is unclear mid-phase, ask before proceeding

## What NOT to Build (YAGNI)

Admin panel · analytics · social following · real-time · email · OAuth · file uploads · search · pagination

---

## 7-Phase Build Order

1. Scaffold + Design System — create-next-app, shadcn init, Header/Footer, static QuizCard + dark mode
2. Database + Seed — Mongoose schemas, seed 20 questions, home page from DB, CategoryFilter
3. Authentication — NextAuth, login/signup, middleware, GuestBanner on /try
4. Bookmarks — toggleBookmark action, /bookmarks page, guest toast
5. Collections — all collection actions, CreateCollectionDialog, AddToCollectionDialog, PracticeMode
6. Submission + Profile — QuestionSubmitForm, ProfileStats, FavoriteTopicsList
7. Polish — loading.tsx, not-found.tsx, Toaster, accessibility audit, .env.example, deploy
