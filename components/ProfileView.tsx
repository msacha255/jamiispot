import React from 'react';
import type { User, Post, View } from '../types';
import { MOCK_POSTS, COUNTRIES } from '../constants';
import { HeartIcon, MessageCircleIcon, ShareIcon, LockIcon } from '../constants';


const ProfilePostCard: React.FC<{ post: Post }> = ({ post }) => (
  <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden">
    {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="w-full h-48 object-cover" />}
    <div className="p-4">
      <p className="mb-3 text-gray-800 dark:text-gray-300 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.content }}></p>
      <div className="flex justify-start items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
        <span className="flex items-center gap-1"><HeartIcon className="w-4 h-4" /> {post.likes}</span>
        <span className="flex items-center gap-1"><MessageCircleIcon className="w-4 h-4" /> {post.comments}</span>
        <span className="flex items-center gap-1"><ShareIcon className="w-4 h-4" /> {post.shares}</span>
      </div>
    </div>
  </div>
);

const InfoCard: React.FC<{title: string, items?: string[], color: 'primary' | 'accent'}> = ({ title, items, color }) => {
    if (!items || items.length === 0) return null;
    const colorClasses = {
        primary: 'bg-orange-100 dark:bg-orange-500/20 text-primary dark:text-orange-300',
        accent: 'bg-accent/10 dark:bg-accent/20 text-accent dark:text-blue-300'
    };

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-lg mb-3">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {items.map(item => (
                    <span key={item} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorClasses[color]}`}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};


export const ProfileView: React.FC<{ user: User; isOwnProfile: boolean; onNavigate: (view: View, params?: any) => void; }> = ({ user, isOwnProfile, onNavigate }) => {
    const flag = COUNTRIES.find(c => c.code === user.country)?.flag;
    
    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm mb-6">
                <div className="h-48 rounded-t-lg bg-cover bg-center relative" style={{ backgroundImage: `url(${user.coverUrl})` }}>
                </div>
                <div className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end -mt-20 sm:-mt-16 space-y-4 sm:space-y-0">
                        <img src={user.avatarUrl} alt={user.name} className="w-28 h-28 rounded-full border-4 border-white dark:border-zinc-800" />
                        <div className="flex items-center gap-2">
                             {isOwnProfile ? (
                                <button onClick={() => onNavigate('edit-profile')} className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm w-full sm:w-auto">Edit Profile</button>
                             ) : (
                                <>
                                 <button className="flex-1 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">Follow</button>
                                 <button className="flex-1 ml-2 bg-gray-200 dark:bg-zinc-700 text-deep-gray dark:text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors">Message</button>
                                </>
                             )}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-3xl font-bold font-display">{user.name}</h1>
                        <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                           {user.location && <span>{user.location}</span>}
                           {user.location && user.showFlag && flag && <span>·</span>}
                           {user.showFlag && flag && <span>{flag}</span>}
                        </div>

                        <p className="mt-4 text-gray-700 dark:text-gray-300">{user.bio}</p>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                            {user.badges.map(badge => (
                                <span key={badge} className="bg-orange-100 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">{badge}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-5">
                        <h3 className="font-bold text-lg mb-3">Profile Completeness</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-zinc-700">
                            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${user.profileCompleteness}%` }}></div>
                        </div>
                        <p className="text-right text-sm mt-1 text-gray-600 dark:text-gray-400">{user.profileCompleteness}% Complete</p>
                    </div>

                    <InfoCard title="Interests" items={user.interests} color="primary" />
                    <InfoCard title="Professional Skills" items={user.skills} color="accent" />
                </div>

                <div className="lg:col-span-2">
                    {user.isPrivate && !isOwnProfile ? (
                        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-10 text-center">
                            <LockIcon className="w-12 h-12 mx-auto text-gray-400"/>
                            <h3 className="mt-4 text-xl font-bold">This Account is Private</h3>
                            <p className="text-gray-500 mt-2">Follow this account to see their posts and content.</p>
                            <button className="mt-6 bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">Follow</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {MOCK_POSTS.map(post => <ProfilePostCard key={post.id} post={post} />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};