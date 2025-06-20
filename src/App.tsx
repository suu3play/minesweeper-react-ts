import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { GameState, GameConfig } from './types';
import { createEmptyBoard, placeMines, revealCell, toggleFlag, checkWinCondition, countFlags, countRevealed } from './utils/gameLogic';
import Board from './components/Board';
import GameHeader from './components/GameHeader';

const defaultConfig: GameConfig = {
  rows: 9,
  cols: 9,
  mines: 10
};

function App() {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(defaultConfig.rows, defaultConfig.cols),
    gameStatus: 'playing',
    mineCount: defaultConfig.mines,
    flagCount: 0,
    revealedCount: 0
  });
  
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive]);

  const initializeGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(defaultConfig.rows, defaultConfig.cols),
      gameStatus: 'playing',
      mineCount: defaultConfig.mines,
      flagCount: 0,
      revealedCount: 0
    });
    setIsFirstClick(true);
    setTimer(0);
    setTimerActive(false);
  }, []);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameState.gameStatus !== 'playing') return;
    
    setGameState(prevState => {
      let newBoard = prevState.board;
      
      if (isFirstClick) {
        newBoard = placeMines(prevState.board, defaultConfig.mines, row, col);
        setIsFirstClick(false);
        setTimerActive(true);
      }
      
      if (newBoard[row][col].isFlagged || newBoard[row][col].isRevealed) {
        return prevState;
      }
      
      newBoard = revealCell(newBoard, row, col);
      
      const newRevealedCount = countRevealed(newBoard);
      let newGameStatus = prevState.gameStatus;
      
      if (newBoard[row][col].isMine) {
        newGameStatus = 'lost';
        setTimerActive(false);
        newBoard = newBoard.map(row => 
          row.map(cell => ({
            ...cell,
            isRevealed: cell.isMine ? true : cell.isRevealed
          }))
        );
      } else if (checkWinCondition(newBoard)) {
        newGameStatus = 'won';
        setTimerActive(false);
      }
      
      return {
        ...prevState,
        board: newBoard,
        gameStatus: newGameStatus,
        revealedCount: newRevealedCount
      };
    });
  }, [gameState.gameStatus, isFirstClick]);

  const handleCellRightClick = useCallback((row: number, col: number) => {
    if (gameState.gameStatus !== 'playing') return;
    
    setGameState(prevState => {
      const newBoard = toggleFlag(prevState.board, row, col);
      const newFlagCount = countFlags(newBoard);
      
      return {
        ...prevState,
        board: newBoard,
        flagCount: newFlagCount
      };
    });
  }, [gameState.gameStatus]);

  return (
    <div className="App">
      <div className="game-container">
        <h1>マインスイーパー</h1>
        <GameHeader
          mineCount={gameState.mineCount}
          flagCount={gameState.flagCount}
          gameStatus={gameState.gameStatus}
          onRestart={initializeGame}
          timer={timer}
        />
        <Board
          board={gameState.board}
          onCellClick={handleCellClick}
          onCellRightClick={handleCellRightClick}
          gameStatus={gameState.gameStatus}
        />
      </div>
    </div>
  );
}

export default App;
