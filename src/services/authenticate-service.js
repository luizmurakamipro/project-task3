const jwt = require('jsonwebtoken');

exports.authorize = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token)
        res.status(401).json({auth: false, message: 'Acesso restrito'});
    else {
        const secretKey = 'seguro';
        jwt.verify(token, secretKey, (error, decode) => {
            if (error)
                res.status(401).json({auth:false, message: 'Token inválido'});
            else {
                req.userId = decode.id;
                next();
            }
        });
    }
}