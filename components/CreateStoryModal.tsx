import React, { useState, useRef, useEffect } from 'react';
import { XIcon, ImageIcon, VideoIcon, TypeIcon } from '../constants';
import type { Story } from '../types';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateStory: (storyData: Partial<Story>) => void;
}

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ isOpen, onClose, onCreateStory }) => {
    const [activeTab, setActiveTab] = useState<'media' | 'text'>('media');
    const [media, setMedia] = useState<{url: string, type: 'image' | 'video'} | null>(null);
    const [text, setText] = useState('');
    const [bgColor, setBgColor] = useState('bg-gradient-to-tr from-purple-500 to-pink-500');
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const backgroundColors = [
        'bg-gradient-to-tr from-purple-500 to-pink-500',
        'bg-gradient-to-tr from-blue-500 to-teal-400',
        'bg-gradient-to-tr from-orange-500 to-yellow-400',
        'bg-gradient-to-tr from-green-500 to-lime-400',
        'bg-gradient-to-tr from-red-500 to-rose-400',
    ];

    useEffect(() => {
        if (isOpen) {
            setMedia(null);
            setText('');
            setBgColor(backgroundColors[0]);
            if(fileInputRef.current) fileInputRef.current.value = '';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setMedia({url: reader.result as string, type: file.type.startsWith('video') ? 'video' : 'image' });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (activeTab === 'media' && media) {
            const storyData: Partial<Story> = {
                type: media.type,
                imageUrl: media.type === 'image' ? media.url : undefined,
                videoUrl: media.type === 'video' ? media.url : undefined,
            };
            onCreateStory(storyData);
            onClose();
        } else if (activeTab === 'text' && text.trim()) {
            const storyData: Partial<Story> = {
                type: 'text',
                text,
                backgroundColor: bgColor,
            };
            onCreateStory(storyData);
            onClose();
        }
    };
    
    const isSubmitDisabled = (activeTab === 'media' && !media) || (activeTab === 'text' && !text.trim());

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-zinc-800 rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex transform transition-all" onClick={e => e.stopPropagation()}>
                {/* Sidebar */}
                <div className="w-80 bg-zinc-900 p-6 flex flex-col rounded-l-xl">
                    <h2 className="text-2xl font-bold text-white mb-6">Create Story</h2>
                    <div className="space-y-2">
                        <button onClick={() => setActiveTab('media')} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${activeTab === 'media' ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'}`}>
                            <ImageIcon className="w-6 h-6 text-white"/>
                            <span className="font-semibold text-white">Photo/Video Story</span>
                        </button>
                        <button onClick={() => setActiveTab('text')} className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${activeTab === 'text' ? 'bg-zinc-700' : 'hover:bg-zinc-700/50'}`}>
                            <TypeIcon className="w-6 h-6 text-white"/>
                            <span className="font-semibold text-white">Text Story</span>
                        </button>
                    </div>
                    
                    {activeTab === 'text' && (
                        <div className="mt-auto">
                            <p className="text-sm text-gray-400 mb-2">Background</p>
                            <div className="flex gap-2">
                                {backgroundColors.map(bg => (
                                    <button key={bg} onClick={() => setBgColor(bg)} className={`w-8 h-8 rounded-full ${bg} ${bgColor === bg ? 'ring-2 ring-white' : ''}`}></button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <div className="mt-8 flex gap-2">
                        <button onClick={onClose} className="flex-1 bg-zinc-700 text-white font-semibold py-2 rounded-lg hover:bg-zinc-600">Cancel</button>
                        <button onClick={handleSubmit} disabled={isSubmitDisabled} className="flex-1 bg-primary text-white font-semibold py-2 rounded-lg hover:bg-orange-600 disabled:bg-primary/50 disabled:cursor-not-allowed">Post</button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 flex items-center justify-center">
                    <div className="w-[320px] aspect-[9/16] rounded-lg shadow-lg overflow-hidden">
                        {activeTab === 'media' && (
                            <>
                                {media ? (
                                     <div className="w-full h-full relative group bg-black">
                                        {media.type === 'image' ? (
                                            <img src={media.url} alt="Story preview" className="w-full h-full object-contain" />
                                        ) : (
                                            <video src={media.url} controls className="w-full h-full" />
                                        )}
                                        <button 
                                            onClick={() => { setMedia(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                                            className="absolute top-2 right-2 p-1.5 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75"
                                        >
                                            <XIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                ) : (
                                     <div onClick={() => fileInputRef.current?.click()} className="w-full h-full bg-zinc-700/50 flex flex-col items-center justify-center text-center text-gray-300 cursor-pointer hover:bg-zinc-700 transition">
                                        <ImageIcon className="w-12 h-12 mb-2"/>
                                        <p className="font-semibold">Add Photo/Video</p>
                                        <input ref={fileInputRef} type="file" accept="image/*,video/*" className="hidden" onChange={handleFileUpload} />
                                    </div>
                                )}
                            </>
                        )}
                        {activeTab === 'text' && (
                            <div className={`w-full h-full flex items-center justify-center p-4 ${bgColor}`}>
                                <textarea 
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Start typing"
                                    className="w-full bg-transparent text-white text-3xl font-bold text-center focus:outline-none resize-none"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
