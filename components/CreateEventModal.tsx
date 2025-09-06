import React, { useState, useEffect } from 'react';
import type { Community, Event } from '../types';
import { XIcon, CalendarIcon } from '../constants';

interface CreateEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    community: Community | null;
    onCreateEvent: (communityId: string, eventData: Omit<Event, 'id' | 'communityId' | 'communityName' | 'creator'>) => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose, community, onCreateEvent }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setDescription('');
            setDate('');
            setTime('');
            setLocation('');
        }
    }, [isOpen]);
    
    if (!isOpen || !community) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && date && time && location.trim()) {
            onCreateEvent(community.id, { title, description, date, time, location });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all animate-modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <div className="flex items-center gap-3">
                        <CalendarIcon className="w-6 h-6 text-primary" />
                        <h2 className="text-xl font-bold">Create Event in {community.name}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
                        <div>
                            <label htmlFor="event-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Title</label>
                            <input type="text" id="event-title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="event-desc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (optional)</label>
                            <textarea id="event-desc" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="event-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                                <input type="date" id="event-date" value={date} onChange={e => setDate(e.target.value)} required className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                            </div>
                             <div>
                                <label htmlFor="event-time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                                <input type="time" id="event-time" value={time} onChange={e => setTime(e.target.value)} required className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="event-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                            <input type="text" id="event-location" value={location} onChange={e => setLocation(e.target.value)} required placeholder="e.g. Online or iHub, Nairobi" className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                        </div>
                    </div>
                    <div className="flex justify-end p-4 border-t border-gray-200 dark:border-zinc-700">
                        <button type="submit" className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">Create Event</button>
                    </div>
                </form>
            </div>
        </div>
    );
};