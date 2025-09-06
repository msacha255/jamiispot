import React, { useState } from 'react';
import { XIcon, GlobeIcon, UsersIcon, LockIcon } from '../constants';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsToggle: React.FC<{label: string; description: string; enabled: boolean; onToggle: () => void}> = ({ label, description, enabled, onToggle }) => (
    <div className="flex justify-between items-center py-3">
        <div>
            <p className="font-semibold text-deep-gray dark:text-white">{label}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <button
            onClick={onToggle}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-zinc-600'}`}
        >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
    const [visibility, setVisibility] = useState('public');
    const [showActivity, setShowActivity] = useState(true);
    const [allowDataSharing, setAllowDataSharing] = useState(false);
    
    if (!isOpen) return null;

    const visibilityOptions = [
        { id: 'public', label: 'Public', description: 'Anyone can see your profile.', icon: <GlobeIcon className="w-5 h-5"/> },
        { id: 'friends', label: 'Friends Only', description: 'Only your friends can see your profile.', icon: <UsersIcon className="w-5 h-5"/> },
        { id: 'private', label: 'Private', description: 'Only you can see your profile.', icon: <LockIcon className="w-5 h-5"/> },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">Privacy Settings</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div>
                        <h3 className="font-semibold mb-2">Profile Visibility</h3>
                        <div className="space-y-2">
                           {visibilityOptions.map(option => (
                                <div key={option.id} onClick={() => setVisibility(option.id)} className={`flex items-center p-3 border dark:border-zinc-700 rounded-lg cursor-pointer ${visibility === option.id ? 'border-primary bg-primary/5' : 'border-gray-300'}`}>
                                    <div className="mr-3 text-gray-600 dark:text-gray-300">{option.icon}</div>
                                    <div>
                                        <p className="font-semibold">{option.label}</p>
                                        <p className="text-sm text-gray-500">{option.description}</p>
                                    </div>
                                    <div className="ml-auto w-5 h-5 border-2 rounded-full flex items-center justify-center" style={{borderColor: visibility === option.id ? '#FF6B00' : 'gray'}}>
                                        {visibility === option.id && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                                    </div>
                                </div>
                           ))}
                        </div>
                    </div>

                    <div className="divide-y divide-gray-200 dark:divide-zinc-700">
                        <SettingsToggle 
                            label="Show Activity Status" 
                            description="Let others see when you're online."
                            enabled={showActivity}
                            onToggle={() => setShowActivity(!showActivity)}
                        />
                        <SettingsToggle 
                            label="Data Sharing" 
                            description="Allow sharing data with third-party apps."
                            enabled={allowDataSharing}
                            onToggle={() => setAllowDataSharing(!allowDataSharing)}
                        />
                    </div>
                </div>

                 <div className="flex justify-end p-4 border-t border-gray-200 dark:border-zinc-700">
                    <button 
                        onClick={onClose} 
                        className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};