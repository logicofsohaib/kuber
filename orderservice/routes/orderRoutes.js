const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new order
router.post('/', async (req, res) => {
  const order = new Order(req.body);
  try {
    await order.save();
    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
