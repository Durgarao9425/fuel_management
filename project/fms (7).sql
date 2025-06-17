-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2025 at 06:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fms`
--

-- --------------------------------------------------------

--
-- Table structure for table `bank_details`
--

CREATE TABLE `bank_details` (
  `id` int(11) NOT NULL,
  `bank_name` varchar(255) NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `account_holder_name` varchar(255) NOT NULL,
  `branch` varchar(255) NOT NULL,
  `ifsc_code` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `customer_type` enum('Regular','Premium','Enterprise') NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `tax_id` varchar(255) DEFAULT NULL,
  `credit_limit` decimal(10,2) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `drivers`
--

CREATE TABLE `drivers` (
  `id` int(11) NOT NULL,
  `driver_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `dl_number` varchar(255) NOT NULL,
  `dl_exp_date` date NOT NULL,
  `aadhar_number` varchar(255) NOT NULL,
  `reference_name` varchar(255) DEFAULT NULL,
  `alternative_number` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `opening_balance` float NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `department` varchar(50) NOT NULL,
  `location` varchar(100) NOT NULL,
  `joining_date` date NOT NULL,
  `status` enum('active','on_leave','inactive') DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fuel_products`
--

CREATE TABLE `fuel_products` (
  `id` int(11) NOT NULL,
  `product_code` varchar(255) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price_per_liter` decimal(10,2) NOT NULL,
  `quantity_in_stock` int(11) NOT NULL,
  `min_stock_alert` int(11) DEFAULT 0,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `fuel_type` varchar(255) NOT NULL,
  `quantity` float NOT NULL,
  `price_per_unit` float NOT NULL,
  `tax_rate` float NOT NULL DEFAULT 0,
  `total_amount` float NOT NULL,
  `payment_status` enum('Pending','Paid','Cancelled') DEFAULT 'Pending',
  `payment_method` varchar(255) DEFAULT NULL,
  `due_date` datetime NOT NULL,
  `issued_date` datetime DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `party_details`
--

CREATE TABLE `party_details` (
  `id` int(11) NOT NULL,
  `party_name` varchar(255) NOT NULL,
  `phone_number` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `createdAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `invoice_number` varchar(255) DEFAULT NULL,
  `purchase_date` date DEFAULT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchase_products`
--

CREATE TABLE `purchase_products` (
  `id` int(11) NOT NULL,
  `purchase_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price_per_unit` decimal(10,0) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `sale_date` date NOT NULL,
  `sale_liters` float NOT NULL,
  `sale_price` float NOT NULL,
  `emp_id` int(11) DEFAULT NULL,
  `payment_method` varchar(255) NOT NULL,
  `fuel_type` varchar(255) NOT NULL,
  `total_amount` float NOT NULL,
  `transaction_status` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shifts`
--

CREATE TABLE `shifts` (
  `id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `nozzle_id` int(11) NOT NULL,
  `fuel_type` varchar(255) NOT NULL,
  `opening_reading` decimal(10,2) NOT NULL,
  `opening_time` datetime NOT NULL,
  `closing_reading` decimal(10,2) DEFAULT NULL,
  `closing_time` datetime DEFAULT NULL,
  `closing_money` decimal(10,2) DEFAULT NULL,
  `status` enum('open','closed') DEFAULT 'open',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `supplier_name` varchar(255) DEFAULT NULL,
  `contact_person` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `fuel_types` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`fuel_types`)),
  `pricing_terms` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `bank_account` varchar(255) DEFAULT NULL,
  `tax_id` varchar(255) DEFAULT NULL,
  `credit_limit` float DEFAULT NULL,
  `contract_start` datetime DEFAULT NULL,
  `contract_end` datetime DEFAULT NULL,
  `status` enum('Active','Inactive','Pending') DEFAULT 'Active',
  `notes` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tank_details`
--

CREATE TABLE `tank_details` (
  `id` int(11) NOT NULL,
  `tank_name` varchar(255) NOT NULL,
  `capacity` int(11) NOT NULL,
  `current_level` int(11) NOT NULL,
  `fuel_type` enum('Petrol','Diesel','Gas','Kerosene') NOT NULL,
  `location` varchar(255) NOT NULL,
  `status` enum('Active','Inactive','Maintenance') NOT NULL,
  `installation_date` datetime NOT NULL DEFAULT current_timestamp(),
  `last_refill` datetime DEFAULT NULL,
  `last_maintenance` datetime DEFAULT NULL,
  `temperature` float DEFAULT NULL,
  `sensor_status` enum('Working','Not Working') DEFAULT NULL,
  `station` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `vehicle_no` varchar(50) NOT NULL,
  `transport_name` varchar(255) NOT NULL,
  `vehicle_type` enum('truck','van','car','bike','other') NOT NULL DEFAULT 'other',
  `vehicle_make` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `manf_year` int(11) DEFAULT NULL,
  `fin_name` varchar(100) DEFAULT NULL,
  `emi_start_date` datetime DEFAULT NULL,
  `emi_end_date` datetime DEFAULT NULL,
  `emi_amount` decimal(10,2) DEFAULT NULL,
  `debit_bank_account` varchar(100) DEFAULT NULL,
  `fitness_start_date` datetime DEFAULT NULL,
  `fitness_end_date` datetime DEFAULT NULL,
  `insurance_start_date` datetime DEFAULT NULL,
  `insurance_end_date` datetime DEFAULT NULL,
  `insurance_company` varchar(100) DEFAULT NULL,
  `insurance_number` varchar(100) DEFAULT NULL,
  `permit_start_date` datetime DEFAULT NULL,
  `permit_end_date` datetime DEFAULT NULL,
  `pollution_start_date` datetime DEFAULT NULL,
  `pollution_end_date` datetime DEFAULT NULL,
  `state_tax` decimal(10,2) DEFAULT NULL,
  `tax_latest_paid_date` datetime DEFAULT NULL,
  `tax_validate` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bank_details`
--
ALTER TABLE `bank_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bank_details_account_number_unique` (`account_number`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customers_email_unique` (`email`);

--
-- Indexes for table `drivers`
--
ALTER TABLE `drivers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `employees_phone_number_unique` (`phone_number`);

--
-- Indexes for table `fuel_products`
--
ALTER TABLE `fuel_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fuel_products_product_code_unique` (`product_code`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `party_details`
--
ALTER TABLE `party_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `purchase_products`
--
ALTER TABLE `purchase_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_id` (`purchase_id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shifts`
--
ALTER TABLE `shifts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `suppliers_email_unique` (`email`);

--
-- Indexes for table `tank_details`
--
ALTER TABLE `tank_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Users_email_unique` (`email`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bank_details`
--
ALTER TABLE `bank_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `drivers`
--
ALTER TABLE `drivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fuel_products`
--
ALTER TABLE `fuel_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `party_details`
--
ALTER TABLE `party_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchase_products`
--
ALTER TABLE `purchase_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shifts`
--
ALTER TABLE `shifts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tank_details`
--
ALTER TABLE `tank_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `purchase_products`
--
ALTER TABLE `purchase_products`
  ADD CONSTRAINT `purchase_products_ibfk_1` FOREIGN KEY (`purchase_id`) REFERENCES `purchases` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
