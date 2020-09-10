FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD secretadmin

ADD ["src/database/migration/schema.sql", "/usr/sql/schema.sql"]
ADD ["src/database/migration/insert.sql", "/usr/sql/insert.sql"]

