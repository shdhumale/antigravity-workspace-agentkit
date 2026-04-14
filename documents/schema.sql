-- 1. Create the Database
CREATE DATABASE IF NOT EXISTS ticket_agentkit_db;
USE ticket_agentkit_db;

-- 2. Create the Tickets Table
-- Matching the Spring Boot '@Entity' definition
CREATE TABLE IF NOT EXISTS tickets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Optional: Insert Sample Data for Testing
INSERT INTO tickets (name, description, status) 
VALUES 
('Login failure', 'User cannot log in after password reset.', 'New'),
('Slow dashboard', 'Dashboard takes more than 5 seconds to load.', 'Assigned'),
('API Timeout', 'The GET /api/v1/data endpoint is timing out.', 'Escalate'),
('Fix Navbar styling', 'The logo is overlapping with the menu items.', 'Done');

-- 4. Verify the Setup
SELECT * FROM tickets;
