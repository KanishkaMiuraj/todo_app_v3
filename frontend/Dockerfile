# Stage 1: Build the React application
# We use a Node.js image to compile the React app
FROM node:18-alpine as build

# Set the working directory inside the build container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend application code
COPY . .

# Build the React app for production (this creates the optimized 'build' folder)
RUN npm run build

# Stage 2: Serve the React application with Nginx
# We use a lightweight Nginx image to serve the static files
FROM nginx:alpine

# Copy the custom Nginx configuration file (which we'll create next)
# This is crucial for Single Page Applications (SPAs) like React apps
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the optimized build output from the 'build' stage into Nginx's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Inform Docker that the container will listen on port 80 (standard HTTP port)
EXPOSE 80

# Command to run Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]