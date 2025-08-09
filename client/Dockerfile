# Step 1: Build the app
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build

# Step 2: Serve with nginx
FROM nginx:alpine

# remove default nginx static assests
RUN rm -rf /usr/share/nginx/html/*

#Copy built assets from previous stage
COPY --from=build /app/dist /usr/share/nginx/html
# For Create REact App, use /app/build instead of /app/dist

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]