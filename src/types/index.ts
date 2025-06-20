export interface Cell {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
  row: number;
  col: number;
}

export interface GameState {
  board: Cell[][];
  gameStatus: 'playing' | 'won' | 'lost';
  mineCount: number;
  flagCount: number;
  revealedCount: number;
}

export interface GameConfig {
  rows: number;
  cols: number;
  mines: number;
}