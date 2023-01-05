const userDB = require("../models/User");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const auth = async (req, res, next) => {
    const authHeader = await req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            status: "err",
            message: "User unauthorized",
        });
        return;
    }
    const token = await authHeader.split(" ")[1];
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: payload.id, username: payload.username };
        next();
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            status: "err",
            message: "User unauthorized",
        });
    }
};

module.exports = auth;
