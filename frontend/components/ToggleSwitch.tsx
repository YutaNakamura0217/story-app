import React, { useState } from 'react';

interface ToggleSwitchProps {
  id: string;
  label: string; // For aria-labelledby if needed, or just for context
  initialChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ id, initialChecked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleToggle = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <label 
      htmlFor={id} 
      className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-amber-200 p-0.5 has-[:checked]:bg-amber-500 transition-colors"
    >
      {/* This div is for visual structure in the mockup but might be redundant with the ::before/::after or span trick */}
      {/* <div className="h-full w-[27px] rounded-full bg-white transition-transform duration-300 ease-in-out" style={{boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px, rgba(0, 0, 0, 0.06) 0px 1px 2px;"}}></div> */}
      <input 
        id={id}
        type="checkbox" 
        className="invisible absolute peer"
        checked={isChecked}
        onChange={handleToggle}
      />
      <span 
        className="absolute left-0.5 top-1/2 h-[27px] w-[27px] -translate-y-1/2 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out peer-checked:translate-x-[20px]"
        // The translate-x-[9px] from mockup HTML seems too small for a 51px wide container with 27px knob. 51 - 27 - (0.5*2 for padding) = 23px. So, ~20px makes sense.
      ></span>
    </label>
  );
};

export default ToggleSwitch;