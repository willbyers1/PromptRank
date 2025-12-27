
import React from 'react';

interface ScoreGaugeProps {
  score: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const normalizedScore = score / 10;
  
  const getColor = () => {
    if (score < 40) return 'text-rose-500';
    if (score < 75) return 'text-amber-500';
    return 'text-emerald-500';
  };

  const getBorderColor = () => {
    if (score < 40) return 'border-rose-500/50 shadow-rose-500/20';
    if (score < 75) return 'border-amber-500/50 shadow-amber-500/20';
    return 'border-emerald-500/50 shadow-emerald-500/20';
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className={`relative w-48 h-48 rounded-full border-4 flex items-center justify-center shadow-2xl transition-all duration-500 ${getBorderColor()}`}>
        <div className="text-center">
          <span className={`text-6xl font-black font-mono transition-colors duration-500 ${getColor()}`}>
            {normalizedScore}
          </span>
          <div className="text-slate-500 font-bold uppercase text-xs tracking-[0.2em] mt-1">Quality Score</div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-slate-900 border border-slate-700"></div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-slate-900 border border-slate-700"></div>
      </div>
    </div>
  );
};

export default ScoreGauge;
