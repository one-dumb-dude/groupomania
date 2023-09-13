const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    console.log(req.file)
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        let incomingUserId;

        if (req.method === 'GET') {
            incomingUserId = Number(req.query?.user_id);
        } else {
            incomingUserId = req.body?.user_id;
        }

        if (incomingUserId !== decodedToken.user_id) {
            return res.status(403).send({message: 'Token mismatch'});
        }

        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(400).json({message: 'Invalid token.'});
    }
}

module.exports = verifyJWT;
