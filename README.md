# 📝 To-Do Application v3 (Full-Stack with Docker)

![Docker](https://img.shields.io/badge/Docker-Ready-blue?logo=docker)
![React](https://img.shields.io/badge/Frontend-React.js-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)
![License](https://img.shields.io/badge/License-MIT-yellow)

A **full-stack To-Do application** that is **fully dockerized** for easy setup and deployment. It includes a **React frontend**, **Node.js (NestJS) backend**, and a **MySQL database**.

---

## 🚀 Features
- **Add Tasks:** Add tasks with a title and optional description.
- **Mark Complete:** Mark tasks as completed to remove them from the active list.
- **Responsive UI:** Modern, mobile-friendly UI built with Material-UI.
- **Dockerized Setup:** Frontend, backend, and database run in isolated Docker containers.

---

## 💻 Tech Stack

**Frontend:**  
- React.js  
- Material-UI  
- JavaScript  

**Backend:**  
- Node.js (NestJS)  
- TypeORM  
- JavaScript/TypeScript  

**Database:**  
- MySQL  

**Deployment & Orchestration:**  
- Docker  
- Docker Compose  

---

## 📋 Prerequisites
Before starting, make sure you have the following installed:

- **[Git](https://git-scm.com/downloads)** – For cloning the repository.
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** – With Docker Engine & Compose enabled.

---

## 📁 Project Structure

![App Screenshot](./images/ps1.png)




---

## ⚡ Getting Started

### 1. **Clone the Repository**

git clone https://github.com/KanishkaMiuraj/todo_app_v3.git
cd todo_app_v3
2. Configure Docker Compose
Edit the docker-compose.yml file and set the database environment variables:


backend:
  environment:
    DB_HOST: mysql-db
    DB_PASSWORD: your_mysql_root_password
    DB_NAME: todo_database
    DB_PORT: 3306

mysql-db:
  environment:
    MYSQL_ROOT_PASSWORD: your_mysql_root_password
    MYSQL_DATABASE: todo_database
    MYSQL_USER: root
3. Update Backend Database Config
In backend/src/database/database.module.ts:


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'todo_database',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
4. Update Frontend API URL
In frontend/src/api/tasksApi.js:


const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
5. Build & Run Docker Containers

docker-compose up -d --build
This builds and starts the containers for the frontend, backend, and MySQL.

6. Access the Application
Frontend UI: http://localhost:3001

Backend API: http://localhost:3000

🛑 Stopping the Application

docker-compose down
To remove volumes (reset MySQL data):

docker-compose down --volumes
⚠️ Troubleshooting
Port already in use:
Modify the port mapping in docker-compose.yml (e.g., 4000:3000).

MySQL container unhealthy:
Run:

docker-compose logs mysql-db
docker-compose down --volumes && docker-compose up -d --build
Backend connection refused:
Ensure DB_HOST=mysql-db in docker-compose.yml.
