import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { DualEditor } from './components/DualEditor';
import { MultiLanguageSelector } from './components/MultiLanguageSelector';
import { LanguageCode, AppMode, PracticeSessionResult, CustomMaps, CustomMap } from './types';
import { translate, languages, practiceContent } from './lib/languageMaps';
import { SplashScreen } from './components/SplashScreen';
import { ModeSwitcher } from './components/ModeSwitcher';
import { PracticeView } from './components/PracticeView';
import { StatsDashboard } from './components/StatsDashboard';
import { MappingEditor } from './components/MappingEditor';
import { TutorialOverlay } from './components/TutorialOverlay';

const App: React.FC = () => {
  const [sourceLangCode, setSourceLangCode] = useState<LanguageCode>('en');
  const [targetLangCode, setTargetLangCode] = useState<LanguageCode>('fa');
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<AppMode>('freeform');
  const [practiceHistory, setPracticeHistory] = useState<PracticeSessionResult[]>([]);
  const [historyKey, setHistoryKey] = useState(Date.now()); // Used to force-refresh stats
  const [customMaps, setCustomMaps] = useState<CustomMaps>({});
  const [isMappingEditorOpen, setIsMappingEditorOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    const storedHistory = localStorage.getItem('scriptorium-history');
    if (storedHistory) {
      setPracticeHistory(JSON.parse(storedHistory));
    }
    const storedMaps = localStorage.getItem('scriptorium-maps');
    if (storedMaps) {
      setCustomMaps(JSON.parse(storedMaps));
    }
    return () => clearTimeout(timer);
  }, []);
  
  const handleTextChange = useCallback((newSourceText: string) => {
    setSourceText(newSourceText);
    const translated = translate(newSourceText, sourceLangCode, targetLangCode, customMaps);
    setTargetText(translated);
  }, [sourceLangCode, targetLangCode, customMaps]);

  const handleSourceLangChange = useCallback((newSourceCode: LanguageCode) => {
    let newTargetCode = targetLangCode;
    if (newSourceCode === targetLangCode) {
      newTargetCode = sourceLangCode;
      setTargetLangCode(sourceLangCode);
    }
    setSourceLangCode(newSourceCode);
    setSourceText('');
    setTargetText('');
  }, [sourceLangCode, targetLangCode]);

  const handleTargetLangChange = useCallback((newTargetCode: LanguageCode) => {
    let newSourceCode = sourceLangCode;
    if (newTargetCode === sourceLangCode) {
      newSourceCode = targetLangCode;
      setSourceLangCode(targetLangCode);
    }
    setTargetLangCode(newTargetCode);
    setSourceText('');
    setTargetText('');
  }, [sourceLangCode, targetLangCode]);

  const handleSwapLanguages = useCallback(() => {
    setSourceLangCode(targetLangCode);
    setTargetLangCode(sourceLangCode);
    setSourceText('');
    setTargetText('');
  }, [sourceLangCode, targetLangCode]);

  const handleSessionComplete = (result: { wpm: number; accuracy: number }) => {
    const newSession: PracticeSessionResult = { ...result, timestamp: Date.now() };
    const updatedHistory = [...practiceHistory, newSession];
    setPracticeHistory(updatedHistory);
    localStorage.setItem('scriptorium-history', JSON.stringify(updatedHistory));
  };
  
  const clearHistory = () => {
      setPracticeHistory([]);
      localStorage.removeItem('scriptorium-history');
      setHistoryKey(Date.now()); // Force re-render of dashboard
  }

  const handleSaveCustomMap = (targetCode: LanguageCode, newMap: CustomMap | null) => {
    const updatedMaps = { ...customMaps };
    if (newMap && Object.keys(newMap).length > 0) {
      updatedMaps[targetCode] = newMap;
    } else {
      delete updatedMaps[targetCode];
    }
    setCustomMaps(updatedMaps);
    localStorage.setItem('scriptorium-maps', JSON.stringify(updatedMaps));
    // Immediately re-translate any existing text with the new map
    handleTextChange(sourceText);
  };
  
  const sourceLangConfig = languages[sourceLangCode];
  const targetLangConfig = languages[targetLangCode];

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8 font-sans transition-opacity duration-500 animate-fadeIn">
      <div className="w-full max-w-7xl mx-auto flex flex-col flex-grow">
        <div className="flex-shrink-0">
          <Header onOpenTutorial={() => setIsTutorialOpen(true)} />
        </div>
        <main className="mt-8 space-y-6 flex-grow flex flex-col">
          <div className="flex-shrink-0">
            <MultiLanguageSelector
              sourceLang={sourceLangCode}
              targetLang={targetLangCode}
              onSourceChange={handleSourceLangChange}
              onTargetChange={handleTargetLangChange}
              onSwap={handleSwapLanguages}
              onCustomize={() => setIsMappingEditorOpen(true)}
            />
          </div>
          <div className="flex-shrink-0">
            <ModeSwitcher mode={mode} setMode={setMode} />
          </div>
          
          <div className="flex-grow flex flex-col">
            {mode === 'freeform' && (
              <DualEditor
                sourceConfig={sourceLangConfig}
                targetConfig={targetLangConfig}
                sourceText={sourceText}
                targetText={targetText}
                onTextChange={handleTextChange}
              />
            )}
            {mode === 'practice' && (
              <div className="space-y-6">
                <PracticeView 
                  sourceConfig={sourceLangConfig}
                  targetConfig={targetLangConfig}
                  practiceContent={practiceContent}
                  onSessionComplete={handleSessionComplete}
                  customMaps={customMaps}
                  practiceHistory={practiceHistory}
                />
                <StatsDashboard history={practiceHistory} onClearHistory={clearHistory} key={historyKey} />
              </div>
            )}
          </div>
        </main>
      </div>
      {isMappingEditorOpen && (
        <MappingEditor
          isOpen={isMappingEditorOpen}
          onClose={() => setIsMappingEditorOpen(false)}
          targetLangConfig={targetLangConfig}
          customMap={customMaps[targetLangCode] || {}}
          onSave={handleSaveCustomMap}
        />
      )}
      {isTutorialOpen && <TutorialOverlay onDismiss={() => setIsTutorialOpen(false)} />}
    </div>
  );
};

export default App;