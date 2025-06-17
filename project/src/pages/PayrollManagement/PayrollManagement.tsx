import React, { useState } from 'react';
import { Plus, Search, Clock, DollarSign, Calendar, FileText, Download } from 'lucide-react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';

const PayrollManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('shifts');
  
  const [shifts] = useState([
    {
      id: 1,
      employee: 'John Smith',
      date: '2024-01-15',
      startTime: '08:00',
      endTime: '16:00',
      nosil: 'Nosil 1',
      startReading: 12450,
      endReading: 12680,
      totalSales: 34500,
      status: 'Completed'
    },
    {
      id: 2,
      employee: 'Sarah Wilson',
      date: '2024-01-15',
      startTime: '16:00',
      endTime: '00:00',
      nosil: 'Nosil 2',
      startReading: 8920,
      endReading: 9150,
      totalSales: 28750,
      status: 'Completed'
    },
    {
      id: 3,
      employee: 'Mike Johnson',
      date: '2024-01-16',
      startTime: '08:00',
      endTime: '16:00',
      nosil: 'Nosil 1',
      startReading: 12680,
      endReading: 12890,
      totalSales: 31250,
      status: 'Active'
    }
  ]);

  const [employees] = useState([
    {
      id: 1,
      name: 'John Smith',
      position: 'Fuel Attendant',
      baseSalary: 25000,
      allowances: 5000,
      deductions: 2000,
      netSalary: 28000,
      hoursWorked: 160,
      overtime: 8,
      joinDate: '2019-03-15'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      position: 'Shift Supervisor',
      baseSalary: 35000,
      allowances: 7000,
      deductions: 3000,
      netSalary: 39000,
      hoursWorked: 168,
      overtime: 12,
      joinDate: '2018-07-20'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      position: 'Fuel Attendant',
      baseSalary: 22000,
      allowances: 4000,
      deductions: 1500,
      netSalary: 24500,
      hoursWorked: 152,
      overtime: 4,
      joinDate: '2020-01-10'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false);
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Active':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredShifts = shifts.filter(shift =>
    shift.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shift.nosil.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSalaryExpense = employees.reduce((sum, emp) => sum + emp.netSalary, 0);
  const totalHoursWorked = employees.reduce((sum, emp) => sum + emp.hoursWorked, 0);
  const totalOvertime = employees.reduce((sum, emp) => sum + emp.overtime, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payroll & Shift Management</h1>
          <p className="text-gray-600">Manage employee shifts and salary calculations</p>
        </div>
        <div className="mt-4 lg:mt-0 flex space-x-2">
          <Button onClick={() => setIsShiftModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Start Shift
          </Button>
          <Button variant="secondary" onClick={() => setIsSalaryModalOpen(true)}>
            <FileText className="w-4 h-4 mr-2" />
            Generate Payslip
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-100">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Salary</p>
              <p className="text-2xl font-bold text-green-600">₹{totalSalaryExpense.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-green-100">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Hours Worked</p>
              <p className="text-2xl font-bold text-purple-600">{totalHoursWorked}</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-100">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overtime Hours</p>
              <p className="text-2xl font-bold text-orange-600">{totalOvertime}</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-100">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('shifts')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'shifts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Clock className="w-4 h-4 inline-block mr-2" />
            Shift Management ({shifts.length})
          </button>
          <button
            onClick={() => setActiveTab('payroll')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'payroll'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <DollarSign className="w-4 h-4 inline-block mr-2" />
            Payroll ({employees.length})
          </button>
        </nav>
      </div>

      <Card>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full lg:w-64"
            />
          </div>
          <div className="mt-4 lg:mt-0 flex space-x-2">
            <Button variant="secondary" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {activeTab === 'shifts' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nosil
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Readings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShifts.map((shift) => (
                  <tr key={shift.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {shift.employee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{shift.date}</div>
                      <div className="text-sm text-gray-500">{shift.startTime} - {shift.endTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {shift.nosil}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Start: {shift.startReading}</div>
                      <div className="text-sm text-gray-500">End: {shift.endReading}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{shift.totalSales.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(shift.status)}`}>
                        {shift.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Base Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Allowances
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deductions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hours/OT
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.position}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{employee.baseSalary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      +₹{employee.allowances.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      -₹{employee.deductions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{employee.netSalary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.hoursWorked}h</div>
                      <div className="text-sm text-gray-500">OT: {employee.overtime}h</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => setSelectedEmployee(employee)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Payslip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Start Shift Modal */}
      <Modal
        isOpen={isShiftModalOpen}
        onClose={() => setIsShiftModalOpen(false)}
        title="Start New Shift"
        size="lg"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.name}>{emp.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nosil Assignment
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Nosil 1">Nosil 1</option>
                <option value="Nosil 2">Nosil 2</option>
                <option value="Nosil 3">Nosil 3</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="time"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Reading
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter meter reading"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Add any shift notes"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsShiftModalOpen(false)}>
              Cancel
            </Button>
            <Button>Start Shift</Button>
          </div>
        </form>
      </Modal>

      {/* Generate Payslip Modal */}
      <Modal
        isOpen={isSalaryModalOpen}
        onClose={() => setIsSalaryModalOpen(false)}
        title="Generate Payslip"
        size="lg"
      >
        <form className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.name}>{emp.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month/Year
              </label>
              <input
                type="month"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={new Date().toISOString().slice(0, 7)}
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Salary Breakdown</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Base Salary:</span>
                <div className="font-medium">₹25,000</div>
              </div>
              <div>
                <span className="text-gray-600">Allowances:</span>
                <div className="font-medium text-green-600">+₹5,000</div>
              </div>
              <div>
                <span className="text-gray-600">Overtime:</span>
                <div className="font-medium text-green-600">+₹2,000</div>
              </div>
              <div>
                <span className="text-gray-600">Deductions:</span>
                <div className="font-medium text-red-600">-₹2,000</div>
              </div>
              <div className="col-span-2 border-t pt-2 mt-2">
                <span className="text-gray-600">Net Salary:</span>
                <div className="font-bold text-lg">₹30,000</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={() => setIsSalaryModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="secondary">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button>Generate Payslip</Button>
          </div>
        </form>
      </Modal>

      {/* Employee Payslip Modal */}
      <Modal
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        title="Employee Payslip"
        size="lg"
      >
        {selectedEmployee && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedEmployee.name}</h3>
                  <p className="text-gray-600">{selectedEmployee.position}</p>
                  <p className="text-sm text-gray-500">Employee ID: EMP{selectedEmployee.id.toString().padStart(3, '0')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Pay Period</p>
                  <p className="font-medium">January 2024</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Earnings</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Salary</span>
                    <span>₹{selectedEmployee.baseSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Allowances</span>
                    <span className="text-green-600">₹{selectedEmployee.allowances.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overtime ({selectedEmployee.overtime}h)</span>
                    <span className="text-green-600">₹{(selectedEmployee.overtime * 200).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Gross Earnings</span>
                    <span>₹{(selectedEmployee.baseSalary + selectedEmployee.allowances + (selectedEmployee.overtime * 200)).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Deductions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">PF Contribution</span>
                    <span className="text-red-600">₹{Math.round(selectedEmployee.baseSalary * 0.12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ESI</span>
                    <span className="text-red-600">₹{Math.round(selectedEmployee.baseSalary * 0.0075).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax Deduction</span>
                    <span className="text-red-600">₹{(selectedEmployee.deductions - Math.round(selectedEmployee.baseSalary * 0.12) - Math.round(selectedEmployee.baseSalary * 0.0075)).toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total Deductions</span>
                    <span className="text-red-600">₹{selectedEmployee.deductions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">Net Salary</span>
                <span className="text-2xl font-bold text-green-600">₹{selectedEmployee.netSalary.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span>Hours Worked: </span>
                <span className="font-medium">{selectedEmployee.hoursWorked}h</span>
              </div>
              <div>
                <span>Join Date: </span>
                <span className="font-medium">{selectedEmployee.joinDate}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="secondary" onClick={() => setSelectedEmployee(null)}>
                Close
              </Button>
              <Button>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PayrollManagement;