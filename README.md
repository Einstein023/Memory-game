# Memory Game

A simple memory matching game built with React and Vite.

## Features

- 24 cards with 12 matching emoji pairs
- Random card arrangement on each game
- Matching cards remain visible
- Non-matching cards flip back automatically
- Responsive layout for desktop and mobile screens

## Technologies

- React
- Vite
- JavaScript
- CSS

## Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal.

## Available Commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run preview  # Preview the production build
npm run lint     # Check the code with ESLint
```

## How to Play

1. Click a card to reveal its emoji.
2. Click another card to search for its matching pair.
3. Matching cards remain visible.
4. Non-matching cards flip back after a short delay.
5. Continue until all pairs have been found.

## Project Structure

```text
src/
├── component/
│   └── Card.jsx
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## Future Improvements

- Add a move counter
- Add a timer
- Add a reset button
- Add difficulty levels
- Save best scores with local storage
- Add keyboard accessibility

## License

This project is for learning and practice.
