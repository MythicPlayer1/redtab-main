# Use a Node.js base image for building the application
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite.js application
RUN npm run build

# Use an Nginx base image for serving the built application
FROM nginx:alpine

# Copy the built Vite.js application from the builder stage to the Nginx static files directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the default Nginx port (usually 80)
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]