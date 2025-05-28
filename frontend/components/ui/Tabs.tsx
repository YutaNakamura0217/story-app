
import React, { useState, Children, isValidElement, cloneElement } from 'react';

interface TabProps {
  label: string;
  children?: React.ReactNode;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>;


interface TabsProps {
  children: React.ReactElement<TabProps> | React.ReactElement<TabProps>[];
  initialTab?: number;
  onTabChange?: (index: number) => void;
  className?: string; 
  tabListClassName?: string; 
  tabPanelClassName?: string; 
}

const Tabs: React.FC<TabsProps> = ({
  children,
  initialTab = 0,
  onTabChange,
  className = '',
  tabListClassName = '',
  tabPanelClassName = '',
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const tabsArray = Children.toArray(children).filter(isValidElement) as React.ReactElement<TabProps>[];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`border-b border-amber-200 ${tabListClassName}`}>
        <nav className="-mb-px flex space-x-6 sm:space-x-8" aria-label="Tabs">
          {tabsArray.map((tab, index) => {
            const isActive = index === activeTab;
            const tabLabel = tab.props.label;
            // Default to amber theme, allow override by Tab's props
            const tabSpecificActiveClassName = tab.props.activeClassName || 'border-amber-500 text-amber-600';
            const tabSpecificInactiveClassName = tab.props.inactiveClassName || 'border-transparent text-amber-700 hover:text-amber-800 hover:border-amber-300';
            
            return (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm focus:outline-none 
                  ${isActive ? tabSpecificActiveClassName : tabSpecificInactiveClassName} 
                  ${tab.props.className || ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {tabLabel}
              </button>
            );
          })}
        </nav>
      </div>
      <div className={`mt-6 ${tabPanelClassName}`}>
        {tabsArray.map((tab, index) => (
          <div key={index} className={index === activeTab ? 'block' : 'hidden'}>
            {tab.props.children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;