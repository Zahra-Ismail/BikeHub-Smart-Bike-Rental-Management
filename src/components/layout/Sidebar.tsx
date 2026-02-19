import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bike, Calendar, History, Receipt, Shield, Settings, LogOut, X, Users } from 'lucide-react';
import { ROUTES } from '../../config/constants';
import clsx from 'clsx';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.USER_DASHBOARD },
        { icon: Bike, label: 'Browse Bikes', path: ROUTES.BROWSE_BIKES },
        { icon: Calendar, label: 'My Bookings', path: '/bookings' }, // Placeholder route
        { icon: History, label: 'History', path: '/history' },      // Placeholder route
        { icon: Receipt, label: 'Receipts', path: '/receipts' },    // Placeholder route
    ];

    const wardenItems = [
        { icon: LayoutDashboard, label: 'Warden Dashboard', path: ROUTES.WARDEN_DASHBOARD },
        { icon: Calendar, label: 'Booking Requests', path: ROUTES.WARDEN_REQUESTS },
        { icon: Shield, label: 'Process Checkout', path: ROUTES.WARDEN_CHECKOUT },
        { icon: Shield, label: 'Process Return', path: ROUTES.WARDEN_RETURN },
    ];

    const adminItems = [
        { icon: Shield, label: 'Admin Dashboard', path: ROUTES.ADMIN_DASHBOARD },
        { icon: Users, label: 'Users', path: ROUTES.ADMIN_USERS },
        { icon: Calendar, label: 'Bookings', path: ROUTES.ADMIN_BOOKINGS },
        { icon: Settings, label: 'Reports', path: ROUTES.ADMIN_REPORTS },
    ];

    const NavItem = ({ item }: { item: typeof menuItems[0] }) => {
        const isActive = location.pathname === item.path;
        return (
            <Link
                to={item.path}
                onClick={onClose} // Close sidebar on mobile when item clicked
                className={clsx(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                    isActive
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )}
            >
                <item.icon className={clsx('w-5 h-5', isActive ? 'text-blue-600' : 'text-gray-500')} />
                <span>{item.label}</span>
            </Link>
        );
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={clsx(
                    'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:transform-none flex flex-col',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="p-4 flex items-center justify-between lg:hidden border-b border-gray-100">
                    <span className="font-bold text-gray-900">Menu</span>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                    <div className="space-y-1">
                        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Menu
                        </p>
                        {menuItems.map((item) => (
                            <NavItem key={item.path} item={item} />
                        ))}
                    </div>

                    <div className="space-y-1">
                        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Admin
                        </p>
                        {adminItems.map((item) => (
                            <NavItem key={item.path} item={item} />
                        ))}
                    </div>

                    <div className="space-y-1">
                        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            Warden
                        </p>
                        {wardenItems.map((item) => (
                            <NavItem key={item.path} item={item} />
                        ))}
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
