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
    <div className="flex items-center justify-between bg-white/30 backdrop-blur-sm rounded-xl p-4 mb-6 border border-white/20">
      <div className="flex items-center space-x-2 bg-slate-800 text-mine-red font-mono text-lg font-bold px-3 py-2 rounded-lg min-w-[80px] justify-center">
        <span>💣</span>
        <span>{remainingMines.toString().padStart(3, '0')}</span>
      </div>
      
      <button 
        className="text-4xl hover:scale-110 active:scale-95 transition-transform duration-200 bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl border-2 border-white/50"
        onClick={onRestart}
      >
        {getStatusEmoji()}
      </button>
      
      <div className="flex items-center space-x-2 bg-slate-800 text-safe-green font-mono text-lg font-bold px-3 py-2 rounded-lg min-w-[80px] justify-center">
        <span>⏰</span>
        <span>{timer.toString().padStart(3, '0')}</span>
      </div>
    </div>
  );
};

export default GameHeader;