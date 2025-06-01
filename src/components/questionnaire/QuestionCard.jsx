import { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

const QuestionCard = ({ question, value, onChange, error }) => {
  const [otherText, setOtherText] = useState('');

  // Determine question type
  const isMultiSelect = question.type === 'multi_select';
  const isTextInput = question.type === 'text';

  // Initialize otherText from existing value
  useEffect(() => {
    if (isMultiSelect) {
      const currentValues = value || [];
      const otherValue = currentValues.find(val => 
        typeof val === 'string' && val.startsWith('other:')
      );
      if (otherValue) {
        setOtherText(otherValue.substring(7)); // Remove "other: " prefix
      }
    } else if (typeof value === 'string' && value.startsWith('other:')) {
      setOtherText(value.substring(7)); // Remove "other: " prefix
    }
  }, [value, isMultiSelect]);

  const handleOptionChange = (optionValue, isMultiSelect = false) => {
    if (isMultiSelect) {
      const currentValues = value || [];
      
      if (optionValue === 'other') {
        // For "other" option in multi-select, we need special handling
        const hasOther = currentValues.includes('other') || 
                        currentValues.some(val => typeof val === 'string' && val.startsWith('other:'));
        
        if (hasOther) {
          // Remove both 'other' and any 'other:' prefixed values
          const newValues = currentValues.filter(v => 
            v !== 'other' && !(typeof v === 'string' && v.startsWith('other:'))
          );
          onChange(newValues);
          setOtherText('');
        } else {
          // Add 'other' option
          onChange([...currentValues, 'other']);
        }
      } else {
        // Regular option handling
        const newValues = currentValues.includes(optionValue)
          ? currentValues.filter(v => v !== optionValue)
          : [...currentValues, optionValue];
        onChange(newValues);
      }
    } else {
      onChange(optionValue);
      // Reset other text if switching away from "other"
      if (optionValue !== 'other') {
        setOtherText('');
      }
    }
  };

  const handleTextChange = (text) => {
    onChange(text);
  };

  const handleOtherTextChange = (text) => {
    setOtherText(text);
    
    if (isMultiSelect) {
      // For multi-select, we need to add/update the "other:" entry in the array
      const currentValues = value || [];
      const otherValue = `other: ${text}`;
      
      // Remove any existing "other:" entries and add the new one
      const filteredValues = currentValues.filter(val => 
        !(typeof val === 'string' && val.startsWith('other:'))
      );
      
      if (text.trim()) {
        onChange([...filteredValues, otherValue]);
      } else {
        onChange(filteredValues);
      }
    } else {
      // For single-select, just set the value
      onChange(`other: ${text}`);
    }
  };

  const selectedValues = isMultiSelect ? (value || []) : [value];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-2">
          {question.question}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        {question.description && (
          <p className="text-sm text-primary-600 dark:text-primary-300 mb-4">
            {question.description}
          </p>
        )}
      </div>

      {/* Text Input */}
      {isTextInput && (
        <div>
          <textarea
            value={value || ''}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Please provide details..."
            rows={4}
            className="w-full px-3 py-2 border border-primary-300 dark:border-primary-600 rounded-lg 
                     bg-white dark:bg-primary-800 text-primary-900 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                     placeholder-primary-400 dark:placeholder-primary-500"
          />
        </div>
      )}

      {/* Multiple Choice Options */}
      {!isTextInput && question.options && (
        <div className="space-y-3">
          {question.options.map((option) => {
            const optionValue = option.id || option.value;
            const optionLabel = option.label;
            
            // Handle selection check differently for multi-select vs single-select
            let isSelected = selectedValues.includes(optionValue);
            
            // For "other" options, also check if value contains "other:" prefix
            if (optionValue === 'other' && !isSelected) {
              if (isMultiSelect) {
                // For multi-select, check if any selected value starts with "other:"
                isSelected = selectedValues.some(val => 
                  typeof val === 'string' && val.startsWith('other:')
                );
              } else {
                // For single-select, check if the value is a string starting with "other:"
                isSelected = typeof value === 'string' && value.startsWith('other:');
              }
            }
            
            return (
              <div key={optionValue} className="space-y-2">
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <input
                    type={isMultiSelect ? 'checkbox' : 'radio'}
                    name={question.id}
                    value={optionValue}
                    checked={isSelected}
                    onChange={() => handleOptionChange(optionValue, isMultiSelect)}
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-primary-300 dark:border-primary-600 bg-white dark:bg-primary-700 rounded"
                  />
                  <div className="flex-1">
                    <span className={`text-sm font-medium transition-colors ${
                      isSelected ? 'text-primary-700 dark:text-primary-400' : 'text-primary-700 dark:text-primary-300 group-hover:text-primary-900 dark:group-hover:text-white'
                    }`}>
                      {optionLabel}
                    </span>
                    {option.description && (
                      <p className="text-xs text-primary-500 dark:text-primary-400 mt-1">
                        {option.description}
                      </p>
                    )}
                  </div>
                </label>
                
                {option.hasTextInput && isSelected && (
                  <div className="ml-7">
                    <input
                      type="text"
                      placeholder="Please specify..."
                      value={otherText}
                      onChange={(e) => handleOtherTextChange(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-primary-300 dark:border-primary-600 rounded-lg 
                               bg-white dark:bg-primary-800 text-primary-900 dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                               placeholder-primary-400 dark:placeholder-primary-500"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default QuestionCard; 