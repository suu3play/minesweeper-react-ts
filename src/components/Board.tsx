import React from 'react';
import { Cell as CellType } from '../types';
import Cell from './Cell';

interface BoardProps {
  board: CellType[][];
  onCellClick: (row: number, col: number) => void;
  onCellRightClick: (row: number, col: number) => void;
  gameStatus: 'playing' | 'won' | 'lost';
}

const Board: React.FC<BoardProps> = ({ board, onCellClick, onCellRightClick, gameStatus }) => {
  return (
    <div className="inline-block bg-white/30 backdrop-blur-sm border-2 border-white/40 rounded-xl p-3 shadow-lg">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              cell={cell}
              onClick={onCellClick}
              onRightClick={onCellRightClick}
              gameStatus={gameStatus}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;