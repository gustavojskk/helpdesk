// models/Ticket.js
const db = require('../config/db');

const Ticket = {
  create: (ticket, callback) => {
    const query = 'INSERT INTO tickets (title, description, status, priority, customer_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [ticket.title, ticket.description, ticket.status, ticket.priority, ticket.customer_id], callback);
  },

  findAll: (callback) => {
    const query = 'SELECT * FROM tickets';
    db.query(query, callback);
  },

  findById: (id, callback) => {
    const query = 'SELECT * FROM tickets WHERE id = ?';
    db.query(query, [id], callback);
  },

  update: (id, ticket, callback) => {
    const query = 'UPDATE tickets SET title = ?, description = ?, status = ?, priority = ?, customer_id = ? WHERE id = ?';
    db.query(query, [ticket.title, ticket.description, ticket.status, ticket.priority, ticket.customer_id, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM tickets WHERE id = ?';
    db.query(query, [id], callback);
  },
};

module.exports = Ticket;
