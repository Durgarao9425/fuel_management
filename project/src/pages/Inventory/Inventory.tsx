import React, { useState } from 'react';
import { Plus, AlertTriangle, TrendingUp, TrendingDown, Edit } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';

const Inventory: React.FC = () => {
  const [tanks] = useState([
    {
      id: 1,
      name: 'Tank 1 - Petrol',
      fuelType: 'Petrol',
      capacity: 10000,
      currentLevel: 7500,
      minLevel: 2000,
      status: 'Normal',
      lastRefill: '2024-01-10',
      temperature: 25.5,
      location: 'Section A'
    },
    {
      id: 2,
      name: 'Tank 2 - Diesel',
      fuelType: 'Diesel',
      capacity: 15000,
      currentLevel: 1800,
      minLevel: 3000,
      status: 'Low',
      lastRefill: '2024-01-08',
      temperature: 24.2,
      location: 'Section B'
    },
    {
      id: 3,
      name: 'Tank 3 - CNG',
      fuelType: 'CNG',
      capacity: 5000,
      currentLevel: 4200,
      minLevel: 1000,
      status: 'Normal',
      lastRefill: '2024-01-12',
      temperature: 22.8,
      location: 'Section C'
    },
    {
      id: 4,
      name: 'Tank 4 - Petrol',
      fuelType: 'Petrol',
      capacity: 10000,
      currentLevel: 500,
      minLevel: 2000,
      status: 'Critical',
      lastRefill: '2024-01-05',
      temperature: 26.1,
      location: 'Section A'
    }
  ]);

  const [adjustments] = useState([
    {
      id: 1,
      tank: 'Tank 1 - Petrol',
      type: 'Addition',
      quantity: 2000,
      reason: 'Scheduled Refill',
      date: '2024-01-10',
      operator: 'John Doe'
    },
    {
      id: 2,
      tank: 'Tank 2 - Diesel',
      type: 'Deduction',
      quantity: 150,
      reason: 'Spillage Correction',
      date: '2024-01-09',
      operator: 'Sarah Wilson'
    },
    {
      id: 3,
      tank: 'Tank 3 - CNG',
      type: 'Addition',
      quantity: 1000,
      reason: 'Stock Replenishment',
      date: '2024-01-12',
      operator: 'Mike Johnson'
    }
  ]);

  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [selectedTank, setSelectedTank] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'Low':
        return 'bg-yellow-100 text-yellow-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Low':
      case 'Critical':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getFuelTypeColor = (fuelType: string) => {
    switch (fuelType) {
      case 'Petrol':
        return 'bg-blue-100 text-blue-800';
      case 'Diesel':
        return 'bg-green-100 text-green-800';
      case 'CNG':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculatePercentage = (current: number, capacity: number) => {
    return Math.round((current / capacity) * 100);
  };

  const totalCapacity = tanks.reduce((sum, tank) => sum + tank.capacity, 0);
  const totalCurrent = tanks.reduce((sum, tank) => sum + tank.currentLevel, 0);
  const lowStockTanks = tanks.filter(tank => tank.status === 'Low' || tank.status === 'Critical').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Overview</h1>
          <p className="text-gray-600">Monitor fuel tank levels and manage inventory adjustments</p>
        </div>
        <Button onClick={() => setIsAdjustmentModalOpen(true)} className="mt-4 lg:mt-0">
          <Plus className="w-4 h-4 mr-2" />
          Add Adjustment
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Capacity</p>
              <p className="text-2xl font-bold text-gray-900">{totalCapacity.toLocaleString()}L</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Stock</p>
              <p className="text-2xl font-bold text-gray-900">{totalCurrent.toLocaleString()}L</p>
              <p className="text-sm text-gray-500">{calculatePercentage(totalCurrent, totalCapacity)}% of capacity</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
              <p className="text-2xl font-bold text-red-600">{lowStockTanks}</p>
              <p className="text-sm text-gray-500">Tanks need attention</p>
            </div>
            <div className="p-3 rounded-lg bg-red-100">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tank Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tanks.map((tank) => (
          <Card key={tank.id} className="hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{tank.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getFuelTypeColor(tank.fuelType)}`}>
                    {tank.fuelType}
                  </span>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tank.status)}`}>
                    {getStatusIcon(tank.status)}
                    <span>{tank.status}</span>
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTank(tank)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Edit className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Fuel Level</span>
                  <span>{tank.currentLevel.toLocaleString()}L / {tank.capacity.toLocaleString()}L</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      tank.status === 'Critical' ? 'bg-red-500' :
                      tank.status === 'Low' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${calculatePercentage(tank.currentLevel, tank.capacity)}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-500 mt-1">
                  {calculatePercentage(tank.currentLevel, tank.capacity)}%
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Location:</span>
                  <div className="font-medium text-gray-900">{tank.location}</div>
                </div>
                <div>
                  <span className="text-gray-600">Temperature:</span>
                  <div className="font-medium text-gray-900">{tank.temperature}°C</div>
                </div>
                <div>
                  <span className="text-gray-600">Min Level:</span>
                  <div className="font-medium text-gray-900">{tank.minLevel.toLocaleString()}L</div>
                </div>
                <div>
                  <span className="text-gray-600">Last Refill:</span>
                  <div className="font-medium text-gray-900">{tank.lastRefill}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Adjustment History */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Adjustments</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Operator
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {adjustments.map((adjustment) => (
                <tr key={adjustment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {adjustment.tank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {adjustment.type === 'Addition' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        adjustment.type === 'Addition' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {adjustment.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {adjustment.quantity.toLocaleString()}L
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {adjustment.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {adjustment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {adjustment.operator}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Adjustment Modal */}
      <Modal
        isOpen={isAdjustmentModalOpen}
        onClose={() => setIsAdjustmentModalOpen(false)}
        title="Add Inventory Adjustment"
        size="lg"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tank
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Tank</option>
                {tanks.map(tank => (
                  <option key={tank.id} value={tank.name}>{tank.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adjustment Type
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Addition">Addition</option>
                <option value="Deduction">Deduction</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (Liters)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter quantity"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="Scheduled Refill">Scheduled Refill</option>
              <option value="Emergency Refill">Emergency Refill</option>
              <option value="Spillage Correction">Spillage Correction</option>
              <option value="Calibration Adjustment">Calibration Adjustment</option>
              <option value="Stock Replenishment">Stock Replenishment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any additional notes"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsAdjustmentModalOpen(false)}>
              Cancel
            </Button>
            <Button>Add Adjustment</Button>
          </div>
        </form>
      </Modal>

      {/* Tank Details Modal */}
      <Modal
        isOpen={!!selectedTank}
        onClose={() => setSelectedTank(null)}
        title="Tank Details"
        size="lg"
      >
        {selectedTank && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tank Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedTank.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedTank.fuelType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedTank.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Temperature</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedTank.temperature}°C</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Capacity</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedTank.capacity.toLocaleString()}L</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Level</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedTank.currentLevel.toLocaleString()}L</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Minimum Level</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedTank.minLevel.toLocaleString()}L</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Refill</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedTank.lastRefill}</p>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Status</label>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all duration-300 ${
                    selectedTank.status === 'Critical' ? 'bg-red-500' :
                    selectedTank.status === 'Low' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${calculatePercentage(selectedTank.currentLevel, selectedTank.capacity)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>0L</span>
                <span>{calculatePercentage(selectedTank.currentLevel, selectedTank.capacity)}%</span>
                <span>{selectedTank.capacity.toLocaleString()}L</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Inventory;