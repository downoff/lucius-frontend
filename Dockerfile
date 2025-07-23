# Use an official Node.js image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose the port Vite runs on
EXPOSE 5173

# The command to run when the container starts
CMD ["npm", "run", "dev", "--", "--host"]