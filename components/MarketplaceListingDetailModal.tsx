

import React from 'react';
import type { MarketplaceListing, User } from '../types';
import { XIcon, MessageIcon } from '../constants';

interface MarketplaceListingDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    listing: MarketplaceListing | null;
    onContactSeller: (user: User) => void;
}

export const MarketplaceListingDetailModal: React.FC<MarketplaceListingDetailModalProps> = ({ isOpen, onClose, listing, onContactSeller }) => {
    if (!isOpen || !listing) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all animate-modal-content" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-zinc-700">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-deep-gray dark:text-white">Listing Details</h2>
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                            <XIcon className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-light-gray dark:bg-zinc-700/50 rounded-lg">
                        <img src={listing.seller.avatarUrl} alt={listing.seller.name} className="w-16 h-16 rounded-full"/>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Seller</p>
                            <p className="font-bold text-lg">{listing.seller.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">@{listing.seller.username}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold font-display">{listing.title}</h3>
                        <div className="flex items-baseline gap-4 mt-2">
                            <p className="text-2xl font-bold text-primary">{listing.price}</p>
                            <span className="text-sm font-semibold px-2 py-1 bg-accent/10 text-accent rounded-full">{listing.category}</span>
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-lg border-b border-gray-200 dark:border-zinc-700 pb-2 mb-2">Description</h4>
                        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{listing.description}</p>
                    </div>
                </div>

                 <div className="flex justify-between items-center p-4 border-t border-gray-200 dark:border-zinc-700">
                    <button 
                        onClick={onClose} 
                        className="bg-gray-200 dark:bg-zinc-700 text-deep-gray dark:text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors">
                        Close
                    </button>
                    <button 
                        onClick={() => onContactSeller(listing.seller)}
                        className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm flex items-center gap-2">
                        <MessageIcon className="w-5 h-5"/>
                        Contact Seller
                    </button>
                </div>
            </div>
        </div>
    );
};