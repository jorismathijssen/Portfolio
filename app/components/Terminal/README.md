# Terminal Feature

This folder contains the interactive floating terminal and related components/effects for your portfolio site.

## Usage
- The terminal can be opened by clicking the minimized button in the bottom right.
- Type `help` for a list of fun and crazy commands.
- Visual effects (matrix, confetti, invert, etc.) can be triggered by commands.
- The terminal supports dark/light mode and is accessible on desktop and mobile.

## Components
- `Terminal.tsx`: Main terminal UI and state.
- `Toaster.tsx`: Popup inviting users to try the terminal.
- `effects.ts`: Matrix/confetti and other visual effect helpers.
- `commands.ts`: Command definitions and help text.

## Customization
- Add or edit commands in `commands.ts`.
- Adjust effect visuals in `effects.ts`.
- Style using Tailwind or a CSS module (see `terminal.module.css`).

## Accessibility
- All interactive elements are keyboard accessible.
- ARIA labels and roles are used where appropriate.

## Example Commands
- `help`, `about`, `skills`, `clear`, `sl`, `joke`, `ascii`, `hack`, `rick`, `matrix`, `cat`, `invert`, `shake`, `rainbow`, `dark`, `light`, `party`

---

For more details, see inline comments in each file.
