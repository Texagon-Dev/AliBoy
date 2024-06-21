const express = require('express');
const router = express.Router();
const mysteryStory = require('../controllers/mysteryStory');

router.post('/mysteryStory', mysteryStory.mysteryStory);

module.exports = router;