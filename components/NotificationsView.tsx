import React from 'react';
import type { Notification } from '../types';
import { Trash2Icon } from '../constants';

interface NotificationsViewProps {
    notifications: Notification[];
    onDelete: (notificationId: string) => void;
}

const NotificationItem: React.FC<{ notification: Notification, onDelete: (notificationId: string) => void }> = ({ notification, onDelete }) => (
    <div className={`flex items-start gap-4 p-4 border-b border-gray-200 dark:border-zinc-700 ${!notification.isRead ? 'bg-primary/5' : ''}`}>
        <img src={notification.user.avatarUrl} alt={notification.user.name} className="w-12 h-12 rounded-full" />
        <div className="flex-1 pt-1">
            <p className="text-gray-800 dark:text-gray-300">
                <strong>{notification.user.name}</strong> {notification.content}
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

export const NotificationsView: React.FC<NotificationsViewProps> = ({ notifications, onDelete }) => {
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-display font-bold text-deep-gray dark:text-white mb-6">Notifications</h1>
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden">
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <NotificationItem key={notification.id} notification={notification} onDelete={onDelete} />
                    ))
                ) : (
                     <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                        <p className="font-semibold">No new notifications</p>
                        <p className="mt-1 text-sm">You're all caught up!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
