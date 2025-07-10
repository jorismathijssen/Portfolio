# Terminal Component Refactor & Best Practices TODO

This document outlines a detailed plan to refactor and improve the `Terminal.tsx` component and related code for maintainability, scalability, and best practices. Use this as a reference for future improvements or onboarding contributors.

---

## 2. TypeScript & Typing
- **Goal:** Improve type safety and developer experience.
- **Tasks:**
  - Add a type/interface for commands, e.g.:
    ```ts
    export type TerminalCommand = 'help' | 'about' | 'skills' | ...;
    export const COMMANDS: Record<TerminalCommand, string> = { ... };
    ```
  - Type all function parameters and return values.
  - Fix the TypeScript warning for command indexing (no implicit any).

## 3. State & Effects
- **Goal:** Isolate logic and improve code clarity.
- **Tasks:**
  - Create a custom hook for dark mode detection (`useDarkMode`).
  - Create a custom hook for auto-scrolling terminal output.
  - Move toaster state and logic into its own component.
  - Ensure all event listeners are properly cleaned up in `useEffect`.

## 4. Styling
- **Goal:** Use consistent, maintainable styles.
- **Tasks:**
  - Move inline styles to CSS modules or Tailwind classes.
  - Use conditional classNames for dark/light mode and minimized/open states.
  - Ensure minimized terminal button matches the sun button in dark mode (background: `#1f2937`).
  - Keep the minimized button black in light mode.
  - Extract modal styles to CSS module or Tailwind config for reusability.
  - Audit global styles for unused rules and document customizations (fonts, colors, etc.).

## 5. Accessibility & Usability
- **Goal:** Make the terminal, toaster, and modal accessible to all users.
- **Tasks:**
  - Ensure all interactive elements are keyboard accessible (tab order, focus outlines).
  - Add ARIA roles and labels where appropriate.
  - Add keyboard navigation for the minimized terminal button.
  - Ensure modal focus trap and Escape key close are tested and documented.
  - Add ARIA attributes for modal title/content if dynamic.

## 6. Code Cleanliness
- **Goal:** Reduce repetition and improve maintainability.
- **Tasks:**
  - Refactor effect logic into smaller, reusable functions in `effects.ts`.
  - Use `useCallback` and `useMemo` where appropriate for performance.
  - Remove any dead or unused code.
  - Add JSDoc comments for all exported functions and components.
  - Clean up any references to removed analytics (see `lib/appInsights.ts`).

## 7. Performance
- **Goal:** Ensure smooth UI and efficient code.
- **Tasks:**
  - Debounce resize events for effects if needed.
  - Optimize event listener cleanup.
  - Optimize images in `public/` (compression, correct sizes).
  - Ensure font files are subsetted and optimized for performance.

## 8. Testing
- **Goal:** Ensure reliability and prevent regressions.
- **Tasks:**
  - Add unit tests for command parsing and effect helpers.
  - Add component tests for Terminal, Toaster, and Modal (e.g., using React Testing Library).
  - Add accessibility tests for modal and keyboard navigation.

## 9. Documentation & Onboarding
- **Goal:** Make the codebase easy to understand and contribute to.
- **Tasks:**
  - Document the purpose of each top-level file/folder (e.g., `lib/`, `nginx.conf`, `Dockerfile`).
  - Add onboarding notes for environment setup (e.g., Docker, Nginx, CI/CD).
  - Add CONTRIBUTING.md for onboarding contributors.
  - Add CHANGELOG.md for tracking changes.
  - Document environment variables and secrets management.
  - Add alt text and usage documentation for each image in `public/`.
  - Document favicon and manifest usage for PWA support.

## 10. Deployment Improvements
- **Goal:** Ensure safe, reliable, and high-uptime deployments.
- **Tasks:**
  - Update deployment pipeline to automatically cancel any running deployment if a new one is triggered (e.g., use GitHub Actions `concurrency` or similar in your CI/CD provider).
  - Research and implement a zero-downtime deployment strategy:
    - If using Vercel/Netlify: These platforms handle atomic swaps automatically for near-100% uptime.
    - If self-hosted (Docker, Nginx, etc.):
      - Use blue-green or canary deployment patterns.
      - Deploy new version to a separate environment, run health checks, then swap traffic (e.g., update Nginx config or use a load balancer).
      - Only switch live traffic after the new deployment passes health checks.
  - Document the chosen approach and any required configuration changes.

## 11. Modern Best Practices & npm Packages
- **Goal:** Make the project the best, most efficient, accessible, fastest, coolest, and modernest possible.
- **Tasks:**
  - Research and use modern npm packages for accessibility, performance, and developer experience (e.g., `react-aria`, `react-hook-form`, `zod`, `clsx`, `next-seo`, `next-pwa`, `react-testing-library`, `jest`, `msw`, `axe-core`, etc.).
  - Use code-splitting and dynamic imports for faster load times.
  - Add bundle analysis and optimize for minimal JS/CSS.
  - Use automated accessibility testing tools (e.g., `axe-core`, `jest-axe`).
  - Implement PWA features (offline support, manifest, service worker) with `next-pwa`.
  - Add SEO enhancements with `next-seo`.
  - Use environment variable management tools (e.g., `dotenv`, `env-cmd`).
  - Add error monitoring and logging (e.g., `sentry`, `logrocket`).
  - Use Husky and lint-staged for pre-commit hooks and code quality.
  - Keep all dependencies up to date and audit for vulnerabilities.
  - Document and automate all best practices for onboarding and CI/CD.

---

## Example File Structure
```
app/
  globals.css
  layout.tsx
  page.tsx
  providers.tsx
  components/
    Modal.tsx
    ProjectCard.tsx
    ThemeSwitcher.tsx
    Timeline.tsx
    Terminal/
      Terminal.tsx
      Toaster.tsx
      effects.ts
      commands.ts
      CookieConsentBanner.tsx
      README.md
public/
  4.webp
  android-chrome-192x192.png
  android-chrome-512x512.png
  apple-touch-icon.png
  favicon-16x16.png
  favicon-32x32.png
  favicon.ico
  site.webmanifest
  fonts/
    GeistMonoVF.woff
    GeistVF.woff
lib/
  appInsights.ts
Dockerfile
docker-compose.yml
nginx.conf
LICENSE.TXT
next.config.mjs
package.json
postcss.config.mjs
README.md
tailwind.config.ts
tsconfig.json
TODO.md
```

---

## How to Use This Document
- Use this checklist to guide a full or partial refactor.
- Each section can be picked up independently.
- Reference this file for onboarding or when making future improvements.
