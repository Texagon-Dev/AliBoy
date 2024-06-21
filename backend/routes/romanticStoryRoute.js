// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const romanticStory = require('../controllers/romanticStory');
const { actionStory } = require('../controllers/actionStory');

router.post('/romanticStory', romanticStory.romanticStory);

module.exports = router;


