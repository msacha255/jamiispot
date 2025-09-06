import React, { useState } from 'react';
import type { User, Post, View } from '../types';
import { MOCK_POSTS, COUNTRIES, HeartIcon, MessageCircleIcon, LockIcon, TwitterIcon, LinkedinIcon, GithubIcon, MoreVerticalIcon, CheckBadgeIcon } from '../constants';

interface ProfileViewProps { 
    user: User; 
    isOwnProfile: boolean; 
    onNavigate: (view: View, params?: any) => void; 
    onBlockUser: (user: User) => void;
    onSendMessage: (user: User) => void;
    followingIds: Set<string>;
    onToggleFollow: (userId: string) => void;
}

const Stat: React.FC<{ value?: number; label: string }> = ({ value, label }) => (
    <div className="text-center">
        <p className="font-bold text-xl">{value?.toLocaleString() || 0}</p>
        <p className="text-sm text-gray-500">{label}</p>
    </div>
);

const ProfilePostCard: React.FC<{ post: Post }> = ({ post }) => (
  <div className="relative aspect-square bg-white dark:bg-zinc-800 rounded-lg overflow-hidden group">
    {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" />}
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold">
      <span className="flex items-center gap-1"><HeartIcon className="w-5 h-5" /> {post.likes}</span>
      <span className="flex items-center gap-1"><MessageCircleIcon className="w-5 h-5" /> {post.comments}</span>
    </div>
  </div>
);

const TagsDisplay: React.FC<{title: string, items: string[], color: 'primary' | 'accent'}> = ({ title, items, color }) => {
    const colorClasses = {
        primary: 'bg-orange-100 dark:bg-orange-500/20 text-primary dark:text-orange-300',
        accent: 'bg-accent/10 dark:bg-accent/20 text-accent dark:text-blue-300'
    };
    return (
        <div className="space-y-4">
            <h3 className="font-bold text-lg">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {items.map(item => (
                    <span key={item} className={`text-sm font-semibold px-3 py-1.5 rounded-full ${colorClasses[color]}`}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

const AboutTab: React.FC<{ user: User }> = ({ user }) => {
    const flag = COUNTRIES.find(c => c.code === user.country)?.flag;
    const hasSocials = user.socialLinks && Object.values(user.socialLinks).some(link => !!link);
    return (
        <div className="p-6 space-y-6 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
            <div>
                <h3 className="font-bold text-lg mb-2">Bio</h3>
                <p className="text-gray-700 dark:text-gray-300">{user.bio || 'No bio yet.'}</p>
            </div>
             <div className="grid grid-cols-2 gap-4">
                 <div>
                    <h4 className="font-semibold text-gray-500 text-sm">Location</h4>
                    <p>{user.location || 'Not specified'}</p>
                 </div>
                 <div>
                    <h4 className="font-semibold text-gray-500 text-sm">Country</h4>
                    <p>{user.showFlag && flag ? `${flag} ` : ''}{COUNTRIES.find(c=>c.code === user.country)?.name || 'Not specified'}</p>
                 </div>
             </div>
            {user.interests && user.interests.length > 0 && <TagsDisplay title="Interests" items={user.interests} color="primary" />}
            {user.skills && user.skills.length > 0 && <TagsDisplay title="Skills" items={user.skills} color="accent" />}
            {hasSocials && (
                <div>
                    <h3 className="font-bold text-lg mb-2">Socials</h3>
                    <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                        {user.socialLinks?.twitter && <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><TwitterIcon className="w-6 h-6" /></a>}
                        {user.socialLinks?.linkedin && <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><LinkedinIcon className="w-6 h-6" /></a>}
                        {user.socialLinks?.github && <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><GithubIcon className="w-6 h-6" /></a>}
                    </div>
                </div>
            )}
        </div>
    );
};

export const ProfileView: React.FC<ProfileViewProps> = ({ user, isOwnProfile, onNavigate, onBlockUser, onSendMessage, followingIds, onToggleFollow }) => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
    
    const userPosts = MOCK_POSTS.filter(p => p.user.id === user.id);
    const showContent = isOwnProfile || !user.isPrivate;
    const isFollowing = followingIds.has(user.id);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm mb-6 overflow-hidden">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${user.coverUrl})` }} />
                <div className="p-6 relative">
                    <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-white dark:border-zinc-800 absolute -top-16 object-cover" />
                    <div className="flex justify-end mb-4">
                        {isOwnProfile ? (
                            <button onClick={() => onNavigate('edit-profile')} className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">Edit Profile</button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button onClick={() => onToggleFollow(user.id)} className={`font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm ${isFollowing ? 'bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300' : 'bg-primary text-white hover:bg-orange-600'}`}>{isFollowing ? 'Following' : 'Follow'}</button>
                                <button onClick={() => onSendMessage(user)} className="bg-gray-200 dark:bg-zinc-700 text-deep-gray dark:text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors">Message</button>
                                <div className="relative">
                                    <button onClick={() => setIsOptionsOpen(!isOptionsOpen)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700"><MoreVerticalIcon className="w-6 h-6" /></button>
                                    {isOptionsOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border dark:border-zinc-700 z-10">
                                            <button onClick={() => { onBlockUser(user); setIsOptionsOpen(false); }} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">Block @{user.username}</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="pt-8">
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-bold font-display">{user.name}</h1>
                            {user.isVerified && <CheckBadgeIcon className="w-7 h-7 text-accent" />}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2">
                             {showContent && <Stat value={user.followers} label="Followers" />}
                             {showContent && <Stat value={user.following} label="Following" />}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="border-b border-gray-200 dark:border-zinc-700 mb-6">
                <nav className="flex space-x-4">
                    <button onClick={() => setActiveTab('posts')} className={`px-3 py-2 font-semibold ${activeTab === 'posts' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Posts</button>
                    <button onClick={() => setActiveTab('about')} className={`px-3 py-2 font-semibold ${activeTab === 'about' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>About</button>
                </nav>
            </div>

            <div>
                 {!showContent ? (
                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-10 text-center">
                        <LockIcon className="w-12 h-12 mx-auto text-gray-400"/>
                        <h3 className="mt-4 text-xl font-bold">This Account is Private</h3>
                        <p className="text-gray-500 mt-2">Follow this account to see their posts and content.</p>
                    </div>
                 ) : (
                    <>
                       {activeTab === 'posts' && (
                           <div>
                                {userPosts.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                        {userPosts.map(post => <ProfilePostCard key={post.id} post={post} />)}
                                    </div>
                                ) : (
                                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-10 text-center text-gray-500">
                                        This user hasn't posted anything yet.
                                    </div>
                                )}
                           </div>
                       )}
                       {activeTab === 'about' && <AboutTab user={user} />}
                    </>
                 )}
            </div>
        </div>
    );
};