import React from 'react';
import { LanguageConfig, Direction } from '../types';

interface DualEditorProps {
  sourceConfig: LanguageConfig;
  targetConfig: LanguageConfig;
  sourceText: string;
  targetText: string;
  onTextChange: (sourceText: string) => void;
}

export const DualEditor: React.FC<DualEditorProps> = ({
  sourceConfig,
  targetConfig,
  sourceText,
  targetText,
  onTextChange
}) => {
  const baseClasses = "w-full p-4 text-lg border rounded-xl resize-none focus:outline-none transition-all duration-300 h-full min-h-[250px] sm:min-h-0 bg-black/20 backdrop-blur-lg shadow-inner";
  const sourceClasses = `text-gray-100 border-white/20 ring-2 ring-orange-500 shadow-[0_0_15px_rgba(251,146,60,0.3)] focus:shadow-[0_0_20px_rgba(251,146,60,0.5)] focus:ring-orange-400`;
  const targetClasses = `text-gray-400 cursor-not-allowed border-white/10 border-dashed opacity-70`;
  
  const fontClass = (code: string) => code === 'fa' || code === 'ar' || code === 'he' || code === 'dv' ? 'font-persian' : '';

  const sourceDisplayDir = sourceConfig.dir;
  const targetDisplayDir = sourceConfig.dir === 'ltr' ? 'rtl' : 'ltr';

  return (
    <div className="flex-grow flex flex-col sm:flex-row gap-6 mt-4">
      <div className="w-full sm:w-1/2 flex flex-col">
        <label htmlFor="source-editor" className="mb-2 text-sm font-medium text-gray-300">
          {sourceConfig.name} <span className="text-xs px-2 py-0.5 bg-black/30 rounded-full">{sourceDisplayDir.toUpperCase()}</span>
        </label>
        <textarea
          id="source-editor"
          value={sourceText}
          onChange={e => onTextChange(e.target.value)}
          className={`${baseClasses} ${sourceClasses} ${fontClass(sourceConfig.code)}`}
          placeholder={`Type in ${sourceConfig.name}...`}
          lang={sourceConfig.code}
          dir={sourceDisplayDir}
          aria-label={`Source editor for ${sourceConfig.name}`}
        />
      </div>
      <div className="w-full sm:w-1/2 flex flex-col">
        <label htmlFor="target-editor" className="mb-2 text-sm font-medium text-gray-300">
          {targetConfig.name} <span className="text-xs px-2 py-0.5 bg-black/30 rounded-full">{targetDisplayDir.toUpperCase()}</span>
        </label>
        <textarea
          id="target-editor"
          value={targetText}
          readOnly
          className={`${baseClasses} ${targetClasses} ${fontClass(targetConfig.code)}`}
          placeholder={`Transliteration in ${targetConfig.name}...`}
          lang={targetConfig.code}
          dir={targetDisplayDir}
          aria-label={`Target editor for ${targetConfig.name}`}
        />
      </div>
    </div>
  );
};