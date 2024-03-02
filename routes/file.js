// routes/file.js
const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

// 目前只有一个上传文件接口
router.post("/file", fileController.uploadFile);

module.exports = router;