# Contributing Guide

This project follows a strict **Conventional Commits** workflow to automate versioning and changelog generation.

## Commit Message Format

All commit messages must follow this format:

```
type(scope): subject
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Examples

- `feat(ui): add new button component`
- `fix(api): handle timeout error`
- `chore: update dependencies`

## Release Process

To create a new release (version bump + changelog update), run:

```bash
npm run release
```

This will:
1. Bump the version in `package.json`
2. Update `CHANGELOG.md`
3. Commit the changes
4. Create a git tag

For specific release types:
- `npm run release:minor` (1.0.0 -> 1.1.0)
- `npm run release:patch` (1.0.0 -> 1.0.1)
- `npm run release:major` (1.0.0 -> 2.0.0)
