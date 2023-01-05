const Notice = require("../models/Notice");
const { StatusCodes } = require("http-status-codes");

const createNotice = async (req, res) => {
    req.body.createdBy = req.user.id;
    const notice = await Notice.create(req.body);
    res.status(StatusCodes.CREATED).json({ notice });
};

const getAllNotices = async (req, res) => {
    const allNotices = await Notice.find();
    res.json(allNotices);
};
const getNotice = async (req, res) => {
    res.send("one Notice");
};

const updateNotice = async (req, res) => {
    res.send("Update Notices");
};

const deleteNotice = async (req, res) => {
    res.send("Delete Notices");
};

module.exports = {
    createNotice,
    getAllNotices,
    getNotice,
    updateNotice,
    deleteNotice,
};
