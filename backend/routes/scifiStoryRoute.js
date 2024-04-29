const express = require('express');
const router = express.Router();
const scifiStory = require('../controllers/scifiStory');

router.post('/scifiStory', scifiStory.scifiStory);

module.exports = router;