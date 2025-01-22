FROM node:23-alpine

WORKDIR /dapp/frontend

COPY . /dapp/frontend/


RUN npm install

RUN npm install -g @angular/cli

EXPOSE 4200

CMD [ "ng","serve"]