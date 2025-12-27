
import React from 'react';
import { CriterionResult } from '../types';

interface ChecklistProps {
  criteria: CriterionResult[];
}

const Checklist: React.FC<ChecklistProps> = ({ criteria }) => {
  return (
    <div className="space-y-3">
      {criteria.map((item) => (
        <div 
          key={item.id} 
          className={`p-4 rounded-xl glass border transition-all duration-300 ${
            item.passed ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-700'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className={`mt-1 shrink-0 ${item.passed ? 'text-emerald-500' : 'text-slate-600'}`}>
              {item.passed ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div>
              <h4 className={`text-sm font-bold ${item.passed ? 'text-emerald-400' : 'text-slate-300'}`}>
                {item.name}
              </h4>
              {!item.passed && (
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {item.tip}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Checklist;
