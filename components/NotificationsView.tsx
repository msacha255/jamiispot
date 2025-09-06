import React from 'react';
import type { Notification } from '../types';

interface NotificationsViewProps {
    notifications: Notification[];
}

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => (
    <div className={`flex items-start gap-4 p-4 border-b border-gray-200 dark:border-zinc-700 ${!notification.isRead ? 'bg-primary/5' : ''}`}>
        <img src={notification.user.avatarUrl} alt={notification.user.name} className="w-12 h-12 rounded-full" />
        <div className="flex-1 pt-1">
            <p className="text-gray-800 dark:text-gray-300">
                <strong>{notification.user.name}</strong> {notification.content}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.timestamp}</p>
        </div>
        {!notification.isRead && <div className="w-2.5 h-2.5 bg-primary rounded-full mt-2.5"></div>}
    </div>
);

export const NotificationsView: React.FC<NotificationsViewProps> = ({ notifications }) => {
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-display font-bold text-deep-gray dark:text-white mb-6">Notifications</h1>
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden">
                {notifications.length > 0 ? (
                    notifications.map(notification => (
                        <NotificationItem key={notification.id} notification={notification} />
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