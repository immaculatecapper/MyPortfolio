# MyPortfolio – COMP229 Assignment 2

Mark Perez's portfolio: React + Vite frontend (Assignment 1, in `client/`) with a Node.js / Express REST API backed by MongoDB (Mongoose) and JWT authentication.

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
│   └── helpers/dbErrorHandler.js
├── client/                   # React frontend from Assignment 1
└── Portfolio_API.postman_collection.json
```

## Setup

```bash
# 1. backend dependencies (in the MyPortfolio root)
npm install

# 2. create .env from the example and paste your MongoDB Atlas connection string
#    (make sure the database name in the URI is "Portfolio")
copy .env.example .env        # Windows   (cp .env.example .env on Mac/Linux)

# 3. frontend dependencies
cd client
npm install

# 4. run frontend (5173) and backend (3000) together
npm run dev
```

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

- **Users:** `GET /api/users/:id`, `DELETE /api/users`; `PUT` / `DELETE /api/users/:id` also require that the token belongs to that same user (otherwise 403).
- **Contacts:** everything except `POST` (the public contact form can submit, only a signed-in user can read/manage messages).
- **Projects / Qualifications:** `POST`, `PUT`, `DELETE` (reading is public).

Passwords are stored as a salted HMAC hash (`hashed_password` + `salt`) and never returned by the API.

## Testing with Postman

Import `Portfolio_API.postman_collection.json`. Run **1 - Auth → Sign up**, then **Sign in** – the token and IDs are saved to collection variables automatically, so every other request works in order.
Note: "DELETE all users" removes your login, so run Sign up + Sign in again afterwards if you need more requests.
