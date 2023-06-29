#building dist.
FROM node:lts

WORKDIR /tmp

RUN mkdir -p /tmp/build/app
RUN mkdir -p /tmp/build/.git

COPY ./.git/ /tmp/build/.git/
COPY ./package.json /tmp/build/app/

WORKDIR /tmp/build/app/

RUN npm install -g pnpm;
RUN pnpm install

COPY ./ /tmp/build/app/

RUN npm run build


FROM nginx:latest as webapp-dynamic

WORKDIR /usr/app


COPY ./nginx.default.conf /etc/nginx/conf.d/default.conf

#copy frontend (angular) static files
COPY --from=0 /tmp/build/app/dist/model-param-manager/ /opt/frontend/config-manager/

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]
