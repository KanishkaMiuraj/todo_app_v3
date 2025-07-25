// src/components/TaskForm.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material'; // Import Material UI components

/**
 * TaskForm Component
 * A form for users to input a new task's title and description, with highly polished Material UI styling.
 * This component handles its own local state for the input fields and manages form submission.
 * The UI is meticulously designed to match the assessment mockup, focusing on refined aesthetics,
 * consistent rounded corners, and enhanced interactive states.
 * @param {Object} props - The component props.
 * @param {function} props.onAddTask - Callback function to be called when a new task is submitted.
 */
const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState(''); // State for the task title input field.
  const [description, setDescription] = useState(''); // State for the task description input field.
  const [formError, setFormError] = useState(''); // State for displaying validation errors specific to this form.

  /**
   * Handles the form submission event.
   * Prevents the default browser form submission, performs client-side validation,
   * calls the `onAddTask` prop function with the new task data, and then resets the form fields.
   * @param {Event} e - The form submission event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the browser from reloading the page on form submission.
    setFormError(''); // Clear any previously displayed form errors.

    // Client-side validation: Ensure the title input is not empty or just whitespace.
    if (!title.trim()) {
      setFormError('Task title cannot be empty.'); // Set an error message if validation fails.
      return; // Stop function execution if validation fails.
    }

    // Call the `onAddTask` function provided by the parent component (App.js),
    // passing the current title and description values.
    onAddTask(title, description);

    // Reset the form fields to empty strings after successful submission.
    setTitle('');
    setDescription('');
  };

  return (
    // Material UI Box component is used for layout, acting as a flexible container.
    // `display: 'flex'`, `flexDirection: 'column'`, and `gap: 2` create a vertical stack with standard spacing.
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Material UI TextField for the Task Title */}
      <TextField
        label="Title" // Label displayed above the input field.
        variant="outlined" // Standard Material UI outlined input style.
        fullWidth // Makes the input take the full width of its parent container.
        value={title} // Controls the input value from React state.
        onChange={(e) => setTitle(e.target.value)} // Updates state on input change.
        placeholder="e.g., Buy books"
        inputProps={{ maxLength: 255 }} // HTML attribute for max length, matching backend validation.
        // Polished UI Styling for TextField:
        sx={{
          '& .MuiOutlinedInput-root': { // Targets the root element of the outlined input.
            borderRadius: '10px', // Apply slightly more rounded corners for a softer look.
            '& fieldset': { // Targets the border (fieldset) of the input.
              borderColor: '#e0e0e0', // Set a lighter, more subtle border color.
              transition: 'border-color 0.2s ease-in-out', // Smooth transition for border color changes.
            },
            '&:hover fieldset': { // Styles for when the input is hovered.
              borderColor: '#bdbdbd', // Slightly darker border on hover for subtle feedback.
            },
            '&.Mui-focused fieldset': { // Styles for when the input is focused.
              borderColor: '#3f51b5', // Use Material UI's primary color on focus for clear indication.
              borderWidth: '2px', // Make the border slightly thicker on focus.
            },
          },
        }}
      />

      {/* Material UI TextField for the Task Description */}
      <TextField
        label="Description (Optional)"
        variant="outlined"
        fullWidth
        multiline // Enables multi-line input (renders as a textarea).
        rows={4} // Sets the initial visible number of lines.
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Updates state on input change.
        placeholder="e.g., Buy books for the next school year"
        // Polished UI Styling for Description TextField (consistent with Title TextField):
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '& fieldset': {
              borderColor: '#e0e0e0',
              transition: 'border-color 0.2s ease-in-out',
            },
            '&:hover fieldset': {
              borderColor: '#bdbdbd',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3f51b5',
              borderWidth: '2px',
            },
          },
        }}
      />

      {/* Display form-specific error messages using Material UI Typography. */}
      {formError && (
        <Typography color="error" variant="body2" sx={{ mt: 1, ml: 1 }}> {/* Added left margin for alignment with input labels */}
          {formError}
        </Typography>
      )}

      {/* Material UI Button for submitting the form. */}
      <Button
        type="submit"
        variant="contained" // Solid background button style.
        color="primary" // Uses Material UI's primary color theme.
        fullWidth // Makes the button take the full width.
        size="large" // Larger button size for prominence.
        // Polished UI Styling for the "Add Task" Button:
        sx={{
          mt: 2, // Margin top for spacing from the fields.
          borderRadius: '10px', // Consistent rounded corners.
          // Apply a subtle linear gradient for a modern, professional look.
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', // Blue gradient.
          boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)', // Stronger, yet soft shadow for depth.
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background 0.2s ease-in-out', // Smooth transitions for hover effects.
          '&:hover': {
            transform: 'translateY(-2px)', // Lift effect on hover for interactivity.
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.3)', // Larger shadow on hover.
            background: 'linear-gradient(45deg, #1976D2 30%, #19B5D2 90%)', // Slightly darker gradient on hover.
          },
          fontWeight: 'bold', // Bold text for emphasis.
          fontSize: '1.1rem', // Slightly larger font size for readability.
        }}
      >
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;