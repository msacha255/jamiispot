import React, { useState, useMemo } from 'react';
import type { Event, Community } from '../types';
import { MapPinIcon, XIcon, CalendarIcon, UsersIcon } from '../constants';

interface EventMapViewProps {
  events: Event[];
  communities: Community[];
  onOpenEventDetail: (event: Event) => void;
}

const EventMarker: React.FC<{ event: Event; position: { top: string; left: string }; onClick: () => void; isActive: boolean }> = ({ event, position, onClick, isActive }) => (
    <div
        className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-transform duration-200 hover:scale-110 z-10"
        style={{ top: position.top, left: position.left }}
        onClick={onClick}
    >
        <MapPinIcon className={`w-10 h-10 drop-shadow-lg ${isActive ? 'text-accent' : 'text-primary'}`} />
        <img src={event.creator.avatarUrl} alt={event.creator.name} className="w-6 h-6 rounded-full border-2 border-white dark:border-zinc-800 absolute top-1 left-1/2 -translate-x-1/2" />
    </div>
);

const EventPopup: React.FC<{ event: Event; onClose: () => void; onViewDetails: () => void; position: { top: string; left: string } }> = ({ event, onClose, onViewDetails, position }) => (
    <div
        className="absolute transform -translate-x-1/2 -translate-y-[calc(100%+50px)] bg-white dark:bg-zinc-800 rounded-lg shadow-xl w-64 z-20 animate-modal-content"
        style={{ top: position.top, left: position.left }}
    >
        <div className="p-3">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold">{event.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{event.communityName}</p>
                </div>
                <button onClick={onClose} className="-mt-1 -mr-1 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700"><XIcon className="w-4 h-4" /></button>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                <p>{new Date(event.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })} at {event.time}</p>
                <p>{event.location}</p>
            </div>
            <button onClick={onViewDetails} className="w-full mt-3 bg-primary text-white font-semibold py-1.5 rounded-md hover:bg-orange-600 transition-colors text-sm">
                View Details
            </button>
        </div>
    </div>
);


export const EventMapView: React.FC<EventMapViewProps> = ({ events, communities, onOpenEventDetail }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedCommunities, setSelectedCommunities] = useState<Set<string>>(new Set());
    const [activeEvent, setActiveEvent] = useState<Event | null>(null);

    const toggleCommunity = (id: string) => {
        setSelectedCommunities(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            if (!event.latitude || !event.longitude) return false;
            
            const dateMatch = !selectedDate || new Date(event.date).toISOString().split('T')[0] === selectedDate;
            const communityMatch = selectedCommunities.size === 0 || selectedCommunities.has(event.communityId);
            
            return dateMatch && communityMatch;
        });
    }, [events, selectedDate, selectedCommunities]);
    
    // Calculate map bounds
    const mapBounds = useMemo(() => {
        const eventsWithCoords = events.filter(e => e.latitude && e.longitude);
        if (eventsWithCoords.length === 0) {
            // Default to Nairobi
            return { lat: { min: -1.35, max: -1.25 }, lon: { min: 36.75, max: 36.95 }, center: { lat: -1.2921, lon: 36.8219 } };
        }
        const latitudes = eventsWithCoords.map(e => e.latitude!);
        const longitudes = eventsWithCoords.map(e => e.longitude!);
        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLon = Math.min(...longitudes);
        const maxLon = Math.max(...longitudes);
        
        // Add some padding
        const latPadding = (maxLat - minLat) * 0.1 || 0.1;
        const lonPadding = (maxLon - minLon) * 0.1 || 0.1;

        return {
            lat: { min: minLat - latPadding, max: maxLat + latPadding },
            lon: { min: minLon - lonPadding, max: maxLon + lonPadding },
            center: { lat: (minLat + maxLat) / 2, lon: (minLon + maxLon) / 2 }
        };
    }, [events]);

    const getPinPosition = (lat?: number, lon?: number) => {
        if (typeof lat !== 'number' || typeof lon !== 'number') return { top: '-100%', left: '-100%' };
        const topPercent = ((mapBounds.lat.max - lat) / (mapBounds.lat.max - mapBounds.lat.min)) * 100;
        const leftPercent = ((lon - mapBounds.lon.min) / (mapBounds.lon.max - mapBounds.lon.min)) * 100;
        return { top: `${topPercent}%`, left: `${leftPercent}%` };
    };

    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${mapBounds.lon.min},${mapBounds.lat.min},${mapBounds.lon.max},${mapBounds.lat.max}&layer=mapnik`;
    
    return (
        <div className="flex flex-col lg:flex-row h-full gap-6">
            <div className="w-full lg:w-80 lg:flex-shrink-0 bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-6 space-y-6 self-start">
                <div>
                    <h2 className="text-lg font-bold flex items-center gap-2 mb-3"><CalendarIcon className="w-5 h-5"/>Filter by Date</h2>
                    <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"/>
                    {selectedDate && <button onClick={() => setSelectedDate('')} className="text-sm text-primary hover:underline mt-2">Clear date</button>}
                </div>
                <div>
                    <h2 className="text-lg font-bold flex items-center gap-2 mb-3"><UsersIcon className="w-5 h-5"/>Filter by Community</h2>
                    <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                        {communities.map(community => (
                            <label key={community.id} className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-700">
                                <input type="checkbox" checked={selectedCommunities.has(community.id)} onChange={() => toggleCommunity(community.id)} className="h-5 w-5 rounded text-primary focus:ring-primary"/>
                                <span className="font-semibold">{community.name}</span>
                            </label>
                        ))}
                    </div>
                     {selectedCommunities.size > 0 && <button onClick={() => setSelectedCommunities(new Set())} className="text-sm text-primary hover:underline mt-2">Clear communities</button>}
                </div>
            </div>

            <div className="flex-1 bg-white dark:bg-zinc-800 rounded-xl shadow-sm p-4 relative overflow-hidden h-96 lg:h-auto">
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={mapUrl}
                    className="absolute inset-0 rounded-lg"
                    title="Event Map"
                ></iframe>

                {filteredEvents.map(event => (
                    <EventMarker 
                        key={event.id}
                        event={event}
                        position={getPinPosition(event.latitude, event.longitude)}
                        onClick={() => setActiveEvent(event)}
                        isActive={activeEvent?.id === event.id}
                    />
                ))}

                {activeEvent && (
                    <EventPopup 
                        event={activeEvent}
                        position={getPinPosition(activeEvent.latitude, activeEvent.longitude)}
                        onClose={() => setActiveEvent(null)}
                        onViewDetails={() => onOpenEventDetail(activeEvent)}
                    />
                )}
            </div>
        </div>
    );
};