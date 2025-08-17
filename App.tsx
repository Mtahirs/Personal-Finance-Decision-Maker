import React, { useState, useCallback, useMemo } from 'react';
import { QUESTIONS } from './constants';
import type { Answers, RecommendationType } from './types';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';

const initialAnswers: Answers = {
  currency: '$',
  age: '',
  monthlyIncome: '',
  monthlySavings: '',
  liquidSavings: '',
  monthlyExpenses: '',
  dependents: '',
  hasHighInterestDebt: '',
  totalDebtAmount: '',
  debtInterestRate: '',
  monthlyDebtRepayment: '',
  financialGoal: '',
};

const App: React.FC = () => {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recommendation, setRecommendation] = useState<RecommendationType | null>(null);

  const questionsToAsk = useMemo(() => {
    if (answers.hasHighInterestDebt === 'No') {
      return QUESTIONS.filter(q => q.id !== 'totalDebtAmount' && q.id !== 'debtInterestRate' && q.id !== 'monthlyDebtRepayment');
    }
    return QUESTIONS;
  }, [answers.hasHighInterestDebt]);

  const calculateRecommendation = useCallback((finalAnswers: Answers): RecommendationType => {
    const monthlyIncome = Number(finalAnswers.monthlyIncome) || 0;
    const monthlySavings = Number(finalAnswers.monthlySavings) || 0;
    const liquidSavings = Number(finalAnswers.liquidSavings) || 0;
    const monthlyExpenses = Number(finalAnswers.monthlyExpenses) || 0;
    const monthlyDebtRepayment = Number(finalAnswers.monthlyDebtRepayment) || 0;
    
    const savingRate = monthlyIncome > 0 ? monthlySavings / monthlyIncome : 0;
    const hasDependents = finalAnswers.dependents === 'Yes';
    const hasDebt = finalAnswers.hasHighInterestDebt === 'Yes';

    // Plan 1: "Foundation & Firefight" - For anyone with high-interest debt.
    if (hasDebt) {
      return 'FOUNDATION_FIREFIGHT';
    }

    // After debt is handled, we determine the emergency fund target.
    const emergencyFundMonthsMultiplier = hasDependents ? 6 : 3;
    const emergencyFundTarget = emergencyFundMonthsMultiplier * monthlyExpenses;

    const fullyFundedEmergencyFundMonths = hasDependents ? 9 : 6;
    const fullyFundedEmergencyFundTarget = fullyFundedEmergencyFundMonths * monthlyExpenses;

    // Plan 3: "Optimize & Scale" - For those in a very strong position.
    if (
      !hasDebt &&
      (monthlyExpenses > 0 && liquidSavings >= fullyFundedEmergencyFundTarget) &&
      savingRate > 0.20
    ) {
      return 'OPTIMIZE_SCALE';
    }

    // Plan 2: "Balance & Build" - For those who are debt-free and have a solid foundation.
    if (
      !hasDebt &&
      (monthlyExpenses > 0 && liquidSavings >= emergencyFundTarget)
    ) {
      return 'BALANCE_BUILD';
    }
    
    // Default to Foundation if no other category fits (e.g., no debt but insufficient emergency fund)
    return 'FOUNDATION_FIREFIGHT';
  }, []);

  const handleNextQuestion = (field: keyof Answers, value: string) => {
    const newAnswers = { ...answers, [field]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questionsToAsk.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalRecommendation = calculateRecommendation(newAnswers);
      setRecommendation(finalRecommendation);
    }
  };

  const handleRestart = () => {
    setAnswers(initialAnswers);
    setCurrentQuestionIndex(0);
    setRecommendation(null);
  };

  return (
    <div className="relative min-h-screen text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Your Next Financial Step
          </h1>
          <p className="mt-2 text-lg text-slate-300">
            Answer a few questions to get a personalized recommendation.
          </p>
        </header>
        
        <main>
          {recommendation ? (
            <Results recommendation={recommendation} onRestart={handleRestart} answers={answers} />
          ) : (
            <Questionnaire
              question={questionsToAsk[currentQuestionIndex]}
              onNext={handleNextQuestion}
              progress={(currentQuestionIndex / questionsToAsk.length) * 100}
              totalQuestions={questionsToAsk.length}
              currentQuestionNumber={currentQuestionIndex + 1}
              currency={answers.currency}
            />
          )}
        </main>

        <footer className="text-center mt-8">
          <p className="text-xs text-slate-400">
            Disclaimer: This tool provides a high-level guide and is not professional financial advice. Always consult with a qualified financial advisor for personalized guidance.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;