FROM node:14

WORKDIR /app
ADD ./ /app

# ENV http_proxy=xxx https_proxy=xxx

RUN yarn install

ENTRYPOINT ["yarn", "run", "dev"]

# docker build . -t smart-ui:v0.1
# docker run -itd --rm --name=smart-ui -p 3000:3000 --env no_proxy=localhost,127.0.0.1 smart-ui:v0.1
