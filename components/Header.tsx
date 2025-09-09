import React from 'react';

interface HeaderProps {
  onOpenTutorial: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTutorial }) => {
  return (
    <header className="text-center relative">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
        Scriptorium
      </h1>
      <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
        Master any script. Type, transliterate, and test your skills across languages.
      </p>
      <button
        onClick={onOpenTutorial}
        className="absolute top-0 right-0 p-2 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
        aria-label="Open tutorial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
    </header>
  );
};