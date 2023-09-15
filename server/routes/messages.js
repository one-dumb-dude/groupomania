const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/jwtAuth');
const multer = require('../middleware/multer-config');

const MessageController = require('../controllers/messageController');

router.get('/', verifyJWT, MessageController.getAllMessages);
router.post('/', verifyJWT, multer, MessageController.insertAMessage);

module.exports = router;
