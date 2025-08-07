/**
 * Terminal command definitions and processing
 */

import { z } from 'zod';
import { PORTFOLIO_INFO } from '@/app/data/portfolio';
import { TERMINAL_RESPONSES } from '@/app/data/terminal-content';
import { trackTerminalCommand } from '@/app/lib/analytics';

/**
 * Available terminal commands
 */
export type TerminalCommand =
  | 'help'
  | 'about'
  | 'skills'
  | 'projects'
  | 'contact'
  | 'experience'
  | 'education'
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
  | 'party'
  | 'whoami'
  | 'date'
  | 'pwd'
  | 'ls'
  | 'version';

/**
 * Command category for organization and help display
 * 
 * @enum {string}
 * @since 1.0.0
 * @public
 */
export enum CommandCategory {
  /** Information and portfolio commands */
  INFO = 'info',
  /** Visual effects and fun commands */
  EFFECTS = 'effects',
  /** Theme and appearance commands */
  THEME = 'theme',
  /** System utility commands */
  SYSTEM = 'system',
  /** Entertainment commands */
  FUN = 'fun',
}

/**
 * Command metadata interface
 * 
 * @interface CommandMetadata
 * @since 1.0.0
 * @public
 */
export interface CommandMetadata {
  /** Command name */
  name: TerminalCommand;
  /** Brief description of what the command does */
  description: string;
  category: CommandCategory;
  usage?: string[];
  aliases?: string[];
  hasSideEffects: boolean;
}

/**
 * Validation schema for terminal commands
 */
const TerminalCommandSchema = z.enum([
  'help', 'about', 'skills', 'projects', 'contact', 'experience', 'education',
  'clear', 'sl', 'joke', 'ascii', 'hack', 'rick', 'matrix', 'cat',
  'invert', 'shake', 'rainbow', 'dark', 'light', 'party',
  'whoami', 'date', 'pwd', 'ls', 'version'
]);

/**
 * Enhanced command responses with comprehensive information
 */
