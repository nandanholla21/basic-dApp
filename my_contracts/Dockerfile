FROM node:23-alpine

WORKDIR /dapp/my_contracts

COPY . /dapp/my_contracts/

RUN npm install

EXPOSE 8545
CMD [ "npx","hardhat","node" ]