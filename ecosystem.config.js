module.exports = {
    apps: [
        {
            name: "app",
            script: "npm start",
            watch: false,
            env_development: {
                "NODE_ENV": "development"
            }
        }
    ]
};
