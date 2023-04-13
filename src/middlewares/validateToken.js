const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token || token === 'Bearer ') {
        return res.status(403).json({message: 'Token não presente'})
    };

    const tokenJwt = token.slice(7);

    jwt.verify(tokenJwt, 'PMX980312', (error, decoded) => {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({message: 'Token expirado'})
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({message: 'Token inválido'})
            } else {
                return res.status(500).json({message: 'Internal server error'})
            }
        } else {
            req.userId = decoded.id;
            return next()
        };
    });
};

module.exports = validateToken;