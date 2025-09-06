

import React from 'react';
import { XIcon, FileTextIcon } from '../constants';

interface TermsAndPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export const TermsAndPolicyModal: React.FC<TermsAndPolicyModalProps> = ({ isOpen, onClose, onAccept }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col transform transition-all animate-modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <div className="flex items-center gap-3">
                        <FileTextIcon className="w-6 h-6 text-primary"/>
                        <h2 className="text-xl font-bold">Terms & Privacy Policy</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    <h3 className="text-lg font-semibold">Terms of Service</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Welcome to JamiiSpot! By using our app, you agree to these terms. Please read them carefully. You must follow any policies made available to you within the Services. Don't misuse our Services. For example, don’t interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        We may suspend or stop providing our Services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct. Using our Services does not give you ownership of any intellectual property rights in our Services or the content you access.
                    </p>
                    
                     <h3 className="text-lg font-semibold mt-6">Privacy Policy</h3>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                        Our Privacy Policy explains how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that JamiiSpot can use such data in accordance with our privacy policies. We collect information to provide better services to all our users — from figuring out basic stuff like which language you speak, to more complex things like which ads you’ll find most useful, the people who matter most to you online, or which videos you might like.
                    </p>
                </div>

                 <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-zinc-700">
                     <button 
                        onClick={onClose} 
                        className="bg-gray-200 dark:bg-zinc-700 text-deep-gray dark:text-white font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors">
                        Decline
                    </button>
                    <button 
                        onClick={onAccept} 
                        className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                        Accept & Continue
                    </button>
                </div>
            </div>
        </div>
    );
};