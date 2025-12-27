
import { PromptAnalysis, CriterionResult } from '../types';

export const calculateScore = (promptText: string): PromptAnalysis => {
  const criteria: CriterionResult[] = [
    {
      id: 'length',
      name: 'Depth & Context (Length)',
      passed: false,
      score: 0,
      tip: 'Try adding more context. Detailed prompts usually exceed 50 words.'
    },
    {
      id: 'role',
      name: 'Persona Definition',
      passed: false,
      score: 0,
      tip: 'Tell the AI who to be (e.g., "Act as a Senior Architect").'
    },
    {
      id: 'output',
      name: 'Output Clarity',
      passed: false,
      score: 0,
      tip: 'Specify a format like JSON, Markdown, Table, or CSV.'
    },
    {
      id: 'reasoning',
      name: 'Chain of Thought',
      passed: false,
      score: 0,
      tip: 'Ask the AI to "think step by step" or explain its process.'
    },
    {
      id: 'examples',
      name: 'Few-Shot Examples',
      passed: false,
      score: 0,
      tip: 'Provide 1-2 examples of desired input/output pairs.'
    }
  ];

  if (!promptText.trim()) {
    return { totalScore: 0, criteria, summary: 'Input is empty.' };
  }

  // 1. Length Check
  const wordCount = promptText.trim().split(/\s+/).length;
  if (wordCount >= 50) {
    criteria[0].passed = true;
    criteria[0].score = 20;
  }

  // 2. Role Definition
  const roleRegex = /act as|you are|your role|imagine you are|as a/i;
  if (roleRegex.test(promptText)) {
    criteria[1].passed = true;
    criteria[1].score = 20;
  }

  // 3. Output Clarity
  const outputRegex = /markdown|json|list|table|csv|format|output|bullet points/i;
  if (outputRegex.test(promptText)) {
    criteria[2].passed = true;
    criteria[2].score = 20;
  }

  // 4. Chain of Thought
  const reasoningRegex = /step by step|think|process|instructions|reasoning|logic|chain of thought/i;
  if (reasoningRegex.test(promptText)) {
    criteria[3].passed = true;
    criteria[3].score = 20;
  }

  // 5. Examples
  const examplesRegex = /example:|e\.g\.|input:|output:|sample:|instance:/i;
  if (examplesRegex.test(promptText)) {
    criteria[4].passed = true;
    criteria[4].score = 20;
  }

  const totalScore = criteria.reduce((acc, curr) => acc + curr.score, 0);
  
  let summary = "";
  if (totalScore < 40) summary = "Rookie Prompt. The AI might give generic answers.";
  else if (totalScore < 70) summary = "Solid Foundation. Needs a few more constraints.";
  else if (totalScore < 100) summary = "Advanced Engineer. High quality results expected.";
  else summary = "Master Prompt Engineer. Perfection achieved.";

  return {
    totalScore,
    criteria,
    summary
  };
};
