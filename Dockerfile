FROM node:14
WORKDIR /usr/src/app

ENV MYSQL_HOST=sql12.freemysqlhosting.net
ENV MYSQL_USER=sql12369606
ENV MYSQL_USER_PASSWORD=PU3MyFCCf7
ENV MYSQL_DATABASE=sql12369606
ENV MYSQL_CONNECTION_LIMIT=9
ENV SALT_ROUNDS=10
ENV SECRET_KEY=nqygkOnkrQtHJg47Bhdzg7YtvM
ENV UPLOADS_DIR=uploads
ENV PORT=8000
ENV ALLOWED_HOST=all

COPY . .
RUN npm install
RUN npm install -g typescript

RUN npm run build
EXPOSE 8000
CMD [ "rm", "-drf", "uploads"]
CMD [ "mkdir", "-p", "uploads/attachments"]
CMD [ "node", "dist/main.js" ]
