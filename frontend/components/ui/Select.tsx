import React from 'react';
import { ChevronDownIcon } from '../../assets/icons';
import { SelectOption } from '../../types';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  IconComponent?: React.ElementType;
  containerClassName?: string;
  placeholder?: string; // Custom placeholder for the first disabled option
}

const Select: React.FC<SelectProps> = ({
  label,
  id,
  options,
  error,
  IconComponent,
  className = '',
  containerClassName = '',
  placeholder: customPlaceholder, // Destructure and rename to avoid conflict
  ...restProps // Use restProps for spreading to the select element
}) => {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-amber-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {IconComponent && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconComponent className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <select
          id={id}
          className={`block w-full appearance-none rounded-md border bg-white py-2 pr-10 shadow-sm focus:outline-none sm:text-sm
            text-amber-900 placeholder-gray-400 
            ${IconComponent ? 'pl-10' : 'pl-3'}
            ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                   : 'border-amber-300 focus:ring-amber-500 focus:border-amber-500'}
            ${className}`}
          {...restProps} // Spread remaining valid select attributes
        >
          {customPlaceholder && <option value="" disabled>{customPlaceholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Select;