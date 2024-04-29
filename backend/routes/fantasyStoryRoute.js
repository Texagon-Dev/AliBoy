const express = require('express');
const router = express.Router();
const fantasyStory= require('../controllers/fantasyStory');

router.post('/fantasyStory', fantasyStory.fantasyStory);

module.exports = router;