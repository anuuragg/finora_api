const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const token = req.cookies.token || req.headers["authorization"];
    if (!token) return res.json({error: "Token not found, login required"});
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.json({error: "Token not found, login required"});
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;