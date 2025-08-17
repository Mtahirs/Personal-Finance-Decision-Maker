import React from 'react';
import type { RecommendationType, Answers } from '../types';
import Button from './ui/Button';
import Card from './ui/Card';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { PiggyBankIcon } from './icons/PiggyBankIcon';
import { TrendingUpIcon } from './icons/TrendingUpIcon';

interface ResultsProps {
  recommendation: RecommendationType;
  onRestart: () => void;
  answers: Answers;
}

const recommendationDetails = {
  FOUNDATION_FIREFIGHT: {
    title: "The 'Foundation & Firefight' Plan",
    icon: <ShieldCheckIcon className="h-10 w-10 text-red-500" />,
    description: "Your goal is to build a solid foundation and eliminate high-interest debt. This is a non-negotiable step to prevent future debt and create financial stability.",
    bgColor: "bg-red-100 dark:bg-red-900/40",
    textColor: "text-red-800 dark:text-red-200",
    borderColor: "border-red-500/50"
  },
  BALANCE_BUILD: {
    title: "The 'Balance & Build' Plan",
    icon: <PiggyBankIcon className="h-10 w-10 text-blue-500" />,
    description: "You're in a great position to start or increase your investments. Open an investment account and automate a consistent monthly transfer to leverage compounding over the long term while continuing to boost your savings.",
    bgColor: "bg-blue-100 dark:bg-blue-900/40",
    textColor: "text-blue-800 dark:text-blue-200",
    borderColor: "border-blue-500/50"
  },
  OPTIMIZE_SCALE: {
    title: "The 'Optimize & Scale' Plan",
    icon: <TrendingUpIcon className="h-10 w-10 text-green-500" />,
    description: "Focus on optimizing your portfolio and increasing your income. Explore skills development, a side hustle, or a new business venture. An extra dollar earned can have a greater impact than an extra dollar saved at this stage.",
    bgColor: "bg-green-100 dark:bg-green-900/40",
    textColor: "text-green-800 dark:text-green-200",
    borderColor: "border-green-500/50"
  }
};

const Results: React.FC<ResultsProps> = ({ recommendation, onRestart, answers }) => {
  const details = recommendationDetails[recommendation];
  
  let dynamicDescription = details.description;

  if (recommendation === 'FOUNDATION_FIREFIGHT') {
    const hasDependents = answers.dependents === 'Yes';
    const emergencyFundMonths = hasDependents ? 6 : 3;
    let advice = `Your immediate priority is building an emergency fund to cover at least ${emergencyFundMonths} months of living expenses.`;
    if (answers.hasHighInterestDebt === 'Yes') {
      advice += " Simultaneously, focus on paying down your high-interest debt, prioritizing the one with the highest interest rate first.";
    }
    advice += " Pause long-term investing for now and use this period to learn, so you're ready to invest with confidence once you're debt-free."
    dynamicDescription = advice;
  }

  return (
    <div className="fade-in">
      <Card>
        <div className={`p-8 text-center border-b ${details.borderColor}`}>
          <div className={`mx-auto h-24 w-24 rounded-full flex items-center justify-center mb-6 ${details.bgColor}`}>
            {details.icon}
          </div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{details.title}</h2>
        </div>
        <div className="p-8">
          <p className="text-lg text-center text-slate-600 dark:text-slate-300 mb-8">
            {dynamicDescription}
          </p>
          <div className="flex justify-center">
            <Button onClick={onRestart} variant="secondary">Start Over</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Results;