import { useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Header from './components/Layout/Header';
import UserDashboard from './components/User/UserDashboard';
import WardenDashboard from './components/Warden/WardenDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !profile) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {profile.role === 'user' && <UserDashboard />}
      {profile.role === 'warden' && <WardenDashboard />}
      {profile.role === 'admin' && <AdminDashboard />}
    </div>
  );
}

export default App;
