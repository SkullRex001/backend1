const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");



const validateToken = asyncHandler((req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if(!authHeader) {
        res.status(401);
        throw new Error("User is not authorized or token is missing here")
    }

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }

            req.user = decoded.user;
            next();
        });

    }

});
module.exports = validateToken;