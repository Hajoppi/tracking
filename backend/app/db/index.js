const { Pool } = require('pg');
const pool = new Pool();

const db = (module.exports = {});

pool.on('error', (err, _client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const init = async () => {
  require('./modules/users')(db, pool);
};

init();
