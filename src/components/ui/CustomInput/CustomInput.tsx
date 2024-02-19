import React, { ChangeEvent } from 'react';

interface CustomInputMaskProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomInputMask: React.FC<CustomInputMaskProps> = ({ value, onChange }) => {
  const formatValue = (inputValue: string): string => {
    // Your custom input mask logic goes here
    // Here's an example of formatting for "31103-6565655-3"
    if (inputValue.length <= 1) {
      return inputValue.replace(/(\d{1})/, '$1');
    } else if (inputValue.length <= 6) {
      return inputValue.replace(/(\d{1})(\d{5})/, '$1$2-');
    } else if (inputValue.length <= 13) {
      return inputValue.replace(/(\d{1})(\d{5})-(\d{7})/, '$1$2-$3-');
    }
    return inputValue; // Add a default return to handle longer input
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(formatValue(e.target.value));
  };

  return (
    <input
      type="text"
      value={formatValue(value)}
      placeholder="31103-6565655-3"
      onChange={handleInputChange}

    />
  );
};

export default CustomInputMask;
