// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

// Load environment variables from a .env file.
// This is for local development outside of Docker.
// Docker will inject these variables directly, so it won't use the .env file.
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      // FIX: Read host from the DB_HOST environment variable.
      // Falls back to 'localhost' for local development.
      host: process.env.DB_HOST || 'localhost',
      // FIX: Read port from the DB_PORT environment variable and parse it as a number.
      // Falls back to 3306 for local development.
      port: parseInt(process.env.DATABASE_PORT|| '3306', 10), 
      // FIX: Read username from the DB_USER environment variable.
      // Falls back to 'root' for local development.
      username: process.env.DB_USER || 'root',
      // FIX: Read password from the DB_PASSWORD environment variable.
      password: process.env.DB_PASSWORD || '990852391Kani@99', // Replace with your local password if needed
      // FIX: Read database name from the DB_NAME environment variable.
      database: process.env.DB_NAME || 'todo_database',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}