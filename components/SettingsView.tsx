
import React, { useState } from 'react';
import { ChevronRightIcon, TranslateIcon } from '../constants';
import type { Language } from '../types';

interface SettingsViewProps {
    isDarkMode: boolean;
    setIsDarkMode: (isDark: boolean) => void;
    onLogout: () => void;
    onOpenPrivacyModal: () => void;
    onOpenPermissionsModal: () => void;
    onOpenHelpSupportModal: () => void;
    onOpenBlockedUsers: () => void;
    onOpenVerification: () => void;
    onOpenLanguageModal: () => void;
    onOpenShareModal: () => void;
    language: Language;
    // FIX: Add onOpenSecurityModal to props to handle opening the security modal.
    onOpenSecurityModal: () => void;
}

const translations = {
    en: { settings: 'Settings', language: 'Language', languageDesc: 'Choose your preferred language.'},
    es: { settings: 'Configuración', language: 'Idioma', languageDesc: 'Elige tu idioma preferido.'},
    fr: { settings: 'Paramètres', language: 'Langue', languageDesc: 'Choisissez votre langue préférée.'},
    de: { settings: 'Einstellungen', language: 'Sprache', languageDesc: 'Wähle deine bevorzugte Sprache.'},
    pt: { settings: 'Configurações', language: 'Idioma', languageDesc: 'Escolha o seu idioma preferido.'},
    sw: { settings: 'Mipangilio', language: 'Lugha', languageDesc: 'Chagua lugha unayopendelea.'},
    hi: { settings: 'सेटिंग्स', language: 'भाषा', languageDesc: 'अपनी पसंदीदा भाषा चुनें।'},
    zh: { settings: '设置', language: '语言', languageDesc: '选择您的首选语言。'},
    ja: { settings: '設定', language: '言語', languageDesc: 'ご希望の言語を選択してください。'},
    ar: { settings: 'الإعدادات', language: 'لغة', languageDesc: 'اختر لغتك المفضلة.'},
};

const useTranslation = (langCode: string) => {
    const code = langCode as keyof typeof translations;
    return translations[code] || translations.en;
};


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


export const SettingsView: React.FC<SettingsViewProps> = ({ isDarkMode, setIsDarkMode, onLogout, onOpenPrivacyModal, onOpenPermissionsModal, onOpenHelpSupportModal, onOpenBlockedUsers, onOpenVerification, onOpenLanguageModal, onOpenShareModal, language, onOpenSecurityModal }) => {
    const [isNotificationsExpanded, setNotificationsExpanded] = useState(false);
    const [notificationPrefs, setNotificationPrefs] = useState({ likes: true, comments: true, follows: false });
    const t = useTranslation(language.code);
    
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
            <h1 className="text-3xl font-display font-bold text-deep-gray dark:text-white mb-8">{t.settings}</h1>

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
                         <div onClick={onOpenLanguageModal} className="flex justify-between items-center py-4 cursor-pointer group">
                            <div>
                                <p className="font-semibold text-deep-gray dark:text-white group-hover:text-primary transition-colors">{t.language}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{t.languageDesc}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500 dark:text-gray-400 font-semibold">{language.name}</span>
                                <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform"/>
                            </div>
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
                        {/* FIX: Add SettingsItem for Security. */}
                        <SettingsItem label="Security" description="Manage 2FA and login sessions." onClick={onOpenSecurityModal} />
                        <SettingsItem label="Blocked Users" description="Manage users you've blocked." onClick={onOpenBlockedUsers} />
                        <SettingsItem label="Request Verification" description="Get a badge to show your authenticity." onClick={onOpenVerification} />
                        <SettingsItem label="Share & Refer" description="Share your profile or invite friends." onClick={onOpenShareModal} />
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
