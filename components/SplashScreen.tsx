import React from 'react';

export const SplashScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent text-gray-100 animate-fadeOut" style={{ animationDelay: '1.5s' }}>
      <div className="text-center animate-fadeIn">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
          Scriptorium
        </h1>
        <div className="mt-6 flex justify-center items-center space-x-3">
            <div className="w-4 h-4 rounded-full bg-orange-500 animate-pulse"></div>
            <div className="w-4 h-4 rounded-full bg-pink-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-4 h-4 rounded-full bg-purple-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </div>
  );
};