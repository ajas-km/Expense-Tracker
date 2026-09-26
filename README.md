# Spendly - Personal Expense Tracker

Spendly is a responsive React expense tracker for recording income and expenses, reviewing spending habits, and viewing financial summaries and charts.

## Features

- First-use welcome flow that stores the user's display name locally
- Add, edit, and delete income or expense transactions
- Search and filter by category, type, and date range
- Summary cards for income, expenses, and balance
- Spending-by-category, monthly comparison, and spending-trend charts
- Responsive desktop and mobile layout
- Browser persistence with LocalStorage - no account or backend required

## Tech stack

- React + Vite
- React Router
- Context API
- Tailwind CSS
- Recharts
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## Build for production

```bash
npm run build
npm run preview
```

## Environment variables

No environment variables are needed. The included `.env.example` is a placeholder for future public Vite configuration. Do not commit a real `.env` file.

## Data storage

Transactions and the display name are stored only in the current browser using LocalStorage. Clearing site data, using a different browser profile, or changing devices starts a new local data set.
