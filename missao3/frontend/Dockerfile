# Base image with Node.js 20 and Yarn
FROM node:20

# Install Ionic CLI globally
RUN npm install -g @ionic/cli native-run cordova-res
# RUN npm install @capacitor/camera @capacitor/preferences @capacitor/filesystem

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to install dependencies
COPY package.json ./

# Install dependencies with Yarn
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose port 8100 for Ionic app
EXPOSE 8100

# Command to run the app
CMD ["ionic", "serve", "--host=0.0.0.0", "--port=8100"]