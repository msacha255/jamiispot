import React from 'react';
import { XIcon, Trash2Icon } from '../constants';
import type { Notification } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewAll: () => void;
  notifications: Notification[];
  onDelete: (notificationId: string) => void;
}

const NotificationItem: React.FC<{ notification: Notification, onDelete: (notificationId: string) => void }> = ({ notification, onDelete }) => (
    <div className={`flex items-start gap-4 p-4 border-b border-gray-200 dark:border-zinc-700 ${!notification.isRead ? 'bg-primary/5' : ''}`}>
        <img src={notification.user.avatarUrl} alt={notification.user.name} className="w-12 h-12 rounded-full" />
        <div className="flex-1 pt-1">
            <p className="text-gray-800 dark:text-gray-300">
                <strong className="font-bold">{notification.user.name}</strong> {notification.content}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.timestamp}</p>
        </div>
        <div className="flex items-center gap-2 self-center">
            {!notification.isRead && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
            <button onClick={() => onDelete(notification.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-700">
                <Trash2Icon className="w-5 h-5" />
            </button>
        </div>
    </div>
);


export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose, onViewAll, notifications, onDelete }) => {
    if (!isOpen) return null;

    const recentNotifications = notifications.slice(0, 5);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose} aria-modal="true" role="dialog">
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-2xl w-full max-w-md transform transition-all animate-modal-content" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="text-xl font-bold">Notifications</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700" aria-label="Close modal">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                    {recentNotifications.length > 0 ? (
                        recentNotifications.map(notification => (
                            <NotificationItem key={notification.id} notification={notification} onDelete={onDelete} />
                        ))
                    ) : (
                        <p className="p-6 text-center text-gray-500 dark:text-gray-400">You have no new notifications.</p>
                    )}
                </div>

                <div className="p-2 border-t border-gray-200 dark:border-zinc-700 text-center">
                   <button onClick={onViewAll} className="text-sm font-semibold text-primary hover:underline">
                        View all notifications
                   </button>
                </div>
            </div>
        </div>
    );
};