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
    let baseClasses = 'cell w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center font-bold text-sm transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ';
    
    if (cell.isRevealed) {
      if (cell.isMine) {
        baseClasses += 'bg-mine-red text-white border-red-600 shadow-inner animate-bounce-in';
      } else {
        baseClasses += 'bg-gray-100 border-gray-300 shadow-inner';
        if (cell.neighborMines > 0) {
          const numberColors = [
            '', 'text-blue-600', 'text-green-600', 'text-red-500', 
            'text-purple-600', 'text-yellow-600', 'text-pink-500', 
            'text-gray-800', 'text-black'
          ];
          baseClasses += ` ${numberColors[cell.neighborMines]}`;
        }
      }
    } else {
      if (cell.isFlagged) {
        baseClasses += 'bg-flag-yellow/80 border-yellow-400 shadow-lg hover:bg-flag-yellow hover:scale-105';
      } else {
        baseClasses += 'bg-gradient-to-br from-slate-200 to-slate-300 border-slate-400 hover:from-slate-100 hover:to-slate-200 hover:scale-105 shadow-cell active:scale-95';
      }
    }
    
    if (gameStatus !== 'playing') {
      baseClasses += ' cursor-default';
    } else {
      baseClasses += ' cursor-pointer';
    }
    
    return baseClasses;
  };

  return (
    <button
      className={getCellClass()}
      onClick={handleClick}
      onContextMenu={handleRightClick}
      disabled={gameStatus !== 'playing'}
    >
      <span className={cell.isRevealed && !cell.isMine ? 'animate-fade-in' : ''}>
        {getCellContent()}
      </span>
    </button>
  );
};

export default Cell;