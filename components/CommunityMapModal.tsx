import React from 'react';
import { XIcon } from '../constants';
import type { Community } from '../types';

interface CommunityMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  community: Community | null;
}

export const CommunityMapModal: React.FC<CommunityMapModalProps> = ({ isOpen, onClose, community }) => {
    if (!isOpen || !community) return null;

    // A fixed bounding box for the San Francisco area for the iframe
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-122.5136,37.7081,-122.3566,37.8324&layer=mapnik`;
    
    // Simplified projection logic for the mock data centered on SF
    const mapBounds = {
        lat: { min: 37.7081, max: 37.8324 },
        lon: { min: -122.5136, max: -122.3566 },
    };

    const getPinPosition = (lat?: number, lon?: number) => {
        if (typeof lat !== 'number' || typeof lon !== 'number') return { top: '-100%', left: '-100%' };
        
        // Calculate percentage position
        const topPercent = ((mapBounds.lat.max - lat) / (mapBounds.lat.max - mapBounds.lat.min)) * 100;
        const leftPercent = ((lon - mapBounds.lon.min) / (mapBounds.lon.max - mapBounds.lon.min)) * 100;

        // Ensure pins are within the map boundaries
        if (topPercent < 0 || topPercent > 100 || leftPercent < 0 || leftPercent > 100) {
             return { top: '-100%', left: '-100%' };
        }

        return {
            top: `${topPercent}%`,
            left: `${leftPercent}%`,
        };
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">{community.name} - Map View</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 p-4 relative">
                    <div className="w-full h-full relative overflow-hidden rounded-lg">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={mapUrl}
                            className="absolute inset-0"
                        ></iframe>
                        {community.members.map(member => {
                            const position = getPinPosition(member.latitude, member.longitude);
                            return (
                                <img
                                    key={member.id}
                                    src={member.avatarUrl}
                                    alt={member.name}
                                    className="w-10 h-10 rounded-full border-2 border-primary absolute transform -translate-x-1/2 -translate-y-1/2 shadow-lg cursor-pointer"
                                    style={{ top: position.top, left: position.left }}
                                    title={member.name}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};