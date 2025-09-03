
import React from 'react';
import type { Notification } from '../types';

interface NotificationCenterProps {
    notifications: Notification[];
    onDismiss: (id: number) => void;
}

const notificationStyles = {
    info: 'bg-blue-500/80 border-blue-400',
    warning: 'bg-warning/80 border-yellow-500',
    danger: 'bg-danger/80 border-red-500',
};

const NotificationItem: React.FC<{ notification: Notification; onDismiss: (id: number) => void }> = ({ notification, onDismiss }) => {
    return (
        <div 
            className={`relative w-full max-w-sm p-4 text-white rounded-lg shadow-lg flex items-start space-x-3 backdrop-blur-sm border ${notificationStyles[notification.type]}`}
        >
            <div className="flex-1">
                <p className="font-semibold capitalize">{notification.type}</p>
                <p className="text-sm">{notification.message}</p>
            </div>
            <button onClick={() => onDismiss(notification.id)} className="text-xl font-light leading-none hover:text-gray-300">&times;</button>
        </div>
    );
};


const NotificationCenter: React.FC<NotificationCenterProps> = ({ notifications, onDismiss }) => {
    return (
        <div className="fixed bottom-4 right-4 z-50 space-y-3">
            {notifications.map(notification => (
                <NotificationItem 
                    key={notification.id}
                    notification={notification}
                    onDismiss={onDismiss}
                />
            ))}
        </div>
    );
};

export default NotificationCenter;
