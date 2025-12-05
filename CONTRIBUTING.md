# Contributing to Portfolio

Thank you for your interest in contributing!

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/jorismathijssen/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser.

## Testing
We use **Jest** for unit tests and **Playwright** for E2E tests.

- Run unit tests: `npm test`
- Run E2E tests: `npx playwright test`

## Code Quality
- **Linting**: Run `npm run lint` to check for style issues.
- **Pre-commit Hooks**: Husky is configured to run tests and linting automatically before you commit.

## Project Structure
- `src/app`: Next.js App Router pages.
- `src/components`: Reusable UI components.
- `src/lib`: Utility functions and data.
- `src/i18n`: Internationalization configuration.
- `messages`: Translation files (en.json, nl.json).
