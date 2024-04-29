const express = require('express');
const router = express.Router();
const horrorStory = require('../controllers/horrorStory');

router.post('/horrorStory', horrorStory.horrorStory);

module.exports = router;