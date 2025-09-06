import React from 'react';
import { JamiiSpotFullLogo, HomeIcon, CompassIcon, MessageIcon, BellIcon, SettingsIcon } from '../constants';
import type { View, User } from '../types';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  user: User;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-primary text-white'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
    }`}
  >
    {icon}
    <span className="ml-4 font-semibold">{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, user }) => {
  const navItems: {id: View, icon: React.ReactNode, label: string}[] = [
    { id: 'feed', icon: <HomeIcon className="w-6 h-6" />, label: 'Feed' },
    { id: 'discover', icon: <CompassIcon className="w-6 h-6" />, label: 'Discover' },
    { id: 'messages', icon: <MessageIcon className="w-6 h-6" />, label: 'Messages' },
    { id: 'notifications', icon: <BellIcon className="w-6 h-6" />, label: 'Notifications' },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-zinc-800 p-6 flex-col justify-between border-r border-gray-200 dark:border-zinc-700 hidden lg:flex">
        <div>
            <div className="mb-10">
                <JamiiSpotFullLogo className="w-32 mx-auto" />
            </div>
            <nav className="space-y-2">
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
        </div>

        <div className="mt-auto">
             <div 
                className="flex items-center p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer"
                onClick={() => setActiveView('profile')}
             >
                <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                <div className="ml-3">
                    <p className="font-bold text-sm text-deep-gray dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">@{user.username}</p>
                </div>
            </div>
             <NavItem
                icon={<SettingsIcon className="w-6 h-6" />}
                label="Settings"
                isActive={activeView === 'settings'}
                onClick={() => setActiveView('settings')}
            />
        </div>
    </aside>
  );
};