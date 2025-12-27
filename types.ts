
export interface CriterionResult {
  id: string;
  name: string;
  passed: boolean;
  score: number;
  tip: string;
}

export interface PromptAnalysis {
  totalScore: number;
  criteria: CriterionResult[];
  summary: string;
}

export interface ToastMessage {
  id: number;
  text: string;
  type: 'error' | 'success' | 'info';
}
