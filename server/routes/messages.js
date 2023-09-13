const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const MessageController = require('../controllers/messageController');

router.get('/', MessageController.getAllMessages);
router.post('/', multer, MessageController.insertAMessage);

module.exports = router;
