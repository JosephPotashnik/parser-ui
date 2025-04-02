# Earley Parser UI

A React-based user interface for interacting with an **Earley Parser server** via a REST API, which must be running to test full functionality.  
You can clone it <a href="https://github.com/JosephPotashnik/EarleyParserREST"> here </a>

## Features

- User-friendly interface for sending parsing requests
- Displays parsed results from the Earley Parser backend
- Built with **React**, **Vite**, and **TypeScript**
- Styled using **Tailwind CSS**
- Fast and lightweight frontend optimized for performance

## Installation & Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) (Comes with Node.js) or [yarn](https://yarnpkg.com/)

### Steps

1. Clone the repository:

   ```sh
   git clone <repo-url>
   cd parser-ui
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

## Project Structure

```
parser-ui/
│── src/                  # Source code
│   ├── components/       # Reusable UI components
│   ├── pages/            # Application pages
│   ├── api/              # API client functions
│   ├── hooks/            # Custom React hooks
│   ├── App.tsx           # Main application entry point
│   ├── main.tsx          # React entry point
│── public/               # Static assets
│── index.html            # Root HTML file
│── package.json          # Project configuration
│── tailwind.config.ts    # Tailwind CSS configuration
│── tsconfig.json         # TypeScript configuration
│── vite.config.ts        # Vite configuration
```

## Environment Variables

If the parser backend requires an API key or runs on a configurable URL, create a `.env` file in the root directory, or modify the url/port accordingly in the code.

```
VITE_API_URL=http://localhost:5000
```

Replace the URL with the actual backend server URL if necessary.

## Available Scripts

- **`npm run dev`** – Start the development server
- **`npm run build`** – Build the project for production
- **`npm run preview`** – Preview the production build
- **`npm run lint`** – Run ESLint on the codebase

## Deployment

To build and deploy the app:

```sh
npm run build
```

This generates a `dist/` folder with the production-ready files.  
You can deploy it using services like **Vercel, Netlify, or Render**.


## License

[MIT](LICENSE)
