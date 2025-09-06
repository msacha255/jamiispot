import React, { useState } from 'react';
import { XIcon, CheckBadgeIcon, CheckCircleIcon } from '../constants';

interface VerificationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationRequestModal: React.FC<VerificationRequestModalProps> = ({ isOpen, onClose }) => {
    const [reason, setReason] = useState('');
    const [step, setStep] = useState('form'); // form, success

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Verification request submitted:', reason);
        setStep('success');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-lg transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                     <div className="flex items-center gap-3">
                        <CheckBadgeIcon className="w-6 h-6 text-accent"/>
                        <h2 className="text-xl font-bold">{step === 'form' ? 'Request Verification' : 'Request Submitted'}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                {step === 'form' ? (
                    <form onSubmit={handleSubmit}>
                        <div className="p-6 space-y-4">
                           <p className="text-sm text-gray-600 dark:text-gray-400">
                               Verified accounts have blue checkmarks next to their names to show that JamiiSpot has confirmed they are the real presence of the public figures and entities they represent.
                            </p>
                             <div>
                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Why should you be verified?</label>
                                <textarea name="reason" id="reason" rows={4} required onChange={e => setReason(e.target.value)} placeholder="Tell us why your account should be verified..." className="w-full bg-light-gray dark:bg-zinc-700 border-none rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload ID</label>
                                <button type="button" className="w-full bg-light-gray dark:bg-zinc-700 border-2 border-dashed border-gray-300 dark:border-zinc-600 rounded-lg px-3 py-4 text-sm text-gray-500 dark:text-gray-400 hover:border-primary">
                                    Click to upload a government-issued photo ID
                                </button>
                             </div>
                        </div>
                        <div className="flex justify-end p-4 border-t border-gray-200 dark:border-zinc-700">
                            <button 
                                type="submit"
                                className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                                Submit Request
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="p-6 text-center">
                        <div className="mx-auto bg-green-100 dark:bg-green-500/20 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                            <CheckCircleIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                            Thank you for submitting your request. We'll review your information and get back to you soon.
                        </p>
                         <button onClick={onClose} className="mt-4 text-primary font-semibold hover:underline">
                           Done
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};