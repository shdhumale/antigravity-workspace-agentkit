# antigravity-workspace-agentkit
This repo demonstrate the use of https://github.com/vudovn/antigravity-kit for Full stack development Angular UI + Springboot Microservice MW and MySQL as DB for the given PRD.
# Antigravity Workspace AgentKit

This repository demonstrates the implementation of a full-stack Ticket Management System using a distributed microservices architecture and a premium Angular frontend, built using the [Antigravity Kit](https://github.com/vudovn/antigravity-kit)[cite: 24903].

## 🏗️ Architecture

The system is designed as a distributed architecture to handle ticket management without the overhead of complex manual configurations, leveraging specialized agent workflows for development[cite: 24909, 24912].

### Backend (Spring Boot Microservices)
* **Service Registry**: A Eureka Server (running on port `8761`) that manages service discovery for the ecosystem
* **API Gateway**: A Spring Cloud Gateway (running on port `8080`) that acts as the single entry point, routing requests to the appropriate services
* **Ticket Service**: The core business logic service (running on port `8081`) handling ticket operations, searching, and persistence via MySQL

### Frontend (Angular + Tailwind CSS)
* **Premium Design**: Features a "Glassmorphism" look with a custom Tailwind CSS configuration for a professional aesthetic
* **Modular Components**: Includes a dashboard with reactive status badges, a real-time ticket creation form, and a dynamic search component

## 🛠️ Tech Stack
* **Frontend**: Angular 17+, Tailwind CSS
* **Backend**: Spring Boot, Java 21, Maven
* **Database**: MySQL[cite: 24914].
* **Discovery & Gateway**: Spring Cloud Netflix Eureka, Spring Cloud Gateway

## 🚀 Getting Started

### Prerequisites
* Java 21 and Maven installed
* Node.js and Angular CLI installed
* MySQL Server running with a database named `ticket_db`

### Installation & Execution

1.  **Database Setup**:
    Execute the provided `schema.sql` in your MySQL instance to initialize the tables and sample data

2.  **Backend Services**:
    Navigate to each service directory in `backend/` and run:
    ```bash
    mvn spring-boot:run
    ```
    *Order of startup:* `service-registry` ➔ `ticket-service` ➔ `api-gateway`

3.  **Frontend Application**:
    Navigate to the `frontend/` directory and run:
    ```bash
    npm install
    ng serve
    ```
    Access the dashboard at `http://localhost:4200`

## 📂 Project Structure
* `.agent/`: Contains specialized agent configurations (e.g., `backend-specialist`, `frontend-specialist`) and automated scripts for testing and audits
* `documents/`: Contains the PRD, MySQL schema, and Postman API collections
* `workflows/`: Defines sequential plans for bug resolution, feature development, and UI/UX refactoring

## 🧪 Testing & Verification
The project includes an automated verification phase. You can trigger the `test-engineer` agent or run the internal audit scripts to ensure security and functional integrity
* **Command**: `/test`
* **Audit**: `python .agent/scripts/checklist.py .`
