import React from 'react';
import { AppMode } from '../types';

interface ModeSwitcherProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ mode, setMode }) => {
  const baseClasses = "px-6 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/20";
  const activeClasses = "bg-orange-500 text-white shadow-lg";
  const inactiveClasses = "bg-transparent text-gray-300 hover:bg-white/10";

  return (
    <div className="flex justify-center p-1 bg-black/20 rounded-xl border border-white/10 backdrop-blur-lg">
      <button
        onClick={() => setMode('freeform')}
        className={`${baseClasses} ${mode === 'freeform' ? activeClasses : inactiveClasses}`}
        aria-pressed={mode === 'freeform'}
      >
        Freeform
      </button>
      <button
        onClick={() => setMode('practice')}
        className={`${baseClasses} ${mode === 'practice' ? activeClasses : inactiveClasses}`}
        aria-pressed={mode === 'practice'}
      >
        Practice
      </button>
    </div>
  );
};