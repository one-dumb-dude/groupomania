const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        next();
    } catch (error) {
        res.status(400).json({message: 'Invalid token.'});
    }
}

module.exports = verifyToken;
