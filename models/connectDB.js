var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../conf/config.json')[env];


var connect = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    quoteIdentifiers: false,
    freezeTableName: false,
    dialectOptions: {
        ssl: false
    },    
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false,
        paranoid: true,
        underscore: true,
        //schema: "personal,sgs,presupuesto"      
    }
    // SQLite only
    //storage: 'path/to/database.sqlite'
});

// Or you can simply use a connection uri
//var sequelize = new Sequelize('postgres://user:postgres@200.2.10.253:5432/ucabg');

connect.authenticate().then(function (err) {
    console.log('Conectado a Postgres....en cai-dev');
}).catch(function (err) {
    console.log('Unable to connect to the database:', err);
});

module.exports = connect;