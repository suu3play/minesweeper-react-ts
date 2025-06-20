# Minesweeper React TypeScript

A classic Minesweeper game built with React and TypeScript, featuring a nostalgic Windows-style interface.

## 🎮 Features

- **Classic Gameplay**: Traditional minesweeper rules with 9x9 grid and 10 mines
- **Smart First Click**: First click is always safe - no mine will be placed there
- **Interactive Controls**: 
  - Left click to reveal cells
  - Right click to flag/unflag mines
- **Game State Management**: Win/lose detection with visual feedback
- **Timer**: Track your solving time
- **Mine Counter**: Shows remaining mines (total mines - flags placed)
- **Responsive Design**: Works on desktop and mobile devices
- **Retro UI**: Classic Windows Minesweeper aesthetic

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:suu3play/minesweeper-react-ts.git
cd minesweeper-react-ts
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🎯 How to Play

1. **Objective**: Find all mines without triggering any of them
2. **Left Click**: Reveal a cell
3. **Right Click**: Place or remove a flag on a suspected mine
4. **Numbers**: Show how many mines are adjacent to that cell
5. **Win Condition**: Reveal all non-mine cells
6. **Lose Condition**: Click on a mine

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety and better development experience
- **CSS3** - Custom styling with classic minesweeper look
- **Create React App** - Project setup and build tools

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Board.tsx       # Game board component
│   ├── Cell.tsx        # Individual cell component
│   └── GameHeader.tsx  # Header with timer and controls
├── types/              # TypeScript type definitions
│   └── index.ts        # Game-related types
├── utils/              # Utility functions
│   └── gameLogic.ts    # Core game logic
├── App.tsx             # Main application component
├── App.css             # Application styles
└── index.tsx           # Application entry point
```

## 🎨 Customization

You can easily modify the game configuration in `src/App.tsx`:

```typescript
const defaultConfig: GameConfig = {
  rows: 9,     // Board height
  cols: 9,     // Board width  
  mines: 10    // Number of mines
};
```

## 📱 Mobile Support

The game is fully responsive and includes:
- Touch-friendly controls
- Optimized cell sizes for mobile screens
- Responsive layout that adapts to different screen sizes

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.