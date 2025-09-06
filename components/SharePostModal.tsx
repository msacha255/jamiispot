

import React, { useState } from 'react';
import { XIcon, XSocialIcon, FacebookIcon, WhatsAppIcon, LinkIcon } from '../constants';
import type { Post } from '../types';

interface SharePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

export const SharePostModal: React.FC<SharePostModalProps> = ({ isOpen, onClose, post }) => {
    const [copyStatus, setCopyStatus] = useState('Copy Link');

    if (!isOpen || !post) return null;
    
    const postUrl = `https://jamiispot.com/post/${post.id}`;
    const shareText = `Check out this post by ${post.user.name} on JamiiSpot!`;

    const handleCopy = () => {
        navigator.clipboard.writeText(postUrl).then(() => {
            setCopyStatus('Copied!');
            setTimeout(() => setCopyStatus('Copy Link'), 2000);
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all animate-modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">Share Post</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex justify-around items-center mb-6">
                        <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="text-center text-gray-600 dark:text-gray-300 hover:text-primary">
                            <XSocialIcon className="w-12 h-12 mx-auto"/>
                            <span className="text-sm mt-1">Twitter</span>
                        </a>
                         <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`} target="_blank" rel="noopener noreferrer" className="text-center text-gray-600 dark:text-gray-300 hover:text-primary">
                            <FacebookIcon className="w-12 h-12 mx-auto"/>
                            <span className="text-sm mt-1">Facebook</span>
                        </a>
                        <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + postUrl)}`} target="_blank" rel="noopener noreferrer" className="text-center text-gray-600 dark:text-gray-300 hover:text-primary">
                            <WhatsAppIcon className="w-12 h-12 mx-auto"/>
                            <span className="text-sm mt-1">WhatsApp</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 p-3 bg-light-gray dark:bg-zinc-700 rounded-lg text-sm truncate">
                            {postUrl}
                        </div>
                        <button onClick={handleCopy} className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                            {copyStatus}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};