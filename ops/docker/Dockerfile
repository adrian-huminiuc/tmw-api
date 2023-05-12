FROM node:16.15-buster AS base

RUN apt-get update  \
    && apt-get install -y procps

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

WORKDIR '/home/node/service'

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY . .

RUN npm run build
