import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import UserManagement from './pages/UserManagement/UserManagement';
import FuelTransactions from './pages/FuelTransactions/FuelTransactions';
import VehicleManagement from './pages/VehicleManagement/VehicleManagement';
import FinancialManagement from './pages/FinancialManagement/FinancialManagement';
import CustomerDirectory from './pages/CustomerDirectory/CustomerDirectory';
import Reports from './pages/Reports/Reports';
import Inventory from './pages/Inventory/Inventory';
import Notifications from './pages/Notifications/Notifications';
import ExpenseTracking from './pages/ExpenseTracking/ExpenseTracking';
import PayrollManagement from './pages/PayrollManagement/PayrollManagement';
import NosilManagement from './pages/NosilManagement/NosilManagement';
import Settings from './pages/Settings/Settings';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="fuel-transactions" element={<FuelTransactions />} />
            <Route path="vehicles" element={<VehicleManagement />} />
            <Route path="financial" element={<FinancialManagement />} />
            <Route path="customers" element={<CustomerDirectory />} />
            <Route path="reports" element={<Reports />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="expenses" element={<ExpenseTracking />} />
            <Route path="payroll" element={<PayrollManagement />} />
            <Route path="nosils" element={<NosilManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;