var config = {
  enableCluster: true,
  sessionSecret: 'private npm session secret',
  database: {
    db: 'unpm',
    username: 'root',
    password: '',

    // the sql dialect of the database
    // - currently supported: 'mysql', 'sqlite', 'postgres', 'mariadb'
    dialect: 'mysql',

    // custom host; default: 127.0.0.1
    host: '127.0.0.1',

    // custom port; default: 3306
    port: 3306,

    // use pooling in order to reduce db connection overload and to increase speed
    // currently only for mysql and postgresql (since v1.5.0)
    pool: {
      maxConnections: 10,
      minConnections: 0,
      maxIdleTime: 30000
    }
  },
  // logoURL: '/img/logo.png',
  registryHost: '47.99.219.124:7001',
  // badgeSubject: 'npm',
  npmClientName: 'npm', // use `${name} install package`
  badgeSubject: 'npm',
  syncByInstall: true,
  // sync mode select
  // none: do not sync any module, proxy all public modules from sourceNpmRegistry
  // exist: only sync exist modules
  // all: sync all modules
  syncModel: 'exist', // 'none', 'all', 'exist'
  // sync devDependencies or not, default is false
  syncDevDependencies: false,

  // registry scopes, if don't set, means do not support scopes
  scopes: [ '@lp','@lp-test' ],
  // default system admins
  admins: {
    liupeng: 'liupeng110112@yeah.net'
  }
}

module.exports = config;
