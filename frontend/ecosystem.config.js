const dotenvConfig = require('dotenv').config;

dotenvConfig({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_REF, DEPLOY_PATH, DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-frontend',
    // script: './src/app.ts',
    // interpreter: './node_modules/.bin/ts-node',
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
      'post-deploy': 'pwd && cd ../source/frontend && pwd && npm -v && npm i && npm run build',
    },
  },
};