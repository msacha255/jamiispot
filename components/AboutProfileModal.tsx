import React from 'react';
import { XIcon, InfoIcon, UserIcon, MapPinIcon } from '../constants';
import type { User } from '../types';

interface AboutProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

const InfoRow: React.FC<{ icon: React.ReactNode, label: string, value: string | undefined }> = ({ icon, label, value }) => {
    if (!value) return null;
    return (
        <div className="flex items-center gap-4">
            <div className="text-gray-500 dark:text-gray-400">{icon}</div>
            <div>
                <p className="font-semibold">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
            </div>
        </div>
    )
};

export const AboutProfileModal: React.FC<AboutProfileModalProps> = ({ isOpen, onClose, user }) => {
    if (!isOpen || !user) return null;

    const formattedJoinDate = user.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-sm transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                     <div className="flex items-center gap-3">
                        <InfoIcon className="w-6 h-6 text-primary"/>
                        <h2 className="text-xl font-bold">About this account</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-6 space-y-4">
                    <InfoRow icon={<UserIcon className="w-6 h-6"/>} label="Username" value={`@${user.username}`} />
                    <InfoRow icon={<InfoIcon className="w-6 h-6"/>} label="Joined" value={formattedJoinDate} />
                    <InfoRow icon={<MapPinIcon className="w-6 h-6"/>} label="Location" value={user.location} />
                </div>
            </div>
        </div>
    );
};