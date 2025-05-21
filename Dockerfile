# Use official Node.js LTS image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# ✅ Force registry to avoid ECONNRESET
RUN npm config set registry https://registry.npmjs.org/

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose port Nest listens on
EXPOSE 3000

# Start the application
CMD ["node", "dist/src/main.js"]
