# Name the node stage "builder"
FROM node:14.6 AS builder
# Set working directory
WORKDIR /frontend
# Copy all files from current directory to working dir in image
COPY frontend .
# install node modules and build assets
RUN yarn install && yarn build


# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /frontend/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]