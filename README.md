# Jobify

**A full-stack job board** — register, sign in, post jobs, browse listings, and manage your own postings.

## Stack

- **Next.js 14** (App Router) + React 18 + TypeScript
- **MongoDB** via **Prisma**
- **NextAuth** (credentials + JWT sessions)
- **Tailwind CSS** + Radix / shadcn UI
- **Vitest** (API unit tests) + **Playwright** (E2E)

## Features

- User registration and login with hashed passwords (bcrypt)
- Browse and filter public job listings
- Authenticated job posting, editing, and deletion (ownership-scoped)
- “My Jobs” dashboard for your listings
- Salary estimate page with static cards
- Dark / light theme support

## Prerequisites

- Node.js 18+
- A MongoDB database (local or [Atlas](https://www.mongodb.com/atlas))
- Environment variables from `.env.example`

## Environment

Copy `.env.example` to `.env` in the project root:

```bash
DATABASE_URL="mongodb+srv://USER:PASSWORD@CLUSTER/jobify?retryWrites=true&w=majority"
NEXTAUTH_SECRET="generate-a-long-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Prisma MongoDB connection string |
| `NEXTAUTH_SECRET` | Signs JWT session cookies |
| `NEXTAUTH_URL` | Canonical app URL for NextAuth |

## Setup

```bash
npm install
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm install` also runs `prisma generate` via `postinstall`.

## Features & routes

| Route | Auth | Description |
|-------|------|-------------|
| `/` | Public | Browse and filter jobs |
| `/register`, `/login` | Public | Create account / sign in |
| `/post-job` | Required | Create a job listing |
| `/my-jobs` | Required | View, edit, and delete your jobs |
| `/salary-est` | Public | Static salary estimate cards |

Mutating APIs (`POST` / `PUT` / `DELETE` on `/api/demo`) require a session. Jobs are scoped to the signed-in user’s email. `/api/myjobs` returns only the current user’s jobs.

## Scripts

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # start production server
npm run lint       # ESLint
npm test           # Vitest unit/API tests
npm run test:e2e   # Playwright end-to-end happy path
```

### First-time Playwright setup

```bash
npx playwright install chromium
```

E2E tests start `npm run dev` automatically (unless a server is already running) and need a reachable `DATABASE_URL`.

## Architecture (happy path)

```
Browser → App Router pages → API routes → Prisma → MongoDB
                ↑
         NextAuth JWT session
```

1. Register → `POST /api/user` (bcrypt hash)
2. Login → NextAuth credentials → JWT cookie
3. Post job → `POST /api/demo` (owner email from session)
4. Browse → `GET /api/demo`
5. My Jobs → `GET /api/myjobs`
6. Edit / Delete → `PUT` / `DELETE /api/demo` with ownership checks
7. Logout → clears session

## Tests

- **Unit (Vitest):** registration validation; unauthenticated mutations return `401`; owners can update/delete; `/api/myjobs` requires a session
- **E2E (Playwright):** register → login → post job → my-jobs → edit → delete → logout

## License

Private project (`"private": true` in `package.json`).
