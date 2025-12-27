
import React, { useState } from 'react';

interface KeyModalProps {
  onUnlock: (key: string) => void;
}

const KeyModal: React.FC<KeyModalProps> = ({ onUnlock }) => {
  const [key, setKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.length > 5) {
      onUnlock(key);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
      <div className="w-full max-w-md p-8 glass neon-border-purple rounded-2xl animate-glow">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-violet-600/20 text-violet-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-white mb-2">Initialize Security</h2>
        <p className="text-slate-400 text-center mb-8 text-sm">
          Bring Your Own Key (BYOK) architecture. Please enter your API Key to unlock the interface.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-violet-400 uppercase tracking-wider mb-2">API Key</label>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="••••••••••••••••"
              className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all font-mono"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-lg shadow-lg shadow-violet-500/20 transition-all active:scale-[0.98]"
          >
            Unlock Application
          </button>
        </form>
        <p className="mt-6 text-[10px] text-slate-500 text-center">
          Keys are stored only in your session storage and never sent to our servers.
        </p>
      </div>
    </div>
  );
};

export default KeyModal;
