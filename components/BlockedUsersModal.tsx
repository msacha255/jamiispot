import React from 'react';
import { XIcon } from '../constants';
import { MOCK_USERS } from '../constants';
import type { User } from '../types';

interface BlockedUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  blockedUserIds: string[];
  onUnblockUser: (userId: string) => void;
}

export const BlockedUsersModal: React.FC<BlockedUsersModalProps> = ({ isOpen, onClose, blockedUserIds, onUnblockUser }) => {
    if (!isOpen) return null;
    
    const blockedUsers = MOCK_USERS.filter(u => blockedUserIds.includes(u.id));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all animate-modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">Blocked Users</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-4 max-h-[60vh] overflow-y-auto space-y-2">
                   {blockedUsers.length > 0 ? (
                        blockedUsers.map(user => (
                            <div key={user.id} className="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg">
                                <div className="flex items-center">
                                    <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full"/>
                                    <div className="ml-3">
                                        <p className="font-bold">{user.name}</p>
                                        <p className="text-sm text-gray-500">@{user.username}</p>
                                    </div>
                                </div>
                                <button onClick={() => onUnblockUser(user.id)} className="px-4 py-1.5 rounded-lg font-semibold border border-gray-300 dark:border-zinc-600 hover:bg-gray-100 dark:hover:bg-zinc-600 text-sm">
                                    Unblock
                                </button>
                            </div>
                        ))
                   ) : (
                        <p className="text-center text-gray-500 py-8">You haven't blocked anyone.</p>
                   )}
                </div>

                 <div className="flex justify-end p-4 border-t border-gray-200 dark:border-zinc-700">
                    <button onClick={onClose} className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};