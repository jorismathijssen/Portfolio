# Git Workflow

## Branching Strategy
- **main**: Production-ready code. Deployed automatically to production.
- **dev**: Integration branch. All features are merged here first.
- **feat/name**: Feature branches. Created from `dev`.
- **fix/name**: Bug fix branches. Created from `dev` (or `main` for hotfixes).

## Commit Convention
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

## Automated Checks (Husky)
We use **Husky** to enforce quality standards before every commit.

### Pre-commit Hook
When you run `git commit`, the following checks run automatically:
1.  **Linting**: `eslint --fix` runs on all staged files. If it can fix the error, it will stage the change. If not, the commit fails.
2.  **Tests**: `npm test` runs to ensure no regressions.

**If any check fails, the commit is blocked.** Fix the errors and try again.

## Pull Requests
1.  Create a PR from your feature branch to `dev`.
2.  Ensure all CI checks pass.
3.  Request a review.
4.  Squash and merge.
