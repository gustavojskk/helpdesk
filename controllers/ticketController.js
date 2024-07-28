// controllers/ticketController.js
const { body, validationResult } = require('express-validator');
const Ticket = require('../models/Ticket');

exports.createTicket = [
  body('title').not().isEmpty(),
  body('description').not().isEmpty(),
  body('status').not().isEmpty(),
  body('priority').not().isEmpty(),
  body('customer_id').isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newTicket = req.body;
    Ticket.create(newTicket, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send({ id: result.insertId, ...newTicket });
    });
  },
];

exports.getAllTickets = (req, res) => {
  Ticket.findAll((err, tickets) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(tickets);
  });
};

exports.getTicketById = (req, res) => {
  const ticketId = req.params.id;
  Ticket.findById(ticketId, (err, ticket) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(ticket);
  });
};

exports.updateTicket = [
  body('title').not().isEmpty(),
  body('description').not().isEmpty(),
  body('status').not().isEmpty(),
  body('priority').not().isEmpty(),
  body('customer_id').isInt(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const ticketId = req.params.id;
    const updatedTicket = req.body;
    Ticket.update(ticketId, updatedTicket, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send(result);
    });
  },
];

exports.deleteTicket = (req, res) => {
  const ticketId = req.params.id;
  Ticket.delete(ticketId, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(result);
  });
};
