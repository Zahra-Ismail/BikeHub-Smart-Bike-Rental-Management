import { useState } from 'react';
import { User, Mail, Phone, Lock, Save } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@university.edu',
        studentId: '2024001',
        phone: '+1 (555) 123-4567',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API update
        setTimeout(() => {
            setIsLoading(false);
            alert('Profile updated successfully!');
        }, 1000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Sidebar / Avatar */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 text-3xl font-bold">
                            {formData.firstName[0]}{formData.lastName[0]}
                        </div>
                        <h2 className="font-bold text-gray-900">{formData.firstName} {formData.lastName}</h2>
                        <p className="text-sm text-gray-500">{formData.email}</p>
                        <div className="mt-4 px-3 py-1 bg-gray-100 rounded-full inline-block text-xs font-mono font-medium text-gray-600">
                            Student ID: {formData.studentId}
                        </div>
                    </div>
                </div>

                {/* Main Form */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Personal Information
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            <Input
                                label="Email Address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                leftIcon={<Mail className="w-5 h-5" />}
                                disabled // Email usually handled separately
                            />

                            <Input
                                label="Phone Number"
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                leftIcon={<Phone className="w-5 h-5" />}
                            />

                            <div className="pt-6 border-t border-gray-100 flex justify-end">
                                <Button type="submit" isLoading={isLoading} leftIcon={<Save className="w-4 h-4" />}>
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
                        <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Lock className="w-5 h-5" />
                            Security
                        </h3>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-gray-900">Password</p>
                                <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                            </div>
                            <Button variant="outline" size="sm">Change Password</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
