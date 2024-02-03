FROM node:20-alpine

WORKDIR /stockcontrol_web

COPY package.json yarn.lock /stockcontrol_web/

RUN apk update && \
    yarn install 

COPY . /stockcontrol_web

RUN yarn build

EXPOSE 5173

CMD ["yarn", "run", "dev", "--host", "0.0.0.0"]