import { Link } from 'react-router-dom';
import { ChevronRight, Bike, Shield, Clock } from 'lucide-react';
import { ROUTES, APP_NAME } from '../../config/constants';
import Button from '../../components/common/Button';

const Landing = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">B</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">{APP_NAME}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to={ROUTES.LOGIN}>
                            <Button variant="ghost" size="sm">Login</Button>
                        </Link>
                        <Link to={ROUTES.REGISTER}>
                            <Button size="sm">Get Started</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative overflow-hidden pt-16 pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                            Ride Around Campus with <span className="text-blue-600">Ease</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            The smartest way to get around university. Book electric bikes instantly,
                            track your rides, and enjoy eco-friendly transportation.
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <Link to={ROUTES.REGISTER}>
                                <Button size="lg" rightIcon={<ChevronRight className="w-5 h-5" />}>
                                    Start Riding Now
                                </Button>
                            </Link>
                            <Link to={ROUTES.BROWSE_BIKES}>
                                <Button variant="outline" size="lg">
                                    View Bikes
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Background Decorative Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 animate-pulse delay-1000"></div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                                <Bike className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Premium E-Bikes</h3>
                            <p className="text-gray-600">
                                Modern fleet of electric bikes, regularly maintained and charged for your campus commute.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600">
                                <Clock className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Booking</h3>
                            <p className="text-gray-600">
                                Check availability in real-time and reserve your bike specifically for your schedule.
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-green-600">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Safe</h3>
                            <p className="text-gray-600">
                                Verified university members only. 24/7 support and secure docking stations across campus.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to start your journey?</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Join thousands of students and faculty members who are already using {APP_NAME}.
                    </p>
                    <Link to={ROUTES.REGISTER}>
                        <Button size="lg" variant="primary">Create Free Account</Button>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">B</span>
                        </div>
                        <span className="text-xl font-bold">{APP_NAME}</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Campus Bike Reservation System. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
