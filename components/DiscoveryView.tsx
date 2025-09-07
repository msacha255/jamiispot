import React, { useState } from 'react';
import { COMMUNITY_CATEGORIES, UsersIcon, PlusIcon, CalendarDaysIcon, MapIcon } from '../constants';
import type { Community, Event, User, View } from '../types';

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
    onOpenEventDetail: (event: Event) => void;
    onNavigate: (view: View, params?: any) => void;
}

const FeaturedCommunityCard: React.FC<{ community: Community, onClick: () => void }> = ({ community, onClick }) => (
    <div onClick={onClick} className="flex-shrink-0 w-64 bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden cursor-pointer group hover:-translate-y-1 transition-transform duration-300">
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
    <div className="flex-shrink-0 w-48 bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-4 text-center hover:-translate-y-1 transition-transform duration-300">
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

const UpcomingEventCard: React.FC<{event: Event, onCommunitySelect: () => void, onOpenEventDetail: (event: Event) => void}> = ({ event, onCommunitySelect, onOpenEventDetail }) => (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-4 flex gap-4 cursor-pointer hover:-translate-y-1 transition-transform duration-300" onClick={() => onOpenEventDetail(event)}>
        <div className="flex flex-col items-center justify-center bg-primary/10 text-primary w-16 h-16 rounded-lg flex-shrink-0">
            <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
            <span className="text-2xl font-bold">{new Date(event.date).getDate()}</span>
        </div>
        <div>
            <h4 className="font-bold truncate">{event.title}</h4>
            <p className="text-sm text-primary font-semibold mt-1 cursor-pointer hover:underline" onClick={(e) => { e.stopPropagation(); onCommunitySelect() }}>{event.communityName}</p>
        </div>
    </div>
);


export const DiscoveryView: React.FC<DiscoveryViewProps> = ({ communities, events, suggestedUsers, onCommunitySelect, onOpenCreateCommunity, followingIds, onToggleFollow, onOpenProfileModal, onOpenEventDetail, onNavigate }) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    
    const filteredCommunities = activeCategory ? communities.filter(c => c.category === activeCategory) : communities;
    const upcomingEvents = events.filter(e => new Date(e.date) > new Date()).slice(0, 4);

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                 <h1 className="text-3xl font-display font-bold text-deep-gray dark:text-white">Discover</h1>
                 <button onClick={onOpenCreateCommunity} className="bg-primary text-white font-semibold px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-sm self-start sm:self-auto">
                    <PlusIcon className="w-5 h-5"/>
                    <span>Create Community</span>
                 </button>
            </div>

            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-6 cursor-pointer hover:-translate-y-1 transition-transform duration-300" onClick={() => onNavigate('event-map')}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="bg-primary/10 text-primary p-4 rounded-lg">
                        <MapIcon className="w-10 h-10" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold">Event Map</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">Discover local events visually on an interactive map. Filter by date, community, and more to find what's happening near you.</p>
                    </div>
                    <button className="bg-primary text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-sm self-start sm:self-center">
                        Open Map
                    </button>
                </div>
            </div>

            <section>
                <h2 className="text-2xl font-bold font-display mb-4">Featured Communities</h2>
                 <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
                    {communities.slice(0,5).map(community => <FeaturedCommunityCard key={community.id} community={community} onClick={() => onCommunitySelect(community.id)} />)}
                </div>
            </section>
            
            <section>
                 <h2 className="text-2xl font-bold font-display mb-4">Explore by Category</h2>
                 <div className="flex flex-wrap gap-3">
                    <CategoryButton name="All" isActive={!activeCategory} onClick={() => setActiveCategory(null)} />
                    {COMMUNITY_CATEGORIES.map(cat => (
                        <CategoryButton key={cat} name={cat} isActive={activeCategory === cat} onClick={() => setActiveCategory(cat)} />
                    ))}
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {filteredCommunities.map(community => (
                        <div key={community.id} onClick={() => onCommunitySelect(community.id)} className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors">
                            <img src={community.coverUrl} alt={community.name} className="w-16 h-16 rounded-lg object-cover"/>
                            <div>
                                <h3 className="font-bold">{community.name}</h3>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    <UsersIcon className="w-4 h-4 mr-1.5" />
                                    <span>{community.memberCount.toLocaleString()} members</span>
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
            </section>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <section className="lg:col-span-2">
                     <h2 className="text-2xl font-bold font-display mb-4">Suggested For You</h2>
                     <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
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
                </section>
                <section>
                    <h2 className="text-2xl font-bold font-display mb-4">Upcoming Events</h2>
                    <div className="space-y-4">
                        {upcomingEvents.map(event => (
                            <UpcomingEventCard 
                                key={event.id}
                                event={event}
                                onCommunitySelect={() => onCommunitySelect(event.communityId)}
                                onOpenEventDetail={onOpenEventDetail}
                            />
                        ))}
                    </div>
                </section>
            </div>

        </div>
    );
};