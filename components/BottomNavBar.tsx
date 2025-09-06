
import React from 'react';
import type { View } from '../types';
import { HomeIcon, CompassIcon, MessageIcon, SettingsIcon, UserIcon } from '../constants';

interface BottomNavBarProps {
  activeView: View;
  setActiveView: (view: View, params?: any) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`flex flex-col items-center justify-center w-full pt-3 pb-2 transition-colors duration-200 ${
      isActive ? 'text-primary' : 'text-gray-500 hover:text-deep-gray dark:text-gray-400 dark:hover:text-gray-200'
    }`}
  >
    {icon}
    <span className="text-xs mt-1 font-medium">{label}</span>
  </button>
);

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, setActiveView }) => {
  const navItems: {id: View, icon: React.ReactNode, label: string}[] = [
    { id: 'feed', icon: <HomeIcon className="w-6 h-6" />, label: 'Feed' },
    { id: 'discover', icon: <CompassIcon className="w-6 h-6" />, label: 'Discover' },
    { id: 'messages', icon: <MessageIcon className="w-6 h-6" />, label: 'Messages' },
    { id: 'profile', icon: <UserIcon className="w-6 h-6" />, label: 'Profile' },
    { id: 'settings', icon: <SettingsIcon className="w-6 h-6" />, label: 'Settings' },
  ];

  return (
    <footer className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700 z-50">
      <nav className="flex justify-around">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeView === item.id}
            onClick={() => setActiveView(item.id)}
          />
        ))}
      </nav>
    </footer>
  );
};