export const COMMANDS: Record<TerminalCommand, string> = {
  // Information commands
  help: `📚 Available Commands:

🔍 Information:
  help        - Show this help message
  about       - Learn about ${PORTFOLIO_INFO.name}
  skills      - View technical skills and expertise
  projects    - Explore my development projects
  contact     - Get contact information
  experience  - View professional experience
  education   - See educational background
  whoami      - Display current user information
  
🎨 Effects & Fun:
  sl          - Classic steam locomotive animation
  joke        - Random developer humor
  ascii       - ASCII art display
  hack        - Simulate hacker interface
  rick        - You know what this does... 🎵
  matrix      - Enter the Matrix
  cat         - Virtual cat companion
  party       - Celebration mode
  
🎯 Theme Controls:
  dark        - Switch to dark mode
  light       - Switch to light mode
  invert      - Invert page colors
  shake       - Shake animation effect
  rainbow     - Rainbow color mode
  
⚙️ System:
  clear       - Clear terminal output
  date        - Show current date and time
  pwd         - Print working directory
  ls          - List directory contents
  version     - Show portfolio version
  
💡 Tip: Most commands are case-insensitive. Type any command to explore!`,

  about: `👨‍💻 About ${PORTFOLIO_INFO.name}

${PORTFOLIO_INFO.title} at ${PORTFOLIO_INFO.company}
📍 Based in ${PORTFOLIO_INFO.location}

🎯 Passionate about building robust, scalable APIs and innovative public transport technology solutions. I specialize in C# and .NET development, with extensive experience in cloud architecture and modern development practices.

🚀 Currently working on cutting-edge public transport solutions that help millions of users navigate efficiently through the Netherlands.

💡 Always exploring new technologies and methodologies to create better, more maintainable software.

📧 ${PORTFOLIO_INFO.email}`,

  skills: `🛠️ Technical Skills & Expertise:

💻 Programming Languages:
  • C# (.NET 6/7/8) - Primary expertise
  • TypeScript/JavaScript - Frontend development
  • SQL - Database design and optimization
  • PowerShell - Automation and DevOps

🏗️ Frameworks & Technologies:
  • ASP.NET Core - Web API development
  • Entity Framework Core - ORM and data access
  • React & Next.js - Modern frontend frameworks
  • Azure Services - Cloud-native development

☁️ Cloud & DevOps:
  • Microsoft Azure - Primary cloud platform
  • Docker & Kubernetes - Containerization
  • Azure DevOps - CI/CD pipelines
  • Git - Version control and collaboration

🔧 Specializations:
  • REST API design and implementation
  • Microservices architecture
  • Performance optimization
  • Public transport technology solutions

📈 Always learning: Currently exploring .NET 8 features and Azure AI services!`,

  projects: `🚀 Featured Projects:

${PORTFOLIO_INFO.projects.map(project => `  ${project}`).join('\n')}

🔗 Each project showcases different aspects of modern development:
  • Scalable backend architecture
  • Real-time data processing
  • Cloud-native deployment
  • Modern frontend technologies

💡 Want to know more about any specific project? Feel free to reach out!`,

  contact: `📬 Get In Touch:

📧 Email: ${PORTFOLIO_INFO.email}
🌐 Portfolio: jorismathijssen.nl
💼 LinkedIn: linkedin.com/in/jorismathijssen
🐙 GitHub: github.com/jorismathijssen

🤝 I'm always interested in:
  • Challenging development opportunities
  • Open source collaboration
  • Technology discussions
  • Knowledge sharing

📞 Available for freelance projects and consulting opportunities!`,

  experience: `💼 Professional Experience:

${PORTFOLIO_INFO.experience.map(exp => `  ${exp}`).join('\n')}

🎯 Key Achievements:
  • Improved API response times by 40% through optimization
  • Led migration of legacy systems to modern .NET architecture
  • Implemented real-time data processing for millions of requests
  • Mentored junior developers in modern development practices

🏆 Recognition:
  • Employee of the Month - Q3 2023
  • Technical Excellence Award - API Performance Project
  • Innovation Award - Real-time Transit Solutions`,

  education: `🎓 Education & Certifications:

${PORTFOLIO_INFO.education.map(edu => `  ${edu}`).join('\n')}

📜 Additional Certifications:
  • Microsoft Certified: Azure Fundamentals (AZ-900)
  • Microsoft Certified: Azure Developer Associate (AZ-204)
  • Certified Scrum Master (CSM)

📚 Continuous Learning:
  • Regular participation in developer conferences
  • Active in .NET and Azure communities
  • Contributor to open-source projects
  • Technical blog writing and knowledge sharing`,

  // System commands
  clear: '',
  whoami: `${PORTFOLIO_INFO.name}@portfolio:~$ 
👤 User: ${PORTFOLIO_INFO.name}
🏢 Role: ${PORTFOLIO_INFO.title}
🏪 Company: ${PORTFOLIO_INFO.company}
📍 Location: ${PORTFOLIO_INFO.location}
🔐 Privileges: Portfolio Admin
⏰ Session: Active since ${new Date().toLocaleTimeString()}`,

  date: `📅 Current Date & Time:
${new Date().toLocaleString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'short'
})}

🌍 Time zones:
  Local: ${new Date().toLocaleTimeString()}
  UTC: ${new Date().toUTCString()}
  Amsterdam: ${new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' })}`,

  pwd: '/home/joris/portfolio/terminal\n📁 Current directory: Portfolio Terminal Interface',

  ls: `📂 Portfolio Contents:

drwxr-xr-x  about/          Personal information and background
drwxr-xr-x  skills/         Technical expertise and technologies
drwxr-xr-x  projects/       Development projects and case studies
drwxr-xr-x  experience/     Professional work history
drwxr-xr-x  education/      Academic background and certifications
drwxr-xr-x  contact/        Communication channels and social links
-rw-r--r--  README.md       Portfolio documentation
-rw-r--r--  .gitignore      Version control configuration
-rw-r--r--  package.json    Project dependencies and scripts

💡 Use specific commands like 'about', 'skills', or 'projects' to explore each directory!`,

  version: `🔢 Portfolio System Information:

📦 Portfolio Version: 2.0.0
🚀 Next.js Version: 15.0.0
⚛️ React Version: 19.0.0
🎨 Framework: TypeScript + Tailwind CSS
☁️ Deployed on: Vercel Platform
🔧 Build System: Turbopack
📱 PWA Support: Enabled

🛠️ Development Stack:
  • Runtime: Node.js 20.x
  • Package Manager: npm 10.x
  • Bundler: Next.js with Turbopack
  • Styling: Tailwind CSS 3.x
  • Type Safety: TypeScript 5.x

🔄 Last Updated: ${new Date().toLocaleDateString()}
✨ Features: Terminal interface, Dark/Light theme, Multi-language support`,

  // Fun and effect commands
  sl: TERMINAL_RESPONSES.steamLocomotive,

  joke: `😄 Developer Humor:

${TERMINAL_RESPONSES.jokes[Math.floor(Math.random() * TERMINAL_RESPONSES.jokes.length)]}

😂 Want another one? Type 'joke' again!`,

  ascii: TERMINAL_RESPONSES.asciiArt,

  hack: `🔒 ACCESSING MAINFRAME...

[████████████████████████████████] 100%

🛡️ SECURITY PROTOCOL INITIATED
Password: ****************
🔐 Access Level: Portfolio Admin
🚨 Status: AUTHORIZED

Welcome, Agent ${PORTFOLIO_INFO.name}.
Mission: Showcase exceptional development skills.
Clearance Level: FULL ACCESS GRANTED

Available systems:
  • Skill Matrix Database ✅
  • Project Archives ✅  
  • Experience Logs ✅
  • Contact Protocols ✅

🕵️ Your mission, should you choose to accept it, is to explore this portfolio.
This message will self-destruct in... just kidding! 😄`,

  rick: TERMINAL_RESPONSES.rick,

  matrix: `🟢 MATRIX MODE ACTIVATED 🟢

    Wake up, ${PORTFOLIO_INFO.name}...
    
    The Matrix has you...
    Follow the white rabbit... 🐰
    
    ⢀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⣠⣤⣶⣶
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠆⠀⠀⣤⣿⣿⣿⣿⣿
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⢀⣤⣿⣿⣿⣿⣿⣿
    
    You are the chosen one, Neo...
    Your skills in C# are legendary...
    
🔴 RED PILL: View 'skills' command
🔵 BLUE PILL: Type 'clear' to return to reality

"There is no spoon... only exceptional code!" 🥄`,

  cat: TERMINAL_RESPONSES.cat,

  // Theme commands
  invert: '🔄 Inverting colors! Type "invert" again to undo.',
  shake: '📳 Shaking the page! Type "shake" again to stop.',
  rainbow: '🌈 Rainbow mode activated! Type "rainbow" again to turn off.',
  dark: '🌙 Dark mode enabled! Welcome to the dark side... we have cookies! 🍪',
  light: '☀️ Light mode enabled! Let there be light! ✨',
  party: TERMINAL_RESPONSES.party,
};

