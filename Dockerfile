RUN npm install

RUN npm run build

RUN npm link webpack

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

COPY --from=production /usr/src/app/dist ./dist

CMD ["node", "dist/main"]