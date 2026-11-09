# MyPortfolio – COMP229 Assignment 3 (Full Stack)

Mark Perez's full-stack portfolio: React + Vite frontend (`client/`) connected to a Node.js / Express REST API backed by MongoDB (Mongoose), with JWT authentication and **Admin / User roles**.

## What's new in Assignment 3

- **Roles** – every user has `role: "user" | "admin"`. Sign-ups are always `user`; the admin account is hardcoded in MongoDB by `npm run seed`.
- **Admin** can Create / Read / Update / Delete Projects, Qualifications (Education) and Contacts from the frontend, and manage users on the *Users* page.
- **User** can sign up, sign in and view everything read-only; *Messages* shows only the messages they sent.
- **Frontend forms (controlled React state)**: Sign Up, Sign In, Project, Qualification, Contact (create + edit).
- **State management**: `AuthContext` (global sign-in state + JWT in sessionStorage) and a `useRecords` hook that keeps each list in sync with the API.
- **Protected routes**: backend `requireSignin` + `isAdmin` middleware; frontend `<PrivateRoute>` / `<PrivateRoute adminOnly>`.

## Project structure

```
MyPortfolio/
├── server.js                 # entry point: connects to MongoDB, starts Express, "/" welcome message
├── config/config.js          # port, JWT secret, MongoDB URI (read from .env)
├── server/
│   ├── express.js            # middleware + route registration
│   ├── models/               # contact, project, qualification, user (Mongoose schemas)
│   ├── controllers/          # CRUD controllers + auth.controller.js (signin/signout/JWT)
│   ├── routes/               # REST routes for each resource + auth.routes.js
│   ├── seed/seed.js          # creates the hardcoded admin + starter projects/qualifications
│   └── helpers/dbErrorHandler.js
├── client/src/
│   ├── api/                  # apiClient.js (fetch + JWT) and api.js (CRUD calls per resource)
│   ├── auth/AuthContext.jsx  # global auth state: user, token, isAdmin, signin, signout
│   ├── hooks/useRecords.js   # list + create/update/remove state for one resource
│   ├── components/           # Navbar, PrivateRoute, RecordForm, AdminActions, ...
│   └── pages/                # Home, Projects, Education, Contact, Signin, Signup, Messages, Users, ...
└── Portfolio_API.postman_collection.json
```

## Setup

```bash
# 1. backend dependencies (in the MyPortfolio root)
npm install

# 2. create .env from the example and paste your MongoDB Atlas connection string
#    (make sure the database name in the URI is "Portfolio")
copy .env.example .env        # Windows   (cp .env.example .env on Mac/Linux)

# 3. create the hardcoded admin account (+ starter portfolio entries) in MongoDB
npm run seed

# 4. frontend dependencies
cd client
npm install

# 5. run frontend (5173) and backend (3000) together
npm run dev
```

### Admin account

`npm run seed` creates/resets the admin user. Default credentials (change them in `.env` with `ADMIN_EMAIL` / `ADMIN_PASSWORD` before seeding):

| Email | Password | Role |
|---|---|---|
| admin@portfolio.com | Admin@123 | admin |

Anyone else can create a `user` account on the Sign Up page.

- Backend only: `node server.js` (root) → http://localhost:3000 shows `{"message":"Welcome to My Portfolio application."}`
- Frontend only: `npm run vite` (in `client/`) → http://localhost:5173
- The Vite dev server proxies `/api` and `/auth` to port 3000, so the Contact form saves messages to MongoDB.

## REST API

| Resource | Endpoints |
|---|---|
| Contacts | `GET/POST/DELETE /api/contacts`, `GET/PUT/DELETE /api/contacts/:id` |
| Projects | `GET/POST/DELETE /api/projects`, `GET/PUT/DELETE /api/projects/:id` |
| Qualifications | `GET/POST/DELETE /api/qualifications`, `GET/PUT/DELETE /api/qualifications/:id` |
| Users | `GET/POST/DELETE /api/users`, `GET/PUT/DELETE /api/users/:id` |
| Auth | `POST /auth/signin` → `{ token, user }`, `GET /auth/signout` |

### Protected routes (need header `Authorization: Bearer <token>`)

| Route | Who |
|---|---|
| `GET` projects / qualifications | public |
| `POST`, `PUT`, `DELETE` projects / qualifications | **admin** |
| `POST /api/contacts` | public (contact form) |
| `GET /api/contacts` | signed in – admin sees all, a user sees only their own |
| `GET/PUT/DELETE /api/contacts/:id`, `DELETE /api/contacts` | **admin** |
| `POST /api/users` | public (sign up – role is always `user`) |
| `GET /api/users`, `DELETE /api/users` | **admin** (delete-all keeps admin accounts) |
| `GET/PUT/DELETE /api/users/:id` | that same user, or an admin (only an admin can change `role`) |

Without a token → `401`; signed in without the right role → `403`.

Passwords are stored as a salted HMAC hash (`hashed_password` + `salt`) and never returned by the API.

## Testing with Postman

Import `Portfolio_API.postman_collection.json`. Run `npm run seed` first, then run the collection in order: **Sign up → Sign in** (saves the user `token`) → **Sign in as ADMIN** (saves `adminToken`) → **POST project as USER** (expects 403). Admin-only requests use `{{adminToken}}` automatically.
Note: the collection's "DELETE all" requests empty those collections – run `npm run seed` again afterwards to restore the starter entries.
