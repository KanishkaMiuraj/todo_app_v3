import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import your Tailwind CSS (which includes base, components, utilities).
                      // This is essential for all your UI styling to be applied.
import App from './App'; // Import the main App component, which contains your entire application's UI and logic.
import reportWebVitals from './reportWebVitals'; // For performance metrics (requires 'web-vitals' package).

// Create a root for rendering the React application into the DOM element with id 'root'.
// This is the modern and recommended way to render React applications starting with React 18.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component within React's StrictMode.
// StrictMode activates additional checks and warnings for its descendants during development,
// helping to identify potential problems and promote best practices.
root.render(
  <React.StrictMode>
    <App /> {/* The main application component is rendered here. */}
  </React.StrictMode>
);

// Function to report web vitals for performance monitoring.
// This is part of Create React App's default setup and helps measure
// important user experience metrics like Largest Contentful Paint (LCP),
// First Input Delay (FID), and Cumulative Layout Shift (CLS).
reportWebVitals();
