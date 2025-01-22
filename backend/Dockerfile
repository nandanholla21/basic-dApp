FROM node:23-alpine

WORKDIR /dapp/backend

COPY . /dapp/backend/

RUN npm install

EXPOSE 3000
CMD [ "node","index.js"]