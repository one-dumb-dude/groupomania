const express = require('express');
const router = express.Router();
const verifyJwt = require('../middleware/jwtAuth');
const multer = require('../middleware/multer-config');

const postController = require('../controllers/postController');

router.get('/', verifyJwt, postController.getPosts);
router.post('/', verifyJwt, postController.createPost);

module.exports = router;
