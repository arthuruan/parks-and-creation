FROM node:16 as api

WORKDIR /usr/app

COPY package.json .

COPY ./src ./src
COPY ./etc ./etc

RUN apt-get update && apt-get install nano
RUN yarn install
RUN yarn build
RUN mkdir tmp

EXPOSE ${API_PORT}

CMD ["/bin/bash", "/usr/app/etc/cont-init.d/10-config"]