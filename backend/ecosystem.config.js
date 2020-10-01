module.exports = {
  apps: [
    {
      name: 'aaltox-staging',
      script: './workspace/aaltox-staging/backend/index.js',
      watch: true,
      env: {
        PORT: 3002,
        SECRET_KEY: 'lol',
        CALENDAR_API_KEY: 'a',
        CALENDAR_ID: 'a',
        NODE_URI: '0.0.0.0',
        PGHOST: 'localhost',
        PGUSER: 'aaltox',
        PGPASSWORD: 'a',
        PGDATABASE: 'a',
        PGPORT: 5432,
        SMTP_HOST: 'smtp.ayy.fi',
        SMTP_PORT: 25,
      },
    },
  ],
};
