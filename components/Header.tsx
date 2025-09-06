import React from 'react';
import type { User, View } from '../types';
import { SearchIcon, PlusIcon, ChevronLeftIcon, BellIcon, JamiiSpotFullLogo, SettingsIcon } from '../constants';

interface HeaderProps {
  user: User;
  showBack: boolean;
  onBack: () => void;
  onOpenCreatePost: () => void;
  onOpenNotificationsModal: () => void;
  onOpenSearch: () => void;
  activeView: View;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, showBack, onBack, onOpenCreatePost, onOpenNotificationsModal, onOpenSearch, activeView, onOpenSettings }) => {
  return (
    <header className="bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 flex-1 min-w-0">
         {showBack && (
            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 lg:hidden">
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
         )}
         {!showBack && activeView === 'feed' && (
             <div className="lg:hidden">
                <JamiiSpotFullLogo className="h-8 w-auto" />
             </div>
         )}
         <div 
            onClick={onOpenSearch}
            className="relative w-full max-w-md hidden sm:block cursor-pointer"
        >
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <div
                className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg pl-10 pr-4 py-2 text-gray-500 dark:text-gray-400"
            >
                Search...
            </div>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <button onClick={onOpenSearch} className="sm:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700">
            <SearchIcon className="w-6 h-6"/>
        </button>
        <button 
          onClick={onOpenCreatePost}
          className="bg-primary text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-sm"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Create Post</span>
        </button>
        <button onClick={onOpenNotificationsModal} className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700">
            <BellIcon className="w-6 h-6" />
            <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-zinc-800"></span>
        </button>
        <button onClick={onOpenSettings} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700">
            <SettingsIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};