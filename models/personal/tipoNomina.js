var Sequelize = require("sequelize");
var connect = require('../connectDB');

var tipoNomina = connect.define('tipoNomina', {
    id: {
        type: Sequelize.INTEGER,
        field: 'cod_tipo_nomina', // Will result in an attribute that is firstName when user facing but first_name in the database        
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    desc: {
        type: Sequelize.STRING(50),
        field: 'descripcion_tipo_nomina',
        allowNull: false,
        validate: {
            len: 50
        }
    },    
     status: {
        type: Sequelize.BOOLEAN,
        field: 'estado',
        validate: {
            min: 0,
            max: 1
        }
    },
    tiempo_completo: {
        type: Sequelize.BOOLEAN,
        field: 'empleado_tiempo_completo',
        defaultValue: Sequelize.NOW,
        validate: {
            min: 0,
            max: 1
        }
    }
},   
{
    freezeTableName: false,
    tableName: 'personal.tipo_nomina',
});

module.exports.tipoNomina = tipoNomina;