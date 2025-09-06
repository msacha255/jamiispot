
import React, { useState, useEffect, useCallback } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FeedView } from './components/FeedView';
import { DiscoveryView } from './components/DiscoveryView';
import { MessagingView } from './components/MessagingView';
import { ProfileView } from './components/ProfileView';
import { NotificationsView } from './components/NotificationsView';
import { SettingsView } from './components/SettingsView';
import { CommunityDetailView } from './components/GamificationView';
import { BottomNavBar } from './components/BottomNavBar';
import type { View } from './types';
import { MOCK_USER, MOCK_USERS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navHistory, setNavHistory] = useState<{view: View, params?: any}[]>([{ view: 'feed' }]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { view: activeView, params: activeParams } = navHistory[navHistory.length - 1];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleNavigate = useCallback((view: View, params?: any) => {
    setNavHistory(prev => [...prev, { view, params }]);
  }, []);
  
  const handleBack = useCallback(() => {
    setNavHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  }, []);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
    setNavHistory([{ view: 'feed' }]);
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'feed':
        return <FeedView />;
      case 'discover':
        return <DiscoveryView onCommunitySelect={(id) => handleNavigate('community-detail', { communityId: id })} />;
      case 'community-detail':
        return <CommunityDetailView communityId={activeParams?.communityId} />;
      case 'messages':
        return <MessagingView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        const user = MOCK_USERS.find(u => u.id === activeParams?.userId) || MOCK_USER;
        return <ProfileView user={user} />;
      case 'settings':
        return <SettingsView isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onLogout={handleLogout} />;
      default:
        return <FeedView />;
    }
  };
  
  const navigateToView = (view: View, params?: any) => {
    // If we're already on a detail page, replace it instead of stacking
    if(navHistory.length > 1) {
       setNavHistory(prev => [...prev.slice(0, -1), { view, params }]);
    } else {
       handleNavigate(view, params);
    }
  };

  if (!isLoggedIn) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-light-gray dark:bg-zinc-900 text-deep-gray dark:text-gray-200 font-sans">
      <Sidebar activeView={activeView} setActiveView={navigateToView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={MOCK_USER} 
          showBack={navHistory.length > 1} 
          onBack={handleBack}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
          {renderView()}
        </main>
        <BottomNavBar activeView={activeView} setActiveView={navigateToView} />
      </div>
    </div>
  );
};

export default App;
