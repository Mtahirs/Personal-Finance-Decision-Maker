import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

interface SearchableSelectProps {
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ options, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(() =>
    options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    ), [options, searchTerm]);

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex(prev => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex(prev => (prev > 0 ? prev - 1 : 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
            handleSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case 'Escape':
          setIsOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, filteredOptions]);

  // Scroll to highlighted item
  useEffect(() => {
    if (isOpen && highlightedIndex >= 0) {
      const list = wrapperRef.current?.querySelector('ul');
      const item = list?.children[highlightedIndex] as HTMLLIElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [isOpen, highlightedIndex]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => {
            const nowOpen = !isOpen;
            setIsOpen(nowOpen);
            if (nowOpen) {
                setTimeout(() => inputRef.current?.focus(), 0);
            }
        }}
        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition flex justify-between items-center text-left"
      >
        <span className={selectedValue ? 'text-slate-900 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500'}>
            {selectedValue || placeholder}
        </span>
        <ChevronDownIcon className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700 max-h-60 overflow-hidden flex flex-col">
          <div className="p-2">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => {
                  setSearchTerm(e.target.value);
                  setHighlightedIndex(0);
              }}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <ul className="overflow-y-auto flex-grow">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`px-4 py-2 cursor-pointer ${highlightedIndex === index ? 'bg-indigo-100 dark:bg-indigo-900/40' : ''}`}
                >
                  {option}
                </li>
              ))
            ) : (
                <li className="px-4 py-2 text-slate-500">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;