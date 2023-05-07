require('dotenv').config();

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
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'post-deploy': 'npm i',
    },
  },
};
