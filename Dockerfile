# Use the official Ubuntu as the base image
FROM ubuntu:latest

# Update the package manager
RUN apt-get update

# Install curl and update the system
RUN apt-get install -y curl

# Install Node.js (version 20)
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get update -y
RUN apt-get install -y nodejs

# Copy package.json and package-lock.json to the working directory
COPY package.json package.json
COPY package-lock.json package-lock.json


COPY index.js index.js

# Install Node.js dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Start the application
CMD ["node", "index.js"]