module.exports = {
    apps: [
        {
            name: "api",
            script: "./dist/main.js",
            watch: false,
            env_development: {
                "NODE_ENV": "development",
                "MYSQL_HOST": "ec2-100-25-45-111.compute-1.amazonaws.com",
                "MYSQL_PORT": "3306",
                "MYSQL_USER": "root",
                "MYSQL_USER_PASSWORD": "root",
                "MYSQL_DATABASE": "cms",
                "MYSQL_CONNECTION_LIMIT": 9,

                "SALT_ROUNDS": 10,
                "SECRET_KEY": "nqygkOnkrQtHJg47Bhdzg7YtvM",
                "UPLOADS_DIR": "uploads",
                "PORT": 8000,
                "ALLOWED_HOST": "all"
            }
        }
    ]
};
