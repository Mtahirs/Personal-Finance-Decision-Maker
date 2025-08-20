// --- CONSTANTS ---
const QUESTIONS = [
  {
    id: 'currency',
    text: 'What is your primary currency?',
    type: 'currency',
    placeholder: 'Search or select a currency...',
    options: [
      'USD ($)', 'EUR (€)', 'JPY (¥)', 'GBP (£)', 'AUD ($)', 'CAD ($)', 'CHF (Fr)', 'CNY (¥)', 'SEK (kr)', 'NZD ($)',
      'MXN ($)', 'SGD ($)', 'HKD ($)', 'NOK (kr)', 'KRW (₩)', 'TRY (₺)', 'RUB (₽)', 'INR (₹)', 'BRL (R$)', 'ZAR (R)',
      'AED (د.إ)', 'AFN (؋)', 'ALL (L)', 'AMD (֏)', 'ANG (ƒ)', 'AOA (Kz)', 'ARS ($)', 'AWG (ƒ)', 'AZN (₼)', 'BAM (KM)',
      'BBD ($)', 'BDT (৳)', 'BGN (лв)', 'BHD (.د.ب)', 'BIF (FBu)', 'BMD ($)', 'BND ($)', 'BOB ($b)', 'BSD ($)', 'BTN (Nu.)',
      'BWP (P)', 'BYN (Br)', 'BZD (BZ$)', 'CDF (FC)', 'CLP ($)', 'COP ($)', 'CRC (₡)', 'CUP (₱)', 'CVE ($)', 'CZK (Kč)',
      'DJF (Fdj)', 'DKK (kr)', 'DOP (RD$)', 'DZD (دج)', 'EGP (E£)', 'ERN (Nfk)', 'ETB (Br)', 'FJD ($)', 'FKP (£)', 'FOK (kr)',
      'GEL (₾)', 'GGP (£)', 'GHS (₵)', 'GIP (£)', 'GMD (D)', 'GNF (FG)', 'GTQ (Q)', 'GYD ($)', 'HNL (L)', 'HTG (G)',
      'HUF (Ft)', 'IDR (Rp)', 'ILS (₪)', 'IMP (£)', 'IQD (ع.د)', 'IRR (﷼)', 'ISK (kr)', 'JEP (£)', 'JMD (J$)', 'JOD (JD)',
      'KES (KSh)', 'KGS (лв)', 'KHR (៛)', 'KID ($)', 'KMF (CF)', 'KWD (KD)', 'KYD ($)', 'KZT (₸)', 'LAK (₭)', 'LBP (£)',
      'LKR (Rs)', 'LRD ($)', 'LSL (L)', 'LYD (LD)', 'MAD (MAD)', 'MDL (L)', 'MGA (Ar)', 'MKD (ден)', 'MMK (K)', 'MNT (₮)',
      'MOP (MOP$)', 'MRU (UM)', 'MUR (₨)', 'MVR (.ރ)', 'MWK (MK)', 'MYR (RM)', 'MZN (MT)', 'NAD ($)', 'NGN (₦)', 'NIO (C$)',
      'NPR (₨)', 'OMR (﷼)', 'PAB (B/.)', 'PEN (S/.)', 'PGK (K)', 'PHP (₱)', 'PKR (₨)', 'PLN (zł)', 'PYG (Gs)', 'QAR (﷼)',
      'RON (lei)', 'RSD (Дин.)', 'RWF (R₣)', 'SAR (﷼)', 'SBD ($)', 'SCR (₨)', 'SDG (ج.س.)', 'SHP (£)', 'SLE (Le)', 'SLL (Le)',
      'SOS (S)', 'SRD ($)', 'SSP (£)', 'STN (Db)', 'SYP (£)', 'SZL (E)', 'THB (฿)', 'TJS (SM)', 'TMT (T)', 'TND (DT)',
      'TOP (T$)', 'TTD (TT$)', 'TVD ($)', 'TWD (NT$)', 'TZS (TSh)', 'UAH (₴)', 'UGX (USh)', 'UYU ($U)', 'UZS (лв)', 'VES (Bs.)',
      'VND (₫)', 'VUV (VT)', 'WST (T)', 'XAF (FCFA)', 'XCD ($)', 'XDR (SDR)', 'XOF (CFA)', 'XPF (₣)', 'YER (﷼)', 'ZMW (ZK)'
    ],
  },
  { id: 'age', text: "What's your current age?", type: 'number', placeholder: 'e.g., 30' },
  { id: 'monthlyIncome', text: 'How much is your total monthly income (after taxes)?', type: 'number', placeholder: 'e.g., 4,000' },
  { id: 'monthlySavings', text: 'How much of your income do you consistently save or invest each month?', type: 'number', placeholder: 'e.g., 500' },
  { id: 'liquidSavings', text: 'How much do you have in an easily accessible savings account?', subText: 'This is separate from any long-term investments.', type: 'number', placeholder: 'e.g., 10,000' },
  { id: 'monthlyExpenses', text: 'What are your total monthly living expenses?', subText: 'Include rent, food, transport, bills, etc.', type: 'number', placeholder: 'e.g., 2,500' },
  { id: 'dependents', text: 'Do you have any financial dependents?', subText: 'e.g., children, spouse, or parents who rely on you financially.', type: 'select', options: ['Yes', 'No'] },
  { id: 'hasHighInterestDebt', text: 'Do you have any significant high-interest debt?', subText: 'e.g., credit card balances or personal loans.', type: 'select', options: ['Yes', 'No'] },
  { id: 'totalDebtAmount', text: 'What is the total amount you owe across all high-interest debts?', type: 'number', placeholder: 'e.g., 5,000' },
  { id: 'debtInterestRate', text: 'What is the average interest rate on these debts?', type: 'number', placeholder: 'e.g., 20 (for 20%)' },
  { id: 'monthlyDebtRepayment', text: 'What is your current total monthly repayment for all these debts?', type: 'number', placeholder: 'e.g., 200' },
  { id: 'financialGoal', text: 'What is your primary financial goal for the next 1-3 years?', type: 'select', options: ["Pay off debt", "Buy a house", "Start investing", "Start a business"] },
];

