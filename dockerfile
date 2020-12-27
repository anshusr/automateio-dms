FROM node:12

WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci --only=production

COPY ./src ./src
COPY ./views ./views
COPY ./bin ./bin
COPY ./app.js ./

EXPOSE 3000

CMD [ "node", "./bin/www" ]
