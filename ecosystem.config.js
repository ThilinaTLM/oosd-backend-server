module.exports = {
    apps: [{
        name: "cms-api",
        script: "./dist/main.js",
        env_development: {
            NODE_ENV: "development",
            "MYSQL_HOST": "ec2-54-237-84-93.compute-1.amazonaws.com",
            "MYSQL_PORT": "3307",
            "MYSQL_USER": "root",
            "MYSQL_USER_PASSWORD": "root",
            "MYSQL_DATABASE": "cms",
            "MYSQL_CONNECTION_LIMIT": 9,
            "SALT_ROUNDS": 10,
            "SECRET_KEY": "nqygkOnkrQtHJg47Bhdzg7YtvM",
            "UPLOADS_DIR": "uploads",
            "PORT": 8000,
            "ALLOWED_HOST": "all"
        },
        env_production: {
            NODE_ENV: "production"
        }
    }]
};
