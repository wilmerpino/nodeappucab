var Sequelize = require("sequelize");
var connect = require('../connectDB');
var Personas = require('./personas');

var Unidades = connect.define('unidades', {
    id: {
        type: Sequelize.STRING(6),
        field: 'cod_unidad', // Will result in an attribute that is firstName when user facing but first_name in the database
        unique: true,
        primaryKey: true,
        allowNull: false,        
        validate: {
            len: 6
        }
    },
    nombre: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'nombre_unidad',
        validate: {
            len: 100
        }
    },
    siglas: {
        type: Sequelize.STRING(10),                
        validate: {
            len: 10
        }
    },
     tipo: {
        type: Sequelize.STRING(2),        
        field: 'tipo_departamento',
        validate: {
            len: 100,         
            isIn: [['AD','ES']]            
        
            
        }
    },
    cod_cuenta: {
        type: Sequelize.STRING(20),                
        validate: {
            len: 20
        }
    },
    status: {
        type: Sequelize.BOOLEAN,                
        validate: {
            min: 0,
            max: 1
        }
    }
    },
{
    freezeTableName: false,
    tableName: 'personal.unidad'/*,
    classMethods: {
        associate: function(db) {
            Organization.belongsToMany(db.User, { through: 'member', foreignKey: 'user_id' });
        },
    }*/
});

/*
Unidades.hasMany(Personas, {
    foreignKey: "cod_unidad",
    as: "personas",
    //este parametro es solo para la relacion N-N
    through: "personas_unidad"
});
*/
module.exports.Unidades = Unidades;
