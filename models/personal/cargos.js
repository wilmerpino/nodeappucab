var Sequelize = require("sequelize");
var connect = require('../connectDB');


var Cargos = connect.define('cargo', {
    id: {
        type: Sequelize.INTEGER,
        field: 'cod_cargo', // Will result in an attribute that is firstName when user facing but first_name in the database        
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nombre: {
        type: Sequelize.STRING(50),
        field: 'nombre_cargo',
        allowNull: false,
        validate: {
            len: 50
        }
    },
    desc: {
        type: Sequelize.TEXT,
        field: 'descripcion_cargo',
        allowNull: true        
    },
    tipo: {
        type: Sequelize.STRING(1),
        field: 'tipo',
        allowNull: false,
        validate: {
            len: 1,
            isIn: [['D', 'A']]
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
    id_usuario: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            len: 30
        }
    },
    fecha: {
        type: Sequelize.DATE,
        field: 'fecha_hora_modificacion',
        defaultValue: Sequelize.NOW,
        validate: {
            isDate: true,
            //isAfter: "1990-01-01"
        }
    }
},   
{
    freezeTableName: false,
    tableName: 'personal.cargo',
});



module.exports.Cargos = Cargos;