const express = require('express');
const router = express.Router();
const verifyJwt = require('../middleware/jwtAuth');
const multer = require('../middleware/multer-config');

const postController = require('../controllers/postController');

router.get('/unread-count', verifyJwt, postController.getUnreadPostsCount);
router.get('/:postId', verifyJwt, postController.getAPost)
router.get('/', verifyJwt, postController.getPosts);
router.post('/', verifyJwt, multer, postController.createPost);
router.post('/:postId/read', verifyJwt, postController.markAsRead);

module.exports = router;
