// try to fix https://github.com/npm/registry/issues/87

const urllib = require('urllib');
const co = require('co');

const sleep = ms => cb => setTimeout(cb, ms);

// node resync_npm.js [registry]
const registry = process.argv[2] || require('../config').sourceNpmRegistry;
const url = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3045824731,3823619280&fm=200&gp=0.jpg';

co(function* () {
  const result = yield urllib.request(url);
  const items = result.data.toString().split('\n');
  let count = 0;
  for (let item of items) {
    item = item.trim().split(',');
    let name = item[0];
    name = name.substring(1, name.length - 1);
    if (!name) {
      continue;
    }

    const r = yield urllib.request(`${registry}/${name}/sync`, {
      method: 'PUT',
      dataType: 'json',
    });

    r.data = r.data || {};

    count++;
    console.log('#%d %s %s, log: %s',
      count, name, r.status, `${registry}/${name}/sync/log/${r.data.logId}`);
    if (count % 50 === 0) {
      yield sleep(10000);
    }
  }
  console.log('All %d packages sync done', items.length);
  process.exit(0);
}).catch(err => {
  console.error(err.stack);
  process.exit(1);
});
