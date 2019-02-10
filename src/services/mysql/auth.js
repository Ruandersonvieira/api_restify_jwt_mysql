
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

const auth = deps => {
  return {
    authenticate: (email, password) => {
      return new Promise((resolve, reject) => {
        const { connection, errorHandler } = deps;
        const queryString = 'SELECT id, email, ws_cliente_idws_cliente FROM users WHERE email = ? AND password = ?';
        const queryData = [email, sha1(password)];

        connection.query(queryString, queryData, (error, results) => {
          if (error || !results.length) {
            errorHandler(error, 'Falha ao localizar o usuário', reject)
            return false
          }

          const { email, id, ws_cliente_idws_cliente } = results[0]

          const token = jwt.sign(
            { email, id, ws_cliente_idws_cliente },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 24 }
          );
          
          resolve({ token });
        })
      })
    }
  }
}

module.exports = auth
