import React, { useState, useEffect } from 'react';
import { LanguageConfig, CustomMap, LanguageCode } from '../types';

interface MappingEditorProps {
  isOpen: boolean;
  onClose: () => void;
  targetLangConfig: LanguageConfig;
  customMap: CustomMap;
  onSave: (targetCode: LanguageCode, newMap: CustomMap | null) => void;
}

const qwertyLayout = [
  'qwertyuiop[]',
  'asdfghjkl;\'',
  'zxcvbnm,./',
];
const qwertyShiftLayout = [
  'QWERTYUIOP{}',
  'ASDFGHJKL:"',
  'ZXCVBNM<>?',
];
const symbolsLayout = [
    '`1234567890-=',
    '~!@#$%^&*()_+',
]
const allQwertyChars = qwertyLayout.join('') + qwertyShiftLayout.join('') + symbolsLayout.join('');


export const MappingEditor: React.FC<MappingEditorProps> = ({
  isOpen,
  onClose,
  targetLangConfig,
  customMap,
  onSave,
}) => {
  const [localMap, setLocalMap] = useState<CustomMap>({});

  useEffect(() => {
    if (isOpen) {
      const initialMap: CustomMap = {};
      for (const char of allQwertyChars) {
        initialMap[char] = customMap[char] ?? targetLangConfig.map[char] ?? char;
      }
      setLocalMap(initialMap);
    }
  }, [isOpen, customMap, targetLangConfig]);

  if (!isOpen) return null;

  const handleInputChange = (qwertyChar: string, newValue: string) => {
    setLocalMap(prev => ({ ...prev, [qwertyChar]: newValue }));
  };

  const handleSave = () => {
    const overrides: CustomMap = {};
    for (const char of allQwertyChars) {
      const defaultValue = targetLangConfig.map[char] ?? char;
      if (localMap[char] !== defaultValue) {
        overrides[char] = localMap[char];
      }
    }
    onSave(targetLangConfig.code, Object.keys(overrides).length > 0 ? overrides : null);
    onClose();
  };
  
  const handleReset = () => {
    onSave(targetLangConfig.code, null);
    onClose();
  };

  const renderKeyInputs = (layout: string[]) => (
    layout.map(row => (
      <div key={row} className="flex justify-center gap-1 mb-1 flex-wrap">
        {row.split('').map(char => (
          <div key={char} className="flex flex-col items-center">
            <span className="text-xs text-gray-500 h-4">{char}</span>
            <input
              type="text"
              value={localMap[char] || ''}
              onChange={(e) => handleInputChange(char, e.target.value)}
              className="w-10 h-10 text-center bg-black/30 border border-white/20 rounded-md text-orange-400 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              maxLength={5}
              aria-label={`Mapping for key ${char}`}
            />
          </div>
        ))}
      </div>
    ))
  );

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-black/40 border border-white/20 rounded-xl shadow-2xl p-6 w-full max-w-4xl max-h-[90vh] flex flex-col backdrop-blur-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            Customize Mapping for <span className="text-orange-400">{targetLangConfig.name}</span>
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none" aria-label="Close mapping editor">&times;</button>
        </div>
        
        <div className="flex-grow overflow-y-auto pr-2 space-y-6">
          <div>
            <p className="text-sm text-gray-400 mb-2 font-semibold">Lowercase</p>
            {renderKeyInputs(qwertyLayout)}
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-2 font-semibold">Uppercase / Shift</p>
            {renderKeyInputs(qwertyShiftLayout)}
          </div>
           <div>
            <p className="text-sm text-gray-400 mb-2 font-semibold">Numbers & Symbols</p>
            {renderKeyInputs(symbolsLayout)}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 mt-6 pt-4 border-t border-white/20">
          <button onClick={handleReset} className="text-sm text-pink-500 hover:text-pink-400 hover:underline">
            Reset to Default
          </button>
          <div className="flex gap-4">
            <button onClick={onClose} className="px-6 py-2 rounded-md font-semibold bg-transparent text-gray-400 hover:bg-white/10 transition-colors">
              Cancel
            </button>
            <button onClick={handleSave} className="px-6 py-2 rounded-md font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};