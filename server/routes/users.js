const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', userController.getUser);
router.post('/signup', userController.signUpUser);
router.post('/login', userController.loginUser);

module.exports = router;
