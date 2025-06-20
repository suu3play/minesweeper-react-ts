import React from 'react';

interface GameHeaderProps {
  mineCount: number;
  flagCount: number;
  gameStatus: 'playing' | 'won' | 'lost';
  onRestart: () => void;
  timer: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({ 
  mineCount, 
  flagCount, 
  gameStatus, 
  onRestart,
  timer 
}) => {
  const remainingMines = mineCount - flagCount;
  
  const getStatusEmoji = () => {
    switch (gameStatus) {
      case 'won':
        return '😎';
      case 'lost':
        return '😵';
      default:
        return '🙂';
    }
  };

  return (
    <div className="game-header">
      <div className="mine-counter">
        💣 {remainingMines.toString().padStart(3, '0')}
      </div>
      
      <button className="restart-button" onClick={onRestart}>
        {getStatusEmoji()}
      </button>
      
      <div className="timer">
        ⏰ {timer.toString().padStart(3, '0')}
      </div>
    </div>
  );
};

export default GameHeader;