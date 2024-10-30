# Dockerfile
# Use Node.js image with an appropriate version
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Install TypeScript globally and build the application
RUN npm install -g typescript
RUN tsc

# Expose the port the app runs on
EXPOSE 4000

# Start the application from the built JavaScript files
# CMD ["node", "dist/app.js"]
CMD ["npm", "run", "dev"]
