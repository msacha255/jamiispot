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
import { CreatePostModal } from './components/CreatePostModal';
import { CreateStoryModal } from './components/CreateStoryModal';
import { PrivacyModal } from './components/PrivacyModal';
import { PermissionsModal } from './components/PermissionsModal';
import { EditProfileView } from './components/EditProfileView';
import type { View, Post, User, Story } from './types';
import { MOCK_USERS, MOCK_POSTS, MOCK_STORIES } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navHistory, setNavHistory] = useState<{view: View, params?: any}[]>([{ view: 'feed' }]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES);
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const [isCreateStoryModalOpen, setCreateStoryModalOpen] = useState(false);
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isPermissionsModalOpen, setPermissionsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);

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

  const handleCreatePost = useCallback((content: string, imageUrl?: string, tags?: string[]) => {
    const newPost: Post = {
        id: `p${Date.now()}`,
        user: currentUser,
        content,
        imageUrl,
        tags,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: 'Just now',
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, [currentUser]);

  const handleCreateStory = useCallback((imageUrl: string) => {
    const newStory: Story = {
      id: `s${Date.now()}`,
      user: currentUser,
      imageUrl,
      viewed: false,
    };
    setStories(prevStories => [newStory, ...prevStories.filter(s => s.user.id !== currentUser.id)]);
  }, [currentUser]);
  
  const handleUpdateUser = useCallback((updatedUser: User) => {
    setCurrentUser(updatedUser);
    setPosts(prevPosts => prevPosts.map(p => 
      p.user.id === updatedUser.id ? { ...p, user: updatedUser } : p
    ));
    handleBack(); 
  }, [handleBack]);


  const renderView = () => {
    switch (activeView) {
      case 'feed':
        return <FeedView 
                  posts={posts} 
                  stories={stories} 
                  currentUser={currentUser} 
                  onOpenCreatePost={() => setCreatePostModalOpen(true)}
                  onOpenCreateStory={() => setCreateStoryModalOpen(true)}
                />;
      case 'discover':
        return <DiscoveryView onCommunitySelect={(id) => handleNavigate('community-detail', { communityId: id })} />;
      case 'community-detail':
        return <CommunityDetailView communityId={activeParams?.communityId} />;
      case 'messages':
        return <MessagingView />;
      case 'notifications':
        return <NotificationsView />;
      case 'profile':
        const user = activeParams?.userId ? MOCK_USERS.find(u => u.id === activeParams.userId) : currentUser;
        if (!user) return <div className="text-center p-8">User not found</div>;
        return <ProfileView user={user} isOwnProfile={user.id === currentUser.id} onNavigate={handleNavigate} />;
      case 'edit-profile':
        return <EditProfileView user={currentUser} onUpdateUser={handleUpdateUser} onCancel={handleBack} />;
      case 'settings':
        return <SettingsView 
                  isDarkMode={isDarkMode} 
                  setIsDarkMode={setIsDarkMode} 
                  onLogout={handleLogout}
                  onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
                  onOpenPermissionsModal={() => setPermissionsModalOpen(true)}
                />;
      default:
        return <FeedView 
                  posts={posts} 
                  stories={stories}
                  currentUser={currentUser} 
                  onOpenCreatePost={() => setCreatePostModalOpen(true)} 
                  onOpenCreateStory={() => setCreateStoryModalOpen(true)}
                />;
    }
  };
  
  const navigateToView = (view: View, params?: any) => {
    const navParams = (view === 'profile' && !params) ? { userId: currentUser.id } : params;
    setNavHistory([{ view, params: navParams }]);
  };

  if (!isLoggedIn) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-light-gray dark:bg-zinc-900 text-deep-gray dark:text-gray-200 font-sans">
      <Sidebar activeView={activeView} setActiveView={navigateToView} user={currentUser} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={currentUser} 
          showBack={navHistory.length > 1} 
          onBack={handleBack}
          onOpenCreatePost={() => setCreatePostModalOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
          {renderView()}
        </main>
        <BottomNavBar activeView={activeView} setActiveView={navigateToView} />
      </div>
      <CreatePostModal 
        isOpen={isCreatePostModalOpen}
        onClose={() => setCreatePostModalOpen(false)}
        onCreatePost={handleCreatePost}
        user={currentUser}
      />
       <CreateStoryModal
        isOpen={isCreateStoryModalOpen}
        onClose={() => setCreateStoryModalOpen(false)}
        onCreateStory={handleCreateStory}
      />
      <PrivacyModal 
        isOpen={isPrivacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
       <PermissionsModal 
        isOpen={isPermissionsModalOpen}
        onClose={() => setPermissionsModalOpen(false)}
      />
    </div>
  );
};

export default App;