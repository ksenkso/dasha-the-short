module.exports = {
  apps: [
    {
      name: 'dasha-the-short',
      script: 'dist/index.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
