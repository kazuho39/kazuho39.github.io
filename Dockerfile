FROM node:20.12.1

RUN apt-get update && apt-get install -y xdg-utils

WORKDIR /app
