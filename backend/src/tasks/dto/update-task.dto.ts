import { IsBoolean, IsOptional } from 'class-validator';

/**
 * DTO for updating a Task.
 * Defines the expected structure and validation rules for the request body
 * when a user wants to update an existing task, specifically for marking it as complete.
 */
export class UpdateTaskDto {
  /**
   * Boolean indicating if the task is completed.
   * Optional, as only this field might be updated.
   */
  @IsBoolean()
  @IsOptional()
  is_completed?: boolean;
}
