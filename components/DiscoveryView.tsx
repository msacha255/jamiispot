import React, { useState } from 'react';
import { COMMUNITY_CATEGORIES, UsersIcon, PlusIcon, CalendarDaysIcon } from '../constants';
import type { Community, Event, User } from '../types';

interface DiscoveryViewProps {
    communities: Community[];
    events: Event[];
    suggestedUsers: User[];
    onCommunitySelect: (id: string) => void;
    onOpenCreateCommunity: () => void;
    currentUser: User;
    followingIds: Set<string>;
    onToggleFollow: (userId: string) => void;
    onOpenProfileModal: (user: User) => void;
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

const SuggestedUserCard: React.FC<{user: User, isFollowing: boolean, onToggleFollow: () => void, onOpenProfile: () => void}> = ({ user, isFollowing, onToggleFollow, onOpenProfile }) => (
    <div className="flex-shrink-0 w-48 bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-4 text-center">
        <img src={user.avatarUrl} alt={user.name} className="w-20 h-20 rounded-full mx-auto cursor-pointer" onClick={onOpenProfile}/>
        <h4 className="font-bold mt-2 truncate cursor-pointer" onClick={onOpenProfile}>{user.name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">@{user.username}</p>
        <button 
            onClick={onToggleFollow}
            className={`w-full mt-3 font-semibold py-1.5 rounded-lg transition-colors text-sm ${isFollowing ? 'bg-gray-200 dark:bg-zinc-700' : 'bg-primary text-white'}`}
        >
            {isFollowing ? 'Following' : 'Follow'}
        </button>
    </div>
);

const UpcomingEventCard: React.FC<{event: Event, onCommunitySelect: () => void}> = ({ event, onCommunitySelect }) => (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-4 flex gap-4">
        <div className="flex flex-col items-center justify-center bg-primary/10 text-primary w-16 h-16 rounded-lg flex-shrink-0">
            <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
            <span className="text-2xl font-bold">{new Date(event.date).getDate()}</span>
        </div>
        <div>
            <h4 className="font-bold truncate">{event.title}</h4>
            <p className="text-sm text-primary font-semibold mt-1 cursor-pointer hover:underline" onClick={onCommunitySelect}>{event.communityName}</p>
        </div>
    </div>
);


export const DiscoveryView: React.FC<DiscoveryViewProps> = ({ communities, events, suggestedUsers, onCommunitySelect, onOpenCreateCommunity, followingIds, onToggleFollow, onOpenProfileModal }) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    
    const filteredCommunities = activeCategory ? communities.filter(c => c.category === activeCategory) : communities;
    const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).slice(0, 4);

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                 <h1 className="text-3xl font-display font-bold text-deep-gray dark:text-white">Discover</h1>
                 <button onClick={onOpenCreateCommunity} className="bg-primary text-white font-semibold px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-sm self-start sm:self-auto">
                    <PlusIcon className="w-5 h-5"/>
                    <span className="hidden sm:inline">Create Community</span>
                 </button>
            </div>
            
            {suggestedUsers.length > 0 && (
                <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <UsersIcon className="w-6 h-6 text-primary"/>
                        People You May Know
                    </h2>
                    <div className="flex gap-4 overflow-x-auto pb-4">
                        {suggestedUsers.map(user => (
                            <SuggestedUserCard 
                                key={user.id}
                                user={user}
                                isFollowing={followingIds.has(user.id)}
                                onToggleFollow={() => onToggleFollow(user.id)}
                                onOpenProfile={() => onOpenProfileModal(user)}
                            />
                        ))}
                    </div>
                </div>
            )}
            
            {upcomingEvents.length > 0 && (
                 <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <CalendarDaysIcon className="w-6 h-6 text-primary"/>
                        Upcoming Events
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {upcomingEvents.map(event => (
                            <UpcomingEventCard 
                                key={event.id}
                                event={event}
                                onCommunitySelect={() => onCommunitySelect(event.communityId)}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div>
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
