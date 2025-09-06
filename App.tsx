
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
import { LanguageChangeModal } from './components/LanguageChangeModal';
import { ShareModal } from './components/ShareModal';
import { PostDetailModal } from './components/PostDetailModal';
import { SharePostModal } from './components/SharePostModal';
import { CreateEventModal } from './components/CreateEventModal';
// FIX: Import `Message` type to resolve type errors in `handleSendMessage`.
import type { View, Post, User, Story, Community, Conversation, Notification, Permissions, Language, Comment, Event, Message } from './types';
import { MOCK_USERS, MOCK_POSTS, MOCK_STORIES, MOCK_COMMUNITIES, MOCK_CONVERSATIONS, MOCK_NOTIFICATIONS, SUPPORTED_LANGUAGES } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [navHistory, setNavHistory] = useState<{view: View, params?: any}[]>([{ view: 'feed' }]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [stories, setStories] = useState<Story[]>(MOCK_STORIES);
  const [communities, setCommunities] = useState<Community[]>(MOCK_COMMUNITIES);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [blockedUserIds, setBlockedUserIds] = useState<Set<string>>(new Set(['u4']));
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set(['u2', 'u3']));
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set(['p1']));
  const [language, setLanguage] = useState<Language>(SUPPORTED_LANGUAGES[0]);
  const [permissions, setPermissions] = useState<Permissions>({
    camera: true,
    location: false,
    microphone: true,
    notifications: true,
  });


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
  const [isLanguageModalOpen, setLanguageModalOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isPostDetailModalOpen, setPostDetailModalOpen] = useState(false);
  const [isSharePostModalOpen, setSharePostModalOpen] = useState(false);
  const [isCreateEventModalOpen, setCreateEventModalOpen] = useState(false);

  // Data for Modals
  const [selectedCommunityForMap, setSelectedCommunityForMap] = useState<Community | null>(null);
  const [selectedCommunityForSettings, setSelectedCommunityForSettings] = useState<Community | null>(null);
  const [selectedCommunityForEvent, setSelectedCommunityForEvent] = useState<Community | null>(null);
  const [selectedUserForProfile, setSelectedUserForProfile] = useState<User | null>(null);
  const [userToBlock, setUserToBlock] = useState<User | null>(null);
  const [postForDetail, setPostForDetail] = useState<Post | null>(null);
  const [postToShare, setPostToShare] = useState<Post | null>(null);


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

  const handleSendMessageFromProfile = (user: User) => {
    setProfileModalOpen(false);
    let conversation = conversations.find(c => c.participants.some(p => p.id === user.id) && c.participants.some(p => p.id === currentUser.id));
    if (!conversation) {
        conversation = {
            id: `c${Date.now()}`,
            participants: [currentUser, user],
            messages: [],
            unreadCount: 0,
        };
        setConversations(prev => [conversation!, ...prev]);
    }
    handleNavigate('messages', { conversationId: conversation?.id });
  };

  const handleSendMessage = (conversationId: string, message: { text?: string, imageUrl?: string, audioUrl?: string }) => {
    // FIX: Change type from `Comment` to `Message` to match the data structure of a conversation message.
    const newMessage: Message = {
      id: `m${Date.now()}`,
      sender: currentUser,
      timestamp: 'Just now',
      ...message
    };
    
    setConversations(prev => prev.map(c => {
      if (c.id === conversationId) {
        return { ...c, messages: [...c.messages, newMessage] };
      }
      return c;
    }));
  };

  const handleToggleFollow = (userId: string) => {
    setFollowingIds(prev => {
        const newSet = new Set(prev);
        if (newSet.has(userId)) {
            newSet.delete(userId);
        } else {
            newSet.add(userId);
        }
        return newSet;
    });
  };
  
  const handleToggleLike = useCallback((postId: string) => {
    setLikedPostIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
        setPosts(posts => posts.map(p => p.id === postId ? {...p, likes: p.likes - 1} : p));
      } else {
        newSet.add(postId);
        setPosts(posts => posts.map(p => p.id === postId ? {...p, likes: p.likes + 1} : p));
      }
      return newSet;
    });
  }, []);

  const handlePermissionsChange = (newPermissions: Permissions) => {
    setPermissions(newPermissions);
  };

  // --- Filtering based on blocked users ---
  const filteredPosts = posts.filter(p => !blockedUserIds.has(p.user.id));
  const filteredStories = stories.filter(s => !blockedUserIds.has(s.user.id));
  const filteredConversations = conversations.filter(c => 
    !c.participants.some(p => p.id !== currentUser.id && blockedUserIds.has(p.id))
  );
  const filteredNotifications = MOCK_NOTIFICATIONS.filter(n => !blockedUserIds.has(n.user.id));
  // ---

  const handleCreatePost = useCallback((postData: Partial<Post>) => {
    const newPost: Post = {
        id: `p${Date.now()}`, 
        user: currentUser, 
        content: '',
        likes: 0, 
        shares: 0, 
        timestamp: 'Just now',
        commentsData: [],
        ...postData,
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, [currentUser]);

  const handleCreateStory = useCallback((storyData: Partial<Story>) => {
    const newStory: Story = {
      id: `s${Date.now()}`, 
      user: currentUser, 
      viewed: false,
      type: 'image',
      imageUrl: '',
      ...storyData,
    };
    // Replace existing story or add new
    const existingStoryIndex = stories.findIndex(s => s.user.id === currentUser.id);
    if(existingStoryIndex > -1){
        setStories(prev => {
            const newStories = [...prev];
            newStories[existingStoryIndex] = newStory;
            return newStories;
        })
    } else {
        setStories(prevStories => [newStory, ...prevStories]);
    }
  }, [currentUser, stories]);

  const handleAddComment = useCallback((postId: string, text: string) => {
      const newComment: Comment = {
          id: `c${Date.now()}`,
          user: currentUser,
          text,
          timestamp: 'Just now'
      };
      const updatePosts = (postsList: Post[]) => postsList.map(p => 
          p.id === postId ? { ...p, commentsData: [...p.commentsData, newComment] } : p
      );
      setPosts(updatePosts);
      setCommunities(prev => prev.map(c => ({...c, posts: updatePosts(c.posts)})));
  }, [currentUser]);

  const handleOpenPostDetail = useCallback((post: Post) => {
    setPostForDetail(post);
    setPostDetailModalOpen(true);
  }, []);
  
  const handleOpenSharePost = useCallback((post: Post) => {
    setPostToShare(post);
    setSharePostModalOpen(true);
  }, []);

  const handleCreateCommunity = useCallback((communityData: Omit<Community, 'id' | 'memberCount' | 'members' | 'posts' | 'isMember' | 'admins' | 'events'>) => {
    const newCommunity: Community = {
      ...communityData,
      id: `comm${Date.now()}`,
      memberCount: 1,
      members: [currentUser],
      posts: [],
      isMember: true,
      admins: [currentUser.id],
      events: [],
    };
    setCommunities(prev => [newCommunity, ...prev]);
  }, [currentUser]);

  const handleCreateEvent = useCallback((communityId: string, eventData: Omit<Event, 'id' | 'communityId' | 'communityName' | 'creator'>) => {
      const community = communities.find(c => c.id === communityId);
      if(!community) return;
      const newEvent: Event = {
          ...eventData,
          id: `e${Date.now()}`,
          communityId: community.id,
          communityName: community.name,
          creator: currentUser,
      };
      setCommunities(prev => prev.map(c => c.id === communityId ? { ...c, events: [...c.events, newEvent] } : c));
  }, [currentUser, communities]);

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

  const handleOpenCreateEvent = useCallback((community: Community) => {
      setSelectedCommunityForEvent(community);
      setCreateEventModalOpen(true);
  }, []);

  const renderView = () => {
    const commonPostHandlers = {
      // FIX: Correctly reference `handleOpenProfileModal` instead of the undefined `onOpenProfileModal`.
      onOpenProfileModal: handleOpenProfileModal,
      onOpenPostDetail: handleOpenPostDetail,
      onOpenSharePost: handleOpenSharePost,
      onToggleLike: handleToggleLike,
      likedPostIds,
    };

    switch (activeView) {
      case 'feed':
        return <FeedView posts={filteredPosts} stories={stories} currentUser={currentUser} onOpenCreatePost={() => setCreatePostModalOpen(true)} onOpenCreateStory={() => setCreateStoryModalOpen(true)} {...commonPostHandlers} />;
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
        return <CommunityDetailView community={communityWithFilteredContent} onOpenMap={handleOpenCommunityMap} onOpenSettings={handleOpenCommunitySettings} currentUser={currentUser} onOpenCreateEvent={handleOpenCreateEvent} {...commonPostHandlers}/>;
      case 'messages':
        return <MessagingView conversations={filteredConversations} currentUser={currentUser} onSendMessage={handleSendMessage} activeConversationIdParam={activeParams?.conversationId} />;
      case 'notifications':
        return <NotificationsView notifications={filteredNotifications} />;
      case 'profile':
        const user = activeParams?.userId ? MOCK_USERS.find(u => u.id === activeParams.userId) : currentUser;
        if (!user) return <div className="text-center p-8">User not found</div>;
        return <ProfileView user={user} isOwnProfile={user.id === currentUser.id} onNavigate={handleNavigate} onBlockUser={handleOpenBlockUserModal} onSendMessage={handleSendMessageFromProfile} followingIds={followingIds} onToggleFollow={handleToggleFollow} communities={communities} />;
      case 'edit-profile':
        return <EditProfileView user={currentUser} onUpdateUser={handleUpdateUser} onCancel={handleBack} />;
      case 'settings':
        return <SettingsView isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onLogout={handleLogout} onOpenPrivacyModal={() => setPrivacyModalOpen(true)} onOpenPermissionsModal={() => setPermissionsModalOpen(true)} onOpenHelpSupportModal={() => setHelpSupportModalOpen(true)} onOpenBlockedUsers={() => setBlockedUsersModalOpen(true)} onOpenVerification={() => setVerificationModalOpen(true)} onOpenLanguageModal={() => setLanguageModalOpen(true)} onOpenShareModal={() => setShareModalOpen(true)} language={language} />;
      default:
        return <FeedView posts={filteredPosts} stories={stories} currentUser={currentUser} onOpenCreatePost={() => setCreatePostModalOpen(true)} onOpenCreateStory={() => setCreateStoryModalOpen(true)} {...commonPostHandlers} />;
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
        <Header user={currentUser} showBack={navHistory.length > 1} onBack={handleBack} onOpenCreatePost={() => setCreatePostModalOpen(true)} onOpenNotificationsModal={() => setNotificationsModalOpen(true)} onOpenSearch={() => setSearchModalOpen(true)} activeView={activeView}/>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
          {renderView()}
        </main>
        <BottomNavBar activeView={activeView} setActiveView={navigateToView} />
      </div>
      <CreatePostModal isOpen={isCreatePostModalOpen} onClose={() => setCreatePostModalOpen(false)} onCreatePost={handleCreatePost} user={currentUser} blockedUserIds={blockedUserIds} />
      <CreateStoryModal isOpen={isCreateStoryModalOpen} onClose={() => setCreateStoryModalOpen(false)} onCreateStory={handleCreateStory} />
      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
      <PermissionsModal isOpen={isPermissionsModalOpen} onClose={() => setPermissionsModalOpen(false)} permissions={permissions} onPermissionsChange={handlePermissionsChange} />
      <HelpSupportModal isOpen={isHelpSupportModalOpen} onClose={() => setHelpSupportModalOpen(false)} />
      <NotificationsModal isOpen={isNotificationsModalOpen} onClose={() => setNotificationsModalOpen(false)} onViewAll={handleViewAllNotifications} />
      <CommunityMapModal isOpen={isCommunityMapModalOpen} onClose={() => setCommunityMapModalOpen(false)} community={selectedCommunityForMap} />
      <CreateCommunityModal isOpen={isCreateCommunityModalOpen} onClose={() => setCreateCommunityModalOpen(false)} onCreate={handleCreateCommunity} />
      <CommunitySettingsModal isOpen={isCommunitySettingsModalOpen} onClose={() => setCommunitySettingsModalOpen(false)} community={selectedCommunityForSettings} setCommunities={setCommunities} />
      <ProfileModal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)} user={selectedUserForProfile} onBlockUser={handleOpenBlockUserModal} onSendMessage={handleSendMessageFromProfile} followingIds={followingIds} onToggleFollow={handleToggleFollow} />
      <BlockUserModal isOpen={isBlockUserModalOpen} onClose={() => setBlockUserModalOpen(false)} user={userToBlock} onConfirmBlock={handleBlockUser} />
      <BlockedUsersModal isOpen={isBlockedUsersModalOpen} onClose={() => setBlockedUsersModalOpen(false)} blockedUserIds={[...blockedUserIds]} onUnblockUser={handleUnblockUser} />
      <VerificationRequestModal isOpen={isVerificationModalOpen} onClose={() => setVerificationModalOpen(false)} />
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setSearchModalOpen(false)} onNavigate={handleNavigate} onOpenProfile={handleOpenProfileModal} />
      <LanguageChangeModal isOpen={isLanguageModalOpen} onClose={() => setLanguageModalOpen(false)} currentLanguage={language} onLanguageChange={setLanguage} />
      <ShareModal isOpen={isShareModalOpen} onClose={() => setShareModalOpen(false)} user={currentUser} />
      <PostDetailModal isOpen={isPostDetailModalOpen} onClose={() => setPostDetailModalOpen(false)} post={postForDetail} currentUser={currentUser} onAddComment={handleAddComment} likedPostIds={likedPostIds} onToggleLike={handleToggleLike} onOpenShare={handleOpenSharePost} />
      <SharePostModal isOpen={isSharePostModalOpen} onClose={() => setSharePostModalOpen(false)} post={postToShare} />
      <CreateEventModal isOpen={isCreateEventModalOpen} onClose={() => setCreateEventModalOpen(false)} community={selectedCommunityForEvent} onCreateEvent={handleCreateEvent} />
    </div>
  );
};

export default App;
