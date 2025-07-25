# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock if you use yarn)
# This step is done first to leverage Docker's build cache.
# If only your source code changes, dependencies won't be reinstalled.
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Inform Docker that the container will listen on this port at runtime.
# IMPORTANT: Ensure this port (e.g., 5000) matches the port your Node.js backend actually uses!
EXPOSE 3000

# Define the command to run your backend application when the container starts
CMD ["npm", "start"]