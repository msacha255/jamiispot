import React, { useState, useEffect, useMemo } from 'react';
import { XIcon, SearchIcon, MOCK_USERS, MOCK_POSTS, MOCK_COMMUNITIES } from '../constants';
import type { User, Post, Community, View } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: View, params?: any) => void;
  onOpenProfile: (user: User) => void;
}

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate, onOpenProfile }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        if (!isOpen) {
            setSearchTerm('');
            setActiveTab('all');
        }
    }, [isOpen]);

    const searchResults = useMemo(() => {
        if (!debouncedSearchTerm) {
            return { people: [], posts: [], communities: [] };
        }
        const lowercasedTerm = debouncedSearchTerm.toLowerCase();
        const people = MOCK_USERS.filter(u => u.name.toLowerCase().includes(lowercasedTerm) || u.username.toLowerCase().includes(lowercasedTerm));
        const posts = MOCK_POSTS.filter(p => p.content.toLowerCase().includes(lowercasedTerm));
        const communities = MOCK_COMMUNITIES.filter(c => c.name.toLowerCase().includes(lowercasedTerm) || c.description.toLowerCase().includes(lowercasedTerm));
        return { people, posts, communities };
    }, [debouncedSearchTerm]);

    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'people', label: 'People' },
        { id: 'posts', label: 'Posts' },
        { id: 'communities', label: 'Communities' },
    ];
    
    const handleCommunityClick = (id: string) => {
        onClose();
        onNavigate('community-detail', { communityId: id });
    };

    const handleProfileClick = (user: User) => {
        onClose();
        onOpenProfile(user);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white dark:bg-zinc-900 z-50 flex flex-col" aria-modal="true" role="dialog">
            <div className="p-4 border-b border-gray-200 dark:border-zinc-800 flex items-center gap-4">
                <div className="relative w-full">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-light-gray dark:bg-zinc-800 border-none rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                        autoFocus
                    />
                </div>
                <button onClick={onClose} className="font-semibold text-primary hover:underline">Cancel</button>
            </div>

            <div className="border-b border-gray-200 dark:border-zinc-800">
                <nav className="flex space-x-4 px-4">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-1 py-3 font-semibold ${activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}>
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {(activeTab === 'all' || activeTab === 'people') && searchResults.people.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold mb-2">People</h2>
                        {searchResults.people.map(user => (
                            <div key={user.id} onClick={() => handleProfileClick(user)} className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer">
                                <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full" />
                                <div className="ml-3"><p className="font-semibold">{user.name}</p><p className="text-sm text-gray-500">@{user.username}</p></div>
                            </div>
                        ))}
                    </section>
                )}
                 {(activeTab === 'all' || activeTab === 'communities') && searchResults.communities.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold mb-2">Communities</h2>
                        {searchResults.communities.map(community => (
                            <div key={community.id} onClick={() => handleCommunityClick(community.id)} className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer">
                                <img src={community.coverUrl} alt={community.name} className="w-16 h-10 rounded-md object-cover" />
                                <div className="ml-3"><p className="font-semibold">{community.name}</p><p className="text-sm text-gray-500">{community.memberCount.toLocaleString()} members</p></div>
                            </div>
                        ))}
                    </section>
                )}
                {(activeTab === 'all' || activeTab === 'posts') && searchResults.posts.length > 0 && (
                     <section>
                        <h2 className="text-lg font-bold mb-2">Posts</h2>
                        {searchResults.posts.map(post => (
                            <div key={post.id} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer">
                                <div className="flex items-center mb-2">
                                    <img src={post.user.avatarUrl} alt={post.user.name} className="w-8 h-8 rounded-full" />
                                    <p className="ml-2 font-semibold">{post.user.name}</p>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.content}} />
                            </div>
                        ))}
                    </section>
                )}
                {debouncedSearchTerm && searchResults.people.length === 0 && searchResults.posts.length === 0 && searchResults.communities.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p className="font-semibold">No results found for "{debouncedSearchTerm}"</p>
                        <p className="mt-1 text-sm">Try searching for something else.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
