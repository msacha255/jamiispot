import React from 'react';
import { XIcon } from '../constants';
import type { User } from '../types';

interface BlockUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onConfirmBlock: (user: User) => void;
}

export const BlockUserModal: React.FC<BlockUserModalProps> = ({ isOpen, onClose, user, onConfirmBlock }) => {
    if (!isOpen || !user) return null;

    const handleConfirm = () => {
        onConfirmBlock(user);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-sm transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">Block @{user.username}?</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300">
                       They will not be able to follow you or view your posts, and you will not see their posts or notifications.
                    </p>
                </div>

                <div className="flex justify-end gap-3 p-4 bg-gray-50 dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700 rounded-b-xl">
                    <button onClick={onClose} className="px-4 py-2 rounded-lg font-semibold bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600">
                        Cancel
                    </button>
                    <button 
                        onClick={handleConfirm}
                        className="bg-red-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-sm">
                        Block
                    </button>
                </div>
            </div>
        </div>
    );
};