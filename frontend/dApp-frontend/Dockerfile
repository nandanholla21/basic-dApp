FROM node:22-alpine

WORKDIR /app

COPY . /app/

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--proxy-config", "proxy.conf.json"]
