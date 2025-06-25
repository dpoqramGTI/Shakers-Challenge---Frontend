# Shakers Challenge - Frontend - Technical Test

**Author:** Daniel Poquet Ramirez

---

## Overview

This repository contains the frontend implementation of the Shakers technical test, built with Next.js and React. The app connects to the Shakers API to display and interact with projects dynamically, replacing any static data previously used.

---

## Prerequisites

- Node.js (version 16 or higher recommended)
- npm or yarn
- Backend API running locally at `http://localhost:3001`

---

## Environment Variables

Create a `.env` file in the root of the project with the following content:

NEXT_PUBLIC_API_URL=http://localhost:3001


This environment variable points to the backend API URL.


## Installation

```bash
npm install
```

# or

```bash
yarn install
```

## Running Locally

```bash
npm run dev
```

# or

```bash
yarn dev
```

## Building for Production

```bash
npm run build
```

# or

```bash
yarn build
```

## Starting the Production Server Locally

```bash
npm start
```

# or

```bash
yarn start
```

## Additional Notes

- The frontend communicates with the backend API specified in NEXT_PUBLIC_API_URL.

- Pagination, filters, and sorting are dynamically handled via the API.

- UI components have been designed with responsiveness and accessibility in mind.