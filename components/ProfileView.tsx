import React, { useState } from 'react';
import type { User, Post, View } from '../types';
import { MOCK_POSTS, COUNTRIES, HeartIcon, MessageCircleIcon, ShareIcon, LockIcon, TwitterIcon, LinkedinIcon, GithubIcon } from '../constants';


const ProfilePostCard: React.FC<{ post: Post }> = ({ post }) => (
  <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden group">
    <div className="relative">
      {post.imageUrl && <img src={post.imageUrl} alt="Post content" className="w-full h-48 object-cover" />}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="flex items-center text-white space-x-4">
            <span className="flex items-center gap-1"><HeartIcon className="w-5 h-5" /> {post.likes}</span>
            <span className="flex items-center gap-1"><MessageCircleIcon className="w-5 h-5" /> {post.comments}</span>
        </div>
      </div>
    </div>
  </div>
);

const TabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({ label, isActive, onClick}) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 font-semibold rounded-lg transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-200 dark:hover:bg-zinc-700'}`}
    >
        {label}
    </button>
)

const TagsDisplay: React.FC<{items: string[], color: 'primary' | 'accent'}> = ({ items, color }) => {
    const colorClasses = {
        primary: 'bg-orange-100 dark:bg-orange-500/20 text-primary dark:text-orange-300',
        accent: 'bg-accent/10 dark:bg-accent/20 text-accent dark:text-blue-300'
    };
    return (
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-5 flex flex-wrap gap-2">
            {items.map(item => (
                <span key={item} className={`text-sm font-semibold px-3 py-1.5 rounded-full ${colorClasses[color]}`}>
                    {item}
                </span>
            ))}
        </div>
    );
}

export const ProfileView: React.FC<{ user: User; isOwnProfile: boolean; onNavigate: (view: View, params?: any) => void; }> = ({ user, isOwnProfile, onNavigate }) => {
    const [activeTab, setActiveTab] = useState<'posts' | 'interests' | 'skills'>('posts');

    const flag = COUNTRIES.find(c => c.code === user.country)?.flag;
    const hasSocials = user.socialLinks && Object.values(user.socialLinks).some(link => !!link);
    
    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm mb-6 overflow-hidden">
                <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${user.coverUrl})` }} />
                <div className="p-6 relative">
                    <img 
                        src={user.avatarUrl} 
                        alt={user.name} 
                        className="w-32 h-32 rounded-full border-4 border-white dark:border-zinc-800 absolute -top-16" 
                    />
                    <div className="flex justify-end mb-4">
                        {isOwnProfile ? (
                            <button onClick={() => onNavigate('edit-profile')} className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">Edit Profile</button>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">Follow</button>
                                <button className="ml-2 bg-gray-200 dark:bg-zinc-700 text-deep-gray dark:text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors">Message</button>
                            </div>
                        )}
                    </div>
                    <div className="pt-8">
                        <h1 className="text-3xl font-bold font-display">{user.name}</h1>
                        <p className="text-gray-500 dark:text-gray-400">@{user.username}</p>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                           {user.location && <span>{user.location}</span>}
                           {user.location && user.showFlag && flag && <span>·</span>}
                           {user.showFlag && flag && <span>{flag}</span>}
                        </div>

                        <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-2xl">{user.bio}</p>

                        <div className="mt-4 flex flex-wrap items-center gap-4">
                            {hasSocials && (
                                <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                                    {user.socialLinks?.twitter && <a href={user.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><TwitterIcon className="w-6 h-6" /></a>}
                                    {user.socialLinks?.linkedin && <a href={user.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><LinkedinIcon className="w-6 h-6" /></a>}
                                    {user.socialLinks?.github && <a href={user.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary"><GithubIcon className="w-6 h-6" /></a>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center gap-2 mb-6 bg-white dark:bg-zinc-800 p-2 rounded-xl shadow-sm">
                <TabButton label="Posts" isActive={activeTab === 'posts'} onClick={() => setActiveTab('posts')} />
                <TabButton label="Interests" isActive={activeTab === 'interests'} onClick={() => setActiveTab('interests')} />
                <TabButton label="Skills" isActive={activeTab === 'skills'} onClick={() => setActiveTab('skills')} />
            </div>
            
            <div>
                 {user.isPrivate && !isOwnProfile ? (
                    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-10 text-center">
                        <LockIcon className="w-12 h-12 mx-auto text-gray-400"/>
                        <h3 className="mt-4 text-xl font-bold">This Account is Private</h3>
                        <p className="text-gray-500 mt-2">Follow this account to see their posts and content.</p>
                        <button className="mt-6 bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">Follow</button>
                    </div>
                 ) : (
                    <>
                        {activeTab === 'posts' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {MOCK_POSTS.map(post => <ProfilePostCard key={post.id} post={post} />)}
                            </div>
                        )}
                         {activeTab === 'interests' && user.interests && user.interests.length > 0 && (
                            <TagsDisplay items={user.interests} color="primary" />
                         )}
                         {activeTab === 'skills' && user.skills && user.skills.length > 0 && (
                            <TagsDisplay items={user.skills} color="accent" />
                         )}
                    </>
                 )}
            </div>
        </div>
    );
};
