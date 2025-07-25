import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

/**
 * DTO for creating a new Task.
 * Defines the expected structure and validation rules for the request body
 * when a user wants to add a new to-do task.
 */
export class CreateTaskDto {
  /**
   * The title of the task.
   * Must be a non-empty string and have a maximum length.
   */
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty.' })
  @MaxLength(255, { message: 'Title cannot be longer than 255 characters.' })
  title: string;

  /**
   * The description of the task (optional).
   * Must be a string if provided.
   */
  @IsString()
  @IsOptional()
  description?: string;
}
