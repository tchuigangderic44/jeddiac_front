module.exports = {
  apps: [
    {
      name: "jeddiac-api",
      script: "app.js",
      cwd: "/var/www/jeddiac",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        HOST: "0.0.0.0"
      }
    }
  ]
};