/**
 * Command metadata definitions
 * 
 * @constant
 * @public
 */
export const COMMAND_METADATA: Record<TerminalCommand, CommandMetadata> = {
  // Information commands
  help: { name: 'help', description: 'Display all available commands and usage information', category: CommandCategory.SYSTEM, hasSideEffects: false },
  about: { name: 'about', description: 'Learn about Joris Mathijssen and his background', category: CommandCategory.INFO, hasSideEffects: false },
  skills: { name: 'skills', description: 'View technical skills and expertise', category: CommandCategory.INFO, hasSideEffects: false },
  projects: { name: 'projects', description: 'Explore development projects and case studies', category: CommandCategory.INFO, hasSideEffects: false },
  contact: { name: 'contact', description: 'Get contact information and social links', category: CommandCategory.INFO, hasSideEffects: false },
  experience: { name: 'experience', description: 'View professional work experience', category: CommandCategory.INFO, hasSideEffects: false },
  education: { name: 'education', description: 'See educational background and certifications', category: CommandCategory.INFO, hasSideEffects: false },
  
  // System commands
  clear: { name: 'clear', description: 'Clear the terminal output', category: CommandCategory.SYSTEM, hasSideEffects: true },
  whoami: { name: 'whoami', description: 'Display current user information', category: CommandCategory.SYSTEM, hasSideEffects: false },
  date: { name: 'date', description: 'Show current date and time', category: CommandCategory.SYSTEM, hasSideEffects: false },
  pwd: { name: 'pwd', description: 'Print working directory', category: CommandCategory.SYSTEM, hasSideEffects: false },
  ls: { name: 'ls', description: 'List directory contents', category: CommandCategory.SYSTEM, hasSideEffects: false },
  version: { name: 'version', description: 'Show portfolio and system version information', category: CommandCategory.SYSTEM, hasSideEffects: false },
  
  // Theme commands
  dark: { name: 'dark', description: 'Switch to dark theme', category: CommandCategory.THEME, hasSideEffects: true },
  light: { name: 'light', description: 'Switch to light theme', category: CommandCategory.THEME, hasSideEffects: true },
  invert: { name: 'invert', description: 'Invert page colors', category: CommandCategory.EFFECTS, hasSideEffects: true },
  shake: { name: 'shake', description: 'Add shake animation effect', category: CommandCategory.EFFECTS, hasSideEffects: true },
  rainbow: { name: 'rainbow', description: 'Enable rainbow color mode', category: CommandCategory.EFFECTS, hasSideEffects: true },
  
  // Fun commands
  sl: { name: 'sl', description: 'Display steam locomotive animation', category: CommandCategory.FUN, hasSideEffects: false },
  joke: { name: 'joke', description: 'Tell a random developer joke', category: CommandCategory.FUN, hasSideEffects: false },
  ascii: { name: 'ascii', description: 'Display ASCII art', category: CommandCategory.FUN, hasSideEffects: false },
  hack: { name: 'hack', description: 'Simulate hacker interface', category: CommandCategory.FUN, hasSideEffects: false },
  rick: { name: 'rick', description: 'Rick roll in terminal form', category: CommandCategory.FUN, hasSideEffects: false },
  matrix: { name: 'matrix', description: 'Enter Matrix mode', category: CommandCategory.FUN, hasSideEffects: false },
  cat: { name: 'cat', description: 'Summon a virtual cat companion', category: CommandCategory.FUN, hasSideEffects: false },
  party: { name: 'party', description: 'Activate celebration mode', category: CommandCategory.FUN, hasSideEffects: true },
};

