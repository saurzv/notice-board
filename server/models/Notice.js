const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema(
    {
        notice: {
            type: String,
            required: [true, "Notice cannot be empty!"],
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "Please provide a user"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("notices", NoticeSchema);
