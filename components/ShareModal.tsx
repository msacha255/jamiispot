import React, { useState } from 'react';
import { XIcon, ShareIcon, UserIcon, LinkIcon, CopyIcon } from '../constants';
import type { User } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, user }) => {
    const [copyStatus, setCopyStatus] = useState('Copy');
    
    if (!isOpen) return null;

    const handleShare = async (title: string, text: string, url: string) => {
        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert('Share feature is not supported in your browser.');
        }
    };
    
    const handleCopyReferral = () => {
        const referralLink = `https://jamiispot.com/referral/${user.username}`;
        navigator.clipboard.writeText(referralLink).then(() => {
            setCopyStatus('Copied!');
            setTimeout(() => setCopyStatus('Copy'), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy link.');
        });
    };
    
    const ShareOption: React.FC<{
        icon: React.ReactNode;
        title: string;
        description: string;
        buttonLabel: string;
        onAction: () => void;
        actionIcon: React.ReactNode;
    }> = ({ icon, title, description, buttonLabel, onAction, actionIcon }) => (
        <div className="flex items-center gap-4 p-4 bg-light-gray dark:bg-zinc-700/50 rounded-lg">
            <div className="text-primary">{icon}</div>
            <div className="flex-1">
                <h3 className="font-bold">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
            </div>
            <button 
                onClick={onAction}
                className="bg-primary text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors shadow-sm"
            >
                {actionIcon}
                <span>{buttonLabel}</span>
            </button>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all animate-modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">Share & Refer</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <ShareOption
                        icon={<UserIcon className="w-8 h-8"/>}
                        title="Share Your Profile"
                        description="Share a direct link to your JamiiSpot profile."
                        buttonLabel="Share"
                        actionIcon={<ShareIcon className="w-5 h-5"/>}
                        onAction={() => handleShare(
                            `${user.name}'s Profile`,
                            `Check out ${user.name}'s profile on JamiiSpot!`,
                            `https://jamiispot.com/profile/${user.username}`
                        )}
                    />
                    <ShareOption
                        icon={<ShareIcon className="w-8 h-8"/>}
                        title="Share JamiiSpot"
                        description="Invite friends to join the JamiiSpot community."
                        buttonLabel="Share"
                        actionIcon={<ShareIcon className="w-5 h-5"/>}
                        onAction={() => handleShare(
                            'Join me on JamiiSpot!',
                            'Discover communities, connect with friends, and thrive on JamiiSpot.',
                            'https://jamiispot.com'
                        )}
                    />
                    <ShareOption
                        icon={<LinkIcon className="w-8 h-8"/>}
                        title="Your Referral Link"
                        description="Earn rewards when friends sign up using your link."
                        buttonLabel={copyStatus}
                        actionIcon={<CopyIcon className="w-5 h-5"/>}
                        onAction={handleCopyReferral}
                    />
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