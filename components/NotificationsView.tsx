
import React from 'react';
import { MOCK_NOTIFICATIONS } from '../constants';

const NotificationItem: React.FC<{ notification: typeof MOCK_NOTIFICATIONS[0] }> = ({ notification }) => (
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

export const NotificationsView: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-display font-bold text-deep-gray dark:text-white mb-6">Notifications</h1>
            <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-sm overflow-hidden">
                {MOCK_NOTIFICATIONS.map(notification => (
                    <NotificationItem key={notification.id} notification={notification} />
                ))}
            </div>
        </div>
    );
};
