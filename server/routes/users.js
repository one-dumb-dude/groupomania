const express = require('express');
const verifyJWT = require('../middleware/jwtAuth');
const router = express.Router();

const userController = require('../controllers/userController');


router.post('/signup', userController.signUpUser);
router.post('/login', userController.loginUser);
router.delete('/:userId', verifyJWT, userController.deleteUser);

module.exports = router;
