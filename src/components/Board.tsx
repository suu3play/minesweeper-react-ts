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
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
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