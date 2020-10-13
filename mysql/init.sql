GRANT ALL PRIVILEGES ON *.* TO root@'%';
ALTER USER root@'%' IDENTIFIED WITH mysql_native_password BY 'root';
USE cms;

SOURCE /schema/schema.sql;
SOURCE /schema/insert.sql;