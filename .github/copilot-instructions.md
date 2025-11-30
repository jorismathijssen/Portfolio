# Portfolio Project - AI Agent Instructions

## Architecture Overview

This is a Next.js 15 portfolio website with an **interactive terminal system** as its centerpiece feature. The architecture follows component composition patterns with extensive use of custom hooks for business logic extraction and strict TypeScript implementation.

### Core Systems

**Terminal Command System** (`app/components/Terminal/`):
- Central feature with 17+ interactive commands (help, matrix, party, etc.)
- Commands defined in `commands.ts` with metadata, categories, and validation via Zod schemas
- Visual effects system (`effects.ts`) for Matrix rain, confetti particles, screen shake
- Canvas cleanup pattern: `canvas._matrixCleanup = startMatrix(canvas)` to prevent memory leaks
- Custom hooks: `useTerminalEffects`, `useAutoScroll`, `useKeyboardShortcuts`

**Internationalization** (`lib/i18n.ts`):
- i18next with browser language detection, localStorage persistence
- Supports EN/NL with namespace organization, static + dynamic loading
- Type-safe utilities via custom `useI18n` hook and `I18nUtils` namespace
- Translation pattern: `const { t } = useTranslation()` (never import i18n directly)

**Theme System**:
- CSS custom properties in `globals.css` for design tokens (never inline styles)
- `next-themes` integration with centralized `useDarkMode` hook
- Terminal commands control themes: `dark`, `light`, `invert`, `shake`, `rainbow`

**Error Handling Architecture**:
- Multi-level `ErrorBoundary` components: page → section → component
- Graceful fallback UIs with accessibility compliance
- Development vs production error reporting with error IDs

## Key Development Patterns

### Component Architecture (TypeScript-First)
```tsx
// Standard component structure - ALL components follow this pattern
interface ComponentProps extends BaseComponentProps, AccessibleProps {
  /** Comprehensive JSDoc with examples */
  variant?: 'primary' | 'secondary';
}

// Always: ARIA attributes, semantic HTML, memoized styling
const Component = ({ className, ...props }: ComponentProps) => {
  const classes = useMemo(() => clsx(
    'base-styles',
    variantStyles[variant],
    className
  ), [variant, className]);
  
  return <div className={classes} aria-label="..." />;
};
```

### Custom Hook Pattern (Business Logic Extraction)
All business logic lives in custom hooks (`app/hooks/`):
- `useTerminalEffects` - Canvas animations with mandatory cleanup functions
- `useAutoScroll` - Performance-optimized with `prefers-reduced-motion` support
- `useDarkMode` - Theme state with system preference detection
- Pattern: Extract stateful logic, return memoized values, handle cleanup

### Translation & Type Safety
```tsx
// Always use hooks, never direct imports
const { t } = useTranslation();

// Complex translations with JSX components
<Trans i18nKey="about.scrum" components={{ 1: <a href="..." /> }} />

// Type-safe translation keys via namespace organization
t("terminal.commands.help") // ✅ Type-checked via i18n setup
```

### Styling Standards (Zero Inline Styles)
```tsx
// ✅ Correct: Tailwind + clsx + CSS custom properties
const buttonClasses = clsx(
  'bg-primary text-primary-foreground', // Design tokens
  'hover:bg-primary/90 transition-colors', // Interaction states
  'focus:ring-2 focus:ring-ring focus:outline-none', // Accessibility
  className
);

// ❌ Never: Inline styles break design system
style={{ backgroundColor: '#000' }} // Violates architecture
```

## Development Workflow

### Essential Commands
- `npm run dev` - Development server with hot reload + type checking
- `npm run build` - Production build (generates standalone output for Docker)
- `npm run lint` - ESLint with strict TypeScript rules (zero tolerance)
- `npm run analyze` - Bundle analysis via webpack-bundle-analyzer
- `npm run build:prod` - Docker-optimized build with asset copying

### Documentation Policy
- **NO MARKDOWN FILES**: Do not create documentation files (.md) after changes
- Report implementation details and results in chat responses only
- Keep documentation inline in code comments and JSDoc where appropriate

### TypeScript Standards (Strict Mode)
```tsx
// ✅ Required: All components have comprehensive interfaces
interface ModalProps extends BaseComponentProps, AccessibleProps {
  /** Modal size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether clicking backdrop closes modal */
  closeOnBackdropClick?: boolean;
}

// ✅ Required: Proper typing for all hooks and utilities
const useMyHook = (): { value: string; setValue: (v: string) => void } => {
  // Implementation with full type coverage
};

// ❌ Forbidden: any types, implicit returns, missing interfaces
const badComponent = (props: any) => { /* No type safety */ };
```

### Package Management Philosophy
- **External packages must meet strict criteria**: 1M+ weekly downloads, TypeScript support, active maintenance
- **Approved packages**: `clsx`, `framer-motion`, `react-hook-form`, `zod`, `@radix-ui/*`
- **Integration pattern**: Always wrap external libraries with typed adapters
- **Security**: Regular `npm audit` and dependency updates required

### File Organization & Architecture
```
app/
├── components/Terminal/     # Terminal system (commands, effects, UI components)
├── hooks/                  # Business logic extraction (ALL logic goes here)
├── constants/              # Application constants (`DEFAULTS`, `Z_INDEX`, etc.)
├── types/                  # Shared TypeScript interfaces (`BaseComponentProps`)
├── lib/                    # Utilities (i18n, validations, utils)
│   ├── i18n.ts            # Complete i18next setup with type safety
│   ├── utils.ts           # cn() utility for class merging
│   └── validations.ts     # Zod schemas for all data validation
public/locales/            # Translation files (en/, nl/) - ALWAYS update both
```

### Directory Standards Applied
- **Components**: Only UI logic, business logic extracted to hooks
- **Hooks**: Complete separation of concerns, proper cleanup patterns
- **Constants**: Centralized configuration (see `app/constants/index.ts`)
- **Types**: Comprehensive interfaces extending `BaseComponentProps` + `AccessibleProps`
- **Lib**: Pure utilities, i18n configuration, validation schemas

## Critical Implementation Details

### Terminal Effects
Canvas effects (Matrix, confetti) use cleanup functions stored on canvas elements to prevent memory leaks:
```tsx
// Effects must be properly cleaned up
const canvas = createEffectCanvas(id);
canvas._matrixCleanup = startMatrix(canvas);
```

### Hydration Safety
Components prevent SSR/client mismatches:
```tsx
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
if (!mounted) return <LoadingState />;
```

### Accessibility Standards
- All interactive elements have proper ARIA labels
- Focus trap management in modals
- Skip navigation links for screen readers
- Keyboard navigation support (Arrow keys, Tab, Escape, Enter)

### Performance Optimizations
- `clsx` for conditional styling (never inline styles)
- Memoized class name generation with `useMemo`
- Component memoization with `React.memo` where appropriate
- Bundle analysis and code splitting via Next.js

## Common Gotchas

1. **Terminal Commands**: Add new commands to both `COMMANDS` object and `TerminalCommandSchema` in `commands.ts`
2. **Translations**: Always add keys to both `en/translation.json` and `nl/translation.json`
3. **Effects**: Canvas effects need cleanup functions to prevent memory leaks
4. **Styling**: Use Tailwind classes and CSS custom properties, avoid inline styles
5. **TypeScript**: Strict mode enabled - all components need proper interface definitions

## Testing Strategy

Currently minimal testing setup. When adding tests:
- Focus on terminal command execution and effects cleanup
- Test i18n language switching and fallbacks
- Verify accessibility with screen reader simulation
- Test error boundary recovery scenarios
