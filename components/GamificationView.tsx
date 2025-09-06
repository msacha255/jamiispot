
import React, { useState } from 'react';
import { MOCK_COMMUNITIES } from '../constants';
import type { Community, Post, User } from '../types';
import { HeartIcon, MessageCircleIcon, ShareIcon, UsersIcon, MoreHorizontalIcon } from '../constants';

interface CommunityDetailViewProps {
  communityId: string;
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
  <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden">
    <div className="p-5">
      <div className="flex items-center mb-4">
        <img src={post.user.avatarUrl} alt={post.user.name} className="w-12 h-12 rounded-full" />
        <div className="ml-4">
          <p className="font-bold text-deep-gray dark:text-white">{post.user.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{post.user.username} · {post.timestamp}</p>
        </div>
      </div>
      <div 
        className="text-gray-800 dark:text-gray-300 [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
        dangerouslySetInnerHTML={{ __html: post.content }} 
      />
    </div>
    {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="w-full h-auto object-cover" />}
    <div className="p-5">
      <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
        <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
          <HeartIcon className="w-6 h-6" />
          <span className="font-medium">{post.likes}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-accent transition-colors">
          <MessageCircleIcon className="w-6 h-6" />
          <span className="font-medium">{post.comments}</span>
        </button>
        <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
          <ShareIcon className="w-6 h-6" />
          <span className="font-medium">{post.shares}</span>
        </button>
      </div>
    </div>
  </div>
);

const MemberItem: React.FC<{ member: User }> = ({ member }) => (
    <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700">
        <img src={member.avatarUrl} alt={member.name} className="w-12 h-12 rounded-full"/>
        <div className="ml-4">
            <p className="font-bold text-deep-gray dark:text-white">{member.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{member.username}</p>
        </div>
    </div>
);


export const CommunityDetailView: React.FC<CommunityDetailViewProps> = ({ communityId }) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'members'>('posts');
  const community = MOCK_COMMUNITIES.find(c => c.id === communityId);

  if (!community) {
    return <div className="text-center p-10">Community not found.</div>;
  }
  
  const [isMember, setIsMember] = useState(community.isMember);

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
                                <UsersIcon className="w-5 h-5 mr-2" />
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
                         <button className="p-2 rounded-lg bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300">
                            <MoreHorizontalIcon className="w-6 h-6"/>
                         </button>
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
                </nav>
            </div>
            <div className="mt-6">
                {activeTab === 'posts' && (
                    <div className="space-y-6">
                        {community.posts.length > 0 ? (
                            community.posts.map(post => <PostCard key={post.id} post={post} />)
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
                        {community.members.map(member => <MemberItem key={member.id} member={member} />)}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
