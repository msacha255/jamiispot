

import React from 'react';
import { XIcon } from '../constants';
import type { MarketplaceListing } from '../types';

interface MarketplaceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: { name: string; icon: string } | null;
  listings: { [key: string]: MarketplaceListing[] };
  onListingSelect: (listing: MarketplaceListing) => void;
}

const ListingCard: React.FC<{ listing: MarketplaceListing; onClick: () => void }> = ({ listing, onClick }) => (
    <div onClick={onClick} className="bg-light-gray dark:bg-zinc-700/50 p-4 rounded-lg flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
        <img src={listing.seller.avatarUrl} alt={listing.seller.name} className="w-16 h-16 rounded-lg object-cover"/>
        <div className="flex-1">
            <h4 className="font-bold">{listing.title}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">by {listing.seller.name}</p>
        </div>
        <div className="text-right">
            <p className="font-bold text-primary text-lg">{listing.price}</p>
            <button className="text-sm font-semibold text-accent hover:underline mt-1">View Details</button>
        </div>
    </div>
);

export const MarketplaceDetailModal: React.FC<MarketplaceDetailModalProps> = ({ isOpen, onClose, category, listings, onListingSelect }) => {
    if (!isOpen || !category) return null;

    const listingsForCategory = listings[category.name] || [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col animate-modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <h2 className="text-xl font-bold">{category.name}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    {listingsForCategory.length > 0 ? (
                        listingsForCategory.map(listing => <ListingCard key={listing.id} listing={listing} onClick={() => onListingSelect(listing)} />)
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            <p className="font-semibold text-lg">No listings found</p>
                            <p className="mt-1">There are currently no listings in the "{category.name}" category.</p>
                        </div>
                    )}
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