const express = require("express");
const morgan = require("morgan");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 5000;

// connectDB
const MONGO_URI = process.env.MONGO_URI;
const connectDB = require("./server/database/connection");

const authenticateUser = require("./server/middleware/authentication");

// middleware
app.use(express.json());
app.use(morgan("tiny"));

// router
const authRouter = require("./server/routes/Auth");
const noticeRouter = require("./server/routes/Notice");

app.use("/api/notices", authenticateUser, noticeRouter);
app.use("/auth", authRouter);

const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}....`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();
