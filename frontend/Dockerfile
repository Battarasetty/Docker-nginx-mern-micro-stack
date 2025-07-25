# frontend/Dockerfile

# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Inject VITE_ environment variables at build time
ARG VITE_AUTH_API
ARG VITE_PROFILE_API
ARG VITE_TODO_API

ENV VITE_AUTH_API=$VITE_AUTH_API
ENV VITE_PROFILE_API=$VITE_PROFILE_API
ENV VITE_TODO_API=$VITE_TODO_API

RUN npm run build

# Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
