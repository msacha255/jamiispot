
import React, { useState, useEffect } from 'react';
import { XIcon, BellIcon } from '../constants';

interface ToastNotificationProps {
    message: string | null;
    onDismiss: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message, onDismiss }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                // Allow time for fade-out animation before dismissing
                setTimeout(onDismiss, 300);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message, onDismiss]);

    const handleDismiss = () => {
        setIsVisible(false);
        setTimeout(onDismiss, 300);
    };

    return (
        <div 
            className={`fixed top-5 right-5 z-[100] transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-[calc(100%+20px)]'}`}
        >
            {message && (
                <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-700 flex items-start gap-4 p-4 w-80">
                    <div className="text-primary mt-1">
                        <BellIcon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <p className="font-semibold text-deep-gray dark:text-white">New Notification</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{message}</p>
                    </div>
                    <button onClick={handleDismiss} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700">
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};
