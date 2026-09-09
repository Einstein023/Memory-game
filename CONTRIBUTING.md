# Contributing to Memory Game

Thank you for your interest in contributing to Memory Game. Contributions are welcome, especially improvements that make the game more accessible, reliable, and enjoyable.

## Getting Started

1. Fork the repository on GitHub.
2. Clone your fork locally.
3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal.

## Finding an Issue

Beginner contributors can look for issues labeled:

- `beginner-friendly`
- `good first issue`
- `help wanted`

Before starting work, leave a comment on the issue so others know it is being worked on. Ask questions if the requirements are unclear.

## Making Changes

1. Create a branch from the default branch:

   ```bash
   git checkout -b feature/short-description
   ```

2. Make a focused change related to one issue.
3. Keep the existing React, JavaScript, and CSS style consistent.
4. Avoid committing generated files such as `dist/` unless the issue specifically requires them.
5. Update the README or other documentation when behavior or setup changes.

## Before Opening a Pull Request

Run the available checks locally:

```bash
npm run lint
npm run build
```

Confirm that:

- The application starts successfully.
- The feature works on desktop and mobile screens.
- Existing gameplay still works.
- Interactive controls are keyboard accessible when applicable.
- No unrelated files or changes are included.

## Commit Messages

Use a short, descriptive commit message. A conventional format is recommended:

```text
feat(game): add a move counter
fix(game): prevent clicks during mismatch delay
docs: update contribution instructions
```

Reference the related issue in the commit or pull request when appropriate:

```text
Closes #2
```

## Pull Requests

When opening a pull request:

- Explain what changed and why.
- Link the related issue.
- Include screenshots or a short recording for visual changes.
- Mention the commands used to validate the change.
- Keep the pull request focused and easy to review.

A maintainer may request changes before the pull request is merged. Please respond to review feedback and keep the discussion focused on improving the project.

## Reporting Bugs

When reporting a bug, include:

- A clear description of the problem.
- Steps to reproduce it.
- The expected behavior.
- The actual behavior.
- Your browser and operating system.
- Screenshots or recordings when useful.

## Suggesting Features

Feature requests should explain:

- The problem or user need.
- The proposed behavior.
- How the feature could improve the game.
- Any accessibility or responsive design considerations.

## Code of Conduct

Please be respectful, constructive, and welcoming to all contributors. Harassment, discrimination, and disrespectful behavior are not acceptable.
