import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from '../config/constants';
import Landing from '../pages/public/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Unauthorized from '../pages/public/Unauthorized';
import UserDashboard from '../pages/user/Dashboard';
import BrowseBikes from '../pages/user/BrowseBikes';
import BikeDetails from '../pages/user/BikeDetails';
import ActiveBooking from '../pages/user/ActiveBooking';
import BookingConfirmation from '../pages/user/BookingConfirmation';
import BookingHistory from '../pages/user/BookingHistory';
import Receipt from '../pages/user/Receipts';
import Profile from '../pages/user/Profile';
import WardenDashboard from '../pages/warden/Dashboard';
import BookingRequests from '../pages/warden/BookingRequests';
import CheckOut from '../pages/warden/CheckOut';
import ReturnInspection from '../pages/warden/ReturnInspection';
import BikesManagement from '../pages/warden/BikesManagement';
import AdminDashboard from '../pages/admin/Dashboard';
import UsersManagement from '../pages/admin/UsersManagement';
import BookingOversight from '../pages/admin/BookingOversight';
import ReportsAnalytics from '../pages/admin/ReportsAnalytics';
import AppShell from '../components/layout/AppShell';
import AuthGuard from './guards/AuthGuard';

const router = createBrowserRouter([
    // Public Routes (No Layout)
    {
        path: ROUTES.LANDING,
        element: <Landing />,
    },
    {
        path: ROUTES.LOGIN,
        element: <Login />,
    },
    {
        path: ROUTES.REGISTER,
        element: <Register />,
    },
    {
        path: ROUTES.UNAUTHORIZED,
        element: <Unauthorized />,
    },

    // Protected Routes (With AppShell Layout)
    {
        element: <AppShell />,
        children: [
            {
                path: ROUTES.USER_DASHBOARD,
                element: (
                    <AuthGuard>
                        <UserDashboard />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.BROWSE_BIKES,
                element: (
                    <AuthGuard>
                        <BrowseBikes />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.ACTIVE_BOOKING,
                element: (
                    <AuthGuard>
                        <ActiveBooking />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.BIKE_DETAILS,
                element: (
                    <AuthGuard>
                        <BikeDetails />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.BOOKING_CONFIRMATION,
                element: (
                    <AuthGuard>
                        <BookingConfirmation />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.BOOKING_HISTORY,
                element: (
                    <AuthGuard>
                        <BookingHistory />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.RECEIPT,
                element: (
                    <AuthGuard>
                        <Receipt />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.PROFILE,
                element: (
                    <AuthGuard>
                        <Profile />
                    </AuthGuard>
                ),
            },
            // Warden Routes
            {
                path: ROUTES.WARDEN_DASHBOARD,
                element: (
                    <AuthGuard>
                        <WardenDashboard />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.WARDEN_REQUESTS,
                element: (
                    <AuthGuard>
                        <BookingRequests />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.WARDEN_CHECKOUT,
                element: (
                    <AuthGuard>
                        <CheckOut />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.WARDEN_RETURN,
                element: (
                    <AuthGuard>
                        <ReturnInspection />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.WARDEN_BIKES,
                element: (
                    <AuthGuard>
                        <BikesManagement />
                    </AuthGuard>
                ),
            },
            // Admin Routes
            {
                path: ROUTES.ADMIN_DASHBOARD,
                element: (
                    <AuthGuard>
                        <AdminDashboard />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.ADMIN_USERS,
                element: (
                    <AuthGuard>
                        <UsersManagement />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.ADMIN_BOOKINGS,
                element: (
                    <AuthGuard>
                        <BookingOversight />
                    </AuthGuard>
                ),
            },
            {
                path: ROUTES.ADMIN_REPORTS,
                element: (
                    <AuthGuard>
                        <ReportsAnalytics />
                    </AuthGuard>
                ),
            },
            // Add other protected routes here
        ],
    },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
