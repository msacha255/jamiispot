import React, { useState, useEffect } from 'react';
import { XIcon, SearchIcon, CheckCircleIcon } from '../constants';
import type { Language } from '../types';
import { SUPPORTED_LANGUAGES } from '../constants';

interface LanguageChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageChangeModal: React.FC<LanguageChangeModalProps> = ({ isOpen, onClose, currentLanguage, onLanguageChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

    useEffect(() => {
        if (isOpen) {
            setSelectedLanguage(currentLanguage);
            setSearchTerm('');
        }
    }, [isOpen, currentLanguage]);

    if (!isOpen) return null;
    
    const filteredLanguages = SUPPORTED_LANGUAGES.filter(lang => 
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const handleSave = () => {
        onLanguageChange(selectedLanguage);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-md h-[80vh] flex flex-col transform transition-all animate-modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">Select Language</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-4">
                     <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search languages..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4">
                    {filteredLanguages.map(lang => (
                        <div 
                            key={lang.code}
                            onClick={() => setSelectedLanguage(lang)}
                            className="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700"
                        >
                            <div>
                                <p className="font-semibold">{lang.name}</p>
                                <p className="text-sm text-gray-500">{lang.nativeName}</p>
                            </div>
                            {selectedLanguage.code === lang.code && (
                                <CheckCircleIcon className="w-6 h-6 text-primary"/>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end p-4 border-t border-gray-200 dark:border-zinc-700">
                    <button 
                        onClick={handleSave} 
                        className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};