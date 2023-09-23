const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Access denied. No token provided.'});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (req.is('multipart/form-data')) {
            console.log('this was form-data');
            return next();
        }

        let incomingUserId;

        if (req.method === 'GET') {
            incomingUserId = Number(req.query?.user_id);
        } else if (req.method === 'DELETE') {
            incomingUserId = Number(req.params?.userId)
        } else {
            incomingUserId = Number(req.body?.user_id);
        }

        if (incomingUserId !== decodedToken.user_id) {
            return res.status(403).send({message: 'Token mismatch'});
        }

        // Attaching properties to the 'req' object is a common convention in Express.
        // It allows middleware functions to preprocess the incoming request and provide
        // computed or retrieved data for subsequent middlewares or route handlers.
        // In this case, 'req.auth' represents the authenticated user for this request.

        req.auth = decodedToken;
        next();
    } catch (error) {
        return res.status(400).json({message: 'Invalid token.'});
    }
}

module.exports = verifyJWT;
