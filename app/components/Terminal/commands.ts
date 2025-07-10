// Terminal command definitions and help text

export type TerminalCommand =
  | 'help'
  | 'about'
  | 'skills'
  | 'clear'
  | 'sl'
  | 'joke'
  | 'ascii'
  | 'hack'
  | 'rick'
  | 'matrix'
  | 'cat'
  | 'invert'
  | 'shake'
  | 'rainbow'
  | 'dark'
  | 'light'
  | 'party';

export const COMMANDS: Record<TerminalCommand, string> = {
  help: 'Available commands: help, about, skills, clear, sl, joke, ascii, hack, rick, matrix, cat, invert, shake, rainbow, dark, light, party',
  about: 'Joris Mathijssen - C# Developer at 9292. Passionate about APIs and public transport tech.',
  skills: 'C#, .NET, TypeScript, React, Next.js, Azure, REST APIs',
  clear: '',
  sl: '🚂🚃🚃🚃\n    Choo Choo! (Type "clear" to reset)',
  joke: 'Why do programmers prefer dark mode? Because light attracts bugs!',
  ascii: '¯\\_(ツ)_/¯\n(\"._.\")',
  hack: 'Accessing mainframe...\nPassword: ********\nAccess granted!\nWelcome, Agent 47.',
  rick: 'Never gonna give you up, never gonna let you down... 🎶',
  matrix: 'Matrix effect activated! Type "clear" to stop.',
  cat: 'Meow! 🐱 Here is a virtual cat for you.',
  invert: 'Inverting colors! Type "invert" again to undo.',
  shake: 'Shaking the page! Type "shake" again to stop.',
  rainbow: 'Rainbow mode activated! Type "rainbow" again to turn off.',
  dark: 'Dark mode enabled!',
  light: 'Light mode enabled!',
  party: 'Confetti party! Type "clear" to clean up.',
};
