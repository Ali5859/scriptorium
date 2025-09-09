import React from 'react';
import { LanguageCode } from '../types';
import { languages } from '../lib/languageMaps';

interface MultiLanguageSelectorProps {
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  onSourceChange: (code: LanguageCode) => void;
  onTargetChange: (code: LanguageCode) => void;
  onSwap: () => void;
  onCustomize: () => void;
}

const languageOptions = Object.values(languages);

export const MultiLanguageSelector: React.FC<MultiLanguageSelectorProps> = ({
  sourceLang,
  targetLang,
  onSourceChange,
  onTargetChange,
  onSwap,
  onCustomize,
}) => {
  const selectClasses = "bg-black/30 border border-white/20 text-white text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 transition duration-200 ease-in-out hover:bg-black/50 backdrop-blur-sm";

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 bg-black/20 rounded-xl border border-white/10 backdrop-blur-lg shadow-lg">
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="w-full sm:w-auto flex-1">
          <label htmlFor="source-lang" className="block mb-2 text-sm font-medium text-gray-300">Source Language</label>
          <select
            id="source-lang"
            value={sourceLang}
            onChange={(e) => onSourceChange(e.target.value as LanguageCode)}
            className={selectClasses}
            aria-label="Select source language"
          >
            {languageOptions.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>

        <div className="mt-4 sm:mt-0 self-center">
          <button
            onClick={onSwap}
            className="p-2 mt-0 sm:mt-6 rounded-full bg-black/30 hover:bg-black/50 text-gray-300 transition-all duration-300 ease-in-out hover:rotate-180 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/20 focus:ring-orange-500"
            aria-label="Swap source and target languages"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
        </div>

        <div className="w-full sm:w-auto flex-1">
          <label htmlFor="target-lang" className="block mb-2 text-sm font-medium text-gray-300">Target Language</label>
          <select
            id="target-lang"
            value={targetLang}
            onChange={(e) => onTargetChange(e.target.value as LanguageCode)}
            className={selectClasses}
            aria-label="Select target language"
          >
            {languageOptions.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-2">
        <button
          onClick={onCustomize}
          className="px-4 py-2 text-sm font-semibold text-orange-400 bg-black/30 rounded-lg hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/20 focus:ring-orange-500 transition-colors"
          aria-label={`Customize keyboard mapping for ${languages[targetLang].name}`}
        >
          Customize Mapping for {languages[targetLang].name}
        </button>
      </div>
    </div>
  );
};