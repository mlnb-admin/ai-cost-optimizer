import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const QuestionCard = ({ question, value, onChange, error }) => {
  const [otherText, setOtherText] = useState('');

  const handleOptionChange = (optionValue, isMultiSelect = false) => {
    if (isMultiSelect) {
      const currentValues = value || [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
      // Reset other text if switching away from "other"
      if (optionValue !== 'other') {
        setOtherText('');
      }
    }
  };

  const handleOtherTextChange = (text) => {
    setOtherText(text);
    onChange(`other: ${text}`);
  };

  const isMultiSelect = question.type === 'multiple-select';
  const selectedValues = isMultiSelect ? (value || []) : [value];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {question.question}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        {question.description && (
          <p className="text-sm text-gray-600 mb-4">{question.description}</p>
        )}
      </div>

      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedValues.includes(option.value) || 
                           (option.value === 'other' && value?.startsWith('other:'));
          
          return (
            <div key={option.value} className="space-y-2">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type={isMultiSelect ? 'checkbox' : 'radio'}
                  name={question.id}
                  value={option.value}
                  checked={isSelected}
                  onChange={() => handleOptionChange(option.value, isMultiSelect)}
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <div className="flex-1">
                  <span className={`text-sm font-medium transition-colors ${
                    isSelected ? 'text-primary-700' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    {option.label}
                  </span>
                </div>
              </label>
              
              {option.hasTextInput && isSelected && (
                <div className="ml-7">
                  <input
                    type="text"
                    placeholder="Please specify..."
                    value={otherText}
                    onChange={(e) => handleOtherTextChange(e.target.value)}
                    className="input-field text-sm"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default QuestionCard; 