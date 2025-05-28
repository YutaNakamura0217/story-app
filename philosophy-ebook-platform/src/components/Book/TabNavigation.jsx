import React from 'react';

function TabNavigation({ tabs, activeTab, onTabClick }) {
  return (
    <nav className="border-b border-gray-300 sticky top-[68px] bg-white z-40"> {/* Assuming header is around 68px tall */}
      <div className="container mx-auto px-4">
        <ul className="flex -mb-px">
          {tabs.map(tab => (
            <li key={tab.id} className="mr-1">
              <button
                onClick={() => onTabClick(tab.id)}
                className={`inline-block py-3 px-4 text-sm font-medium text-center focus:outline-none
                  ${activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600 font-semibold'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                  }
                `}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default TabNavigation;
