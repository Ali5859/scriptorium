import React, { useState, useEffect, useRef } from 'react';
import { LanguageConfig, LanguageCode, CustomMaps, PracticeSessionResult } from '../types';
import { translate } from '../lib/languageMaps';
import { AccuracyVisualizer } from './AccuracyVisualizer';

interface PracticeViewProps {
  sourceConfig: LanguageConfig;
  targetConfig: LanguageConfig;
  practiceContent: Record<LanguageCode, { words: string[]; shortSentences: string[]; longSentences: string[] }>;
  onSessionComplete: (result: { wpm: number; accuracy: number }) => void;
  customMaps: CustomMaps;
  practiceHistory: PracticeSessionResult[];
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  sourceConfig,
  targetConfig,
  practiceContent,
  onSessionComplete,
  customMaps,
  practiceHistory,
}) => {
  const [prompt, setPrompt] = useState(''); // The original QWERTY sentence (the "answer")
  const [targetPrompt, setTargetPrompt] = useState(''); // The transliterated sentence (the "prompt")
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [results, setResults] = useState<{ wpm: number; accuracy: number, userAnswer: string } | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    startNewRound();
  }, [sourceConfig.code, targetConfig.code, practiceHistory.length]); // Reroll sentence when history length changes
  
  const startNewRound = () => {
    const sessionCount = practiceHistory.length;
    const content = practiceContent[sourceConfig.code] || practiceContent.en;
    
    let difficultyLevel: 'words' | 'shortSentences' | 'longSentences';
    if (sessionCount < 5) {
        difficultyLevel = 'words';
    } else if (sessionCount < 15) {
        difficultyLevel = 'shortSentences';
    } else {
        difficultyLevel = 'longSentences';
    }

    let availableContent = content[difficultyLevel];
    if (!availableContent || availableContent.length === 0) {
      // Fallback logic to find any available content
      availableContent = content.shortSentences || content.longSentences || content.words || [];
    }

    if(availableContent.length === 0){
        setPrompt("No practice content available for this language.");
        setTargetPrompt("No practice content available for this language.");
        return;
    }

    const newPrompt = availableContent[Math.floor(Math.random() * availableContent.length)];
    
    setPrompt(newPrompt);
    setTargetPrompt(translate(newPrompt, sourceConfig.code, targetConfig.code, customMaps));
    setUserInput('');
    setStartTime(null);
    setResults(null);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (!userInput.trim()) return;

    const endTime = Date.now();
    const durationInSeconds = (endTime - (startTime ?? endTime)) / 1000;
    
    const wordsInPrompt = prompt.length / 5;
    const wpm = durationInSeconds > 0 ? Math.round((wordsInPrompt / durationInSeconds) * 60) : 0;
    
    let correctChars = 0;
    for (let i = 0; i < prompt.length; i++) {
        if (i < userInput.length && userInput[i] === prompt[i]) {
            correctChars++;
        }
    }
    const accuracy = prompt.length > 0 ? Math.round((correctChars / prompt.length) * 100) : 0;

    const finalResult = { wpm, accuracy, userAnswer: userInput };
    setResults(finalResult);
    onSessionComplete({ wpm, accuracy });
  };

  const renderComparison = () => {
    if (!results) return null;
    const correct = prompt.split('');
    const user = results.userAnswer.split('');
    const maxLength = Math.max(correct.length, user.length);
    
    const comparisonResult = [];
    for(let i = 0; i < maxLength; i++) {
        const correctChar = correct[i] || '';
        const userChar = user[i] || '';
        const isMatch = correctChar === userChar;
        comparisonResult.push(
            <span key={i} className={`px-1 rounded ${isMatch ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {userChar || <span className="opacity-50">_</span>}
            </span>
        )
    }
    return comparisonResult;
  }
  
  const fontClass = (code: string) => code === 'fa' || code === 'ar' || code === 'he' || code === 'dv' ? 'font-persian' : '';

  return (
    <div className="p-6 bg-black/20 rounded-xl border border-white/10 backdrop-blur-lg shadow-lg space-y-4">
      {!results ? (
        <>
          <div>
            <p className="text-sm text-gray-300 mb-1">Transliterate this sentence back to {sourceConfig.name}:</p>
            <p 
                className={`text-2xl text-gray-200 p-4 bg-black/30 rounded-md ${fontClass(targetConfig.code)}`}
                dir={targetConfig.dir}
            >
                {targetPrompt}
            </p>
          </div>
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            className={`w-full p-4 text-lg bg-black/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none border border-white/20 ${fontClass(sourceConfig.code)}`}
            placeholder={`Type the original ${sourceConfig.name} sentence here...`}
            dir={sourceConfig.dir}
            rows={4}
            disabled={!!results}
          />
          <button 
            onClick={handleSubmit} 
            className="w-full px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors disabled:bg-gray-600/50"
            disabled={!userInput.trim()}
          >
            Submit Answer
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 p-4 animate-fadeIn">
            <h3 className="text-2xl font-bold text-white">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-center">
                <div className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-lg">
                     <p className="text-sm text-orange-300">Words Per Minute</p>
                     <p className="text-4xl font-bold text-white">{results.wpm}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <AccuracyVisualizer accuracy={results.accuracy} />
                </div>
                 <div className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-lg">
                     <p className="text-sm text-orange-300">Accuracy</p>
                     <p className="text-4xl font-bold text-white">{results.accuracy}%</p>
                </div>
            </div>
            <div className="w-full space-y-2 text-left">
                <div>
                    <p className="text-sm text-gray-400">Your Answer:</p>
                    <p className="p-2 bg-black/30 rounded text-lg font-mono tracking-wider">{renderComparison()}</p>
                </div>
                 <div>
                    <p className="text-sm text-gray-400">Correct Answer:</p>
                    <p className="p-2 bg-black/30 rounded text-lg font-mono text-green-400 tracking-wider">{prompt}</p>
                </div>
            </div>
          <button onClick={startNewRound} className="w-full md:w-auto px-8 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors">
            Try Another One
          </button>
        </div>
      )}
    </div>
  );
};