# Terminal Component Refactor & Best Practices TODO

This document outlines a detailed plan to refactor and improve the `Terminal.tsx` component and related code for maintainability, scalability, and best practices. Use this as a reference for future improvements or onboarding contributors.

---

## 1. Component Structure & Splitting
- **Goal:** Separate concerns for maintainability and reusability.
- **Tasks:**
  - Move the Toaster popup into its own file: `Toaster.tsx`.
  - Move effect logic (matrix, confetti, etc.) into `effects.ts`.
  - Move command definitions and help text into `commands.ts`.
  - Keep `Terminal.tsx` focused on UI and state management.
  - Consider a folder structure like:
    ```
    app/components/Terminal/
      Terminal.tsx
      Toaster.tsx
      effects.ts
      commands.ts
      terminal.module.css (or Tailwind classes)
    ```

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

## 5. Accessibility & Usability
- **Goal:** Make the terminal and toaster accessible to all users.
- **Tasks:**
  - Ensure all interactive elements are keyboard accessible (tab order, focus outlines).
  - Add ARIA roles and labels where appropriate.
  - Add keyboard navigation for the minimized terminal button.

## 6. Code Cleanliness
- **Goal:** Reduce repetition and improve maintainability.
- **Tasks:**
  - Refactor effect logic into smaller, reusable functions in `effects.ts`.
  - Use `useCallback` and `useMemo` where appropriate for performance.
  - Remove any dead or unused code.
  - Add JSDoc comments for all exported functions and components.

## 7. Performance
- **Goal:** Ensure smooth UI and efficient code.
- **Tasks:**
  - Debounce resize events for effects if needed.
  - Optimize event listener cleanup.

## 8. Testing
- **Goal:** Ensure reliability and prevent regressions.
- **Tasks:**
  - Add unit tests for command parsing and effect helpers.
  - Add component tests for Terminal and Toaster (e.g., using React Testing Library).

## 9. Documentation
- **Goal:** Make the codebase easy to understand and contribute to.
- **Tasks:**
  - Add inline documentation and comments.
  - Add a README section for the terminal feature, including usage, commands, and customization.

---

## Example File Structure
```
app/components/Terminal/
  Terminal.tsx
  Toaster.tsx
  effects.ts
  commands.ts
  terminal.module.css
```

---

## How to Use This Document
- Use this checklist to guide a full or partial refactor.
- Each section can be picked up independently.
- Reference this file for onboarding or when making future improvements.
