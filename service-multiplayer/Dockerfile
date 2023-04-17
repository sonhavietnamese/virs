FROM node:18

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm install --silent --progress=false --production

COPY . .