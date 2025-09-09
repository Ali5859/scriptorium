import React from 'react';
import { PracticeSessionResult } from '../types';
import { StatsChart } from './StatsChart';

interface StatsDashboardProps {
  history: PracticeSessionResult[];
  onClearHistory: () => void;
}

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ history, onClearHistory }) => {
  if (history.length === 0) {
    return (
      <div className="p-6 text-center bg-black/20 rounded-xl border border-white/10 backdrop-blur-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-2">Statistics</h2>
        <p className="text-gray-400">Complete a practice session to see your stats here.</p>
      </div>
    );
  }

  const avgWpm = Math.round(history.reduce((acc, r) => acc + r.wpm, 0) / history.length);
  const avgAccuracy = Math.round(history.reduce((acc, r) => acc + r.accuracy, 0) / history.length);
  const recentHistory = history.slice(-10);

  return (
    <div className="p-6 bg-black/20 rounded-xl border border-white/10 backdrop-blur-lg shadow-lg space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Your Progress</h2>
        <button 
            onClick={onClearHistory}
            className="text-sm text-pink-500 hover:text-pink-400 hover:underline"
        >
            Clear History
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
        <div className="p-4 bg-black/30 rounded-lg">
          <p className="text-sm text-gray-400">Average WPM</p>
          <p className="text-4xl font-bold text-white">{avgWpm}</p>
        </div>
        <div className="p-4 bg-black/30 rounded-lg">
          <p className="text-sm text-gray-400">Average Accuracy</p>
          <p className="text-4xl font-bold text-white">{avgAccuracy}%</p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Last {recentHistory.length} Sessions</h3>
        <StatsChart data={recentHistory} />
      </div>
    </div>
  );
};