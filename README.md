# News Reader

A modern, performant web application that provides a Flipboard-like, single-article viewing experience. The project consists of a React + Vite frontend and a secure Node.js (Express) proxy backend to safely interact with TheNewsAPI without exposing your API tokens.

## Features

- **Single-Article View:** A focused, clean reading experience displaying one featured article card at a time.
- **Smart Filters:** Browse headlines by various categories (tech, science, sports, business, etc.) or search for specific recent news.
- **Responsive Layout:** Automatically scales its layout to ensure content, images, and the pager fit securely within the window without vertical page scrolling. Mobile-friendly with a toggleable sidebar.
- **Performance Optimized:** Includes in-memory caching and intelligent prefetching of next and previous pages for instant, flash-free navigation.
- **Favorites System:** Save your favorite articles locally via `localStorage` and view them separately at any time.
- **Secure Backend Proxy:** API tokens remain hidden from the client browser inside the Express proxy.

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Vanilla CSS
- **Backend:** Node.js, Express, dotenv, cors
- **API:** [TheNewsAPI](https://thenewsapi.com/)

## Getting Started

### 1. Install Dependencies
Run the installation script to set up both the backend server and the frontend web app at the same time:
```bash
npm run install:all
```

### 2. Configure Environment Variables
Copy the `.env.example` file in the `server` directory to create a `.env` file:
```bash
cp server/.env.example server/.env
```
Then, insert your `THENEWSAPI_TOKEN` into `server/.env`. **Never commit real tokens or secrets to version control.**

### 3. Run the Development Server
You can run both the frontend and backend servers concurrently using the root package.json:
```bash
npm run dev
```
- The Vite frontend will be available at: `http://localhost:5176`
- The Express proxy server runs on: `http://localhost:5177`

## Project Structure

- `/web`: The React + Vite + TypeScript frontend.
- `/server`: The Express proxy server that forwards requests securely to TheNewsAPI.
- `/package.json`: Root scripts that run and manage both directories.
