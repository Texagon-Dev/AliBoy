// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const actionStory = require('../controllers/actionStory');

router.post('/actionStory', actionStory.actionStory);

module.exports = router;
