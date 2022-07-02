FROM node:16.0.0

# Create app directory, this is in our container/in our image
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g npm@latest && npm install

RUN yarn add husky@7 --dev \
  && npx husky-init \
  && npm exec -- github:typicode/husky-4-to-7 --remove-v4-config

RUN npm link webpack

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3001
CMD [ "node", "dist/main" ]
