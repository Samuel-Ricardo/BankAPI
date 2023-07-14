FROM node:18-slim

WORKDIR /home/node/app

COPY package*.json ./
RUN npm ci

COPY . .

USER node

CMD ["npm", "start"]
