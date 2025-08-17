import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`
      bg-white/80 dark:bg-slate-800/80
      backdrop-blur-lg
      rounded-xl shadow-2xl
      overflow-hidden 
      border border-slate-200/50 dark:border-slate-700/50 
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;