const recommendationDetails = {
  FOUNDATION_FIREFIGHT: {
    title: "The 'Foundation & Firefight' Plan",
    icon: `<svg class="color-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z" /></svg>`,
    description: "Your goal is to build a solid foundation and eliminate high-interest debt. This is a non-negotiable step to prevent future debt and create financial stability.",
    bgColor: "bg-red",
    borderColor: "border-red"
  },
  BALANCE_BUILD: {
    title: "The 'Balance & Build' Plan",
    icon: `<svg class="color-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 14.625 7.5H12v-2.625Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 11.25c.074.322.122.656.142 1a2.622 2.622 0 0 1-1.343 2.414A2.622 2.622 0 0 1 12 15.75c-.916 0-1.734-.442-2.23-1.166A2.622 2.622 0 0 1 8.11 12.25c.02-.344.068-.678.142-1M15.75 11.25a2.25 2.25 0 0 0-4.5 0M11.25 4.5v.75a.75.75 0 0 1-10.5 6h-3a.75.75 0 0 1-.75-.75V4.5m3.75 0v-.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75v.75" /></svg>`,
    description: "You're in a great position to start or increase your investments. Open an investment account and automate a consistent monthly transfer to leverage compounding over the long term while continuing to boost your savings.",
    bgColor: "bg-blue",
    borderColor: "border-blue"
  },
  OPTIMIZE_SCALE: {
    title: "The 'Optimize & Scale' Plan",
    icon: `<svg class="color-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 18 6.75-6.75 4.306 4.306a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0-3.75-.625M21 3.375v4.5" /></svg>`,
    description: "Focus on optimizing your portfolio and increasing your income. Explore skills development, a side hustle, or a new business venture. An extra dollar earned can have a greater impact than an extra dollar saved at this stage.",
    bgColor: "bg-green",
    borderColor: "border-green"
  }
};

// --- STATE ---
const initialAnswers = {
  currency: '$', age: '', monthlyIncome: '', monthlySavings: '', liquidSavings: '',
  monthlyExpenses: '', dependents: '', hasHighInterestDebt: '', totalDebtAmount: '',
  debtInterestRate: '', monthlyDebtRepayment: '', financialGoal: '',
};

let answers = { ...initialAnswers };
let currentQuestionIndex = 0;
let recommendation = null;

// --- DOM ELEMENTS ---
const mainContent = document.getElementById('main-content');

// --- HELPER FUNCTIONS ---
const formatNumberWithCommas = (value) => {
  const cleanValue = String(value).replace(/[^\d.]/g, '');
  const [integerPart, decimalPart] = cleanValue.split('.');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimalPart !== undefined ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
};

const parseFormattedNumber = (value) => String(value).replace(/,/g, '');

