module.exports = {
  apps: [
    {
      name: 'smart-ui',
      script: 'smart-ui-server.js'
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: '47.99.134.126',
      ref: 'origin/main',
      repo: 'git@github.com:gymaerl/smart-ui.git',
      path: '/workspace/smart-ui',
      'post-deploy': 'git reset --hard && git checkout main && git pull && npm i --production=false && pm2 startOrReload ecosystem.config.js', // -production=false 下载全量包
      env: {
        NODE_ENV: 'production'
      }
    }
  }
}