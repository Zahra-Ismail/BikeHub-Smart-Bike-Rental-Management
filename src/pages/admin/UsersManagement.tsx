import { useState } from 'react';
import { Search, MoreVertical, Shield, ShieldOff } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';

const UsersManagement = () => {
    const [users, setUsers] = useState([
        { id: '2024001', name: 'John Doe', email: 'john@uni.edu', role: 'student', status: 'active' },
        { id: '2024002', name: 'Jane Smith', email: 'jane@uni.edu', role: 'warden', status: 'active' },
        { id: '2024003', name: 'Mike Ross', email: 'mike@uni.edu', role: 'student', status: 'disabled' },
    ]);

    const toggleStatus = (id: string) => {
        setUsers(prev => prev.map(user => {
            if (user.id === id) {
                return { ...user, status: user.status === 'active' ? 'disabled' : 'active' };
            }
            return user;
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                <Button>Add New User</Button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex justify-between gap-4">
                    <div className="w-full md:w-96">
                        <Input
                            placeholder="Search users..."
                            leftIcon={<Search className="w-4 h-4" />}
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="rounded-lg border-gray-300 text-sm focus:ring-emerald-500 focus:border-emerald-500">
                            <option>All Roles</option>
                            <option>Student</option>
                            <option>Warden</option>
                            <option>Admin</option>
                        </select>
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">User Info</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Badge label={user.role} variant="info" className="capitalize" />
                                </td>
                                <td className="px-6 py-4">
                                    <Badge
                                        label={user.status}
                                        variant={user.status === 'active' ? 'success' : 'danger'}
                                        className="capitalize"
                                    />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => toggleStatus(user.id)}
                                        className="p-2 text-gray-400 hover:text-gray-600"
                                        title={user.status === 'active' ? "Disable User" : "Enable User"}
                                    >
                                        {user.status === 'active' ? <ShieldOff className="w-4 h-4 text-red-500" /> : <Shield className="w-4 h-4 text-emerald-500" />}
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-gray-600">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;
