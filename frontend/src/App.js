// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import TaskForm from './components/TaskForm'; // Import the TaskForm component for adding tasks.
import TaskList from './components/TaskList'; // Import the TaskList component for displaying tasks.
// Import API functions from the centralized API file (src/api/tasksApi.js).
import { fetchTasks, createTask, markTaskComplete } from './api/tasksApi';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Button,
  Alert, // Material UI Alert component for messages
} from '@mui/material'; // Import Material UI components

/**
 * Main App Component
 * This component serves as the root of the To-Do application, now with a highly polished and precisely aligned Material UI.
 * It manages the global state for tasks, handles all API interactions (fetching, adding, updating),
 * and orchestrates the rendering of the TaskForm and TaskList components.
 * It also handles loading states, error messages, and user feedback messages.
 * The overall layout and responsiveness are meticulously defined here using Material UI's Grid and Box components
 * to match the provided UI assessment image, specifically aligning "Add a Task" to the left and "Recent To-Do Tasks" to the right.
 */
const App = () => {
  const [tasks, setTasks] = useState([]); // State to hold the list of tasks fetched from the backend.
  const [loading, setLoading] = useState(true); // State to indicate if tasks are currently being loaded from the API.
  const [error, setError] = useState(null); // State to store any error messages encountered during API calls.
  const [message, setMessage] = useState(''); // State for displaying success or general informational/error messages to the user.

  /**
   * useCallback hook to memoize the `loadTasks` function.
   * This function is responsible for fetching the latest tasks from the backend API.
   * It updates the loading, error, and tasks states accordingly.
   * It's wrapped in useCallback to prevent unnecessary re-creations, which is good for performance.
   */
  const loadTasks = useCallback(async () => {
    setLoading(true); // Set loading to true before starting the fetch operation.
    setError(null);   // Clear any previous error messages.
    setMessage('');   // Clear any previous success/info messages.
    try {
      const data = await fetchTasks(); // Call the API function to fetch tasks.
      setTasks(data); // Update the tasks state with the data received from the backend.
    } catch (err) {
      console.error('Failed to load tasks:', err); // Log the detailed error to the console for debugging.
      setError('Failed to load tasks. Please ensure the backend is running and accessible.'); // Set a user-friendly error message.
    } finally {
      setLoading(false); // Set loading to false once the fetch operation is complete (whether successful or failed).
    }
  }, []); // Empty dependency array means this function is created only once on component mount and never changes.

  /**
   * useEffect hook to trigger `loadTasks` when the component mounts.
   * This ensures that the task list is populated as soon as the application loads.
   */
  useEffect(() => {
    loadTasks(); // Call `loadTasks` to fetch the initial data.
  }, [loadTasks]); // Dependency array includes `loadTasks` to satisfy ESLint's `exhaustive-deps` rule.

  /**
   * Handles the submission of a new task from the `TaskForm` component.
   * It calls the backend API to create the task and then refreshes the task list.
   * @param {string} title - The title of the new task.
   * @param {string} description - The description of the new task.
   */
  const handleAddTask = async (title, description) => {
    setMessage(''); // Clear previous messages.
    setError(null); // Clear previous errors.
    try {
      await createTask(title, description); // Call the API function to create a task.
      setMessage('Task added successfully!'); // Set a success message for the user.
      loadTasks(); // Reload tasks to display the newly added task (and ensure only 5 recent are shown).
    } catch (err) {
      console.error('Failed to add task:', err); // Log the detailed error.
      setMessage(`Error adding task: ${err.message}`); // Set a user-friendly error message.
    }
  };

  /**
   * Handles marking an existing task as complete.
   * It calls the backend API to update the task's status and then refreshes the task list.
   * @param {number} id - The ID of the task to mark as complete.
   */
  const handleMarkComplete = async (id) => {
    setMessage(''); // Clear previous messages.
    setError(null); // Clear previous errors.
    try {
      await markTaskComplete(id); // Call the API function to mark the task complete.
      setMessage('Task marked as complete!'); // Set a success message.
      loadTasks(); // Reload tasks to hide the completed task from the list.
    } catch (err) {
      console.error('Failed to mark task complete:', err); // Log the detailed error.
      setMessage(`Error marking task complete: ${err.message}`);
    }
  };

  return (
    // Material UI Container component for responsive layout.
    // Ensure it takes full viewport height and centers its primary content horizontally.
    <Container
      maxWidth="lg" // Constrain the main content area to a large fixed width on large screens.
      sx={{
        py: { xs: 3, sm: 6, md: 8 }, // Responsive vertical padding.
        bgcolor: '#f0f2f5', // Subtle background color for the page.
        minHeight: '100vh', // Ensures the container takes at least the full viewport height.
        display: 'flex', // Use flexbox for its content.
        flexDirection: 'column', // Stack children vertically.
        alignItems: 'center', // Center content horizontally within the container.
        justifyContent: 'center', // Center content vertically within the container (makes content appear in middle of page).
        px: { xs: 2, sm: 4, md: 6 }, // Responsive horizontal padding.
      }}
    >
      {/* Main application Paper component, acting as the central card-like element. */}
      <Paper
        elevation={6} // Higher elevation for a more prominent, professional look.
        sx={{
          p: { xs: 3, sm: 5, md: 6 }, // Increased padding for a more spacious feel inside the main card.
          borderRadius: '16px', // More rounded corners for a modern aesthetic.
          width: '100%', // Ensures the paper takes full width within its container.
          maxWidth: '1200px', // Set a maximum width for the entire application wrapper for large screens.
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', // Deeper, softer shadow for enhanced depth.
          display: 'flex', // Enable flexbox for its children (the Grid container).
          flexDirection: 'column', // Stack children vertically.
          flexGrow: 1, // Allows this Paper to grow and fill available height within the Container.
          maxHeight: 'calc(100vh - 120px)', // 100vh minus Container's total vertical padding.
        }}
      >
        {/* Material UI Grid container for the two-column layout. */}
        {/* Key change: justifyContent is now 'space-between' to push items to opposite ends */}
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          sx={{
            flexGrow: 1, // Allows the grid to grow to fill available space.
            justifyContent: { xs: 'center', md: 'space-between' }, // Center on small, space-between on medium+
            alignItems: 'flex-start', // Align items to the top to prevent stretching if heights differ.
            width: '100%', // Ensure the grid takes full width of its parent Paper.
            margin: 0, // Reset default Grid container margins to ensure full width usage inside Paper
            '& > .MuiGrid-item': { // Target direct Grid items to ensure consistent padding/spacing
                paddingTop: '0px !important', // Override default grid item padding-top to manage spacing more precisely
                paddingLeft: '0px !important', // Override default grid item padding-left
            },
            // The spacing prop adds padding/margin implicitly, so we handle it with `gap` or direct `sx` on items if needed
            // For `space-between` to work well, the items might not need explicit ml/mr auto.
          }}
        >
          {/* Left Panel: "Add a Task" Form Section */}
          <Grid
            item
            xs={12} // Takes full width on extra-small screens
            md={6} // Takes half width on medium and up.
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' }, // Center form on small, left-align on medium+
              padding: { xs: '16px', md: '0px' }, // Reset grid item padding if you want tighter control
              // We want the inner Paper to align within this grid item
              // For md and up, this Grid item will be on the left, so its content should also align left.
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 3, sm: 4 }, // Increased padding for inner panels.
                borderRadius: '12px', // Consistent rounded corners for inner panels.
                bgcolor: '#ffffff', // Pure white background for inner panels.
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)', // Subtle inner shadow.
                height: 'auto', // Allow height to be determined by content.
                width: { xs: '100%', sm: '450px' }, // Set max width for the form on larger screens for better aesthetics.
                maxWidth: '100%', // Ensure it doesn't overflow on small screens.
                ml: { xs: 0, md: 'auto' }, // Push this content to the right edge of its Grid item on medium+ (if grid doesn't fill)
                                          // Or, simply remove if `justifyContent: 'flex-start'` on parent Grid item is enough
                mr: { xs: 0, md: 'auto' },
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 4, color: '#212121', fontWeight: 700 }}>
                Add a Task
              </Typography>
              <TaskForm onAddTask={handleAddTask} />
              {message && (
                <Alert
                  severity={message.startsWith('Error') ? 'error' : 'success'}
                  sx={{ mt: 3, borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                >
                  {message}
                </Alert>
              )}
            </Paper>
          </Grid>

          {/* Right Panel: "Recent To-Do Tasks" List Section */}
          <Grid
            item
            xs={12} // Takes full width on extra-small screens
            md={6} // Takes half width on medium and up.
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: { xs: 'center', md: 'flex-end' }, // Center content on small, right-align on medium+
              alignItems: { xs: 'center', md: 'flex-end' }, // Center items on small, right-align on medium+
              padding: { xs: '16px', md: '0px' }, // Reset grid item padding
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 3, sm: 4 },
                borderRadius: '12px',
                bgcolor: '#ffffff',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                width: { xs: '100%', sm: '450px' }, // Set a max width for the task list for better readability.
                maxWidth: '100%', // Ensure it doesn't overflow on small screens.
                height: '100%', // Ensures this panel takes full height of its Grid item.
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto', // Enable vertical scrolling when content overflows
                overflowX: 'hidden', // Explicitly hide horizontal overflow.
                maxHeight: 'calc(100vh - 200px)', // A more generous max height to allow for more content, adjust as needed.
                ml: { xs: 0, md: 'auto' }, // Push this content to the right edge of its Grid item on medium+
                mr: { xs: 0, md: 'auto' }, // Keep centered on small screens
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom align="center" sx={{ mb: 4, color: '#212121', fontWeight: 700 }}>
                Recent To-Do Tasks
              </Typography>

              {/* Loading indicator: Displayed when data is being fetched. */}
              {loading && (
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '160px' }}>
                  <CircularProgress size={50} sx={{ color: '#3f51b5' }} />
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 2, color: '#616161' }}>
                    Loading tasks...
                  </Typography>
                </Box>
              )}

              {/* Error message and retry button: Displayed if an error occurs during task loading. */}
              {error && (
                <Alert severity="error" sx={{ mt: 2, borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                  <Typography>{error}</Typography>
                  <Button onClick={loadTasks} variant="outlined" color="error" sx={{ mt: 1, borderRadius: '8px' }}>
                    Retry
                  </Button>
                </Alert>
              )}

              {/* Task list or "No tasks" message: Displayed only when not loading and no error. */}
              {!loading && !error && (
                tasks.length > 0 ? (
                  <TaskList tasks={tasks} onMarkComplete={handleMarkComplete} />
                ) : (
                  <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4, color: '#757575' }}>
                      No tasks found. Add a new task!
                    </Typography>
                  </Box>
                )
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default App;