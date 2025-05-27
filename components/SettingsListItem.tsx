import React from 'react';
import { IconArrowRight } from './icons/PhosphorIcons';

interface SettingsListItemProps {
  label: string;
  onClick?: () => void;
  showToggle?: boolean;
  toggleId?: string;
  initialToggleState?: boolean;
  onToggleChange?: (isChecked: boolean) => void;
}

const SettingsListItem: React.FC<SettingsListItemProps> = ({ label, onClick }) => {
  return (
    <li 
      className="flex items-center justify-between p-4 hover:bg-amber-50 rounded-md transition-colors group cursor-pointer"
      onClick={onClick}
      onKeyDown={(e) => { if (onClick && (e.key === 'Enter' || e.key === ' ')) onClick(); }}
      tabIndex={onClick ? 0 : -1}
      role={onClick ? "button" : undefined}
      aria-label={label}
    >
      <span className="text-amber-700 text-base font-medium leading-normal">{label}</span>
      <IconArrowRight size="24px" className="text-amber-400 group-hover:text-amber-500 transition-colors" />
    </li>
  );
};

export default SettingsListItem;