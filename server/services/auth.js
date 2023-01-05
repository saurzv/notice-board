const userDB = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "err",
            message: "Please provide username and password",
        });
        return;
    }

    const user = await userDB.findOne({ username });
    if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            status: "err",
            message: "Please provide correct username and password",
        });
        return;
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            status: "err",
            error: "Please provide correct username and password",
        });
        return;
    }

    const token = await user.createJWT();
    res.status(StatusCodes.OK).json({ username: user.username, token });
};
const register = async (req, res) => {
    try {
        const user = await userDB.create({ ...req.body });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json(token);
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "err",
            message: err.message,
        });
    }
};

module.exports = {
    login,
    register,
};
