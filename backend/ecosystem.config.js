module.exports = {
  apps : [{
    name: 'api-org-dir',
    script: './main.js',
    env:{
      NODE_ENV: "development"
    },
    env_staging:{
      NODE_ENV: "staging"
    },
    env_production:{
      NODE_ENV: "production"
    }
  }],
}