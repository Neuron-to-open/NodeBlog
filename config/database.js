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
        host:"your-host",
        dialect:"mysql",
    }
);

module.exports = sequelize ;