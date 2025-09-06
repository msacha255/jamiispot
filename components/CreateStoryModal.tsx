import React, { useState, useRef, useEffect } from 'react';
import { XIcon, ImageIcon } from '../constants';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateStory: (imageUrl: string) => void;
}

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ isOpen, onClose, onCreateStory }) => {
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setImage(null);
            if(fileInputRef.current) fileInputRef.current.value = '';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
        };
        reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        if (image) {
            onCreateStory(image);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">Create Story</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    {image ? (
                        <div className="relative group">
                            <img src={image} alt="Story preview" className="w-full rounded-lg max-h-[60vh] object-contain" />
                             <button 
                                onClick={() => { setImage(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                                className="absolute top-2 right-2 p-1.5 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-white transition" 
                                aria-label="Remove image"
                            >
                                <XIcon className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 cursor-pointer hover:border-primary hover:text-primary transition-colors"
                        >
                            <ImageIcon className="w-12 h-12 mb-2"/>
                            <p className="font-semibold">Click to upload an image</p>
                            <p className="text-sm">PNG, JPG, GIF up to 10MB</p>
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </div>
                    )}
                </div>

                 <div className="flex justify-end p-4 border-t border-gray-200 dark:border-zinc-700">
                    <button 
                        onClick={handleSubmit} 
                        disabled={!image}
                        className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm disabled:bg-primary/50 disabled:cursor-not-allowed">
                        Post Story
                    </button>
                </div>
            </div>
        </div>
    );
};
