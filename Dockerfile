# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy the rest of your project files and directories to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port that the Next.js app will listen on (3001 in your case)
EXPOSE 3001

# Start the Next.js app
CMD ["npm", "start"]
