import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../config/constants';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Lock, Mail, User } from 'lucide-react';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await register();
            navigate(ROUTES.USER_DASHBOARD);
        } catch (error) {
            console.error('Registration failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-600">Join the campus bike revolution</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="First Name"
                            placeholder="John"
                            leftIcon={<User className="w-5 h-5" />}
                            required
                        />
                        <Input
                            label="Last Name"
                            placeholder="Doe"
                            leftIcon={<User className="w-5 h-5" />}
                            required
                        />
                    </div>

                    <Input
                        label="Student ID"
                        placeholder="12345678"
                        required
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="student@university.edu"
                        leftIcon={<Mail className="w-5 h-5" />}
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        leftIcon={<Lock className="w-5 h-5" />}
                        required
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="••••••••"
                        leftIcon={<Lock className="w-5 h-5" />}
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={isLoading}
                        size="lg"
                    >
                        Create Account
                    </Button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to={ROUTES.LOGIN} className="font-semibold text-blue-600 hover:text-blue-500">
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
