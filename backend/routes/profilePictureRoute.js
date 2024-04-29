// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const updateProfilePicture = require('../controllers/updateProfilePicture');

router.post('/updateProfilePicture', updateProfilePicture.uploadImageAndPath);

module.exports = router;
