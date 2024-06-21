const express = require('express');
const router = express.Router();
const comedyStory= require('../controllers/comedyStory');

router.post('/comedyStory', comedyStory.comedyStory);

module.exports = router;