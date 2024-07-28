// models/User.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  create: async (user, callback) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [user.name, user.email, hashedPassword, user.role], callback);
  },

  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], callback);
  },
};

module.exports = User;
