FROM mysql

ENV MYSQL_DATABASE cms
ENV MYSQL_ROOT_PASSWORD 12345

COPY ./schema.sql /docker-entrypoint-initdb.d/
#COPY ./insert.sql /docker-entrypoint-initdb.d/

EXPOSE 3306