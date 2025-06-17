import React, { useState } from 'react';
import { Plus, Search, Gauge, User, Settings, AlertTriangle } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';

const NosilManagement: React.FC = () => {
  const [nosils] = useState([
    {
      id: 1,
      name: 'Nosil 1',
      fuelType: 'Petrol',
      currentReading: 12890,
      lastReading: 12680,
      assignedEmployee: 'John Smith',
      status: 'Active',
      dailySales: 31250,
      location: 'Bay A',
      lastMaintenance: '2024-01-10'
    },
    {
      id: 2,
      name: 'Nosil 2',
      fuelType: 'Diesel',
      currentReading: 9150,
      lastReading: 8920,
      assignedEmployee: 'Sarah Wilson',
      status: 'Active',
      dailySales: 28750,
      location: 'Bay B',
      lastMaintenance: '2024-01-08'
    },
    {
      id: 3,
      name: 'Nosil 3',
      fuelType: 'CNG',
      currentReading: 5420,
      lastReading: 5380,
      assignedEmployee: 'Mike Johnson',
      status: 'Maintenance',
      dailySales: 12000,
      location: 'Bay C',
      lastMaintenance: '2024-01-05'
    },
    {
      id: 4,
      name: 'Nosil 4',
      fuelType: 'Petrol',
      currentReading: 8750,
      lastReading: 8650,
      assignedEmployee: null,
      status: 'Available',
      dailySales: 15000,
      location: 'Bay D',
      lastMaintenance: '2024-01-12'
    }
  ]);

  const [employees] = useState([
    { id: 1, name: 'John Smith', position: 'Fuel Attendant', status: 'Active' },
    { id: 2, name: 'Sarah Wilson', position: 'Shift Supervisor', status: 'Active' },
    { id: 3, name: 'Mike Johnson', position: 'Fuel Attendant', status: 'Active' },
    { id: 4, name: 'Emma Davis', position: 'Fuel Attendant', status: 'Available' },
    { id: 5, name: 'Tom Brown', position: 'Fuel Attendant', status: 'Available' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isReadingModalOpen, setIsReadingModalOpen] = useState(false);
  const [selectedNosil, setSelectedNosil] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'Available':
        return 'bg-blue-100 text-blue-800';
      case 'Out of Service':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const filteredNosils = nosils.filter(nosil =>
    nosil.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nosil.fuelType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (nosil.assignedEmployee && nosil.assignedEmployee.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalSales = nosils.reduce((sum, nosil) => sum + nosil.dailySales, 0);
  const activeNosils = nosils.filter(n => n.status === 'Active').length;
  const availableEmployees = employees.filter(e => e.status === 'Available').length;

  const openAssignModal = (nosil: any) => {
    setSelectedNosil(nosil);
    setIsAssignModalOpen(true);
  };

  const openReadingModal = (nosil: any) => {
    setSelectedNosil(nosil);
    setIsReadingModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Nosil Management</h1>
          <p className="text-gray-600">Manage fuel dispensing units and employee assignments</p>
        </div>
        <div className="mt-4 lg:mt-0 flex space-x-2">
          <Button onClick={() => setIsAssignModalOpen(true)}>
            <User className="w-4 h-4 mr-2" />
            Assign Employee
          </Button>
          <Button variant="secondary" onClick={() => setIsReadingModalOpen(true)}>
            <Gauge className="w-4 h-4 mr-2" />
            Update Reading
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Nosils</p>
              <p className="text-2xl font-bold text-gray-900">{nosils.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Gauge className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Nosils</p>
              <p className="text-2xl font-bold text-green-600">{activeNosils}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Daily Sales</p>
              <p className="text-2xl font-bold text-purple-600">₹{totalSales.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Gauge className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Staff</p>
              <p className="text-2xl font-bold text-orange-600">{availableEmployees}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <User className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search nosils..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full lg:w-64"
            />
          </div>
          <div className="mt-4 lg:mt-0 flex space-x-2">
            <Button variant="secondary" size="sm">
              Export
            </Button>
            <Button variant="secondary" size="sm">
              Maintenance Log
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredNosils.map((nosil) => (
            <div key={nosil.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Gauge className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{nosil.name}</h3>
                    <p className="text-sm text-gray-500">{nosil.location}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getFuelTypeColor(nosil.fuelType)}`}>
                    {nosil.fuelType}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(nosil.status)}`}>
                    {nosil.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Current Reading:</span>
                    <div className="font-medium text-gray-900">{nosil.currentReading.toLocaleString()}L</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Daily Sales:</span>
                    <div className="font-medium text-green-600">₹{nosil.dailySales.toLocaleString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Last Reading:</span>
                    <div className="font-medium text-gray-900">{nosil.lastReading.toLocaleString()}L</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Dispensed:</span>
                    <div className="font-medium text-blue-600">{(nosil.currentReading - nosil.lastReading).toLocaleString()}L</div>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-gray-600">Assigned Employee:</span>
                  <div className="font-medium text-gray-900">
                    {nosil.assignedEmployee || (
                      <span className="text-yellow-600 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Not Assigned
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-gray-600">Last Maintenance:</span>
                  <div className="font-medium text-gray-900">{nosil.lastMaintenance}</div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => openAssignModal(nosil)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Assign
                </button>
                <button
                  onClick={() => openReadingModal(nosil)}
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Update Reading
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Assign Employee Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title="Assign Employee to Nosil"
        size="lg"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Nosil
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={selectedNosil?.name || ''}
              >
                <option value="">Select Nosil</option>
                {nosils.map(nosil => (
                  <option key={nosil.id} value={nosil.name}>
                    {nosil.name} - {nosil.fuelType} ({nosil.location})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Employee
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Employee</option>
                {employees.filter(emp => emp.status === 'Available' || emp.status === 'Active').map(employee => (
                  <option key={employee.id} value={employee.name}>
                    {employee.name} - {employee.position} ({employee.status})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shift Start Time
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shift End Time
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assignment Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any assignment notes"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsAssignModalOpen(false)}>
              Cancel
            </Button>
            <Button>Assign Employee</Button>
          </div>
        </form>
      </Modal>

      {/* Update Reading Modal */}
      <Modal
        isOpen={isReadingModalOpen}
        onClose={() => setIsReadingModalOpen(false)}
        title="Update Nosil Reading"
        size="lg"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Nosil
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={selectedNosil?.name || ''}
              >
                <option value="">Select Nosil</option>
                {nosils.map(nosil => (
                  <option key={nosil.id} value={nosil.name}>
                    {nosil.name} - {nosil.fuelType}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Reading
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                value={selectedNosil ? `${selectedNosil.currentReading.toLocaleString()}L` : ''}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Reading (Liters)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter new reading"
                min={selectedNosil?.currentReading || 0}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reading Date & Time
              </label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={new Date().toISOString().slice(0, 16)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reading Type
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="shift_end">Shift End Reading</option>
              <option value="shift_start">Shift Start Reading</option>
              <option value="maintenance">Maintenance Reading</option>
              <option value="calibration">Calibration Reading</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any notes about this reading"
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Reading Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Previous Reading:</span>
                <div className="font-medium">{selectedNosil ? selectedNosil.currentReading.toLocaleString() : '0'}L</div>
              </div>
              <div>
                <span className="text-blue-700">Fuel Dispensed:</span>
                <div className="font-medium">Will be calculated</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsReadingModalOpen(false)}>
              Cancel
            </Button>
            <Button>Update Reading</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NosilManagement;