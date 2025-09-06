
import React, { useState } from 'react';
// FIX: Import User type and MOCK_USER for authentication callback.
import { JamiiSpotFullLogo, ChevronLeftIcon, MailIcon, UserIcon, LockIcon, CheckCircleIcon, MOCK_USER } from '../constants';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import type { User } from '../types';

interface AuthScreenProps {
  // FIX: Changed prop from `onLogin` to `onAuthSuccess` to match parent component and handle user data.
  onAuthSuccess: (user: User) => void;
}

const SocialButton: React.FC<{ children: React.ReactNode; provider: string }> = ({ children, provider }) => (
    <button className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 dark:border-zinc-600 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors">
        {children}
        <span className="font-semibold text-gray-700 dark:text-gray-300">{provider}</span>
    </button>
);

const AuthContainer: React.FC<{ children: React.ReactNode, title: string, onBack?: () => void }> = ({ children, title, onBack }) => (
    <div className="min-h-screen bg-light-gray dark:bg-zinc-900 flex flex-col justify-center items-center p-4">
        <div className="max-w-sm w-full">
            <div className="text-center mb-8">
                <JamiiSpotFullLogo className="w-40 mx-auto" />
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 sm:p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                    {onBack && <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700 mr-2"><ChevronLeftIcon className="w-6 h-6"/></button>}
                    <h1 className="text-2xl font-bold font-display text-deep-gray dark:text-white">{title}</h1>
                </div>
                {children}
            </div>
        </div>
    </div>
);

const IconInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }> = ({ icon, ...props }) => (
    <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {icon}
        </span>
        <input 
            {...props}
            className="block w-full pl-10 pr-3 py-2 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 rounded-lg shadow-sm focus:outline-none focus:ring-primary focus:border-primary" 
        />
    </div>
);


export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
    const [step, setStep] = useState('welcome'); // welcome, login, signup, success
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [isForgotModalOpen, setForgotModalOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Signing up with:", formData);
        setStep('success');
    };
    
    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // FIX: Pass a mock user object to satisfy the `onAuthSuccess` prop's signature.
        onAuthSuccess(MOCK_USER);
    };

    const renderStep = () => {
        switch (step) {
            case 'login':
                return (
                    <AuthContainer title="Welcome Back" onBack={() => setStep('welcome')}>
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="login-email">Email Address</label>
                                <IconInput 
                                    type="email" 
                                    id="login-email" 
                                    required
                                    icon={<MailIcon className="w-5 h-5 text-gray-400" />} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="login-password">Password</label>
                                 <IconInput 
                                    type="password" 
                                    id="login-password" 
                                    required
                                    icon={<LockIcon className="w-5 h-5 text-gray-400" />} 
                                />
                                <a href="#" onClick={(e) => { e.preventDefault(); setForgotModalOpen(true); }} className="text-sm text-primary hover:underline mt-2 block text-right">Forgot Password?</a>
                            </div>
                            <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300 shadow-md">
                               Log In
                            </button>
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
                                Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setStep('signup'); }} className="font-semibold text-primary hover:underline">Sign Up</a>
                            </p>
                        </form>
                    </AuthContainer>
                );
            case 'signup':
                return (
                     <AuthContainer title="Create an account" onBack={() => setStep('welcome')}>
                        <form onSubmit={handleSignupSubmit} className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="firstName">First Name</label>
                                    <IconInput type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} required icon={<UserIcon className="w-5 h-5 text-gray-400" />} />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="lastName">Last Name</label>
                                     <IconInput type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} required icon={<UserIcon className="w-5 h-5 text-gray-400" />} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">Email Address</label>
                                <IconInput type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required icon={<MailIcon className="w-5 h-5 text-gray-400" />} />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">Password</label>
                                <IconInput type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} required minLength={8} icon={<LockIcon className="w-5 h-5 text-gray-400" />} />
                                <p className="text-xs text-gray-500 mt-2">Password must be at least 8 characters long.</p>
                            </div>
                             <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300 shadow-md !mt-6">Sign Up</button>
                             <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
                                Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setStep('login'); }} className="font-semibold text-primary hover:underline">Log In</a>
                            </p>
                        </form>
                    </AuthContainer>
                );
            case 'success':
                return (
                     <AuthContainer title="Account Created!">
                        <div className="text-center">
                            <div className="mx-auto bg-green-100 dark:bg-green-500/20 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                                <CheckCircleIcon className="w-10 h-10 text-green-600 dark:text-green-400" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">Your account has been successfully created. Welcome to JamiiSpot!</p>
                            {/* FIX: Call onAuthSuccess with a mock user object. */}
                            <button onClick={() => onAuthSuccess(MOCK_USER)} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300 shadow-md">
                               Get Started
                            </button>
                        </div>
                    </AuthContainer>
                )
            default:
              return (
                 <AuthContainer title="Join JamiiSpot">
                    <div className="space-y-4">
                        <button onClick={() => setStep('signup')} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300 shadow-md">
                            Sign Up
                        </button>
                         <button onClick={() => setStep('login')} className="w-full bg-gray-200 dark:bg-zinc-700 text-deep-gray dark:text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition duration-300">
                           Log In
                        </button>

                         <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-zinc-600" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-zinc-800 text-gray-500 dark:text-gray-400">OR</span>
                            </div>
                        </div>

                         <div className="flex gap-4">
                            <SocialButton provider="Google">
                                <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 9.122C34.553 5.166 29.694 3 24 3C10.745 3 0 13.745 0 27s10.745 24 24 24s24-10.745 24-24c0-1.341-.128-2.64-.356-3.917z"></path><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.841-5.841C34.553 5.166 29.694 3 24 3C16.318 3 9.656 6.915 6.306 14.691z"></path><path fill="#4CAF50" d="M24 48c5.694 0 10.553-1.855 14.502-4.998l-5.841-5.841C30.013 39.087 27.202 40 24 40c-5.223 0-9.651-3.657-11.127-8.492l-6.571 4.819C9.656 41.085 16.318 45 24 45z"></path><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.447-2.274 4.481-4.249 5.998l5.841 5.841C42.183 36.52 44 32.066 44 27c0-1.341-.128-2.64-.356-3.917z"></path></svg>
                            </SocialButton>
                            <SocialButton provider="Facebook">
                                <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#1877F2" d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.494v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.324V1.324C24 .593 23.407 0 22.676 0z"></path></svg>
                            </SocialButton>
                        </div>
                    </div>
                 </AuthContainer>
              );
        }
    };

    return (
        <>
            {renderStep()}
            <ForgotPasswordModal 
                isOpen={isForgotModalOpen}
                onClose={() => setForgotModalOpen(false)}
            />
        </>
    );
};
