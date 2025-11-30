# Professional Git Workflow Guide

This project uses a standardized git workflow to ensure code quality, consistent commit history, and automated releases.

## 1. The Setup

We use the following tools to enforce best practices:

*   **Husky**: Manages Git hooks (runs scripts before you commit).
*   **Commitlint**: Checks if your commit messages follow the standard format.
*   **Standard Version**: Automates versioning and changelog generation.

## 2. How to Commit

You **must** follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. If you don't, the commit will be rejected.

**Format:**
```
type(scope): subject
```

**Common Types:**
*   `feat`: A new feature
*   `fix`: A bug fix
*   `docs`: Documentation changes
*   `style`: Formatting, missing semi-colons, etc.
*   `refactor`: Code change that neither fixes a bug nor adds a feature
*   `chore`: Maintainance tasks, dependency updates, etc.

**Examples:**
```bash
git commit -m "feat: add dark mode toggle"
git commit -m "fix(nav): resolve mobile menu crash"
git commit -m "chore: update gitignore"
```

## 3. How to Release & Generate Changelog

We use `standard-version` to handle releases. **Do not manually edit `package.json` version or `CHANGELOG.md`.**

To create a new release:

```bash
npm run release
```

**What this does:**
1.  Bumps the version in `package.json` (based on your commit history).
2.  Updates `CHANGELOG.md` with all new features and fixes.
3.  Commits these changes.
4.  Creates a git tag (e.g., `v1.1.0`).

**Specific Release Types:**
If you want to force a specific version bump:
*   `npm run release:patch` (1.0.0 -> 1.0.1)
*   `npm run release:minor` (1.0.0 -> 1.1.0)
*   `npm run release:major` (1.0.0 -> 2.0.0)

## 4. How to Push

After you commit or release, push your changes to the server.

**Normal Push:**
```bash
git push
```

**Pushing a Release (Important):**
When you run a release, it creates a tag. You must push the tags for them to appear on GitHub.

```bash
git push --follow-tags
```
