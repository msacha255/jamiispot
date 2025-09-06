import React, { useState, useEffect } from 'react';
// FIX: Import `MOCK_USERS` from constants to be used in the mock login handler.
import { JamiiSpotFullLogo, ChevronLeftIcon, MailIcon, UserIcon, LockIcon, CheckCircleIcon, CakeIcon, MOCK_USERS } from '../constants';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { TermsAndPolicyModal } from './TermsAndPolicyModal';
import type { User } from '../types';

interface AuthScreenProps {
  onAuthSuccess: (user: User) => void;
}

const ProgressBar: React.FC<{step: number, total: number}> = ({ step, total }) => (
    <div className="flex w-full h-1.5 bg-gray-200 dark:bg-zinc-600 rounded-full mb-6">
        <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${(step / total) * 100}%` }}></div>
    </div>
);

const AuthContainer: React.FC<{ children: React.ReactNode, title: string, onBack?: () => void, progress?: {step: number, total: number} }> = ({ children, title, onBack, progress }) => (
    <div className="min-h-screen bg-light-gray dark:bg-zinc-900 flex flex-col justify-center items-center p-4">
        <div className="max-w-sm w-full">
            <div className="text-center mb-8">
                <JamiiSpotFullLogo className="w-40 mx-auto" />
            </div>
            <div className="bg-white dark:bg-zinc-800 p-6 sm:p-8 rounded-xl shadow-lg">
                {progress && <ProgressBar step={progress.step} total={progress.total} />}
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
    const [step, setStep] = useState('welcome'); 
    const [signupStep, setSignupStep] = useState(1);
    const [formData, setFormData] = useState<Partial<User>>({});
    const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([]);
    const [isForgotModalOpen, setForgotModalOpen] = useState(false);
    const [isTermsModalOpen, setTermsModalOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTermsModalOpen(true);
    };

    const handleAcceptTerms = () => {
        setTermsModalOpen(false);
        const newUser: User = {
            id: `u${Date.now()}`,
            name: `${formData.name}`,
            username: formData.username!,
            avatarUrl: `https://picsum.photos/seed/newUser/100/100`,
            badges: [],
            profileCompleteness: 50,
            ...formData,
        };
        onAuthSuccess(newUser);
    };
    
    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAuthSuccess(MOCK_USERS[0]);
    };
    
    useEffect(() => {
        if (signupStep === 2 && formData.name) {
            const base = formData.name.toLowerCase().replace(/\s+/g, '');
            setUsernameSuggestions([
                `${base}123`,
                `${base}_spot`,
                `the_${base}`
            ]);
        }
    }, [signupStep, formData.name]);

    const renderStep = () => {
        switch (step) {
            case 'login':
                return (
                    <AuthContainer title="Welcome Back" onBack={() => setStep('welcome')}>
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="login-email">Username or Email</label>
                                <IconInput 
                                    type="text" 
                                    id="login-email" 
                                    required
                                    icon={<UserIcon className="w-5 h-5 text-gray-400" />} 
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
                                Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setStep('signup'); setSignupStep(1); }} className="font-semibold text-primary hover:underline">Sign Up</a>
                            </p>
                        </form>
                    </AuthContainer>
                );
            case 'signup':
                switch(signupStep) {
                    case 1:
                        return (
                             <AuthContainer title="Create an account" onBack={() => setStep('welcome')} progress={{step:1, total:3}}>
                                <form onSubmit={(e) => { e.preventDefault(); setSignupStep(2); }} className="space-y-4">
                                     <IconInput type="text" name="name" placeholder="Full Name" value={formData.name || ''} onChange={handleInputChange} required icon={<UserIcon className="w-5 h-5 text-gray-400" />} />
                                     <IconInput type="email" name="email" placeholder="Email Address" value={formData.email || ''} onChange={handleInputChange} required icon={<MailIcon className="w-5 h-5 text-gray-400" />} />
                                     <IconInput type="password" name="password" placeholder="Password (8+ characters)" value={formData.password || ''} onChange={handleInputChange} required minLength={8} icon={<LockIcon className="w-5 h-5 text-gray-400" />} />
                                     <IconInput type="date" name="birthday" value={formData.birthday || ''} onChange={handleInputChange} required icon={<CakeIcon className="w-5 h-5 text-gray-400" />} />
                                     <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300 shadow-md !mt-6">Next</button>
                                     <p className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
                                        Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setStep('login'); }} className="font-semibold text-primary hover:underline">Log In</a>
                                    </p>
                                </form>
                            </AuthContainer>
                        );
                    case 2:
                         return (
                             <AuthContainer title="Choose a username" onBack={() => setSignupStep(1)} progress={{step:2, total:3}}>
                                <form onSubmit={(e) => { e.preventDefault(); handleSignupSubmit(e); }} className="space-y-4">
                                     <IconInput type="text" name="username" placeholder="Username" value={formData.username || ''} onChange={handleInputChange} required icon={<UserIcon className="w-5 h-5 text-gray-400" />} />
                                     <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Suggestions:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {usernameSuggestions.map(s => (
                                                <button key={s} type="button" onClick={() => setFormData(p => ({...p, username: s}))} className="bg-gray-200 dark:bg-zinc-700 text-sm px-3 py-1 rounded-full hover:bg-gray-300">{s}</button>
                                            ))}
                                        </div>
                                     </div>
                                     <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300 shadow-md !mt-6">Sign Up</button>
                                </form>
                            </AuthContainer>
                        );
                }
            default:
              return (
                 <AuthContainer title="Join JamiiSpot">
                    <div className="space-y-4">
                        <button onClick={() => { setStep('signup'); setSignupStep(1); }} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-600 transition duration-300 shadow-md">
                            Sign Up
                        </button>
                         <button onClick={() => setStep('login')} className="w-full bg-gray-200 dark:bg-zinc-700 text-deep-gray dark:text-white font-bold py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-600 transition duration-300">
                           Log In
                        </button>
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
            <TermsAndPolicyModal
                isOpen={isTermsModalOpen}
                onClose={() => setTermsModalOpen(false)}
                onAccept={handleAcceptTerms}
            />
        </>
    );
};