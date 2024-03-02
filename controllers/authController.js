const User = require("../models/User") ;
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;
// 注册
async function register (req, res) {
    // todo
    const {username , password, nickname} = req.body ;
    
    console.log(username, password, nickname) ;
    //
    try{
        //检查用户名是否已存在
        const existingUser = await User.findOne( {where: {username} }) ;
        if (existingUser) {
            return res.status(400).json( {msg: "USername already exists!"})
        }

        // 对密码进行加密
        const hashedPasswd = await bcrypt.hash(password, 10) ;
        // 创建新用户
        await User.create( {username, password: hashedPasswd, nickname} ) ;

        res.status(201).json({msg: "User created sucessfully!"}) ;
    } catch(error) {
        res.status(500).json({msg: "Failed to register user!"}) ;     
    }
} 

// 登录
async function login(req, res) {
    // todo
    const {username, password} = req.body ;

    try {
        //检查用户名是否已存在
        const user = await User.findOne( {where: {username} }) ;
        if (!user) {
            return res.status(401).json( {msg: "Invalid username or password!"}) ;
        }

        // 检查密码是否匹配
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ msg: "Invalid username or password" });
        }
        // 更新用户的最后在线时间
        user.lastOnlineTime = new Date();
        await user.save();

        // 创建 token 访问令牌
        const token = jwt.sign({ userId: user.id }, "xxx-your-secret-key", {
            expiresIn: "24h",
        });
        // 返回包含令牌、账号名和用户名的响应
        res.json({ token, account: user.username, nickname: user.nickname, userId: user.id});

    } catch(error) {
        res.status(500).json({msg: "Failed to login user !"}) ;     
    }
} 


module.exports = {register, login} ;

