

import React, { useState, useEffect } from 'react';
import { XIcon, StoreIcon } from '../constants';
import type { MarketplaceListing } from '../types';
import { MARKETPLACE_CATEGORIES } from '../constants';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateListing: (listingData: Omit<MarketplaceListing, 'id' | 'seller'>) => void;
}

export const CreateListingModal: React.FC<CreateListingModalProps> = ({ isOpen, onClose, onCreateListing }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(MARKETPLACE_CATEGORIES[0].name);

    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setDescription('');
            setPrice('');
            setCategory(MARKETPLACE_CATEGORIES[0].name);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && description.trim() && price.trim() && category) {
            onCreateListing({ title, description, price, category });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all animate-modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <div className="flex items-center gap-3">
                        <StoreIcon className="w-6 h-6 text-primary" />
                        <h2 className="text-xl font-bold">Create New Listing</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
                        <div>
                            <label htmlFor="listing-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                            <input type="text" id="listing-title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="listing-category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                            <select id="listing-category" value={category} onChange={e => setCategory(e.target.value)} required className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none">
                                {MARKETPLACE_CATEGORIES.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="listing-price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
                            <input type="text" id="listing-price" value={price} onChange={e => setPrice(e.target.value)} required placeholder="e.g. $50 or $25/hr" className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                        </div>
                        <div>
                            <label htmlFor="listing-desc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                            <textarea id="listing-desc" value={description} onChange={e => setDescription(e.target.value)} rows={4} required className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                        </div>
                    </div>
                    <div className="flex justify-end p-4 border-t border-gray-200 dark:border-zinc-700">
                        <button type="submit" className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">Create Listing</button>
                    </div>
                </form>
            </div>
        </div>
    );
};