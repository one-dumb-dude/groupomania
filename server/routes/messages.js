const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/messageController');

router.get('/', MessageController.getAllMessages);
router.post('/', MessageController.insertAMessage);

module.exports = router;
