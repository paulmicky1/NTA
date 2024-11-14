
const express = require('express');
const router = express.Router();
const { googleLogin } = require('../services/authService');

router.post('/google', googleLogin);

module.exports = router;
    