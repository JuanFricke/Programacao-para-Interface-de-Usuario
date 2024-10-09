# Base image with Node.js 20 and Ionic
FROM node:20

# Install Ionic CLI globally
RUN npm install -g @ionic/cli

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose port 8100 for Ionic app
EXPOSE 8100

# Command to run the app
CMD ["ionic", "serve", "--host", "0.0.0.0"]
