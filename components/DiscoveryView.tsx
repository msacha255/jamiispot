import React, { useState } from 'react';
import { COMMUNITY_CATEGORIES, SearchIcon, UsersIcon, PlusIcon } from '../constants';
import type { Community } from '../types';

interface DiscoveryViewProps {
    communities: Community[];
    onCommunitySelect: (id: string) => void;
    onOpenCreateCommunity: () => void;
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
                View
            </button>
        </div>
    </div>
);

const CategoryButton: React.FC<{ name: string, isActive: boolean, onClick: () => void }> = ({ name, isActive, onClick }) => (
    <button onClick={onClick} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${isActive ? 'bg-primary text-white' : 'bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700'}`}>
        {name}
    </button>
);

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({ communities, onCommunitySelect, onOpenCreateCommunity }) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    
    const filteredCommunities = activeCategory ? communities.filter(c => c.category === activeCategory) : communities;

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                 <h1 className="text-3xl font-display font-bold text-deep-gray dark:text-white">Discover Communities</h1>
                 <button onClick={onOpenCreateCommunity} className="bg-primary text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-sm">
                    <PlusIcon className="w-5 h-5"/>
                    <span className="hidden sm:inline">Create Community</span>
                 </button>
            </div>
            
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                <div className="flex gap-2 overflow-x-auto pb-4">
                    <CategoryButton name="View All" isActive={!activeCategory} onClick={() => setActiveCategory(null)} />
                    {COMMUNITY_CATEGORIES.map(cat => <CategoryButton key={cat} name={cat} isActive={cat === activeCategory} onClick={() => setActiveCategory(cat)} />)}
                </div>
            </div>

            <div>
                 <h2 className="text-xl font-bold mb-4">{activeCategory ? `${activeCategory} Communities` : 'Featured Communities'}</h2>
                 {filteredCommunities.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredCommunities.map(c => <FeaturedCommunityCard key={c.id} community={c} onClick={() => onCommunitySelect(c.id)} />)}
                    </div>
                 ) : (
                    <div className="text-center py-10 text-gray-500 dark:text-gray-400 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
                        <p className="font-semibold">No communities found</p>
                        <p className="mt-1 text-sm">There are no communities in this category yet. Why not create one?</p>
                    </div>
                 )}
            </div>
        </div>
    );
};