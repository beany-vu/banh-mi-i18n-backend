# Use Node.js slim image for building and running the app
FROM node:22-slim

# Set working directory
WORKDIR /usr/src/app/banh-mi-i18n/backend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies (use ci for clean install with package-lock)
RUN npm config set strict-ssl false && npm ci

# Copy the rest of the backend source code
COPY . .

# Build the backend (essential for creating the dist folder)
RUN npm run build

# Remove development dependencies
RUN npm prune --production

# Expose port for the backend
EXPOSE 3000

# Start the backend in production mode
CMD ["node", "dist/main.js"]