/**
 * Utility functions for command processing
 * 
 * @namespace CommandUtils
 * @since 1.0.0
 * @public
 */
export const CommandUtils = {
  /**
   * Validate if a string is a valid terminal command
   * 
   * @param input - Input string to validate
   * @returns True if valid command, false otherwise
   * @public
   */
  isValidCommand: (input: string): input is TerminalCommand => {
    try {
      TerminalCommandSchema.parse(input.toLowerCase());
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Get command metadata by name
   * 
   * @param command - Command name
   * @returns Command metadata or undefined
   * @public
   */
  getCommandMetadata: (command: string): CommandMetadata | undefined => {
    if (CommandUtils.isValidCommand(command)) {
      return COMMAND_METADATA[command];
    }
    return undefined;
  },

  /**
   * Get commands by category
   * 
   * @param category - Command category to filter by
   * @returns Array of commands in the specified category
   * @public
   */
  getCommandsByCategory: (category: CommandCategory): CommandMetadata[] => {
    return Object.values(COMMAND_METADATA).filter(cmd => cmd.category === category);
  },

  /**
   * Get command response
   * 
   * @param command - Command to execute
   * @returns Command response string
   * @public
   */
  getCommandResponse: (command: string): string => {
    const normalizedCommand = command.toLowerCase().trim();
    
    if (CommandUtils.isValidCommand(normalizedCommand)) {
      // Get command metadata for category tracking
      const commandKey = normalizedCommand as TerminalCommand;
      const metadata = COMMAND_METADATA[commandKey];
      
      // Track terminal command usage with category
      trackTerminalCommand(normalizedCommand, metadata?.category);
      return COMMANDS[normalizedCommand];
    }
    
    return `❌ Command not found: '${command}'
    
Type 'help' to see all available commands.
    
💡 Did you mean one of these?
${Object.keys(COMMANDS)
  .filter(cmd => cmd.includes(normalizedCommand.substring(0, 3)))
  .slice(0, 3)
  .map(cmd => `  • ${cmd}`)
  .join('\n') || '  • help\n  • about\n  • skills'}`;
  },

  /**
   * Get all available commands
   * 
   * @returns Array of all command names
   * @public
   */
  getAllCommands: (): TerminalCommand[] => {
    return Object.keys(COMMANDS) as TerminalCommand[];
  },

  /**
   * Search commands by partial name or description
   * 
   * @param query - Search query
   * @returns Array of matching command metadata
   * @public
   */
  searchCommands: (query: string): CommandMetadata[] => {
    const normalizedQuery = query.toLowerCase();
    return Object.values(COMMAND_METADATA).filter(cmd => 
      cmd.name.includes(normalizedQuery) || 
      cmd.description.toLowerCase().includes(normalizedQuery)
    );
  },
} as const;

/**
 * Export command validation schema for external use
 * 
 * @public
 */
export { TerminalCommandSchema };
