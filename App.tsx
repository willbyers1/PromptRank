
import React, { useState, useEffect, useCallback } from 'react';
import KeyModal from './components/KeyModal';
import ScoreGauge from './components/ScoreGauge';
import Checklist from './components/Checklist';
import { calculateScore } from './services/promptAnalyzer';
import { PromptAnalysis, ToastMessage } from './types';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [promptText, setPromptText] = useState('');
  const [analysis, setAnalysis] = useState<PromptAnalysis | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Check session storage on mount
  useEffect(() => {
    const savedKey = sessionStorage.getItem('prompt_rank_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const showToast = (text: string, type: 'error' | 'success' | 'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const handleUnlock = (key: string) => {
    sessionStorage.setItem('prompt_rank_key', key);
    setApiKey(key);
    showToast('Security verification successful.', 'success');
  };

  const resetKey = () => {
    sessionStorage.removeItem('prompt_rank_key');
    setApiKey(null);
    showToast('API Key has been reset.', 'info');
  };

  const handleAnalyze = () => {
    if (!promptText.trim()) {
      showToast('Input cannot be empty. Enter a prompt to analyze.', 'error');
      return;
    }
    const result = calculateScore(promptText);
    setAnalysis(result);
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-violet-500/30">
      {/* Security Barrier */}
      {!apiKey && <KeyModal onUnlock={handleUnlock} />}

      {/* Main Header */}
      <header className={`z-10 px-6 py-4 glass border-b border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 transition-all ${!apiKey ? 'blur-md pointer-events-none' : ''}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <span className="font-mono font-bold text-white italic">P</span>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">PromptRank</h1>
            <p className="text-[10px] text-violet-400 font-mono font-bold uppercase tracking-widest leading-none">AI Quality Scorer v1.0</p>
          </div>
        </div>
        
        <button 
          onClick={resetKey}
          className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition-all uppercase tracking-widest"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Reset Identity
        </button>
      </header>

      {/* App Body */}
      <main className={`flex-1 container mx-auto p-6 md:p-12 transition-all ${!apiKey ? 'blur-md pointer-events-none' : ''}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Input Side */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-mono font-bold text-violet-400 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
                Prompt Input Stream
              </label>
              <div className="relative group">
                <textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="Act as a Senior Research Analyst. I want you to summarize the latest trends in quantum computing in a table format. Think step by step..."
                  className="w-full h-[400px] bg-slate-900/50 glass border border-slate-700 rounded-2xl p-6 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-mono leading-relaxed"
                />
                <div className="absolute top-0 right-0 p-4">
                  <div className="text-[10px] font-mono text-slate-600 uppercase">Words: {promptText.trim() ? promptText.trim().split(/\s+/).length : 0}</div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleAnalyze}
              className="group w-full py-5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-500/10 transition-all flex items-center justify-center gap-3 active:scale-[0.99]"
            >
              Analyze Prompt Integrity
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Results Side */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {!analysis ? (
              <div className="flex-1 glass border border-slate-800 rounded-3xl flex flex-col items-center justify-center p-12 text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-slate-400 font-bold">Analysis Engine Offline</h3>
                <p className="text-slate-600 text-sm italic">Enter your prompt and hit analyze to see performance metrics.</p>
              </div>
            ) : (
              <>
                <div className="glass border border-slate-800 rounded-3xl p-8 space-y-6">
                  <ScoreGauge score={analysis.totalScore} />
                  
                  <div className="text-center pb-6 border-b border-slate-800">
                    <p className={`text-lg font-black uppercase tracking-wider ${
                      analysis.totalScore >= 80 ? 'text-emerald-400 neon-text-green' : 
                      analysis.totalScore >= 50 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {analysis.summary}
                    </p>
                  </div>

                  <Checklist criteria={analysis.criteria} />
                </div>

                <div className="glass border border-slate-800 rounded-3xl p-6 bg-indigo-500/5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-md bg-indigo-500/20 text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">Quick Pro Tip</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed italic">
                    {analysis.totalScore === 100 
                      ? "You've mastered the basics! Now try adding 'Constraint Boundaries' to limit the response from deviating." 
                      : analysis.criteria.find(c => !c.passed)?.tip || "Keep refining your prompts for better AI outcomes."}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={`p-8 text-center border-t border-slate-900 bg-slate-950/50 transition-all ${!apiKey ? 'blur-md' : ''}`}>
        <p className="text-[10px] uppercase tracking-[0.4em] font-mono text-slate-600">
          Developed by <span className="text-violet-500 font-bold">Mert Batu BULBUL</span> // System Integrity Confirmed
        </p>
      </footer>

      {/* Toast System */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`pointer-events-auto px-6 py-4 rounded-xl shadow-2xl border transition-all animate-bounce-in flex items-center gap-3 ${
              toast.type === 'error' ? 'bg-rose-900/90 border-rose-500 text-rose-100' : 
              toast.type === 'success' ? 'bg-emerald-900/90 border-emerald-500 text-emerald-100' : 
              'bg-slate-800 border-slate-600 text-white'
            }`}
          >
            {toast.type === 'error' ? (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
               </svg>
            ) : (
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zm-1 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
               </svg>
            )}
            <span className="text-sm font-bold tracking-wide">{toast.text}</span>
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </div>
  );
};

export default App;
