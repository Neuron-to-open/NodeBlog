const {Sequelize} = require("sequelize")

const sequelize = new Sequelize(
    //database name 
    "nodeblog",
    //database user_name
    "root",
    //passwd
    "your-password",
    //
    {
        host:"59.110.126.202",
        dialect:"mysql",
    }
);

module.exports = sequelize ;