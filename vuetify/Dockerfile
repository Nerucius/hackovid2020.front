# Needed for Prerender SPA Framework
# FROM alekzonder/puppeteer:latest
# FROM node:alpine
FROM node:10-alpine

USER root

RUN mkdir /vuetify
WORKDIR /vuetify

# Install depencies
COPY package*.json ./
RUN npm install

# Copy project and build
COPY . .

WORKDIR /vuetify
RUN chmod a+x docker-entrypoint.sh
ENTRYPOINT [ "sh", "-c", "./docker-entrypoint.sh" ]
