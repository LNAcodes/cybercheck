# CyberCheck

A full-stack quiz application focused on intersectional cybersecurity topics,
targeting students and professionals.

## About This Project

CyberCheck started as my very first project during my web development bootcamp —
a vanilla JavaScript quiz app built without any frameworks or backend.

This repository is a complete rebuild of that original app using a modern
full-stack, with one specific goal: to learn and critically evaluate agentic
coding workflows with Claude Code.

Rather than writing every line myself, I used Claude Code to generate the
application phase by phase — and reviewed, tested, and challenged every single
output along the way.

## What I Actually Did

This was not vibe coding. At every phase I:

- Read and understood the generated code before approving it
- Tested each feature manually and identified bugs Claude Code missed
- Caught a critical security vulnerability: a broken login flow that allowed
  any password to succeed — which Claude Code did not detect on its own
- Pushed back on architectural decisions and enforced security best practices
  (rate limiting, bcrypt, JWT sessions) because this app is about cybersecurity —
  it would be absurd not to practice what it preaches
- Connected new concepts (TypeScript, Server Actions, App Router, shadcn/ui)
  to patterns I already knew from previous projects

## Why This Matters

Knowing how to work with AI agents is becoming a core developer skill.
But the value is not in letting an agent write your code —
it is in knowing enough to catch what it gets wrong.

Domain knowledge, critical thinking, and the ability to test and verify
are what make agentic coding actually useful. Without that, you just have
fast code with slow bugs.

## Tech Stack

- Next.js 14 (App Router) · React 18 · TypeScript 5
- Tailwind CSS · shadcn/ui · next-themes
- Mongoose · MongoDB Atlas
- NextAuth.js v5 · bcryptjs
- Zod · React Hook Form

## Getting Started

```bash
cp .env.example .env.local
# Add your MONGODB_URI and NEXTAUTH_SECRET

npm install
npm run db:seed
npm run dev
```

## Meta Note

The irony is not lost that this README — which reflects on
the limits of agentic coding — was itself written by an AI.

The difference is that the human read it, agreed with it,
and chose to keep it.

That is exactly the point.
