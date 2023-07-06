FROM node:18 as backend-builder

RUN mkdir -p /tmp/build
WORKDIR /tmp/build

COPY package.json /tmp/build
RUN npm install

COPY tsconfig.json /tmp/build
COPY ./*.ts  /tmp/build
RUN npx tsc

FROM node:18 as backend-api

RUN mkdir -p /usr/app/backend/projects
RUN mkdir -p /usr/app/backend/storage

WORKDIR /usr/app

#copy frontend (angular) static files
COPY  --from=backend-builder /tmp/build/*.js  /usr/app/backend/
COPY ./package.json         /usr/app/backend/
COPY ./package-lock.json    /usr/app/backend/
COPY ./tsconfig.json        /usr/app/backend/

WORKDIR /usr/app/backend

RUN npm install --only=prod

EXPOSE 3000

CMD node /usr/app/backend/index.js