const calculateRecommendation = (finalAnswers) => {
  const monthlyIncome = Number(finalAnswers.monthlyIncome) || 0;
  const monthlySavings = Number(finalAnswers.monthlySavings) || 0;
  const liquidSavings = Number(finalAnswers.liquidSavings) || 0;
  const monthlyExpenses = Number(finalAnswers.monthlyExpenses) || 0;
  const savingRate = monthlyIncome > 0 ? monthlySavings / monthlyIncome : 0;
  const hasDependents = finalAnswers.dependents === 'Yes';
  const hasDebt = finalAnswers.hasHighInterestDebt === 'Yes';
  
  if (hasDebt) return 'FOUNDATION_FIREFIGHT';

  const emergencyFundTarget = (hasDependents ? 6 : 3) * monthlyExpenses;
  const fullyFundedEmergencyFundTarget = (hasDependents ? 9 : 6) * monthlyExpenses;

  if (!hasDebt && (monthlyExpenses > 0 && liquidSavings >= fullyFundedEmergencyFundTarget) && savingRate > 0.20) {
    return 'OPTIMIZE_SCALE';
  }
  if (!hasDebt && (monthlyExpenses > 0 && liquidSavings >= emergencyFundTarget)) {
    return 'BALANCE_BUILD';
  }
  return 'FOUNDATION_FIREFIGHT';
};

// --- EVENT HANDLERS ---
const handleNextQuestion = (field, value) => {
  answers[field] = value;
  const questionsToAsk = getQuestionsToAsk();
  if (currentQuestionIndex < questionsToAsk.length - 1) {
    currentQuestionIndex++;
    renderQuestionnaire();
  } else {
    recommendation = calculateRecommendation(answers);
    renderResults();
  }
};

const handleRestart = () => {
  answers = { ...initialAnswers };
  currentQuestionIndex = 0;
  recommendation = null;
  renderQuestionnaire();
};

const getQuestionsToAsk = () => {
  if (answers.hasHighInterestDebt === 'No') {
    return QUESTIONS.filter(q => !['totalDebtAmount', 'debtInterestRate', 'monthlyDebtRepayment'].includes(q.id));
  }
  return QUESTIONS;
};

// --- RENDER FUNCTIONS ---
const renderResults = () => {
  if (!mainContent) return;
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

  mainContent.innerHTML = `
    <div class="card fade-in">
      <div class="results-header ${details.borderColor}">
        <div class="results-icon-wrapper ${details.bgColor}">${details.icon}</div>
        <h2 class="results-title">${details.title}</h2>
      </div>
      <div class="card-content">
        <p class="results-description">${dynamicDescription}</p>
        <button id="restart-btn" class="btn btn-secondary">Start Over</button>
      </div>
    </div>
  `;
  document.getElementById('restart-btn').addEventListener('click', handleRestart);
};

const renderQuestionnaire = () => {
  if (!mainContent) return;
  const questionsToAsk = getQuestionsToAsk();
  const question = questionsToAsk[currentQuestionIndex];
  const progress = (currentQuestionIndex / questionsToAsk.length) * 100;
  
  let formInputHtml = '';
  switch(question.type) {
      case 'number':
          if (question.id === 'age') {
              formInputHtml = `<input type="number" id="question-input" class="input-base" placeholder="${question.placeholder}" autofocus />`;
          } else {
              formInputHtml = `
                  <div class="input-with-adornment">
                      <span class="input-adornment">${answers.currency}</span>
                      <input type="text" inputmode="decimal" id="question-input" class="input-base with-adornment" placeholder="${question.placeholder}" autofocus />
                  </div>
              `;
          }
          break;
      case 'select':
          formInputHtml = `
              <select id="question-input" class="input-base">
                  <option value="" disabled selected>Select an option</option>
                  ${question.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
              </select>
          `;
          break;
      case 'currency':
          formInputHtml = `
              <div class="searchable-select" id="currency-select">
                  <button type="button" class="input-base searchable-select-button">
                      <span class="searchable-select-button-placeholder">${question.placeholder}</span>
                      <svg class="searchable-select-chevron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                  </button>
                  <div class="searchable-select-dropdown" style="display: none;">
                      <div class="searchable-select-search-wrapper">
                          <input type="text" class="input-base" placeholder="Search..." />
                      </div>
                      <ul class="searchable-select-list"></ul>
                  </div>
              </div>
          `;
          break;
  }
  
  mainContent.innerHTML = `
    <div class="card fade-in">
      <div class="progress-bar">
        <div class="progress-bar-fill" style="width: ${progress}%"></div>
      </div>
      <div class="card-content">
        <div class="question-header">
            <p class="question-step">Question ${currentQuestionIndex + 1} of ${questionsToAsk.length}</p>
            <h2 class="question-title">${question.text}</h2>
            ${question.subText ? `<p class="question-subtext">${question.subText}</p>` : ''}
        </div>
        <form id="question-form">
            <div class="form-group">${formInputHtml}</div>
            <p class="error-message" id="error-message" style="display: none;"></p>
            <button type="submit" class="btn btn-primary">Next</button>
        </form>
      </div>
    </div>
  `;
  
  attachFormListeners(question);
};

