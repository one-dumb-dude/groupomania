const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/jwtAuth');
const multer = require('../middleware/multer-config');

const commentController = require('../controllers/commentController');

router.get('/', verifyJWT, commentController.getComments);
router.post('/', verifyJWT, multer, commentController.createComment);

module.exports = router;
