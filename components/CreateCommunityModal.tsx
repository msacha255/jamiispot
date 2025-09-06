


import React, { useState, useRef, useEffect } from 'react';
import { XIcon, ImageIcon, GlobeIcon, LockIcon } from '../constants';
import { COMMUNITY_CATEGORIES } from '../constants';
import type { Community } from '../types';

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  // FIX: Update `onCreate` prop type to omit `events`, aligning it with the parent component's handler.
  onCreate: (communityData: Omit<Community, 'id' | 'memberCount' | 'members' | 'posts' | 'isMember' | 'admins' | 'events'>) => void;
}

export const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(COMMUNITY_CATEGORIES[0]);
    const [privacy, setPrivacy] = useState<'public' | 'private'>('public');
    const [coverImage, setCoverImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setName('');
            setDescription('');
            setCategory(COMMUNITY_CATEGORIES[0]);
            setPrivacy('public');
            setCoverImage(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => setCoverImage(reader.result as string);
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    
    const handleSubmit = () => {
        if (name.trim() && description.trim() && coverImage) {
            onCreate({
                name,
                description,
                category,
                privacy,
                coverUrl: coverImage
            });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-2xl transform transition-all animate-modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">Create a Community</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal"><XIcon className="w-6 h-6" /></button>
                </div>
                
                <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cover Image</label>
                         <div onClick={() => fileInputRef.current?.click()} className="w-full h-40 border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg flex items-center justify-center text-center text-gray-500 dark:text-gray-400 cursor-pointer hover:border-primary hover:text-primary transition-colors bg-cover bg-center" style={{backgroundImage: `url(${coverImage})`}}>
                            {!coverImage && (
                                <div className="text-center">
                                    <ImageIcon className="w-10 h-10 mx-auto mb-1"/>
                                    <p className="font-semibold">Click to upload</p>
                                </div>
                            )}
                        </div>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </div>
                    
                     <div>
                        <label htmlFor="comm-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Community Name</label>
                        <input type="text" id="comm-name" value={name} onChange={e => setName(e.target.value)} className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                     <div>
                        <label htmlFor="comm-desc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                        <textarea id="comm-desc" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                    </div>
                    <div>
                        <label htmlFor="comm-cat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                        <select id="comm-cat" value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none">
                            {COMMUNITY_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                     <div>
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Privacy</h3>
                        <div className="flex gap-4">
                            <div onClick={() => setPrivacy('public')} className={`flex-1 flex items-center p-3 border dark:border-zinc-700 rounded-lg cursor-pointer transition-colors ${privacy === 'public' ? 'border-primary bg-primary/5' : 'border-gray-300'}`}>
                                <GlobeIcon className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-300"/>
                                <div>
                                    <p className="font-semibold">Public</p>
                                    <p className="text-xs text-gray-500">Anyone can join and see posts.</p>
                                </div>
                            </div>
                             <div onClick={() => setPrivacy('private')} className={`flex-1 flex items-center p-3 border dark:border-zinc-700 rounded-lg cursor-pointer transition-colors ${privacy === 'private' ? 'border-primary bg-primary/5' : 'border-gray-300'}`}>
                                <LockIcon className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-300"/>
                                <div>
                                    <p className="font-semibold">Private</p>
                                    <p className="text-xs text-gray-500">Members must be approved to join.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end p-4 border-t border-gray-200 dark:border-zinc-700">
                    <button onClick={handleSubmit} disabled={!name.trim() || !description.trim() || !coverImage} className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm disabled:bg-primary/50 disabled:cursor-not-allowed">
                        Create Community
                    </button>
                </div>
            </div>
        </div>
    );
};