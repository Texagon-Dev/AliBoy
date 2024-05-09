// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const rewriteParagraph = require('../controllers/rewriteParagraph');

router.post('/rewriteParagraph', rewriteParagraph.rewriteParagraph);

module.exports = router;
