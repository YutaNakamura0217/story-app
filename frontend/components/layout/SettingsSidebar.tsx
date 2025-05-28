import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { RoutePath } from '../../types';
import { UserIcon, IdentificationIcon, ClockIcon, CogIcon } from '../../assets/icons';

interface SettingsSidebarProps {
  className?: string;
}

const sidebarLinks = [
  { label: 'プロフィール設定', path: RoutePath.Profile, icon: UserIcon },
  { label: 'お子さまの管理', path: RoutePath.ChildrenManage, icon: IdentificationIcon },
  { label: '学習のあしあと', path: RoutePath.LearningHistory, icon: ClockIcon },
  { label: 'アカウント設定', path: RoutePath.Settings, icon: CogIcon },
];

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ className }) => {
  const baseClasses = "flex items-center px-4 py-3 rounded-lg transition-colors duration-150 ease-in-out text-sm font-medium";
  const inactiveClasses = "text-amber-700 hover:bg-amber-100 hover:text-amber-900";
  const activeClasses = "bg-amber-500 text-white shadow-md";

  return (
    <aside className={`bg-white p-4 rounded-xl shadow-lg border border-amber-100 ${className}`}>
      <nav className="space-y-2">
        {sidebarLinks.map((link) => (
          <RouterNavLink
            key={link.label}
            to={link.path}
            end // Important for parent routes to not stay active for children
            className={({ isActive }) => `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
          >
            <link.icon className="w-5 h-5 mr-3 shrink-0" />
            {link.label}
          </RouterNavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
