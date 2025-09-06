import React, { useState, useEffect, useMemo } from 'react';
import { XIcon, SearchIcon, TrendingUpIcon, HashIcon } from '../constants';
import { MOCK_USERS, TRENDING_TOPICS, POPULAR_HASHTAGS } from '../constants';
import type { User, Post, Community, View } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: View, params?: any) => void;
  onOpenProfile: (user: User) => void;
  initialSearchTerm?: string;
  allPosts: Post[];
  communities: Community[];
  onOpenPostDetail: (post: Post) => void;
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

// A simple fuzzy match function. It checks if characters of searchTerm
// appear in text in the correct order, but not necessarily consecutively.
const fuzzyMatch = (searchTerm: string, text: string): boolean => {
  if (!searchTerm) return true;
  if (!text) return false;

  const search = searchTerm.toLowerCase().replace(/\s/g, '');
  const target = text.toLowerCase();
  let searchIndex = 0;
  for (let i = 0; i < target.length && searchIndex < search.length; i++) {
    if (search[searchIndex] === target[i]) {
      searchIndex++;
    }
  }
  return searchIndex === search.length;
};


export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate, onOpenProfile, initialSearchTerm = '', allPosts, communities, onOpenPostDetail }) => {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [activeTab, setActiveTab] = useState('all');
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        if (isOpen) {
            setSearchTerm(initialSearchTerm);
        } else {
            setSearchTerm('');
            setActiveTab('all');
        }
    }, [isOpen, initialSearchTerm]);

    const searchResults = useMemo(() => {
        if (!debouncedSearchTerm) {
            return { people: [], posts: [], communities: [] };
        }
        
        const people = MOCK_USERS.filter(u => fuzzyMatch(debouncedSearchTerm, u.name) || fuzzyMatch(debouncedSearchTerm, u.username));
        const posts = allPosts.filter(p => fuzzyMatch(debouncedSearchTerm, p.content));
        const communitiesResult = communities.filter(c => fuzzyMatch(debouncedSearchTerm, c.name) || fuzzyMatch(debouncedSearchTerm, c.description));
        
        return { people, posts, communities: communitiesResult };
    }, [debouncedSearchTerm, allPosts, communities]);

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

    const renderSuggestions = () => (
        <div className="p-4 space-y-6">
            <section>
                <h2 className="text-lg font-bold mb-2 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                    <TrendingUpIcon className="w-5 h-5 text-primary" />
                    Trending Topics
                </h2>
                <div className="flex flex-wrap gap-2">
                    {TRENDING_TOPICS.map(topic => (
                        <button 
                            key={topic}
                            onClick={() => setSearchTerm(topic)}
                            className="bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            </section>
            <section>
                <h2 className="text-lg font-bold mb-2 flex items-center gap-2 text-gray-800 dark:text-gray-200">
                    <HashIcon className="w-5 h-5 text-primary" />
                    Popular Hashtags
                </h2>
                <div className="flex flex-wrap gap-2">
                    {POPULAR_HASHTAGS.map(tag => (
                        <button 
                            key={tag}
                            onClick={() => setSearchTerm(tag)}
                            className="bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-200 dark:hover:bg-zinc-700 transition"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );

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

            <div className="flex-1 overflow-y-auto">
                {debouncedSearchTerm ? (
                    <div className="p-4 space-y-6">
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
                                    <div key={post.id} onClick={() => { onClose(); onOpenPostDetail(post); }} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer">
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
                ) : (
                    renderSuggestions()
                )}
            </div>
        </div>
    );
};
