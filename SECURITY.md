# Security Policy

## Supported Versions

This personal portfolio is actively maintained with security updates:

| Version | Supported          |
| ------- | ------------------ |
| Latest  | :white_check_mark: |
| Older   | :x:                |

The application is continuously deployed from the main branch with the latest security patches.

## Reporting a Vulnerability

### How to Report
Found a security issue? I appreciate responsible disclosure:

- **GitHub Issues**: [Create a new issue](https://github.com/jorismathijssen/Portfolio/issues/new) (mark as security if sensitive)
- **LinkedIn**: [Direct message](https://linkedin.com/in/jorismathijssen) for sensitive matters

### What to Include
Please provide:
- Clear description of the vulnerability
- Steps to reproduce
- Potential impact
- Browser/device information
- Screenshots if helpful

### Response Expectations
As this is a personal project maintained in my spare time:
- **Acknowledgment**: Within 3-5 days
- **Fix Timeline**: 
  - Critical issues: Within 1 week
  - Other issues: Within 2-4 weeks depending on complexity

### Security Scope
Relevant security concerns include:
- **XSS vulnerabilities** in the interactive terminal
- **Content injection** through any user inputs
- **Dependency vulnerabilities** in the tech stack
- **SSL/Certificate issues** on the live site
- **Docker security** in the deployment setup

### Not Security Issues
These are outside the security scope:
- Feature requests or bugs (use regular GitHub issues)
- Performance issues
- Browser compatibility problems
- Design feedback

### Current Security Measures
The portfolio includes:
- **HTTPS enforcement** with Let's Encrypt
- **Content Security Policy** headers
- **Input sanitization** for the terminal component
- **Regular dependency updates** via Dependabot
- **Secure Docker deployment** on VPS
- **GDPR-compliant** cookie handling

### Responsible Disclosure
- Please report privately first rather than public disclosure
- I'll acknowledge your contribution if you'd like (or keep you anonymous)
- Once fixed, feel free to discuss the issue publicly

### Personal Note
This is my personal portfolio showcasing my work as a Senior .NET Developer. I take security seriously even for personal projects, but please keep in mind this is maintained by one person alongside a full-time job at 9292.

Thanks for helping keep the web secure! 🛡️
