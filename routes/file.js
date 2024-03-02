// routes/file.js

const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");


// 导入
const uploadMiddleware = require("../middlerware/fileMiddleware");
// 目前只有一个上传文件接口
router.post("/upload", uploadMiddleware, fileController.uploadFile);

module.exports = router;