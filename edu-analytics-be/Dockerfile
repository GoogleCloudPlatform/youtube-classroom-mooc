
FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

RUN npm ci

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]