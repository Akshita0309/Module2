# Blog App

A modern blog application built with React, Redux Toolkit, and Vite. Create, edit, view, and interact with blog posts—all with data persisted in local storage.

## Features

- **Create Posts** - Write and publish new blog posts
- **Edit Posts** - Update existing posts
- **View Posts** - Read posts in a dedicated view
- **Delete Posts** - Remove posts you no longer need
- **Like Posts** - Interact with posts through likes
- **Persistent Storage** - All data is saved to local storage

## Tech Stack

- **React 18** - UI library
- **Redux Toolkit** - State management
- **React Router v7** - Client-side routing
- **Vite** - Build tool and dev server

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

2. Install dependencies:

   npm install

3. Start the development server:

   npm run dev

## Available Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start development server |
| `npm run build`   | Build for production     |
| `npm run preview` | Preview production build |

## Project Structure

```
src/
├── app/
│   └── store.js          # Redux store configuration
├── components/
│   ├── Navbar.jsx        # Navigation component
│   ├── PostCard.jsx      # Post display card
│   └── PostForm.jsx      # Form for creating/editing posts
├── features/
│   └── posts/
│       └── postsSlice.js # Redux slice for posts
├── pages/
│   ├── Home.jsx          # Home page with post list
│   ├── CreatePost.jsx    # Create new post page
│   ├── EditPost.jsx      # Edit existing post page
│   └── ViewPost.jsx      # View single post page
├── utils/
│   └── localStorage.js   # Local storage utilities
├── app.jsx               # Main app component with routing
├── main.jsx              # Application entry point
└── index.css             # Global styles
```
