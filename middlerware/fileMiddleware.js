// 根目录/middleware/fileMiddleware.js

const multer = require("multer") ;

const fs = require("fs") ;

const path = require("path") ;

// 文件上传配置
const storage = multer.diskStorage({
    // 上传的目标地址，这里就上传到本地根目录的tempFiles目录
    destination:(req, file, cb) => {
        const tempFolderPath = path.join(__dirname, "../tempFiles") ;
        // 判断文件夹是否存在，不存在就创建
        if (!fs.existsSync(tempFolderPath)) {
            fs.mkdirSync(tempFolderPath) ;
        }
        cb(null, tempFolderPath) ;
    },
    // 定义上传的文件名
    filename:(req, file, cb) => {
        const ext = path.extname(file.originalname) ;
        const filename = `${Date.now()}_${Math.floor(Math.random() * 10000)}${ext}` ;
        cb(null, filename) ;
    },
}) ;

// 文件上传中间件
const upload = multer({ storage }) ;
const uploadMiddleware = upload.single("file") ;

module.exports = uploadMiddleware
