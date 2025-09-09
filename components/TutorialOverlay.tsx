import React from 'react';

interface TutorialOverlayProps {
  onDismiss: () => void;
}

export const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onDismiss }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-black/40 border border-white/20 rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col backdrop-blur-xl text-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">
            Welcome to Scriptorium!
          </h2>
          <p className="text-gray-300 mt-2">Here’s a quick guide to get you started.</p>
        </div>

        <div className="space-y-4 text-left overflow-y-auto pr-2">
          <div className="p-4 bg-black/30 rounded-lg border border-white/10">
            <h3 className="font-bold text-orange-400 text-lg">1. Choose Your Mode</h3>
            <p className="text-sm text-gray-300 mt-1">
              Use <span className="font-semibold text-white">Freeform</span> for open-ended typing and instant transliteration. Switch to <span className="font-semibold text-white">Practice</span> to test your skills and track your WPM and accuracy.
            </p>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/10">
            <h3 className="font-bold text-orange-400 text-lg">2. Select & Swap Languages</h3>
            <p className="text-sm text-gray-300 mt-1">
              Use the dropdowns to pick your source and target languages. Click the <span className="font-semibold text-white">swap icon (⇄)</span> to instantly switch them.
            </p>
          </div>
          <div className="p-4 bg-black/30 rounded-lg border border-white/10">
            <h3 className="font-bold text-orange-400 text-lg">3. Customize Your Keyboard</h3>
            <p className="text-sm text-gray-300 mt-1">
              Click the <span className="font-semibold text-white">"Customize Mapping"</span> button to open the editor. You can change any key's transliteration to create your own personal keyboard layout.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onDismiss}
            className="px-8 py-3 rounded-lg font-semibold bg-orange-500 text-white hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-500/50"
          >
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};