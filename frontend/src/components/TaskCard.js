// src/components/TaskCard.js
import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material'; // Import Material UI components

/**
 * TaskCard Component
 * Displays an individual to-do task with its title, description, and a "Done" button.
 * This component is styled with Material UI to provide a professional and polished look,
 * and it includes a fix for handling long descriptions by truncating them with an ellipsis.
 * @param {Object} props - The component props.
 * @param {Object} props.task - The task object containing id, title, and description.
 * @param {function} props.onMarkComplete - Callback function to be called when the "Done" button is clicked.
 */
const TaskCard = ({ task, onMarkComplete }) => {
  return (
    // Material UI Card component acts as the main container for each task item.
    // It provides a raised surface with shadows and rounded corners.
    <Card
      sx={{
        borderRadius: '10px', // Apply consistent rounded corners for a modern, softer look.
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)', // Add a softer, more diffused shadow for subtle depth.
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', // Smooth transition for interactive hover effects.
        '&:hover': {
          transform: 'translateY(-3px)', // Lift effect on hover for enhanced interactivity.
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', // More pronounced shadow on hover.
        },
        display: 'flex', // Use flexbox for internal layout of card content and button.
        flexDirection: { xs: 'column', sm: 'row' }, // Stack content vertically on extra-small screens, horizontally on small and up.
        justifyContent: 'space-between', // Distribute space between task details and the "Done" button.
        alignItems: { xs: 'flex-start', sm: 'center' }, // Align items at the start vertically on small, center horizontally on larger.
        p: 2.5, // Apply slightly more padding inside the card for a more spacious feel.
        border: '1px solid #f0f0f0', // Add a very subtle light border for definition and separation.
        width: '100%', // Ensure the card takes the full available width within its parent container.
      }}
    >
      {/* CardContent holds the task's text details (title and description). */}
      {/* It's crucial for this flex item to be able to shrink and manage its text overflow. */}
      <CardContent sx={{
        flexGrow: 1, // Allows this content area to take up available space.
        flexShrink: 1, // Allows this content area to shrink if necessary.
        minWidth: 0, // IMPORTANT: Allows flex item to shrink below its content size to prevent horizontal overflow.
        p: 0, // Remove default padding from CardContent to control it with the parent Card's padding.
        '&:last-child': { pb: 0 }, // Specific Material UI override to remove bottom padding if it's the last child.
      }}>
        {/* Typography component for the task title. */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            mb: 0.5,
            color: '#333',
            fontWeight: 600,
            // --- Crucial Styling for Title Truncation ---
            whiteSpace: 'nowrap', // Prevent text from wrapping to the next line.
            overflow: 'hidden', // Hide any content that overflows the container.
            textOverflow: 'ellipsis', // Display an ellipsis (...) to indicate truncated text.
            // --- END Crucial Styling for Title Truncation ---
          }}
        >
          {task.title}
        </Typography>
        {/* Typography component for the task description, only rendered if a description exists. */}
        {task.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              color: '#555',
              // --- Crucial Styling for Multi-line Description Truncation ---
              // These properties ensure that long descriptions are truncated with an ellipsis
              // after a certain number of lines, preventing UI overflow and maintaining layout integrity.
              overflow: 'hidden', // Hide any content that overflows.
              textOverflow: 'ellipsis', // Display ellipsis for truncated text.
              display: '-webkit-box', // Required for `-webkit-line-clamp` to work for multi-line truncation.
              WebkitLineClamp: 3, // Limit the text to a maximum of 3 lines. Adjust this number as needed.
              WebkitBoxOrient: 'vertical', // Required for `-webkit-line-clamp`.
              // --- END Crucial Styling for Multi-line Description Truncation ---
            }}
          >
            {task.description}
          </Typography>
        )}
      </CardContent>
      {/* Box component to wrap the "Done" button and control its spacing and alignment within the card. */}
      <Box sx={{ mt: { xs: 2, sm: 0 }, ml: { sm: 2 }, flexShrink: 0 }}> {/* flexShrink: 0 prevents button from shrinking */}
        {/* Material UI Button for marking the task as complete. */}
        <Button
          variant="contained" // Solid background button style.
          color="success" // Uses Material UI's success color (typically green) for the "Done" action.
          onClick={() => onMarkComplete(task.id)} // Calls the parent's `onMarkComplete` handler with the task's ID.
          // Polished UI Styling for the "Done" Button:
          sx={{
            borderRadius: '8px', // Slightly less rounded than the card for a subtle contrast.
            // Apply a linear gradient for a more dynamic and professional appearance.
            background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)', // Green gradient.
            boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)', // Subtle shadow for depth.
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background 0.2s ease-in-out', // Smooth transitions for hover effects.
            '&:hover': {
              transform: 'translateY(-1px)', // Slight lift effect on hover.
              boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)', // More pronounced shadow on hover.
              background: 'linear-gradient(45deg, #388E3C 30%, #689F38 90%)', // Darker green gradient on hover.
            },
            fontWeight: 'bold', // Bold text for emphasis.
            fontSize: '0.9rem', // Slightly adjusted font size.
            px: 3, // More horizontal padding for a larger touch target.
          }}
        >
          Done
        </Button>
      </Box>
    </Card>
  );
};

export default TaskCard;