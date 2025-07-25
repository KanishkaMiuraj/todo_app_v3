import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

/**
 * TasksController
 * Handles API endpoints related to To-Do tasks.
 * It exposes RESTful endpoints for creating, retrieving, and updating tasks.
 */
@Controller('tasks') // Base route for all task-related endpoints (e.g., /tasks)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * POST /tasks
   * Creates a new to-do task.
   * @param createTaskDto The data for the new task (title, description).
   * @returns The created Task entity.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED) // Explicitly set HTTP status to 201 Created
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  /**
   * GET /tasks
   * Retrieves the 5 most recent incomplete to-do tasks.
   * @returns An array of Task entities.
   */
  @Get()
  @HttpCode(HttpStatus.OK) // Explicitly set HTTP status to 200 OK
  async findAll(): Promise<Task[]> {
    return this.tasksService.findRecentIncompleteTasks();
  }

  /**
   * PATCH /tasks/:id/complete
   * Marks a specific task as completed.
   * @param id The ID of the task to mark as complete.
   * @returns The updated Task entity.
   */
  @Patch(':id/complete')
  @HttpCode(HttpStatus.OK) // Explicitly set HTTP status to 200 OK
  async markAsComplete(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    // Call the service to update the task, setting is_completed to true
    return this.tasksService.update(id, { is_completed: true });
  }

  // Optional: GET /tasks/:id - Get a single task by ID (useful for debugging/testing)
  // @Get(':id')
  // @HttpCode(HttpStatus.OK)
  // async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
  //   return this.tasksService.findOne(id);
  // }
}
