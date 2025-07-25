import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';

/**
 * TasksModule
 * This module encapsulates all components related to the To-Do tasks feature.
 * It imports TypeOrmModule to make the Task entity repository available
 * to the TasksService, and declares the controller and service.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // Register the Task entity with TypeORM for this module
  ],
  controllers: [TasksController], // Declare the controllers belonging to this module
  providers: [TasksService], // Declare the services (providers) belonging to this module
})
export class TasksModule {}
