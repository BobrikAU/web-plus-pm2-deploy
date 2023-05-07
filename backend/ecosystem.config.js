const dotenvConfig = require('dotenv').config;

dotenvConfig({ path: '.env' });
dotenvConfig({ path: '.env.deploy' });

const {
  JWT_SECRET, DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_PATH, DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-api',
    script: './src/app.ts',
    interpreter: './node_modules/.bin/ts-node',
    env_production: {
      NODE_ENV: 'production',
      JWT_SECRET,
    },
  }],
  deploy: {
    production: {
      key: '~/.ssh/id_ed25519new.pub',
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'touch AAAAA.txt && cd backend && npm i',
    },
  },
};
