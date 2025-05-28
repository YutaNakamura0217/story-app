import React from 'react';

function TabNavigation({ tabs, activeTab, onTabClick }) {
  return (
    <nav style={{ margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabClick(tab.id)}
          style={{
            marginRight: '10px',
            padding: '10px 15px',
            border: 'none',
            borderBottom: activeTab === tab.id ? '3px solid blue' : '3px solid transparent',
            background: 'transparent',
            cursor: 'pointer',
            fontWeight: activeTab === tab.id ? 'bold' : 'normal'
          }}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default TabNavigation;
