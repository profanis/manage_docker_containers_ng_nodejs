FROM node:8.12.0

COPY entrypoint.sh entrypoint.sh
RUN ["chmod", "+x", "entrypoint.sh"]


COPY package.json package.json
COPY yarn.lock yarn.lock

COPY dist dist
RUN yarn install --production

EXPOSE 3001
ENTRYPOINT ["/entrypoint.sh"]