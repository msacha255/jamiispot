
import React from 'react';
import { MOCK_COMMUNITIES } from '../constants';
import { SearchIcon, UsersIcon, PlusIcon } from '../constants';
import type { Community } from '../types';

interface DiscoveryViewProps {
    onCommunitySelect: (id: string) => void;
}

const FeaturedCommunityCard: React.FC<{ community: Community, onClick: () => void }> = ({ community, onClick }) => (
    <div onClick={onClick} className="flex-shrink-0 w-64 bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden cursor-pointer group">
        <img src={community.coverUrl} alt={community.name} className="h-24 w-full object-cover" />
        <div className="p-4">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{community.name}</h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                <UsersIcon className="w-4 h-4 mr-2" />
                <span>{community.memberCount.toLocaleString()} members</span>
            </div>
            <button className="w-full mt-4 bg-primary/10 text-primary font-semibold py-2 rounded-lg hover:bg-primary/20 transition-colors text-sm">
                Join
            </button>
        </div>
    </div>
);

const CategoryButton: React.FC<{ name: string, icon: string }> = ({ name, icon }) => (
    <button className="flex items-center gap-3 p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-transform">
        <span className="text-2xl">{icon}</span>
        <span className="font-semibold">{name}</span>
    </button>
);

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({ onCommunitySelect }) => {
    const categories = [
        { name: 'Technology', icon: '💻' },
        { name: 'Books', icon: '📚' },
        { name: 'Outdoors', icon: '🌲' },
        { name: 'Social', icon: '👋' },
        { name: 'Art', icon: '🎨' },
        { name: 'Music', icon: '🎵' },
    ];
    
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                 <h1 className="text-3xl font-display font-bold text-deep-gray dark:text-white">Discover Communities</h1>
                 <button className="bg-primary text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-sm">
                    <PlusIcon className="w-5 h-5"/>
                    <span className="hidden sm:inline">Create Community</span>
                 </button>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Featured</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
                    {MOCK_COMMUNITIES.map(c => <FeaturedCommunityCard key={c.id} community={c} onClick={() => onCommunitySelect(c.id)} />)}
                </div>
            </div>
            
            <div>
                 <h2 className="text-xl font-bold mb-4">Categories</h2>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {categories.map(cat => <CategoryButton key={cat.name} {...cat} />)}
                 </div>
            </div>
        </div>
    );
};
