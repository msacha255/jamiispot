import React, { useState } from 'react';
import type { Community, Post, User, Event } from '../types';
import { HeartIcon, MessageCircleIcon, ShareIcon, UsersIcon, SettingsIcon, MapIcon, PlusIcon, CalendarIcon, MapPinIcon, MoreHorizontalIcon, EditIcon, ArchiveIcon } from '../constants';

interface PostCardProps {
  post: Post;
  currentUser: User;
  onOpenProfileModal: (user: User) => void;
  onOpenPostDetail: (post: Post) => void;
  onOpenSharePost: (post: Post) => void;
  onToggleLike: (postId: string) => void;
  likedPostIds: Set<string>;
  onOpenEditPost: (post: Post) => void;
  onToggleArchive: (postId: string) => void;
}

interface CommunityDetailViewProps {
  community: Community;
  currentUser: User;
  onOpenMap: (community: Community) => void;
  onOpenSettings: (community: Community) => void;
  onOpenProfileModal: (user: User) => void;
  onOpenPostDetail: (post: Post) => void;
  onOpenSharePost: (post: Post) => void;
  onToggleLike: (postId: string) => void;
  likedPostIds: Set<string>;
  onOpenCreateEvent: (community: Community) => void;
  onOpenEventDetail: (event: Event) => void;
  onOpenEditPost: (post: Post) => void;
  onToggleArchive: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, currentUser, onOpenProfileModal, onOpenPostDetail, onOpenSharePost, onToggleLike, likedPostIds, onOpenEditPost, onToggleArchive }) => {
  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
  const isLiked = likedPostIds.has(post.id);
  const isOwnPost = post.user.id === currentUser.id;

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between">
            <div className="flex items-center mb-4">
              <img src={post.user.avatarUrl} alt={post.user.name} className="w-12 h-12 rounded-full cursor-pointer" onClick={() => onOpenProfileModal(post.user)} />
              <div className="ml-4">
                <p className="font-bold text-deep-gray dark:text-white cursor-pointer" onClick={() => onOpenProfileModal(post.user)}>{post.user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">@{post.user.username} · {new Date(post.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
            {isOwnPost && (
                 <div className="relative">
                    <button onClick={() => setIsOptionsOpen(p => !p)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700">
                        <MoreHorizontalIcon className="w-5 h-5"/>
                    </button>
                    {isOptionsOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border dark:border-zinc-700 z-10 py-1">
                             <button onClick={() => { onOpenEditPost(post); setIsOptionsOpen(false); }} className="w-full flex items-center gap-3 text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800">
                                <EditIcon className="w-5 h-5"/> Edit Post
                            </button>
                             <button onClick={() => { onToggleArchive(post.id); setIsOptionsOpen(false); }} className="w-full flex items-center gap-3 text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800">
                                <ArchiveIcon className="w-5 h-5"/> Archive Post
                            </button>
                        </div>
                    )}
                 </div>
            )}
        </div>
        <div 
          className="text-gray-800 dark:text-gray-300 [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>
      {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="w-full h-auto object-cover" />}
      {post.videoUrl && <video controls src={post.videoUrl} className="w-full h-auto bg-black" />}
      <div className="p-5">
        <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
          <button onClick={() => onToggleLike(post.id)} className={`flex items-center gap-2 hover:text-red-500 transition-colors ${isLiked ? 'text-red-500' : ''}`}>
            <HeartIcon className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-medium">{post.likes}</span>
          </button>
          <button onClick={() => onOpenPostDetail(post)} className="flex items-center gap-2 hover:text-accent transition-colors">
            <MessageCircleIcon className="w-6 h-6" />
            <span className="font-medium">{post.commentsData.length}</span>
          </button>
          <button onClick={() => onOpenSharePost(post)} className="flex items-center gap-2 hover:text-green-500 transition-colors">
            <ShareIcon className="w-6 h-6" />
            <span className="font-medium">{post.shares}</span>
          </button>
        </div>
      </div>
    </div>
  );
};


