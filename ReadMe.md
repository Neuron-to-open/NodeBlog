1.部署在本地服务

    1---git clone 至本地
    2---确保环境中包含node
    3---npm i安装所依赖的库
    4---npm run start开启后端服务
    5--|
       |- 登录：localhost:3000/auth/login  urlencoded {"username":"string" , "password":"string"}
       |- 注册：localhost:3000/auth/register urlencoded {"username":"string"  , "password":"string" , "nickname" : "string"}