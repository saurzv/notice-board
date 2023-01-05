const express = require("express");
const router = express.Router();

const {
    getAllNotices,
    getNotice,
    createNotice,
    updateNotice,
    deleteNotice,
} = require("../services/main");

router.route("/").get(getAllNotices).post(createNotice);
router.route("/:id").get(getNotice).put(updateNotice).delete(deleteNotice);

module.exports = router;
