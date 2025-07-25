// src/components/TaskList.js
import React from 'react';
import TaskCard from './TaskCard'; // Import the TaskCard component to render individual tasks.
import { Box } from '@mui/material'; // Import Material UI Box component for layout.

/**
 * TaskList Component
 * Renders a list of TaskCard components. This component receives an array of tasks
 * and a callback function for marking tasks as complete. It then iterates over the tasks
 * and renders a `TaskCard` for each one, passing down the necessary data and handler.
 * The UI is styled with Material UI's Box component to ensure proper spacing and layout for the list of tasks.
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.tasks - An array of task objects to display in the list.
 * @param {function} props.onMarkComplete - Callback function passed to each TaskCard,
 * responsible for handling the completion of a task.
 */
const TaskList = ({ tasks, onMarkComplete }) => {
  return (
    // Material UI Box component is used here as a container for the list of task cards.
    // `display: 'flex'` and `flexDirection: 'column'` arrange children vertically.
    // `gap: 2.5` applies spacing between the direct child elements (TaskCards) using Material UI's spacing scale.
    // This ensures a clean and consistent vertical layout for the task list.
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Map through the `tasks` array. For each `task` object in the array,
          render a `TaskCard` component. */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id} // The `key` prop is crucial for React list rendering performance and stability.
                        // It helps React identify which items have changed, are added, or are removed.
          task={task} // Pass the individual `task` object as a prop to the `TaskCard`.
          onMarkComplete={onMarkComplete} // Pass the `onMarkComplete` function down to the `TaskCard`
                                          // so it can be called when the "Done" button is clicked.
        />
      ))}
    </Box>
  );
};

export default TaskList;