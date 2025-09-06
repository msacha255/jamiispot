
import React, { useState } from 'react';
import { XIcon, ShieldCheckIcon, LockIcon, ComputerIcon, SmartphoneIcon } from '../constants';
import type { LoginSession } from '../types';
import { MOCK_LOGIN_SESSIONS } from '../constants';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TabButton: React.FC<{label: string, isActive: boolean, onClick: () => void}> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${isActive ? 'bg-white dark:bg-zinc-800 border-b-2 border-primary text-primary' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-700'}`}
    >
        {label}
    </button>
);

const ChangePasswordTab: React.FC = () => (
    <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
            <input type="password" className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
            <input type="password" className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
            <input type="password" className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
        </div>
        <button className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
            Update Password
        </button>
    </div>
);

const TwoFactorAuthTab: React.FC = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    return (
        <div>
            <div className="flex justify-between items-center py-3">
                <div>
                    <p className="font-semibold text-deep-gray dark:text-white">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account.</p>
                </div>
                <button
                    onClick={() => setIsEnabled(!isEnabled)}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isEnabled ? 'bg-primary' : 'bg-gray-300 dark:bg-zinc-600'}`}
                >
                    <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>
            {isEnabled && (
                <div className="mt-4 p-4 bg-light-gray dark:bg-zinc-700/50 rounded-lg">
                    <p className="text-sm">To finish setting up, scan this QR code with your authenticator app.</p>
                    <div className="w-32 h-32 bg-gray-300 dark:bg-zinc-600 mx-auto my-4 rounded-md"></div>
                    <p className="text-xs text-gray-500">This is a placeholder. In a real app, a QR code would be generated here.</p>
                </div>
            )}
        </div>
    );
};

const LoginActivityTab: React.FC = () => (
    <div className="space-y-3">
        {MOCK_LOGIN_SESSIONS.map(session => (
            <div key={session.id} className="flex items-center gap-4 p-3 rounded-lg bg-light-gray dark:bg-zinc-700/50">
                {session.device.includes('iOS') || session.device.includes('Android') ? <SmartphoneIcon className="w-8 h-8 text-gray-500"/> : <ComputerIcon className="w-8 h-8 text-gray-500"/>}
                <div className="flex-1">
                    <p className="font-semibold">{session.device} {session.isCurrent && <span className="text-xs text-green-500 font-bold ml-2">(Current)</span>}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{session.location} · {session.ip}</p>
                </div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{session.timestamp}</p>
            </div>
        ))}
    </div>
);


export const SecurityModal: React.FC<SecurityModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('password');
    
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <div className="flex items-center gap-3">
                        <ShieldCheckIcon className="w-6 h-6 text-primary"/>
                        <h2 className="text-xl font-bold">Security Center</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="border-b border-gray-200 dark:border-zinc-700 px-6">
                    <nav className="flex space-x-2 -mb-px">
                        <TabButton label="Change Password" isActive={activeTab === 'password'} onClick={() => setActiveTab('password')} />
                        <TabButton label="2FA" isActive={activeTab === '2fa'} onClick={() => setActiveTab('2fa')} />
                        <TabButton label="Login Activity" isActive={activeTab === 'activity'} onClick={() => setActiveTab('activity')} />
                    </nav>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    {activeTab === 'password' && <ChangePasswordTab />}
                    {activeTab === '2fa' && <TwoFactorAuthTab />}
                    {activeTab === 'activity' && <LoginActivityTab />}
                </div>

                 <div className="flex justify-end p-4 border-t border-gray-200 dark:border-zinc-700">
                    <button 
                        onClick={onClose} 
                        className="bg-gray-200 dark:bg-zinc-700 text-deep-gray dark:text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
