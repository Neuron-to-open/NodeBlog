// routes/auth.js



const express = require("express") ;

const router = express.Router() ;

const authController = require("../controllers/authController") ;

// 注册控制器
router.post('/register', authController.register) ;


// 登录控制器
router.post('/login', authController.login) ;


module.exports = router ;