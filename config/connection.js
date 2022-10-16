const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
console.log(process.env.DB_NAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_USER);

if (process.env.JAWSDB_URL) { 
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: "localhost",
            dialect: "mysql",
            port: 3306 // only use this port for mysql
        }
    );
}

module.exports = sequelize;