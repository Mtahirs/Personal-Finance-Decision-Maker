import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  startAdornment?: React.ReactNode;
};

const Input: React.FC<InputProps> = ({ startAdornment, ...props }) => {
  if (startAdornment) {
    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 dark:text-slate-400">
          {startAdornment}
        </div>
        <input
          {...props}
          className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>
    );
  }

  return (
    <input
      {...props}
      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
    />
  );
};

export default Input;