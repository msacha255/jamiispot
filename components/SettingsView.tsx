import React from 'react';
import { ChevronRightIcon } from '../constants';

interface SettingsViewProps {
    isDarkMode: boolean;
    setIsDarkMode: (isDark: boolean) => void;
    onLogout: () => void;
    onOpenPrivacyModal: () => void;
    onOpenPermissionsModal: () => void;
}

const SettingsItem: React.FC<{label: string; description: string; onClick: () => void}> = ({ label, description, onClick }) => (
    <div onClick={onClick} className="flex justify-between items-center py-4 cursor-pointer group">
        <div>
            <p className="font-semibold text-deep-gray dark:text-white group-hover:text-primary transition-colors">{label}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-gray-400"/>
    </div>
);

const SettingsToggle: React.FC<{label: string; enabled: boolean; onToggle: () => void}> = ({ label, enabled, onToggle }) => (
    <div className="flex justify-between items-center py-4">
        <p className="font-semibold text-deep-gray dark:text-white">{label}</p>
        <button
            onClick={onToggle}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-primary' : 'bg-gray-300 dark:bg-zinc-600'}`}
        >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
    </div>
);


export const SettingsView: React.FC<SettingsViewProps> = ({ isDarkMode, setIsDarkMode, onLogout, onOpenPrivacyModal, onOpenPermissionsModal }) => {
    
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
        {
            title: "Notifications",
            description: "Choose what updates you receive.",
            action: () => {}
        },
        {
            title: "Help & Support",
            description: "Get help, send feedback, or contact us.",
            action: () => {}
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
                    <button
                        onClick={onLogout}
                        className="w-full text-left text-red-600 font-semibold py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};