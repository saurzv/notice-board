const Notice = require("../models/Notice");
const { StatusCodes } = require("http-status-codes");

const createNotice = async (req, res) => {
    req.body.createdBy = req.user.id;
    const notice = await Notice.create(req.body);
    res.status(StatusCodes.CREATED).json({ notice });
};

const getAllNotices = async (req, res) => {
    const notices = await Notice.find({ createdBy: req.user.id }).sort(
        "createdAt"
    );
    res.status(StatusCodes.OK).json({ notices, count: notices.length });
};
const getNotice = async (req, res) => {
    const {
        user: { id },
        params: { id: noticeId },
    } = req;

    try {
        const notice = await Notice.findOne({
            _id: noticeId,
            createdBy: id,
        });
        res.status(StatusCodes.OK).json({ notice });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "err",
            message: "No notice found with this id",
        });
    }
};

const updateNotice = async (req, res) => {
    const {
        body: { notice },
        params: { id: noticeId },
        user: { id },
    } = req;
    if (notice === "") {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "err",
            message: "notice cannot be empty",
        });
        return;
    }
    try {
        const updatedNotice = await Notice.findByIdAndUpdate(
            { _id: noticeId, createdBy: id },
            req.body,
            { new: true, runValidators: true }
        );
        res.status(StatusCodes.OK).json({ updatedNotice });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "err",
            message: "No notice found with this id",
        });
    }
};

const deleteNotice = async (req, res) => {
    const {
        params: { id: noticeId },
        user: { id },
    } = req;
    try {
        const deletedNotice = await Notice.findByIdAndRemove({
            _id: noticeId,
            createdBy: id,
        });
        res.status(StatusCodes.OK).json({
            status: "Success",
            message: "Notice deleted successfully",
        });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: "err",
            message: "No notice found with this id",
        });
    }
};

module.exports = {
    createNotice,
    getAllNotices,
    getNotice,
    updateNotice,
    deleteNotice,
};
