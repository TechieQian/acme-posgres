var pg = require('pg');
var postgresUrl = 'postgres://localhost/acmedb';
var client = new pg.Client(postgresUrl);

//console.log(process.env.DATABASE_URL)

//var client = new pg.Client(process.env.DATABASE_URL);

client.connect();

function query(sql, params) {
  console.log('running sql', sql, params)
  return new Promise(function(resolve, reject) {
    client.query(sql, params, function(err, result) {
      if (err) reject(err)
      else resolve(result.rows)
    })
  })
}

function sync(){
  var sql = `
    DROP TABLE IF EXISTS users;
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      name CHARACTER VARYING(255) UNIQUE,
      isManager BOOLEAN
    );
  `;
  return query(sql, null)
}

function seed() {
  var sql = `
    TRUNCATE TABLE users;
    INSERT INTO users (name, isManager) VALUES ('Tom Hanks', false);
    INSERT INTO users (name, isManager) VALUES ('Beyonce', false);
  `;
  return query(sql, null)
}

function getUsers(managerOnly) {
  var sql = `
    SELECT * FROM users
  `;
  if (managerOnly) {
    sql+= 'WHERE isManager = TRUE'
  }
  sql+=';'
  return query(sql)
}

function createUser(user) {
  var sql = `
    INSERT INTO users (name, isManager) VALUES ($1, $2);
  `;
  return query(sql, [user.name, user.manager == "true"])
}

function updateUser(id, manager) {
  var sql = `
    UPDATE users SET isManager = $2 WHERE id = $1;
  `;
  return query(sql, [id, manager])
}

function deleteUser(id) {
  var sql = `
    DELETE FROM users WHERE id = $1;
  `;
  return query(sql, [id])
}

module.exports = {
  sync,
  seed,
  getUsers,
  createUser,
  updateUser,
  deleteUser
}
