// controllers/userController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');

dotenv.config();

exports.register = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newUser = req.body;
    User.create(newUser, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send({ id: result.insertId, ...newUser });
    });
  },
];

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, async (err, users) => {
    if (err) return res.status(500).send(err);
    if (users.length === 0) return res.status(400).send('Email not found');

    const user = users[0];
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.header('Authorization', `Bearer ${token}`).send({ token });
  });
};