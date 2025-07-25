// src/api/tasksApi.js

// Define the base URL for your backend API.
// It tries to read from the REACT_APP_BACKEND_API_URL environment variable,
// which you should set in your frontend/.env file (e.g., REACT_APP_BACKEND_API_URL=http://localhost:3000).
// It defaults to 'http://localhost:3000' if the environment variable is not set.
// This URL is crucial for the frontend to connect to your running backend.
const API_BASE_URL = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:3000';

/**
 * Fetches the 5 most recent incomplete tasks from the backend.
 * This function corresponds to the GET /tasks endpoint on your NestJS backend.
 * It's essential for displaying the task list on the UI.
 * @returns {Promise<Array>} A promise that resolves to an array of task objects (e.g., [{ id, title, description, is_completed, created_at, updated_at }]).
 * @throws {Error} If the network request fails (e.g., backend not running, CORS issue)
 * or the server responds with an error status (e.g., 404, 500).
 */
export const fetchTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  if (!response.ok) {
    // If the HTTP response status is not in the 200-299 range, it's an error.
    // Attempt to parse a more specific error message from the response body if available,
    // otherwise, provide a generic "Unknown error" or status-based message.
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || `Failed to fetch tasks: HTTP status ${response.status}`);
  }
  return response.json(); // Parse and return the JSON response body containing the tasks.
};

/**
 * Creates a new task in the backend.
 * This function corresponds to the POST /tasks endpoint on your NestJS backend.
 * It's used by the "Add a Task" form in the UI.
 * @param {string} title - The title of the new task. This is a mandatory field.
 * @param {string} description - The description of the new task (optional).
 * @returns {Promise<Object>} A promise that resolves to the newly created task object returned by the backend.
 * @throws {Error} If the network request fails or the server responds with an error status
 * (e.g., due to validation errors if title is missing).
 */
export const createTask = async (title, description) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST', // Specify the HTTP method as POST.
    headers: {
      'Content-Type': 'application/json', // Inform the server that the request body is in JSON format.
    },
    body: JSON.stringify({ title, description }), // Convert the JavaScript object to a JSON string for the request body.
  });

  if (!response.ok) {
    // If the response is not OK, parse the error message from the backend.
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || `Failed to add task: HTTP status ${response.status}`);
  }
  return response.json(); // Return the created task data (including its new ID and timestamps) from the backend.
};

/**
 * Marks an existing task as completed in the backend.
 * This function corresponds to the PATCH /tasks/:id/complete endpoint on your NestJS backend.
 * It's triggered when the "Done" button on a task card is clicked.
 * @param {number} id - The ID of the task to mark as complete.
 * @returns {Promise<Object>} A promise that resolves to the updated task object returned by the backend.
 * @throws {Error} If the network request fails or the server responds with an error status
 * (e.g., if the task ID is not found).
 */
export const markTaskComplete = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}/complete`, {
    method: 'PATCH', // Use PATCH method for partial updates (specifically updating the `is_completed` status).
  });

  if (!response.ok) {
    // If the response is not OK, parse the error message from the backend.
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || `Failed to mark task complete: HTTP status ${response.status}`);
  }
  return response.json(); // Return the updated task data from the backend.
};
