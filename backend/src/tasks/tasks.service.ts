import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

/**
 * TasksService
 * Handles all business logic related to To-Do tasks,
 * including creating, retrieving, and updating tasks.
 * It interacts directly with the database via TypeORM's Repository.
 */
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) // Inject the Task repository to interact with the 'tasks' table
    private tasksRepository: Repository<Task>,
  ) {}

  /**
   * Creates a new task in the database.
   * @param createTaskDto Data Transfer Object containing title and description.
   * @returns The newly created Task entity.
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto); // Create a new Task instance
    return this.tasksRepository.save(task); // Save the task to the database
  }

  /**
   * Retrieves the 5 most recent incomplete tasks.
   * Tasks are ordered by creation date in descending order.
   * @returns An array of Task entities.
   */
  async findRecentIncompleteTasks(): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { is_completed: false }, // Filter for tasks that are not completed
      order: { created_at: 'DESC' }, // Order by creation date, most recent first
      take: 5, // Limit the results to 5 tasks as per requirement
    });
  }

  /**
   * Finds a single task by its ID.
   * Throws NotFoundException if the task does not exist.
   * @param id The ID of the task to find.
   * @returns The found Task entity.
   */
  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
    return task;
  }

  /**
   * Updates an existing task by its ID.
   * Specifically used to mark a task as completed.
   * @param id The ID of the task to update.
   * @param updateTaskDto Data Transfer Object containing fields to update (e.g., is_completed).
   * @returns The updated Task entity.
   */
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id); // First, find the task to ensure it exists
    Object.assign(task, updateTaskDto); // Apply updates to the found task
    return this.tasksRepository.save(task); // Save the updated task
  }
}
