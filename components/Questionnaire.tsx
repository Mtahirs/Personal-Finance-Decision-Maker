import React, { useState, useEffect } from 'react';
import type { Question, Answers } from '../types';
import ProgressBar from './ProgressBar';
import Button from './ui/Button';
import Card from './ui/Card';
import Input from './ui/Input';
import Select from './ui/Select';
import SearchableSelect from './ui/SearchableSelect';

interface QuestionnaireProps {
  question: Question;
  onNext: (field: keyof Answers, value: string) => void;
  progress: number;
  totalQuestions: number;
  currentQuestionNumber: number;
  currency: string;
}

const formatNumberWithCommas = (value: string): string => {
  const cleanValue = value.replace(/[^\d.]/g, '');
  const [integerPart, decimalPart] = cleanValue.split('.');
  
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  if (decimalPart !== undefined) {
      return `${formattedIntegerPart}.${decimalPart}`;
  }
  
  return formattedIntegerPart;
};

const parseFormattedNumber = (value: string): string => {
  return value.replace(/,/g, '');
};

const Questionnaire: React.FC<QuestionnaireProps> = ({ question, onNext, progress, totalQuestions, currentQuestionNumber, currency }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setValue('');
    setError('');
  }, [question]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value) {
      setError('This field is required.');
      return;
    }

    let valueToSend = value;

    if (question.type === 'number') {
      const rawValue = parseFormattedNumber(value);
      if (Number(rawValue) < 0) {
        setError('Please enter a non-negative number.');
        return;
      }
      valueToSend = rawValue;
    } else if (question.type === 'currency') {
      // The value from SearchableSelect is the full string, e.g., 'USD ($)'. Extract the symbol.
      valueToSend = value.match(/\(([^)]+)\)/)?.[1] || '$';
    }
    
    onNext(question.id, valueToSend);
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    setError('');
  };

  const handleCurrencyChange = (selectedValue: string) => {
    setValue(selectedValue);
    setError('');
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatNumberWithCommas(e.target.value);
    setValue(formattedValue);
    setError('');
  };

  return (
    <Card>
      <ProgressBar progress={progress} />
      <div className="p-6 md:p-8">
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
          Question {currentQuestionNumber} of {totalQuestions}
        </p>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">
          {question.text}
        </h2>
        {question.subText && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">{question.subText}</p>
        )}
        <div className={question.subText ? '' : 'mt-6'}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {question.type === 'number' && question.id !== 'age' && (
              <Input
                type="text"
                inputMode="decimal"
                value={value}
                onChange={handleNumberChange}
                placeholder={question.placeholder}
                autoFocus
                startAdornment={<span className="font-semibold text-base">{currency}</span>}
              />
            )}
            
            {question.type === 'number' && question.id === 'age' && (
              <Input
                type="number"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setError('');
                }}
                placeholder={question.placeholder}
                autoFocus
              />
            )}

            {question.type === 'currency' && (
              <SearchableSelect
                options={question.options || []}
                onChange={handleCurrencyChange}
                placeholder="Search or select a currency..."
              />
            )}

            {question.type === 'select' && (
              <Select
                value={value}
                onChange={handleSelectChange}
              >
                <option value="" disabled>Select an option</option>
                {question.options?.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
            )}

            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <Button type="submit">Next</Button>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default Questionnaire;