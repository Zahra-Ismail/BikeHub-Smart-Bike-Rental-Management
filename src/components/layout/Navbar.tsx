import { Link } from 'react-router-dom';
import { Menu, Bell, User, Search } from 'lucide-react';
import { APP_NAME, ROUTES } from '../../config/constants';

interface NavbarProps {
    onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sticky top-0 z-30">
            <div className="flex items-center gap-3 w-full max-w-xl">
                <button
                    onClick={onMenuClick}
                    className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
                    aria-label="Toggle menu"
                >
                    <Menu className="w-6 h-6 text-gray-600" />
                </button>
                <Link to={ROUTES.LANDING} className="flex items-center gap-2 mr-4 shrink-0">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">E</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 hidden sm:block">
                        {APP_NAME}
                    </span>
                </Link>

                {/* Search Bar - Google Workspace Style */}
                <div className="hidden md:flex flex-1 items-center bg-gray-100/50 hover:bg-white focus-within:bg-white focus-within:shadow-md transition-all rounded-lg px-4 h-11 border border-transparent focus-within:border-gray-200">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <input
                        type="text"
                        placeholder="Search bikes, stations..."
                        className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-500"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-full relative">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 mx-1"></div>

                <div className="flex items-center gap-3 pl-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                        <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="hidden md:block text-sm">
                        <p className="font-medium text-gray-700">John Doe</p>
                        <p className="text-xs text-gray-500">Student</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
