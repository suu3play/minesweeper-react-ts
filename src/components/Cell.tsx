import React from 'react';
import { Cell as CellType } from '../types';

interface CellProps {
  cell: CellType;
  onClick: (row: number, col: number) => void;
  onRightClick: (row: number, col: number) => void;
  gameStatus: 'playing' | 'won' | 'lost';
}

const Cell: React.FC<CellProps> = ({ cell, onClick, onRightClick, gameStatus }) => {
  const handleClick = () => {
    if (gameStatus === 'playing') {
      onClick(cell.row, cell.col);
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (gameStatus === 'playing') {
      onRightClick(cell.row, cell.col);
    }
  };

  const getCellContent = () => {
    if (cell.isFlagged) {
      return '🚩';
    }
    
    if (!cell.isRevealed) {
      return '';
    }
    
    if (cell.isMine) {
      return '💣';
    }
    
    return cell.neighborMines > 0 ? cell.neighborMines.toString() : '';
  };

  const getCellClass = () => {
    let baseClass = 'cell';
    
    if (cell.isRevealed) {
      baseClass += ' revealed';
      if (cell.isMine) {
        baseClass += ' mine';
      }
    } else {
      baseClass += ' hidden';
    }
    
    if (cell.isFlagged) {
      baseClass += ' flagged';
    }
    
    if (cell.isRevealed && cell.neighborMines > 0 && !cell.isMine) {
      baseClass += ` number-${cell.neighborMines}`;
    }
    
    return baseClass;
  };

  return (
    <button
      className={getCellClass()}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      disabled={gameStatus !== 'playing'}
    >
      {getCellContent()}
    </button>
  );
};

export default Cell;