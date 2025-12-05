# Portfolio App

A modern, high-performance portfolio application built with Next.js 15, React 19, and Tailwind CSS 4.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Internationalization**: Built-in support for English and Dutch (`next-intl`).
- **Blog & Case Studies**: MDX-based content management for articles and projects.
- **Interactive UI**: Smooth animations and transitions powered by Framer Motion.
- **Self-Hosted Stack**: Dockerized setup for Analytics (Umami) and CMS (Directus).
- **Newsletter**: Integrated subscription form.
- **Accessibility**: Tested and optimized for a11y compliance.
- **Testing**: Robust suite of Unit (Jest) and E2E (Playwright) tests.io/) (Unit) & [Playwright](https://playwright.dev/) (E2E)
- **Linting & Formatting:** ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   npm install --legacy-peer-deps
   ```

   > Note: `--legacy-peer-deps` is currently required due to a peer dependency conflict between `eslint-plugin-tailwindcss` and `tailwindcss` v4.

3. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run test`: Runs Jest unit tests.
- `npm run test:watch`: Runs Jest in watch mode.
- `npx playwright test`: Runs Playwright end-to-end tests.

## Analytics (Self-Hosted)

This project includes a pre-configured setup for [Umami](https://umami.is), a privacy-focused, self-hosted analytics solution.

### Setup

1.  Start the analytics stack:
    ```bash
    docker-compose up -d umami db
    ```
2.  Access the dashboard at `http://localhost:3001`.
    - Default login: `admin` / `umami`
3.  Create a new website in Umami and get the **Website ID**.
4.  Add the ID to your `.env.local` file:
    ```bash
    NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id-here
    NEXT_PUBLIC_UMAMI_URL=http://localhost:3001/script.js
    ```
5.  Rebuild/restart your Next.js app.

## CMS (Self-Hosted)

This project integrates [Directus](https://directus.io) as a Headless CMS.

### Setup

1.  Start the CMS stack:
    ```bash
    docker-compose up -d directus db
    ```
2.  Access the admin panel at `http://localhost:8055`.
    - Default login: `admin@example.com` / `admin`
3.  **Important**: You will need to create the `directus` database manually in Postgres if it doesn't exist, or configure Directus to use the existing `umami` DB (not recommended for production but fine for testing).
    - To create the DB: `docker-compose exec db createdb -U umami directus` (assuming you use the same postgres user).
4.  Create your collections (e.g., `posts`, `projects`) in the Directus Admin App.

## Docker

To run the application using Docker:

```bash
docker compose up -d --build
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/app`: App Router pages and layouts.
- `src/components`: Reusable UI components.
- `src/lib`: Utility functions and shared logic.
- `src/hooks`: Custom React hooks.
- `src/types`: TypeScript type definitions.
- `src/i18n`: Internationalization configuration.
- `tests`: Playwright E2E tests.

## CI/CD

This project uses GitHub Actions for CI/CD.

- **CI**: Runs on every push to `main` and `develop`. Checks linting, types, unit tests, and builds the app.
- **Deploy**: Deploys to VPS on push to `main`.
