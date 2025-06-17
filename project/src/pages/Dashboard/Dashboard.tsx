import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Fuel, 
  Car, 
  DollarSign,
  AlertTriangle,
  Clock
} from 'lucide-react';
import Card from '../../components/UI/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const kpiData = [
    {
      title: 'Total Fuel Stock',
      value: '45,890L',
      change: '+12.5%',
      trend: 'up',
      icon: Fuel,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      title: 'Daily Revenue',
      value: '$12,480',
      change: '+8.2%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600 bg-green-100',
    },
    {
      title: 'Active Vehicles',
      value: '156',
      change: '-2.1%',
      trend: 'down',
      icon: Car,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      title: 'Total Users',
      value: '24',
      change: '+5.3%',
      trend: 'up',
      icon: Users,
      color: 'text-indigo-600 bg-indigo-100',
    },
  ];

  const salesData = [
    { name: 'Jan', sales: 4000, fuel: 2400 },
    { name: 'Feb', sales: 3000, fuel: 1398 },
    { name: 'Mar', sales: 2000, fuel: 9800 },
    { name: 'Apr', sales: 2780, fuel: 3908 },
    { name: 'May', sales: 1890, fuel: 4800 },
    { name: 'Jun', sales: 2390, fuel: 3800 },
  ];

  const fuelTypeData = [
    { name: 'Petrol', value: 45, color: '#3B82F6' },
    { name: 'Diesel', value: 35, color: '#10B981' },
    { name: 'CNG', value: 15, color: '#F59E0B' },
    { name: 'Electric', value: 5, color: '#8B5CF6' },
  ];

  const recentTransactions = [
    { id: 1, vehicle: 'TN-01-AB-1234', fuel: 'Petrol', amount: 50, cost: '$75.00', time: '10:30 AM' },
    { id: 2, vehicle: 'TN-02-CD-5678', fuel: 'Diesel', amount: 40, cost: '$60.00', time: '11:15 AM' },
    { id: 3, vehicle: 'TN-03-EF-9012', fuel: 'Petrol', amount: 35, cost: '$52.50', time: '12:00 PM' },
    { id: 4, vehicle: 'TN-04-GH-3456', fuel: 'CNG', amount: 25, cost: '$30.00', time: '12:45 PM' },
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'Tank 1 fuel level below 20%', time: '2 hours ago' },
    { id: 2, type: 'info', message: 'Scheduled maintenance due for Vehicle TN-01-AB-1234', time: '4 hours ago' },
    { id: 3, type: 'error', message: 'Payment overdue for Customer ABC Corp', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your fuel management system.</p>
        </div>
        <div className="mt-4 lg:mt-0 text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                <div className="flex items-center mt-2">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${kpi.color}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales & Fuel Consumption</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="fuel" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Fuel Type Distribution */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Fuel Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fuelTypeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {fuelTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Car className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.vehicle}</p>
                    <p className="text-sm text-gray-500">{transaction.fuel} • {transaction.amount}L</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{transaction.cost}</p>
                  <p className="text-sm text-gray-500">{transaction.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts */}
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`mt-1 p-1 rounded-full ${
                  alert.type === 'warning' ? 'bg-yellow-100' :
                  alert.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <AlertTriangle className={`w-4 h-4 ${
                    alert.type === 'warning' ? 'text-yellow-600' :
                    alert.type === 'error' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {alert.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;