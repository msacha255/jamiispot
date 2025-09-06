

import React from 'react';
import { MARKETPLACE_CATEGORIES, PlusIcon } from '../constants';

interface MarketplaceViewProps {
  onCategorySelect: (category: { name: string; icon: string }) => void;
  onOpenCreateListing: () => void;
}

const CategoryCard: React.FC<{ name: string; icon: string; onClick: () => void; }> = ({ name, icon, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-white dark:bg-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform cursor-pointer"
    >
        <div className="text-5xl mb-4">{icon}</div>
        <p className="font-bold text-lg text-deep-gray dark:text-white">{name}</p>
    </div>
);

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onCategorySelect, onOpenCreateListing }) => {
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-deep-gray dark:text-white mb-2">Marketplace</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">Discover services, products, and skills offered by the JamiiSpot community.</p>
                </div>
                <button onClick={onOpenCreateListing} className="bg-primary text-white font-semibold px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors shadow-sm self-start sm:self-auto">
                    <PlusIcon className="w-5 h-5"/>
                    <span>Create Listing</span>
                </button>
            </div>


            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {MARKETPLACE_CATEGORIES.map(cat => <CategoryCard key={cat.name} {...cat} onClick={() => onCategorySelect(cat)} />)}
            </div>
        </div>
    );
};