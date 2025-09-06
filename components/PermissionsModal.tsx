import React from 'react';
import { XIcon, CameraIcon, MicIcon, MapPinIcon, BellIcon } from '../constants';
import type { Permissions } from '../types';

interface PermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  permissions: Permissions;
  onPermissionsChange: (newPermissions: Permissions) => void;
}

const PermissionToggle: React.FC<{
    icon: React.ReactNode;
    label: string; 
    description: string; 
    enabled: boolean; 
    onToggle: () => void
}> = ({ icon, label, description, enabled, onToggle }) => (
    <div className="flex items-start gap-4 py-4">
        <div className="text-primary mt-1">{icon}</div>
        <div className="flex-1">
            <p className="font-semibold text-deep-gray dark:text-white">{label}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <button
            onClick={onToggle}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors mt-1 ${enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-zinc-600'}`}
        >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

export const PermissionsModal: React.FC<PermissionsModalProps> = ({ isOpen, onClose, permissions, onPermissionsChange }) => {
    
    const togglePermission = (key: keyof Permissions) => {
        onPermissionsChange({ ...permissions, [key]: !permissions[key] });
    };

    if (!isOpen) return null;

    const permissionItems = [
        { key: 'camera', icon: <CameraIcon className="w-6 h-6"/>, label: 'Camera', description: 'For posts, stories, and your profile picture.' },
        { key: 'location', icon: <MapPinIcon className="w-6 h-6"/>, label: 'Location', description: 'To discover nearby people, communities, and tag posts.' },
        { key: 'microphone', icon: <MicIcon className="w-6 h-6"/>, label: 'Microphone', description: 'To record audio for videos and future voice messages.' },
        { key: 'notifications', icon: <BellIcon className="w-6 h-6"/>, label: 'Push Notifications', description: 'To receive alerts for likes, comments, and follows.' },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">App Permissions</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto divide-y divide-gray-200 dark:divide-zinc-700">
                    {permissionItems.map(item => (
                        <PermissionToggle 
                            key={item.key}
                            icon={item.icon}
                            label={item.label}
                            description={item.description}
                            enabled={permissions[item.key as keyof typeof permissions]}
                            onToggle={() => togglePermission(item.key as keyof typeof permissions)}
                        />
                    ))}
                </div>

                 <div className="flex justify-end p-4 border-t border-gray-200 dark:border-zinc-700">
                    <button 
                        onClick={onClose} 
                        className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};