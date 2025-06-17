import React, { useState } from 'react';
import { Download, Calendar, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('sales');

  const salesData = [
    { name: 'Jan', sales: 45000, fuel: 35000, profit: 10000 },
    { name: 'Feb', sales: 52000, fuel: 40000, profit: 12000 },
    { name: 'Mar', sales: 48000, fuel: 38000, profit: 10000 },
    { name: 'Apr', sales: 61000, fuel: 47000, profit: 14000 },
    { name: 'May', sales: 55000, fuel: 42000, profit: 13000 },
    { name: 'Jun', sales: 67000, fuel: 51000, profit: 16000 },
  ];

  const fuelConsumptionData = [
    { name: 'Petrol', value: 45, color: '#3B82F6' },
    { name: 'Diesel', value: 35, color: '#10B981' },
    { name: 'CNG', value: 15, color: '#F59E0B' },
    { name: 'Electric', value: 5, color: '#8B5CF6' },
  ];

  const vehicleUsageData = [
    { name: 'Mon', usage: 85 },
    { name: 'Tue', usage: 92 },
    { name: 'Wed', usage: 78 },
    { name: 'Thu', usage: 88 },
    { name: 'Fri', usage: 95 },
    { name: 'Sat', usage: 70 },
    { name: 'Sun', usage: 65 },
  ];

  const topCustomers = [
    { name: 'ABC Corporation', amount: 125000, transactions: 45 },
    { name: 'XYZ Industries', amount: 98000, transactions: 38 },
    { name: 'Quick Transport', amount: 87000, transactions: 42 },
    { name: 'Metro Logistics', amount: 76000, transactions: 35 },
    { name: 'Energy Solutions', amount: 65000, transactions: 28 },
  ];

  const reportTypes = [
    { id: 'sales', name: 'Sales Report', icon: TrendingUp },
    { id: 'fuel', name: 'Fuel Consumption', icon: BarChart3 },
    { id: 'vehicles', name: 'Vehicle Usage', icon: PieChart },
    { id: 'customers', name: 'Customer Analysis', icon: BarChart3 },
  ];

  const periods = [
    { id: 'daily', name: 'Daily' },
    { id: 'weekly', name: 'Weekly' },
    { id: 'monthly', name: 'Monthly' },
    { id: 'yearly', name: 'Yearly' },
  ];

  const exportReport = (format: string) => {
    console.log(`Exporting ${selectedReport} report as ${format}`);
    // Placeholder for export functionality
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate comprehensive reports and analyze business performance</p>
        </div>
        <div className="mt-4 lg:mt-0 flex space-x-2">
          <Button variant="secondary" onClick={() => exportReport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="secondary" onClick={() => exportReport('csv')}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Report Controls */}
      <Card>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-wrap gap-2">
            {reportTypes.map((report) => (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  selectedReport === report.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <report.icon className="w-4 h-4" />
                <span>{report.name}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {periods.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>
      </Card>

      {/* Report Content */}
      {selectedReport === 'sales' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} name="Sales" />
                <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                <Bar dataKey="sales" fill="#3B82F6" name="Sales" />
                <Bar dataKey="fuel" fill="#10B981" name="Fuel Cost" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {selectedReport === 'fuel' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fuel Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={fuelConsumptionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {fuelConsumptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fuel Consumption Summary</h3>
            <div className="space-y-4">
              {fuelConsumptionData.map((fuel, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: fuel.color }}></div>
                    <span className="font-medium text-gray-900">{fuel.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{fuel.value}%</div>
                    <div className="text-sm text-gray-500">{(fuel.value * 1000).toLocaleString()}L</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {selectedReport === 'vehicles' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Vehicle Usage</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vehicleUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Usage']} />
                <Bar dataKey="usage" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Performance Metrics</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <div className="text-sm text-blue-600">Active Vehicles</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">89%</div>
                  <div className="text-sm text-green-600">Avg. Utilization</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">12</div>
                  <div className="text-sm text-yellow-600">In Maintenance</div>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <div className="text-sm text-red-600">Out of Service</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {selectedReport === 'customers' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Customers by Revenue</h3>
            <div className="space-y-3">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.transactions} transactions</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">₹{customer.amount.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Analytics</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-sm text-blue-600">Total Customers</div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">₹45,890</div>
                  <div className="text-sm text-green-600">Avg. Monthly Revenue</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">18</div>
                  <div className="text-sm text-purple-600">Active This Month</div>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">92%</div>
                  <div className="text-sm text-yellow-600">Customer Retention</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">₹3,45,890</div>
            <div className="text-sm text-gray-600">Total Revenue</div>
            <div className="text-xs text-green-600 mt-1">+12.5% from last month</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">1,245</div>
            <div className="text-sm text-gray-600">Total Transactions</div>
            <div className="text-xs text-green-600 mt-1">+8.3% from last month</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">45,890L</div>
            <div className="text-sm text-gray-600">Fuel Dispensed</div>
            <div className="text-xs text-green-600 mt-1">+15.2% from last month</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">89%</div>
            <div className="text-sm text-gray-600">Efficiency Rate</div>
            <div className="text-xs text-green-600 mt-1">+2.1% from last month</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;