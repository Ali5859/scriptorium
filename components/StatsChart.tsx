import React from 'react';
import { PracticeSessionResult } from '../types';

interface StatsChartProps {
  data: PracticeSessionResult[];
}

export const StatsChart: React.FC<StatsChartProps> = ({ data }) => {
  const chartHeight = 200;
  const barWidth = 20;
  const barMargin = 15;
  const chartWidth = data.length * (barWidth * 2 + barMargin);
  
  const maxWpm = Math.max(...data.map(d => d.wpm), 50); // Minimum max of 50 for scale

  return (
    <div className="w-full overflow-x-auto bg-black/30 p-4 rounded-lg">
      <svg width={chartWidth} height={chartHeight} aria-label="Chart of recent performance">
        <g>
          {data.map((session, index) => {
            const wpmHeight = (session.wpm / maxWpm) * chartHeight;
            const accuracyHeight = (session.accuracy / 100) * chartHeight;
            const x = index * (barWidth * 2 + barMargin);

            return (
              <g key={session.timestamp}>
                {/* WPM Bar */}
                <rect
                  x={x}
                  y={chartHeight - wpmHeight}
                  width={barWidth}
                  height={wpmHeight}
                  fill="url(#wpmGradient)"
                  rx="4"
                  ry="4"
                >
                  <title>WPM: {session.wpm}</title>
                </rect>
                 <text x={x + barWidth / 2} y={chartHeight - wpmHeight - 5} fill="#fb923c" textAnchor="middle" fontSize="12">{session.wpm}</text>

                {/* Accuracy Bar */}
                <rect
                  x={x + barWidth}
                  y={chartHeight - accuracyHeight}
                  width={barWidth}
                  height={accuracyHeight}
                  fill="url(#accuracyGradient)"
                  rx="4"
                  ry="4"
                >
                   <title>Accuracy: {session.accuracy}%</title>
                </rect>
                <text x={x + barWidth + barWidth / 2} y={chartHeight - accuracyHeight - 5} fill="#f472b6" textAnchor="middle" fontSize="12">{session.accuracy}%</text>
              </g>
            );
          })}
        </g>
        <defs>
            <linearGradient id="wpmGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <linearGradient id="accuracyGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
        </defs>
      </svg>
      <div className="flex justify-center space-x-4 mt-2 text-xs text-gray-400">
        <div className="flex items-center"><span className="w-3 h-3 rounded-sm bg-gradient-to-br from-orange-400 to-orange-500 mr-2"></span>WPM</div>
        <div className="flex items-center"><span className="w-3 h-3 rounded-sm bg-gradient-to-br from-pink-400 to-pink-500 mr-2"></span>Accuracy</div>
      </div>
    </div>
  );
};