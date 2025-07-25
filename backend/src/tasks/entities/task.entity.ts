import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';

/**
 * Task Entity
 * Represents the 'tasks' table in the MySQL database.
 * This entity defines the structure and types of the columns for a to-do task.
 *
 * FIX for "Invalid default value for 'created_at'":
 * Removed 'default' and 'onUpdate' from @CreateDateColumn/@UpdateDateColumn
 * and instead use @BeforeInsert() and @BeforeUpdate() hooks to set timestamps programmatically.
 * This avoids MySQL's strict DDL interpretation for CURRENT_TIMESTAMP defaults.
 */
@Entity('tasks') // Specifies that this class is a TypeORM entity and maps to the 'tasks' table
export class Task {
  /**
   * Primary key for the task.
   * Auto-incrementing integer.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Title of the task.
   * Stored as a string, cannot be null.
   */
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  /**
   * Description of the task.
   * Stored as text, can be null.
   */
  @Column({ type: 'text', nullable: true })
  description: string;

  /**
   * Status of the task (completed or not).
   * Stored as a boolean, defaults to false, cannot be null.
   */
  @Column({ type: 'boolean', default: false, nullable: false })
  is_completed: boolean;

  /**
   * Timestamp when the task was created.
   * Set programmatically using @BeforeInsert hook.
   */
  @Column({ type: 'datetime', nullable: false }) // Define as datetime, no default here
  created_at: Date;

  /**
   * Timestamp when the task was last updated.
   * Set programmatically using @BeforeUpdate hook.
   */
  @Column({ type: 'datetime', nullable: false }) // Define as datetime, no default here
  updated_at: Date;

  /**
   * TypeORM hook executed before a new entity is inserted into the database.
   * Sets the 'created_at' and 'updated_at' timestamps to the current time.
   */
  @BeforeInsert()
  setCreationDate() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  /**
   * TypeORM hook executed before an existing entity is updated in the database.
   * Updates the 'updated_at' timestamp to the current time.
   */
  @BeforeUpdate()
  setUpdateDate() {
    this.updated_at = new Date();
  }
}
