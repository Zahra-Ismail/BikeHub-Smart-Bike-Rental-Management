import { APP_NAME } from '../../config/constants';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 py-6 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-gray-900">Privacy Policy</a>
                    <a href="#" className="hover:text-gray-900">Terms of Service</a>
                    <a href="#" className="hover:text-gray-900">Contact Support</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
