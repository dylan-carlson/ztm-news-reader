# News Reader

A beautifully designed, performant web application that provides a premium Flipboard-like, single-article viewing experience. The project consists of a React + Vite frontend and a secure Node.js (Express) Serverless Function backend proxy to safely interact with TheNewsAPI without exposing your API tokens.

## Features

- **Premium UI:** A modern "Glassmorphism" aesthetic with a sleek dark mode, vibrant cyan accents, full-background image article cards, and custom circular pagination.
- **Single-Article View:** A focused, clean reading experience displaying one featured article card at a time.
- **Smart Filters:** Browse headlines by various categories (tech, science, sports, business, etc.) or search for specific recent news.
- **Responsive Layout:** Automatically scales its layout to ensure content, images, and the pager fit securely within the window without vertical page scrolling. Mobile-friendly with a toggleable sidebar.
- **Performance Optimized:** Includes in-memory caching and intelligent prefetching of next and previous pages for instant, flash-free navigation.
- **Favorites System:** Save your favorite articles locally via `localStorage` and view them separately at any time.
- **Secure Backend Proxy:** API tokens remain hidden from the client browser inside the Express proxy (which is ready to be deployed instantly as a Vercel Serverless Function).

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Vanilla CSS
- **Backend:** Node.js, Express, dotenv, cors (Vercel Serverless Function)
- **API:** [TheNewsAPI](https://thenewsapi.com/)

## Getting Started

### 1. Install Dependencies
Run the installation script to set up both the backend server dependencies and the frontend web app at the same time:
```bash
npm run install:all
```

### 2. Configure Environment Variables
Copy the `.env.example` file in the root directory to create a `.env` file:
```bash
cp .env.example .env
```
Then, insert your `THENEWSAPI_TOKEN` into `.env`. **Never commit real tokens or secrets to version control.**

### 3. Run the Development Server
You can run both the frontend and backend servers concurrently using the root package.json:
```bash
npm run dev
```
- The Vite frontend will be available at: `http://localhost:5176`
- The Express proxy server runs on: `http://localhost:5177`

## Deployment

This repository is pre-configured for instant deployment on **Vercel**:
1. Push this repository to GitHub.
2. Import the project into Vercel.
3. Add your `THENEWSAPI_TOKEN` to the Vercel Environment Variables.
4. Deploy. Vercel automatically routes the `/api` directory as Serverless Functions and builds the `web` frontend based on the `vercel.json` configuration.

## Project Structure

- `/web`: The React + Vite + TypeScript frontend.
- `/api`: The Express Serverless Function proxy that forwards requests securely to TheNewsAPI.
- `/vercel.json`: Vercel routing and build configuration.
- `/package.json`: Root scripts that run and manage the entire monorepo.
