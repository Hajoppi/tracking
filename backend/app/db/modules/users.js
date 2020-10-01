const Bcrypt = require('bcrypt');

module.exports = async (db, pool) => {
  db.createUser = async user => {
    const hash = await Bcrypt.hash(user.password, 10);
    const {
      rows,
    } = await pool.query(
      'INSERT INTO users (email, username, password, accept) values ($1, $2, $3, $4) returning id',
      [user.email.toLowerCase(), user.username, hash, user.accept]
    );
    const { id } = rows[0];
    //initialize points
    await pool.query('INSERT INTO points (user_id, points) values ($1,0)', [
      id,
    ]);
    await db.addAssociations(id, user.associationList);
    return await db.createActivation(id);
  };
  db.addEventActicity = async (userId, eventId) => {
    await pool.query(
      'INSERT INTO user_event_activity (user_id, event_id) VALUES($1, $2)',
      [userId, eventId, points]
    );
    await db.updateUserScore(userId);
  };
  db.createActivation = async userId => {
    const oldActivation = await pool.query(
      'SELECT id from account_activation WHERE user_id=$1 and expire_date > now()',
      [userId]
    );
    if (oldActivation.rows.length > 0) {
      return oldActivation.rows[0].id;
    }
    const activationIdRows = await pool.query(
      'INSERT into account_activation (user_id) values ($1) returning id',
      [userId]
    );
    return activationIdRows.rows[0].id;
  };

  db.updateUserPassword = async (userId, userObj) => {
    const hash = await Bcrypt.hash(userObj.password, 10);
    return await pool.query('UPDATE users SET password=$2 WHERE id=$1', [
      userId,
      hash,
    ]);
  };

  db.updateUsername = async (userId, userObj) => {
    return await pool.query('UPDATE users SET username=$2 WHERE id=$1', [
      userId,
      userObj.username,
    ]);
  };

  db.activateUser = async uuid => {
    const user = await pool.query(
      'SELECT user_id from account_activation WHERE id=$1 and expire_date > now()',
      [uuid]
    );
    if (user.rows.length > 0) {
      const id = user.rows[0].user_id;
      await pool.query('UPDATE users SET active=true WHERE id=$1', [id]);
      await pool.query(
        'UPDATE account_activation SET expire_date=now() WHERE user_id=$1',
        [id]
      );
      return id;
    }
    throw Error();
  };

  db.getUser = async email => {
    const {
      rows,
    } = await pool.query(
      'SELECT id, password, active, scope FROM users WHERE email=$1',
      [email.toLowerCase()]
    );
    return rows[0];
  };

  db.getUserById = async id => {
    const {
      rows,
    } = await pool.query(
      'SELECT id, username, email, active, scope, info_seen FROM users WHERE id=$1',
      [id]
    );
    return rows[0];
  };

  db.getUserByUsername = async username => {
    const {
      rows,
    } = await pool.query(
      'SELECT id, username, email, active, scope FROM users WHERE username=$1',
      [username]
    );
    return rows[0];
  };

  db.userActivationCleanup = async () => {
    return pool.query(
      'DELETE FROM users WHERE id in (SELECT users.id FROM users, account_activation WHERE users.id=account_activation.user_id and users.active=false and account_activation.expire_date < now())'
    );
  };
};
