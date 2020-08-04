FROM node:12-alpine
ENV NODE_ENV prod
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD [ "npm", "run", "prod"]
EXPOSE 1234
