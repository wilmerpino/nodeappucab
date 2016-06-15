var Sequelize = require("sequelize");
var connect = require('../connectDB');

var Localidades = connect.define('localidades', {
    id: {
        type: Sequelize.STRING(12),
        field: 'id_localidad', // Will result in an attribute that is firstName when user facing but first_name in the database        
        primaryKey: true,
        allowNull: false,
        validate: {
            len: 12
        }
    },
    desc: {
        type: Sequelize.STRING(50),
        field: 'nombre_localidad',
        allowNull: false,
        validate: {
            len: 50
        }
    }    
},   
{
    freezeTableName: false,
    tableName: 'personal.localidades',
});
    
module.exports.Localidades = Localidades;


