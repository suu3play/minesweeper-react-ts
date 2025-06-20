import { Cell, GameConfig } from '../types';

export const createEmptyBoard = (rows: number, cols: number): Cell[][] => {
  const board: Cell[][] = [];
  for (let r = 0; r < rows; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < cols; c++) {
      row.push({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
        row: r,
        col: c,
      });
    }
    board.push(row);
  }
  return board;
};

export const placeMines = (board: Cell[][], mineCount: number, firstClickRow: number, firstClickCol: number): Cell[][] => {
  const rows = board.length;
  const cols = board[0].length;
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  
  let minesPlaced = 0;
  while (minesPlaced < mineCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    
    if (!newBoard[row][col].isMine && 
        !(row === firstClickRow && col === firstClickCol)) {
      newBoard[row][col].isMine = true;
      minesPlaced++;
    }
  }
  
  calculateNeighborMines(newBoard);
  return newBoard;
};

const calculateNeighborMines = (board: Cell[][]): void => {
  const rows = board.length;
  const cols = board[0].length;
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!board[r][c].isMine) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
              count++;
            }
          }
        }
        board[r][c].neighborMines = count;
      }
    }
  }
};

export const revealCell = (board: Cell[][], row: number, col: number): Cell[][] => {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  const rows = board.length;
  const cols = board[0].length;
  
  if (row < 0 || row >= rows || col < 0 || col >= cols || 
      newBoard[row][col].isRevealed || newBoard[row][col].isFlagged) {
    return newBoard;
  }
  
  newBoard[row][col].isRevealed = true;
  
  if (newBoard[row][col].neighborMines === 0 && !newBoard[row][col].isMine) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = row + dr;
        const nc = col + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          const result = revealCell(newBoard, nr, nc);
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              newBoard[i][j] = result[i][j];
            }
          }
        }
      }
    }
  }
  
  return newBoard;
};

export const toggleFlag = (board: Cell[][], row: number, col: number): Cell[][] => {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  
  if (!newBoard[row][col].isRevealed) {
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
  }
  
  return newBoard;
};

export const checkWinCondition = (board: Cell[][]): boolean => {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      const cell = board[r][c];
      if (!cell.isMine && !cell.isRevealed) {
        return false;
      }
    }
  }
  return true;
};

export const countFlags = (board: Cell[][]): number => {
  let count = 0;
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (board[r][c].isFlagged) {
        count++;
      }
    }
  }
  return count;
};

export const countRevealed = (board: Cell[][]): number => {
  let count = 0;
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[0].length; c++) {
      if (board[r][c].isRevealed) {
        count++;
      }
    }
  }
  return count;
};