import React, { useState } from 'react';
import { ChevronRightIcon } from '../constants';

interface SettingsViewProps {
    isDarkMode: boolean;
    setIsDarkMode: (isDark: boolean) => void;
    onLogout: () => void;
    onOpenPrivacyModal: () => void;
    onOpenPermissionsModal: () => void;
    onOpenHelpSupportModal: () => void;
    onOpenBlockedUsers: () => void;
    onOpenVerification: () => void;
}

const SettingsItem: React.FC<{label: string; description: string; onClick: () => void; hasChevron?: boolean;}> = ({ label, description, onClick, hasChevron = true }) => (
    <div onClick={onClick} className="flex justify-between items-center py-4 cursor-pointer group">
        <div>
            <p className="font-semibold text-deep-gray dark:text-white group-hover:text-primary transition-colors">{label}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        {hasChevron && <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform"/>}
    </div>
);

const SettingsToggle: React.FC<{label: string; enabled: boolean; onToggle: () => void}> = ({ label, enabled, onToggle }) => (
    <div className="flex justify-between items-center py-3">
        <p className="font-semibold text-deep-gray dark:text-white">{label}</p>
        <button
            onClick={onToggle}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-zinc-600'}`}
        >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);


export const SettingsView: React.FC<SettingsViewProps> = ({ isDarkMode, setIsDarkMode, onLogout, onOpenPrivacyModal, onOpenPermissionsModal, onOpenHelpSupportModal, onOpenBlockedUsers, onOpenVerification }) => {
    const [isNotificationsExpanded, setNotificationsExpanded] = useState(false);
    const [notificationPrefs, setNotificationPrefs] = useState({ likes: true, comments: true, follows: false });
    
    const generalSettings = [
        {
            title: "Privacy",
            description: "Control your profile visibility and data.",
            action: onOpenPrivacyModal
        },
        {
            title: "Permissions",
            description: "Manage app permissions for camera, location etc.",
            action: onOpenPermissionsModal
        },
    ];

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-display font-bold text-deep-gray dark:text-white mb-8">Settings</h1>

            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm divide-y divide-gray-200 dark:divide-zinc-700">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">General</h2>
                    <div className="divide-y divide-gray-200 dark:divide-zinc-700">
                         {generalSettings.map(item => (
                             <SettingsItem key={item.title} label={item.title} description={item.description} onClick={item.action} />
                         ))}
                         <div onClick={() => setNotificationsExpanded(!isNotificationsExpanded)} className="cursor-pointer">
                            <div className="flex justify-between items-center py-4 group">
                                <div>
                                    <p className="font-semibold text-deep-gray dark:text-white group-hover:text-primary transition-colors">Notifications</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Choose what updates you receive.</p>
                                </div>
                                <ChevronRightIcon className={`w-5 h-5 text-gray-400 transition-transform ${isNotificationsExpanded ? 'rotate-90' : ''}`}/>
                            </div>
                            {isNotificationsExpanded && (
                                <div className="pb-2 pl-4 border-l-2 border-primary/20">
                                    <SettingsToggle label="Likes" enabled={notificationPrefs.likes} onToggle={() => setNotificationPrefs(p => ({...p, likes: !p.likes}))}/>
                                    <SettingsToggle label="Comments" enabled={notificationPrefs.comments} onToggle={() => setNotificationPrefs(p => ({...p, comments: !p.comments}))}/>
                                    <SettingsToggle label="Follows" enabled={notificationPrefs.follows} onToggle={() => setNotificationPrefs(p => ({...p, follows: !p.follows}))}/>
                                </div>
                            )}
                         </div>
                         <SettingsItem label="Help & Support" description="Get help, send feedback, or contact us." onClick={onOpenHelpSupportModal} />
                    </div>
                </div>

                <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">Appearance</h2>
                    <SettingsToggle
                        label="Dark Mode"
                        enabled={isDarkMode}
                        onToggle={() => setIsDarkMode(!isDarkMode)}
                    />
                </div>
                 <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">Account</h2>
                    <div className="divide-y divide-gray-200 dark:divide-zinc-700">
                        <SettingsItem label="Blocked Users" description="Manage users you've blocked." onClick={onOpenBlockedUsers} />
                        <SettingsItem label="Request Verification" description="Get a badge to show your authenticity." onClick={onOpenVerification} />
                    </div>
                    <button
                        onClick={onLogout}
                        className="w-full text-left text-red-600 font-semibold py-3 mt-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};