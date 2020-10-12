module.exports = {
    apps : [{
        name: "cms-backend",
        script: "./dist/main.js",
        env_development: {
            NODE_ENV: "development",
            "DB_USER": "ubuntu",
            "DB_HOST": "localhost",
            "DB_NAME": "avant_db",
            "DB_PASSWORD": "12345",
            "DB_PORT":  5432,
            "SECRET_ACCESS_KEY": "VEk2q81Yaj4x2C7Zr4maGSH/jzlkg2W7NFIPC7r/",
            "ACCESS_KEY_ID":  "AKIAI4EBX5U7CUDNWUJQ",
            "REGION": "ap-south-1",
            "JWT_SECRET": "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"
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}

