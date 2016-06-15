var Sequelize = require("sequelize");
var connect = require('../connectDB');
    

var gradoAcademico = connect.define('gradoAcademico', {
    id: {
        type: Sequelize.STRING(3),
        field: 'id_grado_academico', // Will result in an attribute that is firstName when user facing but first_name in the database        
        primaryKey: true,
        allowNull: false,
        validate: {
            len: 3
        }
    },
    desc: {
        type: Sequelize.STRING(50),
        field: 'grado_academico',
        allowNull: false,
        validate: {
            len: 50
        }
    }    
},   
{
    freezeTableName: false,
    tableName: 'personal.grado_academico',
});

module.exports.gradoAcademico = gradoAcademico;