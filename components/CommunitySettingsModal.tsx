import React, { useState } from 'react';
import { XIcon, MoreHorizontalIcon } from '../constants';
import type { Community, User } from '../types';
import { MOCK_USERS } from '../constants';

interface CommunitySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  community: Community | null;
  setCommunities: React.Dispatch<React.SetStateAction<Community[]>>;
}

const MemberRow: React.FC<{
    member: User, 
    isAdmin: boolean,
    onPromote: () => void,
    onDemote: () => void,
    onRemove: () => void,
}> = ({ member, isAdmin, onPromote, onDemote, onRemove }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
        <div className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg">
            <div className="flex items-center">
                <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full"/>
                <div className="ml-3">
                    <p className="font-bold">{member.name}</p>
                    <p className="text-sm text-gray-500">@{member.username}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${isAdmin ? 'bg-primary/10 text-primary' : 'bg-gray-200 dark:bg-zinc-600'}`}>
                    {isAdmin ? 'Admin' : 'Member'}
                </span>
                <div className="relative">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-600"><MoreHorizontalIcon className="w-5 h-5"/></button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border dark:border-zinc-700 z-10">
                            {isAdmin ? (
                                <button onClick={() => { onDemote(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700">Demote to Member</button>
                            ) : (
                                <button onClick={() => { onPromote(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-700">Promote to Admin</button>
                            )}
                            <button onClick={() => { onRemove(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">Remove User</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export const CommunitySettingsModal: React.FC<CommunitySettingsModalProps> = ({ isOpen, onClose, community, setCommunities }) => {
    if (!isOpen || !community) return null;

    const handleUpdateAdmins = (newAdmins: string[]) => {
        setCommunities(prev => prev.map(c => c.id === community.id ? {...c, admins: newAdmins} : c));
    };
    
    const handleUpdateMembers = (newMembers: User[]) => {
        setCommunities(prev => prev.map(c => c.id === community.id ? {...c, members: newMembers, memberCount: newMembers.length} : c));
    };

    const promoteUser = (userId: string) => {
        handleUpdateAdmins([...community.admins, userId]);
    };
    
    const demoteUser = (userId: string) => {
        handleUpdateAdmins(community.admins.filter(id => id !== userId));
    };

    const removeUser = (userId: string) => {
        handleUpdateMembers(community.members.filter(m => m.id !== userId));
        handleUpdateAdmins(community.admins.filter(id => id !== userId));
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">{community.name} Settings</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal"><XIcon className="w-6 h-6" /></button>
                </div>
                
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <h3 className="font-bold text-lg mb-4">Manage Members</h3>
                    <div className="space-y-2">
                        {community.members.map(member => (
                            <MemberRow 
                                key={member.id} 
                                member={member}
                                isAdmin={community.admins.includes(member.id)}
                                onPromote={() => promoteUser(member.id)}
                                onDemote={() => demoteUser(member.id)}
                                onRemove={() => removeUser(member.id)}
                            />
                        ))}
                    </div>
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