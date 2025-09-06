
import React from 'react';

const CategoryCard: React.FC<{ name: string; icon: string; }> = ({ name, icon }) => (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-transform cursor-pointer">
        <div className="text-5xl mb-4">{icon}</div>
        <p className="font-bold text-lg text-deep-gray dark:text-white">{name}</p>
    </div>
);

export const MarketplaceView: React.FC = () => {
    const categories = [
        { name: 'Digital Services', icon: '💻' },
        { name: 'Creative Arts', icon: '🎨' },
        { name: 'Tutoring & Education', icon: '📚' },
        { name: 'Handmade Goods', icon: '🧵' },
        { name: 'Local Experiences', icon: '🏞️' },
        { name: 'Home Services', icon: '🛠️' },
        { name: 'Wellness & Fitness', icon: '🧘' },
        { name: 'Consulting', icon: '📈' },
    ];
    return (
        <div>
            <h1 className="text-3xl font-display font-bold text-deep-gray dark:text-white mb-2">Marketplace</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Discover services, products, and skills offered by the JamiiSpot community.</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map(cat => <CategoryCard key={cat.name} {...cat} />)}
            </div>
        </div>
    );
};
