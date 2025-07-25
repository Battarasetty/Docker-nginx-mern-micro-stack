# Build React App
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

# Accept build-time variables
ARG VITE_AUTH_API
ARG VITE_PROFILE_API
ARG VITE_TODO_API

# Export them for Vite to use
ENV VITE_AUTH_API=$VITE_AUTH_API
ENV VITE_PROFILE_API=$VITE_PROFILE_API
ENV VITE_TODO_API=$VITE_TODO_API

COPY . .
RUN npm run build

# Serve via nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
