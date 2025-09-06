import React, { useState } from 'react';
import { XIcon, LockIcon, HeartIcon, MessageCircleIcon, CheckBadgeIcon, MoreVerticalIcon, ShareIcon, TwitterIcon, LinkedinIcon, GithubIcon } from '../constants';
import type { User, Post } from '../types';
import { MOCK_POSTS, COUNTRIES } from '../constants';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onBlockUser: (user: User) => void;
  onSendMessage: (user: User) => void;
  followingIds: Set<string>;
  onToggleFollow: (userId: string) => void;
}

const ProfilePostTile: React.FC<{ post: Post }> = ({ post }) => (
    <div className="relative aspect-square bg-gray-200 dark:bg-zinc-700 rounded-md overflow-hidden group">
        {post.imageUrl && <img src={post.imageUrl} alt="Post" className="w-full h-full object-cover"/>}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold">
            <span className="flex items-center gap-1"><HeartIcon className="w-5 h-5"/> {post.likes}</span>
            <span className="flex items-center gap-1"><MessageCircleIcon className="w-5 h-5"/> {post.comments}</span>
        </div>
    </div>
);

const Stat: React.FC<{ value?: number; label: string }> = ({ value, label }) => (
    <div>
        <span className="font-bold">{value?.toLocaleString() || 0}</span>
        <span className="text-gray-500 ml-1">{label}</span>
    </div>
);

const AboutTab: React.FC<{ user: User }> = ({ user }) => {
    const hasSocials = user.socialLinks && Object.values(user.socialLinks).some(link => !!link);
    return (
        <div className="p-6 space-y-4">
             <div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200">Bio</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{user.bio || 'No bio yet.'}</p>
            </div>
            {hasSocials && (
                 <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Socials</h3>
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


export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user, onBlockUser, onSendMessage, followingIds, onToggleFollow }) => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
    
    if (!isOpen || !user) return null;

    const userPosts = MOCK_POSTS.filter(p => p.user.id === user.id);
    const showContent = !user.isPrivate;
    const isFollowing = followingIds.has(user.id);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${user.name}'s Profile on JamiiSpot`,
                    text: `Check out ${user.name}'s profile on JamiiSpot.`,
                    url: `https://jamiispot.com/profile/${user.username}`,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert('Share feature is not supported in your browser.');
        }
        setIsOptionsOpen(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700 flex-shrink-0">
                    <h2 className="text-xl font-bold">@{user.username}</h2>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <button onClick={() => setIsOptionsOpen(p => !p)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="More options">
                                <MoreVerticalIcon className="w-6 h-6" />
                            </button>
                            {isOptionsOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border dark:border-zinc-700 z-20">
                                    <button onClick={handleShare} className="w-full flex items-center gap-3 text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-t-lg"><ShareIcon className="w-5 h-5"/> Share Profile</button>
                                    <button onClick={() => { onBlockUser(user); setIsOptionsOpen(false); }} className="w-full flex items-center gap-3 text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-b-lg"><LockIcon className="w-5 h-5"/> Block @{user.username}</button>
                                </div>
                            )}
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal"><XIcon className="w-6 h-6" /></button>
                    </div>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                    <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${user.coverUrl})` }} />
                    <div className="p-6">
                        <div className="flex flex-col sm:flex-row justify-between -mt-16 sm:items-end gap-4">
                            <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full border-4 border-white dark:border-zinc-800 object-cover"/>
                             <div className="flex items-center gap-2 self-start sm:self-end">
                                <button onClick={() => onToggleFollow(user.id)} className={`font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm flex-1 sm:flex-auto ${isFollowing ? 'bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300' : 'bg-primary text-white hover:bg-orange-600'}`}>{isFollowing ? 'Following' : 'Follow'}</button>
                                <button onClick={() => onSendMessage(user)} className="bg-gray-200 dark:bg-zinc-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors flex-1 sm:flex-auto">Message</button>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center gap-1">
                                <h3 className="text-2xl font-bold">{user.name}</h3>
                                {user.isVerified && <CheckBadgeIcon className="w-6 h-6 text-accent" />}
                            </div>
                            
                            {showContent && (
                                <div className="mt-3 flex items-center gap-4 text-sm">
                                    <Stat value={user.following} label="Following" />
                                    <Stat value={user.followers} label="Followers" />
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="border-b border-gray-200 dark:border-zinc-700 px-6">
                        <nav className="flex space-x-4">
                            <button onClick={() => setActiveTab('posts')} className={`px-1 py-2 font-semibold ${activeTab === 'posts' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>Posts</button>
                            <button onClick={() => setActiveTab('about')} className={`px-1 py-2 font-semibold ${activeTab === 'about' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>About</button>
                        </nav>
                    </div>
                    
                    <div>
                        {!showContent ? (
                            <div className="py-10 text-center">
                                <LockIcon className="w-10 h-10 mx-auto text-gray-400"/>
                                <h4 className="mt-4 font-bold">This Account is Private</h4>
                                <p className="text-gray-500 mt-1 text-sm">Follow this account to see their posts.</p>
                            </div>
                        ) : (
                           <>
                             {activeTab === 'posts' && (
                                <div className="p-2">
                                    {userPosts.length > 0 ? (
                                        <div className="grid grid-cols-3 gap-1">
                                            {userPosts.map(post => <ProfilePostTile key={post.id} post={post} />)}
                                        </div>
                                    ) : (
                                        <p className="text-center text-gray-500 py-8">No posts yet.</p>
                                    )}
                                </div>
                             )}
                             {activeTab === 'about' && <AboutTab user={user} />}
                           </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};