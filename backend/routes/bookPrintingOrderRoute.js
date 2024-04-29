// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const bookPrintingOrderRoute = require('../controllers/storyBookPrintingOrder');

router.post('/bookPrintingOrder', bookPrintingOrderRoute.book_printing_orders);

module.exports = router;
