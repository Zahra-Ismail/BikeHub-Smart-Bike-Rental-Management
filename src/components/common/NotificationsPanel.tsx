import { Bell, Info, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

interface Notification {
    id: string;
    type: 'info' | 'warning' | 'success';
    message: string;
    time: string;
}

const NotificationsPanel = () => {
    const notifications: Notification[] = [
        {
            id: '1',
            type: 'warning',
            message: 'Reminder: Return "Thunderbolt X1" by 14:00 to avoid penalties.',
            time: '10 mins ago',
        },
        {
            id: '2',
            type: 'success',
            message: 'Your booking for "City Cruiser" was approved.',
            time: '2 hours ago',
        },
    ];

    const icons = {
        info: Info,
        warning: AlertTriangle,
        success: Bell, // Placeholder
    };

    const colors = {
        info: 'bg-blue-50 text-blue-700',
        warning: 'bg-amber-50 text-amber-700',
        success: 'bg-emerald-50 text-emerald-700',
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Recent Notifications</h3>
                <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    View All
                </button>
            </div>

            <div className="space-y-4">
                {notifications.map((notification) => {
                    const Icon = icons[notification.type];
                    return (
                        <div key={notification.id} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className={clsx('p-2 rounded-lg h-fit', colors[notification.type])}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-900">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NotificationsPanel;
