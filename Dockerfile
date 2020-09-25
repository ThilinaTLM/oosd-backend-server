FROM node:14
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g typescript

ENV MYSQL_HOST=sql12.freemysqlhosting.net
ENV MYSQL_USER=sql12367113
ENV MYSQL_USER_PASSWORD=zyPRp3WVkH
ENV MYSQL_DATABASE=sql12367113
ENV MYSQL_CONNECTION_LIMIT=9
ENV SALT_ROUNDS=10
ENV SECRET_KEY=nqygkOnkrQtHJg47Bhdzg7YtvM
ENV UPLOADS_DIR=uploads
ENV PORT=8000
ENV ALLOWED_HOST=*

RUN npm run build
COPY . .
EXPOSE 8000
CMD [ "node", "dist/main.js" ]
