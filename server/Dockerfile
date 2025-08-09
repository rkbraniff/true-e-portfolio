# Use official Node LTS image with build tools
FROM node:20

# Set Working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

#Build TypeScript
RUN npm run build

# Expose the port your server runs on
EXPOSE 5000

# Copy OpenAPI spec to dist (so it's accessible at runtime)
COPY openapi.yaml ./dist/openapi.yaml

# Start the server
CMD [ "node", "dist/index.js" ]