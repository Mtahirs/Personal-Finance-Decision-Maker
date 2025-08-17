export interface Question {
  id: keyof Answers;
  text: string;
  subText?: string;
  type: 'number' | 'select' | 'currency';
  placeholder?: string;
  options?: string[];
}

export interface Answers {
  currency: string;
  age: string;
  monthlyIncome: string;
  monthlySavings: string;
  liquidSavings: string;
  monthlyExpenses: string;
  dependents: string;
  hasHighInterestDebt: string;
  totalDebtAmount: string;
  debtInterestRate: string;
  monthlyDebtRepayment: string;
  financialGoal: string;
}

export type RecommendationType = 'FOUNDATION_FIREFIGHT' | 'BALANCE_BUILD' | 'OPTIMIZE_SCALE';