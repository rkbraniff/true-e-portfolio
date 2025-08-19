---
id: 3
slug: "encrypted-chat"
doc: "/markdown/encrypted-chat.md"
title: "Encrypted Chat App"
description:
      "A secure, end-to-end encrypted chat app using React, Node.js, and WebSocket"
tech: 
    - React
    - Node.js
    - WebSocket
    - TailwindCSS
link: "https://whisper-vault-nu.vercel.app/"
repo: "https://github.com/rkbraniff/whisper-vault"
image: "placeholder"
---

# WhisperVault

> Privacy-first messaging and contact vault for small teams and power users.
>
> Find people, verify identity, and communicate securely with email confirmation and optional 2FA. Contacts may be app users or external identities, stored with structured metadata and optional public keys.

---

## ✨ Elevator Pitch

A secure messenger and contact manager that makes it easy to find, verify, and message people while protecting accounts with email confirmation and optional two-factor authentication. Contacts can represent in-app users (linked by id) or external identities (emails/phones).

---

## 🔧 Key Features

- Authentication and account safety: Email confirmation flow, JWT-based sessions, optional TOTP 2FA and SMS helpers.
- Contacts and discovery: Structured Contact model (with separate ContactEmail/ContactPhone child models) and an optional `userId` relation to link to in-app Users. Backend endpoint to search for other app users (excludes already-linked contacts) and a frontend search UI with paging and one-click add.
- Messaging primitives: Thread and Message models prepared for storing ciphertext; sender/receiver relations and thread metadata are modeled in the DB. Cipher utilities exist in the repo for planned E2EE work.
- Data modeling and validation: Prisma schema with migrations and indexes. Zod validators for request validation and a service layer that encapsulates DB logic.
- Developer ergonomics: TypeScript across frontend and backend, React Query for client state, Tailwind for styling, and a clear routes → validators → services layering on the server.

---

## 🏗️ Architecture

- Frontend: React + Vite, Tailwind, React Query, React Router. Pages include Dashboard, Messenger, Contacts, Sign In / Sign Up, and 2FA flows.
- Backend: Express + Prisma (Postgres), modular route files (e.g. `/api/contacts`, `/api/users/search`), Zod validators, and a services layer for DB operations.
- Persistence: PostgreSQL managed via Prisma. Migrations are tracked in `server-1/prisma/migrations` and the generated Prisma Client is used by the server.
- Deployments: Frontend typically hosted on Vercel; backend deployed on Render (or similar). CORS allowlist and environment-aware base paths are handled in the server and client configs.

```
[ React + Vite ]  →  [ Express API + Zod + Prisma ]  →  [ PostgreSQL ]
        ↑                         ↓
    React Query            Auth, Contacts,
   UI + Routing           Messaging, Audit
```

---

## 🛡️ Security and Privacy Posture

- Typed server-side validation and explicit owner checks on contacts and messages.
- Email confirmation and optional 2FA reduce account takeover risk.
- Crypto utilities and cipher modules are present for intended message confidentiality; a formal audit and end-to-end encryption implementation are recommended before public release.
- CORS allowlist and environment separation are used; secrets are not bundled into the client.

> Note: production logging aims to avoid leaking PII; check environment configuration for log levels.

---

## 🧭 UX Highlights

- Contact-first layout: sidebar + dedicated Contacts page with a "Find users to add..." search bar.
- Add-by-user flow: find by name, email, or phone and add as a structured Contact — if the person is an app user the Contact may link to their User record.
- Responsive UI with modal add form and paged search results.

---

## 🗂️ Data Modeling Snapshot (current schema highlights)

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  // Auth and 2FA fields intentionally omitted in this public excerpt
  createdAt DateTime @default(now())

  contacts  Contact[]
  messages  Message[] @relation("Sent")
  received  Message[] @relation("Received")
}

model Contact {
  id         String   @id @default(uuid())
  ownerId    String
  linkedUser String?  // optional link to an in-app user
  name       String?
  note       String?
  publicKey  String?  // reserved for future E2EE

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  owner      User     @relation(fields: [ownerId], references: [id])
  // emails/phones modeled but omitted here for brevity
}

model Thread {
  id        Int       @id @default(autoincrement())
  title     String?
  messages  Message[]
  updatedAt DateTime  @updatedAt
}

model Message {
  id          Int      @id @default(autoincrement())
  threadId    Int
  senderId    String
  recipientId String
  payload     String   // ciphertext or dev plaintext
  createdAt   DateTime @default(now())

  thread      Thread   @relation(fields: [threadId], references: [id])
  sender      User     @relation("Sent", fields: [senderId], references: [id])
  recipient   User     @relation("Received", fields: [recipientId], references: [id])
}

```

---

## 🧪 Testing and Quality Gates

- Vitest for unit tests (the repo includes test files for crypto & components).
- Supertest can be used for API integration tests.
- Playwright (recommended) for end-to-end flows covering auth and contacts.
- Linting and type checks are run in CI; PRs should include tests for new behaviors.

---

## 🧯 Hardening Roadmap

- [ ] Implement end-to-end key exchange using Contact.publicKey and complete E2EE flow.
- [ ] Add per-endpoint rate limits for auth and messaging.
- [ ] Expand audit logs for message delivery and administrative actions.
- [ ] Add monitoring (Sentry/Prometheus) in preview and production.
- [ ] Security review and periodic scans.

---

## 🧩 Feature Flags and Environments

- Env-based toggles for preview/beta.
- Separate DB and secrets per environment.
- Optional allowlist for invite-only testing.

```bash
# Example local flags
BETA=1 FEATURE_MESSAGE_DELETE=on FEATURE_SECURE_EXPORT=off
```

---

## 🚀 Developer Experience

- TypeScript across the stack. React Query for remote state and caching. Tailwind for styling.
- Clear server layering: routes → validators (Zod) → services → Prisma.
- Dev scripts available in package.json for frontend and backend.

---

## 📦 Tech Stack

**Frontend**: React, Vite, Tailwind, React Query, React Router

**Backend**: Node.js, Express, Zod, Prisma (Postgres)

**Database**: PostgreSQL

**Auth**: JWT sessions, email confirmation, optional TOTP or SMS 2FA

**Tooling**: Vitest, Supertest, Playwright, ESLint, Prettier

**Hosting**: Frontend on Vercel, backend typically on Render or similar

---

## 📄 Notes for Reviewers

- Beta environments use isolated databases and secrets.
- PII is redacted from logs in production configurations.
- Migration files live under `server-1/prisma/migrations` and should be applied when updating schemas.

---

If you'd like, I can also add a short Quickstart section showing how to run the frontend and backend locally and how to apply Prisma migrations.
