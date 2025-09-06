import React from 'react';
import { XIcon, LockIcon, HeartIcon, MessageCircleIcon, CheckBadgeIcon } from '../constants';
import type { User, Post } from '../types';
import { MOCK_POSTS } from '../constants';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
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

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) return null;

    const userPosts = MOCK_POSTS.filter(p => p.user.id === user.id);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700 flex-shrink-0">
                    <h2 className="text-xl font-bold">@{user.username}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal"><XIcon className="w-6 h-6" /></button>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                    <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${user.coverUrl})` }} />
                    <div className="p-6">
                        <div className="flex justify-between -mt-16 items-end">
                            <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full border-4 border-white dark:border-zinc-800"/>
                             <div className="flex items-center gap-2">
                                <button className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">Follow</button>
                                <button className="bg-gray-200 dark:bg-zinc-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors">Message</button>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="flex items-center gap-1">
                                <h3 className="text-2xl font-bold">{user.name}</h3>
                                {user.isVerified && <CheckBadgeIcon className="w-6 h-6 text-accent" />}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{user.bio}</p>
                        </div>
                    </div>
                    
                    <div className="px-6 pb-6">
                        {user.isPrivate ? (
                            <div className="border-t border-gray-200 dark:border-zinc-700 pt-6 text-center">
                                <LockIcon className="w-10 h-10 mx-auto text-gray-400"/>
                                <h4 className="mt-4 font-bold">This Account is Private</h4>
                                <p className="text-gray-500 mt-1 text-sm">Follow this account to see their posts.</p>
                            </div>
                        ) : (
                            <div>
                                <h4 className="font-bold border-b border-gray-200 dark:border-zinc-700 pb-2 mb-4">Posts</h4>
                                {userPosts.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-1">
                                        {userPosts.map(post => <ProfilePostTile key={post.id} post={post} />)}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500 py-8">No posts yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};