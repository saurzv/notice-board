const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        min: 3,
    },
});

UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { id: this._id, username: this.username },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFE }
    );
};

UserSchema.methods.comparePassword = function (inputpassword) {
    const isSame = bcrypt.compare(inputpassword, this.password);
    return isSame;
};

module.exports = mongoose.model("users", UserSchema);
