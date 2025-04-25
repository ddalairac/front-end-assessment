# Memory Card Game

This project is a challenge designed for the Zicasso evaluation process.

- [📄 Challenge Brief](./brief.md)
- [🚀 Live Demo](https://ddalairac.github.io/front-end-assessment/)

## Dependencies

### Original Dependencies (from fork)
- **React**
- **TypeScript**
- **Vite**

### Added Dependencies
- **Sass**: CSS preprocessor for styling
- **Zustand**: State management library for handling game state
- **gh-pages**: For easy deployment to GitHub Pages


## Architecture

This project implements a clean architecture based on:

- **Presentational Components**: The UI components (Card, CardGrid, Header) are purely presentational and only responsible for rendering the data they receive via props.
- **State Management Separation**: All game logic and state management is centralized in the Zustand store, completely separated from the UI components.
- **Unidirectional Data Flow**: Data flows down from the store to the components, and actions flow up from components to the store.

This separation of concerns makes the codebase more maintainable, testable, and easier to understand.


## Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run start
```

## Deployment

The game is deployed to GitHub Pages using the gh-pages package:

```bash
# Deploy to GitHub Pages
npm run deploy
```

