# Mark Perez – React Portfolio

Personal portfolio site built with **React 18**, **React Router 6** and **Vite** for COMP229 Assignment 1.

## Pages
Home · About Me · Projects · Education · Services · Contact Me

## Run locally
```bash
npm install
npm run dev      # start dev server at http://localhost:5173
npm run build    # production build into /dist
npm run lint     # check code for errors
```

## Deploy
Import the GitHub repo into **Vercel** (or Netlify). Framework preset: *Vite*, build command `npm run build`, output folder `dist`.
`vercel.json` / `public/_redirects` make page refreshes on routes like `/about` work.
