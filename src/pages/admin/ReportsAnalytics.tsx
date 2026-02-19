import { BarChart, PieChart, Activity, Download } from 'lucide-react';
import Button from '../../components/common/Button';

const ReportsAnalytics = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
                    <p className="text-gray-500">Deep dive into system performance and trends.</p>
                </div>
                <div className="flex gap-2">
                    <select className="rounded-lg border-gray-300 text-sm focus:ring-emerald-500 focus:border-emerald-500">
                        <option>Last 30 Days</option>
                        <option>This Quarter</option>
                        <option>This Year</option>
                    </select>
                    <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>Export Data</Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Reports Cards */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                            <BarChart className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900">Revenue Analysis</h3>
                    </div>
                    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                        <span className="text-gray-400 text-sm">Revenue Chart Placeholder</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                            <PieChart className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900">Bike Usage Distribution</h3>
                    </div>
                    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                        <span className="text-gray-400 text-sm">Pie Chart Placeholder</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                            <Activity className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-gray-900">Damage & Maintenance</h3>
                    </div>
                    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
                        <span className="text-gray-400 text-sm">Line Chart Placeholder</span>
                    </div>
                </div>
            </div>

            {/* Detailed Stats Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Top Performing Stations</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Station Name</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Total Rides</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Avg. Duration</th>
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Revenue Generated</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 font-medium text-gray-900">Library Station</td>
                            <td className="px-6 py-4 text-gray-600">843</td>
                            <td className="px-6 py-4 text-gray-600">45 mins</td>
                            <td className="px-6 py-4 font-bold text-emerald-600 text-right">$12,450</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-medium text-gray-900">Sports Complex</td>
                            <td className="px-6 py-4 text-gray-600">621</td>
                            <td className="px-6 py-4 text-gray-600">32 mins</td>
                            <td className="px-6 py-4 font-bold text-emerald-600 text-right">$9,210</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-medium text-gray-900">Main Gate</td>
                            <td className="px-6 py-4 text-gray-600">512</td>
                            <td className="px-6 py-4 text-gray-600">28 mins</td>
                            <td className="px-6 py-4 font-bold text-emerald-600 text-right">$7,800</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportsAnalytics;
