import React, { useState } from 'react';
import { XIcon, MailIcon, CheckCircleIcon } from '../constants';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [step, setStep] = useState('form'); // form, success

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Password reset requested for:', email);
        setStep('success');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">{step === 'form' ? 'Reset Password' : 'Email Sent'}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                {step === 'form' ? (
                    <form onSubmit={handleSubmit}>
                        <div className="p-6">
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Enter the email address associated with your account, and we’ll send you a link to reset your password.
                            </p>
                            <div>
                                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <MailIcon className="w-5 h-5 text-gray-400" />
                                    </span>
                                    <input 
                                        type="email"
                                        id="reset-email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="block w-full pl-10 pr-3 py-2 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end p-4 border-t border-gray-200 dark:border-zinc-700">
                            <button 
                                type="submit"
                                className="bg-primary text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-sm">
                                Send Reset Link
                            </button>
                        </div>
                    </form>
                ) : (
                     <div className="p-6 text-center">
                        <div className="mx-auto bg-green-100 dark:bg-green-500/20 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                            <CheckCircleIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                            A password reset link has been sent to <strong>{email}</strong>. Please check your inbox.
                        </p>
                         <button onClick={onClose} className="mt-4 text-primary font-semibold hover:underline">
                           Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
