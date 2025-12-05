# Changelog

## [Unreleased]

### [1.0.0] - 2025-12-05

### Added
- **Blog Section**: Full MDX-based blog with internationalization support.
- **Project Case Studies**: Detailed project pages with dynamic routing.
- **Interactive Elements**: Framer Motion animations for Hero, About, and Work sections.
- **Newsletter**: Subscription form with API route and footer integration.
- **Analytics**: Self-hosted Umami analytics via Docker.
- **CMS**: Directus Headless CMS integration via Docker.
- **Testing**: Comprehensive unit tests (Jest) and E2E tests (Playwright).
- **Documentation**: Updated README with self-hosting instructions.

### Changed
- Refactored project structure for better scalability.
- Improved accessibility across the entire site.
- Optimized performance with server components and static generation.

## [0.1.0] - 2025-11-28

### Added

- **Command Palette**: `Cmd+K` support with visible search button.
- **API View**: Toggleable JSON view of the portfolio data.
- **Testing**: Jest (Unit) and Playwright (E2E) setup.
- **CI/CD**: Husky pre-commit hooks.
- **Docker**: Multi-stage `Dockerfile` for standalone output.
- **Best Practices**:
  - Added GitHub Actions CI workflow.
  - Configured Prettier with Tailwind CSS sorting.
  - Improved ESLint configuration.
  - Updated Playwright configuration for easier testing.

### Changed

- **Architecture**: Rebuilt with Next.js 15 (App Router), TypeScript, and Tailwind CSS.
- **Design**: "Backend-inspired" aesthetic with terminal boot sequence.
- **Docs**: Updated deployment and contribution guides.

### Removed

- Legacy static site files.
