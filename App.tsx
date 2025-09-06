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
import { HelpSupportModal } from './components/HelpSupportModal';
import { NotificationsModal } from './components/NotificationsModal';
import { CommunityMapModal } from './components/CommunityMapModal';
import { CreateCommunityModal } from './components/CreateCommunityModal';
import { CommunitySettingsModal } from './components/CommunitySettingsModal';
import { ProfileModal } from './components/ProfileModal';
import { BlockUserModal } from './components/BlockUserModal';
import { BlockedUsersModal } from './components/BlockedUsersModal';
import { VerificationRequestModal } from './components/VerificationRequestModal';
import { SearchModal } from './components/SearchModal';
import { AboutProfileModal } from './components/AboutProfileModal';
import type { View, Post, User, Story, Community, Conversation, Notification } from './types';
import { MOCK_USERS, MOCK_POSTS, MOCK_STORIES, MOCK_COMMUNITIES, MOCK_CONVERSATIONS, MOCK_NOTIFICATIONS } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navHistory, setNavHistory] = useState<{view: View, params?: any}[]>([{ view: 'feed' }]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES);
  const [communities, setCommunities] = useState<Community[]>(MOCK_COMMUNITIES);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [blockedUserIds, setBlockedUserIds] = useState<Set<string>>(new Set(['u4']));

  // Modal States
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const [isCreateStoryModalOpen, setCreateStoryModalOpen] = useState(false);
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isPermissionsModalOpen, setPermissionsModalOpen] = useState(false);
  const [isHelpSupportModalOpen, setHelpSupportModalOpen] = useState(false);
  const [isNotificationsModalOpen, setNotificationsModalOpen] = useState(false);
  const [isCommunityMapModalOpen, setCommunityMapModalOpen] = useState(false);
  const [isCreateCommunityModalOpen, setCreateCommunityModalOpen] = useState(false);
  const [isCommunitySettingsModalOpen, setCommunitySettingsModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isBlockUserModalOpen, setBlockUserModalOpen] = useState(false);
  const [isBlockedUsersModalOpen, setBlockedUsersModalOpen] = useState(false);
  const [isVerificationModalOpen, setVerificationModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isAboutProfileModalOpen, setAboutProfileModalOpen] = useState(false);

  // Data for Modals
  const [selectedCommunityForMap, setSelectedCommunityForMap] = useState<Community | null>(null);
  const [selectedCommunityForSettings, setSelectedCommunityForSettings] = useState<Community | null>(null);
  const [selectedUserForProfile, setSelectedUserForProfile] = useState<User | null>(null);
  const [userToBlock, setUserToBlock] = useState<User | null>(null);
  const [selectedUserForAbout, setSelectedUserForAbout] = useState<User | null>(null);

  const { view: activeView, params: activeParams } = navHistory[navHistory.length - 1];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleNavigate = useCallback((view: View, params?: any) => {
    setNavHistory(prev => [...prev, { view, params }]);
  }, []);
  
  const handleBack = useCallback(() => {
    setNavHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  }, []);

  const handleLogin = useCallback(() => setIsLoggedIn(true), []);
  const handleLogout = useCallback(() => setIsLoggedIn(false), []);

  const handleOpenProfileModal = useCallback((user: User) => {
    setSelectedUserForProfile(user);
    setProfileModalOpen(true);
  }, []);

  const handleBlockUser = useCallback((userToBlock: User) => {
      setBlockedUserIds(prev => new Set(prev).add(userToBlock.id));
      setUserToBlock(null);
      setBlockUserModalOpen(false);
      setProfileModalOpen(false); // Close profile modal if open
  }, []);

  const handleUnblockUser = useCallback((userId: string) => {
      setBlockedUserIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(userId);
          return newSet;
      });
  }, []);
  
  const handleOpenBlockUserModal = (user: User) => {
    setUserToBlock(user);
    setBlockUserModalOpen(true);
  };

  const handleOpenAboutProfileModal = (user: User) => {
    setSelectedUserForAbout(user);
    setAboutProfileModalOpen(true);
  };

  const handleSendMessageFromProfile = (user: User) => {
    setProfileModalOpen(false);
    const conversation = MOCK_CONVERSATIONS.find(c => c.participants.some(p => p.id === user.id));
    handleNavigate('messages', { conversationId: conversation?.id });
  };

  // --- Filtering based on blocked users ---
  const filteredPosts = posts.filter(p => !blockedUserIds.has(p.user.id));
  const filteredStories = stories.filter(s => !blockedUserIds.has(s.user.id));
  const filteredConversations = MOCK_CONVERSATIONS.filter(c => 
    !c.participants.some(p => p.id !== currentUser.id && blockedUserIds.has(p.id))
  );
  const filteredNotifications = MOCK_NOTIFICATIONS.filter(n => !blockedUserIds.has(n.user.id));
  // ---

  const handleCreatePost = useCallback((content: string, imageUrl?: string, tags?: string[]) => {
    const newPost: Post = {
        id: `p${Date.now()}`, user: currentUser, content, imageUrl, tags,
        likes: 0, comments: 0, shares: 0, timestamp: 'Just now',
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, [currentUser]);

  const handleCreateStory = useCallback((imageUrl: string) => {
    const newStory: Story = {
      id: `s${Date.now()}`, user: currentUser, imageUrl, viewed: false,
    };
    setStories(prevStories => [newStory, ...prevStories.filter(s => s.user.id !== currentUser.id)]);
  }, [currentUser]);

  const handleCreateCommunity = useCallback((communityData: Omit<Community, 'id' | 'memberCount' | 'members' | 'posts' | 'isMember' | 'admins'>) => {
    const newCommunity: Community = {
      ...communityData,
      id: `comm${Date.now()}`,
      memberCount: 1,
      members: [currentUser],
      posts: [],
      isMember: true,
      admins: [currentUser.id]
    };
    setCommunities(prev => [newCommunity, ...prev]);
  }, [currentUser]);

  const handleUpdateUser = useCallback((updatedUser: User) => {
    setCurrentUser(updatedUser);
    setPosts(prevPosts => prevPosts.map(p => p.user.id === updatedUser.id ? { ...p, user: updatedUser } : p));
    handleBack(); 
  }, [handleBack]);

  const handleViewAllNotifications = useCallback(() => {
    setNotificationsModalOpen(false);
    handleNavigate('notifications');
  }, [handleNavigate]);

  const handleOpenCommunityMap = useCallback((community: Community) => {
    setSelectedCommunityForMap(community);
    setCommunityMapModalOpen(true);
  }, []);
  
  const handleOpenCommunitySettings = useCallback((community: Community) => {
    setSelectedCommunityForSettings(community);
    setCommunitySettingsModalOpen(true);
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'feed':
        return <FeedView posts={filteredPosts} stories={filteredStories} currentUser={currentUser} onOpenCreatePost={() => setCreatePostModalOpen(true)} onOpenCreateStory={() => setCreateStoryModalOpen(true)} onOpenProfileModal={handleOpenProfileModal} />;
      case 'discover':
        return <DiscoveryView communities={communities} onCommunitySelect={(id) => handleNavigate('community-detail', { communityId: id })} onOpenCreateCommunity={() => setCreateCommunityModalOpen(true)} />;
      case 'community-detail':
        const community = communities.find(c => c.id === activeParams?.communityId);
        if (!community) return <div className="text-center p-8">Community not found</div>;
        const communityWithFilteredContent = {
            ...community, 
            posts: community.posts.filter(p => !blockedUserIds.has(p.user.id)),
            members: community.members.filter(m => !blockedUserIds.has(m.id)),
        };
        return <CommunityDetailView community={communityWithFilteredContent} onOpenMap={handleOpenCommunityMap} onOpenSettings={handleOpenCommunitySettings} currentUser={currentUser} onOpenProfileModal={handleOpenProfileModal}/>;
      case 'messages':
        return <MessagingView conversations={filteredConversations} activeConversationIdParam={activeParams?.conversationId} />;
      case 'notifications':
        return <NotificationsView notifications={filteredNotifications} />;
      case 'profile':
        const user = activeParams?.userId ? MOCK_USERS.find(u => u.id === activeParams.userId) : currentUser;
        if (!user) return <div className="text-center p-8">User not found</div>;
        return <ProfileView user={user} isOwnProfile={user.id === currentUser.id} onNavigate={handleNavigate} onBlockUser={handleOpenBlockUserModal} onSendMessage={handleSendMessageFromProfile} />;
      case 'edit-profile':
        return <EditProfileView user={currentUser} onUpdateUser={handleUpdateUser} onCancel={handleBack} />;
      case 'settings':
        return <SettingsView isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onLogout={handleLogout} onOpenPrivacyModal={() => setPrivacyModalOpen(true)} onOpenPermissionsModal={() => setPermissionsModalOpen(true)} onOpenHelpSupportModal={() => setHelpSupportModalOpen(true)} onOpenBlockedUsers={() => setBlockedUsersModalOpen(true)} onOpenVerification={() => setVerificationModalOpen(true)} />;
      default:
        return <FeedView posts={filteredPosts} stories={filteredStories} currentUser={currentUser} onOpenCreatePost={() => setCreatePostModalOpen(true)} onOpenCreateStory={() => setCreateStoryModalOpen(true)} onOpenProfileModal={handleOpenProfileModal} />;
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
        <Header user={currentUser} showBack={navHistory.length > 1} onBack={handleBack} onOpenCreatePost={() => setCreatePostModalOpen(true)} onOpenNotificationsModal={() => setNotificationsModalOpen(true)} onOpenSearch={() => setSearchModalOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
          {renderView()}
        </main>
        <BottomNavBar activeView={activeView} setActiveView={navigateToView} />
      </div>
      <CreatePostModal isOpen={isCreatePostModalOpen} onClose={() => setCreatePostModalOpen(false)} onCreatePost={handleCreatePost} user={currentUser} blockedUserIds={blockedUserIds} />
      <CreateStoryModal isOpen={isCreateStoryModalOpen} onClose={() => setCreateStoryModalOpen(false)} onCreateStory={handleCreateStory} />
      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
      <PermissionsModal isOpen={isPermissionsModalOpen} onClose={() => setPermissionsModalOpen(false)} />
      <HelpSupportModal isOpen={isHelpSupportModalOpen} onClose={() => setHelpSupportModalOpen(false)} />
      <NotificationsModal isOpen={isNotificationsModalOpen} onClose={() => setNotificationsModalOpen(false)} onViewAll={handleViewAllNotifications} />
      <CommunityMapModal isOpen={isCommunityMapModalOpen} onClose={() => setCommunityMapModalOpen(false)} community={selectedCommunityForMap} />
      <CreateCommunityModal isOpen={isCreateCommunityModalOpen} onClose={() => setCreateCommunityModalOpen(false)} onCreate={handleCreateCommunity} />
      <CommunitySettingsModal isOpen={isCommunitySettingsModalOpen} onClose={() => setCommunitySettingsModalOpen(false)} community={selectedCommunityForSettings} setCommunities={setCommunities} />
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)} user={selectedUserForProfile} onBlockUser={handleOpenBlockUserModal} onSendMessage={handleSendMessageFromProfile} onOpenAbout={handleOpenAboutProfileModal} />
      <BlockUserModal isOpen={isBlockUserModalOpen} onClose={() => setBlockUserModalOpen(false)} user={userToBlock} onConfirmBlock={handleBlockUser} />
      <BlockedUsersModal isOpen={isBlockedUsersModalOpen} onClose={() => setBlockedUsersModalOpen(false)} blockedUserIds={[...blockedUserIds]} onUnblockUser={handleUnblockUser} />
      <VerificationRequestModal isOpen={isVerificationModalOpen} onClose={() => setVerificationModalOpen(false)} />
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setSearchModalOpen(false)} onNavigate={handleNavigate} onOpenProfile={handleOpenProfileModal} />
      <AboutProfileModal isOpen={isAboutProfileModalOpen} onClose={() => setAboutProfileModalOpen(false)} user={selectedUserForAbout} />
    </div>
  );
};

export default App;