// --- EVENT LISTENER ATTACHMENT ---
const attachFormListeners = (question) => {
    const form = document.getElementById('question-form');
    const errorEl = document.getElementById('error-message');
    let value = '';

    if (!form || !errorEl) return;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value) {
            errorEl.textContent = 'This field is required.';
            errorEl.style.display = 'block';
            return;
        }
        
        let valueToSend = value;
        if (question.type === 'number') {
            const rawValue = parseFormattedNumber(value);
            if (isNaN(Number(rawValue)) || Number(rawValue) < 0) {
                errorEl.textContent = 'Please enter a valid non-negative number.';
                errorEl.style.display = 'block';
                return;
            }
            valueToSend = rawValue;
        } else if (question.type === 'currency') {
            valueToSend = value.match(/\(([^)]+)\)/)?.[1] || '$';
        }
        
        handleNextQuestion(question.id, valueToSend);
    };

    if (question.type === 'currency') {
        const currencySelect = document.getElementById('currency-select');
        if (!currencySelect) return;

        const button = currencySelect.querySelector('button');
        const buttonText = button?.querySelector('span');
        const dropdown = currencySelect.querySelector('.searchable-select-dropdown');
        const searchInput = currencySelect.querySelector('input[type="text"]');
        const list = currencySelect.querySelector('.searchable-select-list');
        const chevron = currencySelect.querySelector('svg');

        if (!button || !buttonText || !dropdown || !searchInput || !list || !chevron) return;

        const updateList = (filter = '') => {
            list.innerHTML = '';
            const filteredOptions = question.options.filter(opt => opt.toLowerCase().includes(filter.toLowerCase()));
            if (filteredOptions.length) {
                filteredOptions.forEach(opt => {
                    const li = document.createElement('li');
                    li.className = 'searchable-select-item';
                    li.dataset.value = opt;
                    li.textContent = opt;
                    li.addEventListener('click', () => handleSelect(opt));
                    list.appendChild(li);
                });
            } else {
                list.innerHTML = '<li class="searchable-select-item no-results">No results found</li>';
            }
        };

        const handleSelect = (optionValue) => {
            value = optionValue;
            buttonText.textContent = value;
            buttonText.classList.remove('searchable-select-button-placeholder');
            dropdown.style.display = 'none';
            chevron.classList.remove('open');
            form.requestSubmit();
        };
        
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.style.display === 'block';
            dropdown.style.display = isOpen ? 'none' : 'block';
            chevron.classList.toggle('open', !isOpen);
            if (!isOpen) {
                updateList();
                searchInput.focus();
            }
        });

        searchInput.addEventListener('input', () => updateList(searchInput.value));
        
        document.addEventListener('click', (e) => {
            if (!currencySelect.contains(e.target)) {
                dropdown.style.display = 'none';
                chevron.classList.remove('open');
            }
        });
    } else {
        const input = document.getElementById('question-input');
        if (!input) return;

        value = input.value;
        if (question.id !== 'age' && question.type === 'number' && input instanceof HTMLInputElement) {
            input.addEventListener('input', (e) => {
                const target = e.target;
                const caretPosition = target.selectionStart;
                const originalLength = target.value.length;
                const rawValue = parseFormattedNumber(target.value);
                const formatted = formatNumberWithCommas(rawValue);
                value = formatted;
                target.value = formatted;
                const newLength = formatted.length;
                if (caretPosition !== null) {
                    const newCaretPosition = caretPosition + (newLength - originalLength);
                    target.setSelectionRange(newCaretPosition, newCaretPosition);
                }
                errorEl.style.display = 'none';
            });
        } else {
            input.addEventListener('input', (e) => {
                const target = e.target;
                value = target.value;
                errorEl.style.display = 'none';
            });
        }
    }
    
    form.addEventListener('submit', handleSubmit);
};


// --- INITIALIZE APP ---
document.addEventListener('DOMContentLoaded', () => {
  renderQuestionnaire();
});
