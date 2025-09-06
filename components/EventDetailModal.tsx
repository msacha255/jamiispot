import React from 'react';
import type { Event } from '../types';
import { XIcon, CalendarIcon, MapPinIcon, UsersIcon, UserIcon } from '../constants';

interface EventDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: Event | null;
    onCommunitySelect: (communityId: string) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({ isOpen, onClose, event, onCommunitySelect }) => {
    if (!isOpen || !event) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all animate-modal-content" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-zinc-700">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3 text-primary">
                            <CalendarIcon className="w-6 h-6"/>
                            <h2 className="text-xl font-bold text-deep-gray dark:text-white">Event Details</h2>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
                    <h3 className="text-2xl font-bold font-display">{event.title}</h3>

                    <div className="space-y-3 text-gray-700 dark:text-gray-300">
                         <div className="flex items-center gap-3">
                            <UsersIcon className="w-5 h-5 text-gray-400"/>
                            <div>
                                <span className="font-semibold">Hosted by:</span>
                                <span onClick={() => onCommunitySelect(event.communityId)} className="ml-2 text-primary font-semibold cursor-pointer hover:underline">{event.communityName}</span>
                            </div>
                        </div>
                         <div className="flex items-center gap-3">
                            <CalendarIcon className="w-5 h-5 text-gray-400"/>
                            <div>
                                <span className="font-semibold">Date & Time:</span>
                                <span className="ml-2">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {event.time}</span>
                            </div>
                        </div>
                         <div className="flex items-center gap-3">
                            <MapPinIcon className="w-5 h-5 text-gray-400"/>
                             <div>
                                <span className="font-semibold">Location:</span>
                                <span className="ml-2">{event.location}</span>
                            </div>
                        </div>
                         <div className="flex items-center gap-3">
                            <UserIcon className="w-5 h-5 text-gray-400"/>
                             <div>
                                <span className="font-semibold">Created by:</span>
                                <span className="ml-2">@{event.creator.username}</span>
                            </div>
                        </div>
                    </div>

                    {event.description && (
                        <div>
                             <h4 className="font-semibold border-t border-gray-200 dark:border-zinc-700 pt-4 mt-4">About this event</h4>
                             <p className="text-gray-600 dark:text-gray-400 mt-2">{event.description}</p>
                        </div>
                    )}
                </div>

                 <div className="flex justify-end p-4 border-t border-gray-200 dark:border-zinc-700">
                    <button 
                        onClick={() => onCommunitySelect(event.communityId)} 
                        className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                        View Community
                    </button>
                </div>
            </div>
        </div>
    );
};