const MemberItem: React.FC<{ member: User, onOpenProfileModal: (user: User) => void }> = ({ member, onOpenProfileModal }) => (
    <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer" onClick={() => onOpenProfileModal(member)}>
        <img src={member.avatarUrl} alt={member.name} className="w-12 h-12 rounded-full"/>
        <div className="ml-4">
            <p className="font-bold text-deep-gray dark:text-white">{member.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{member.username}</p>
        </div>
    </div>
);

const EventCard: React.FC<{ event: Event, onOpenEventDetail: (event: Event) => void }> = ({ event, onOpenEventDetail }) => (
    <div className="bg-white dark:bg-zinc-800 rounded-lg p-4 flex gap-4 cursor-pointer" onClick={() => onOpenEventDetail(event)}>
        <div className="flex flex-col items-center justify-center bg-primary/10 text-primary w-16 h-16 rounded-lg">
            <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
            <span className="text-2xl font-bold">{new Date(event.date).getDate()}</span>
        </div>
        <div>
            <h4 className="font-bold">{event.title}</h4>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                <CalendarIcon className="w-4 h-4"/>
                <span>{event.time}</span>
            </div>
             <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <MapPinIcon className="w-4 h-4"/>
                <span>{event.location}</span>
            </div>
        </div>
    </div>
);


export const CommunityDetailView: React.FC<CommunityDetailViewProps> = ({ community, currentUser, onOpenMap, onOpenSettings, onOpenCreateEvent, onOpenEventDetail, ...postCardHandlers }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'members' | 'events'>('posts');
  
  if (!community) {
    return <div className="text-center p-10">Community not found.</div>;
  }
  
  const [isMember, setIsMember] = useState(community.isMember);
  const isAdmin = community.admins.includes(currentUser.id);

  return (
    <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden">
            <img src={community.coverUrl} alt={`${community.name} cover`} className="h-48 w-full object-cover"/>
            <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between sm:items-end -mt-16 sm:-mt-8 space-y-4 sm:space-y-0">
                    <div className="flex items-end">
                       <div className="p-1 bg-white dark:bg-zinc-800 rounded-full">
                           <div className="h-24 w-24 rounded-full bg-orange-200 flex items-center justify-center text-5xl">
                               🤝
                           </div>
                       </div>
                       <div className="ml-4">
                          <h1 className="text-3xl font-bold font-display">{community.name}</h1>
                           <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1">
                                <span className="text-sm font-semibold px-2 py-1 bg-accent/10 text-accent rounded-full mr-2">{community.category}</span>
                                <UsersIcon className="w-5 h-5 mr-1" />
                                <span>{community.memberCount.toLocaleString()} members</span>
                           </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                         <button 
                            onClick={() => setIsMember(!isMember)}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors w-full sm:w-auto ${isMember ? 'bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300' : 'bg-primary text-white hover:bg-orange-600'}`}>
                            {isMember ? 'Joined' : 'Join'}
                         </button>
                         <button onClick={() => onOpenMap(community)} className="p-2 rounded-lg bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300" title="View Map">
                            <MapIcon className="w-6 h-6"/>
                         </button>
                         {isAdmin && (
                            <button onClick={() => onOpenSettings(community)} className="p-2 rounded-lg bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300" title="Admin Settings">
                                <SettingsIcon className="w-6 h-6"/>
                            </button>
                         )}
                    </div>
                </div>
                 <p className="mt-4 text-gray-700 dark:text-gray-300">{community.description}</p>
            </div>
        </div>

        <div className="mt-6">
            <div className="border-b border-gray-200 dark:border-zinc-700">
                <nav className="flex space-x-4">
                    <button onClick={() => setActiveTab('posts')} className={`px-3 py-2 font-semibold ${activeTab === 'posts' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Posts</button>
                    <button onClick={() => setActiveTab('members')} className={`px-3 py-2 font-semibold ${activeTab === 'members' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Members</button>
                    <button onClick={() => setActiveTab('events')} className={`px-3 py-2 font-semibold ${activeTab === 'events' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Events</button>
                </nav>
            </div>
            <div className="mt-6">
                {activeTab === 'posts' && (
                    <div className="space-y-6">
                        {community.posts.length > 0 ? (
                            community.posts.map(post => <PostCard key={post.id} post={post} currentUser={currentUser} {...postCardHandlers} />)
                        ) : (
                            <div className="text-center py-10 text-gray-500 dark:text-gray-400 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
                                <p className="font-semibold">No posts yet</p>
                                <p className="mt-1 text-sm">Be the first to share something in this community!</p>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'members' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {community.members.map(member => <MemberItem key={member.id} member={member} onOpenProfileModal={postCardHandlers.onOpenProfileModal}/>)}
                    </div>
                )}
                {activeTab === 'events' && (
                    <div>
                        {isMember && (
                            <div className="mb-4 text-right">
                                <button onClick={() => onOpenCreateEvent(community)} className="bg-primary text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-sm inline-flex">
                                    <PlusIcon className="w-5 h-5"/>
                                    Create Event
                                </button>
                            </div>
                        )}
                        <div className="space-y-4">
                            {community.events.length > 0 ? (
                                community.events.map(event => <EventCard key={event.id} event={event} onOpenEventDetail={onOpenEventDetail} />)
                            ) : (
                                <div className="text-center py-10 text-gray-500 dark:text-gray-400 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
                                    <p className="font-semibold">No upcoming events</p>
                                    <p className="mt-1 text-sm">Check back later or create a new event!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};