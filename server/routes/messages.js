const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/messageController');

router.get('/', MessageController.getAllMessages);

module.exports = router;
