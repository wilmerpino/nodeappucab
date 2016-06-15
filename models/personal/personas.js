var Sequelize = require("sequelize");
var connect = require('../connectDB');
var modelsLocalidades = require('./localidades');
var modelsGradoAcademico = require('./gradoAcademico');

var Personas = connect.define('personas', {
    id: {
        type: Sequelize.STRING(12),
        field: 'cedula', // Will result in an attribute that is firstName when user facing but first_name in the database
        unique: true,
        primaryKey: true,
        allowNull: false,        
        validate: {
            len: 12
        }
    },
    nombre: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'nombre_usuario',
        validate: {
            len: 50
        }
    },
    login: {
        type: Sequelize.STRING(30),
        field: 'login_windows',
        validate: {
            len: 30
        }
    },
    correo1: {
        type: Sequelize.STRING(30),
        field: 'correo_ucab',
        validate: {
            len: 30
        }
    },
    extension: {
        type: Sequelize.STRING(12),
        validate: {
            len: 30
        }
    },    
    telefono: {
        type: Sequelize.STRING(12),
        validate: {
            len: 12
        }
    },
    direccion: {
        type: Sequelize.STRING(100),
        validate: {
            len: 100
        }
    },
    supervisor: {
        type: Sequelize.STRING(12),
        field: 'id_supervisor',
        validate: {
            len: 12
        }
    },
    localidad: {
        type: Sequelize.STRING(8),
        field: 'id_localidad',
        validate: {
            len: 8
        }
    },
    correo2: {
        type: Sequelize.STRING(50),
        field: 'correo_personal',
        validate: {
            isEmail: true
        }
    },
    grado: {
        type: Sequelize.STRING(3),
        allowNull: false,
        field: 'id_grado_academico',
        validate: {
            len: 3
        }
    },
    genero: {
        type: Sequelize.STRING(1),
        field: 'sexo',
        validate: {
            isIn: {
                arg: [['F','M']],
                 msg: "Debe seleccionar Masculino o Femenino"
             }     
        }
    },
    fecha_nac: {
        type: Sequelize.DATE,
        field: 'fecha_nacimiento',
         validate: {
            isDate: true,
            isBefore: "2000-12-31"
        }
    },
    id_usuario: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            len: 30
        }
    },
    status: {
        type: Sequelize.STRING(1),
        allowNull: false,
        defaultValue: 'A',
        field: 'status_usuario',
        validate: {
            isIn: [['A','I']]            
        }
    },
    
},
{
    freezeTableName: false,
    tableName: 'personal.personas',
    //paranoid: false,
    getterMethods   : {
        correoUcab: function () {
            return this.correo1 + '@ucab.edu.ve'
        }
    }
});



/* UN LOCALIDAD TIENE VARIAS PERSONAS */
Personas.belongsTo(modelsLocalidades.Localidades, {
    foreignKey: "id_localidad",
    as: "localidades"
    
});

Personas.belongsTo(modelsGradoAcademico.gradoAcademico, {
    foreignKey: "id_grado_academico",
    as: "grado_academico"
    
});

module.exports.Personas = Personas;
