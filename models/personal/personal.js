var Sequelize = require("sequelize");
var connect = require('../connectDB');

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
                arg: [['F', 'M']],
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
            isIn: [['A', 'I']]
        }
    },
},
{
    freezeTableName: false,
    tableName: 'personal.personas',
    //paranoid: false,
    classMethod: {
        getterMethods: {
            correoUcab: function () {
                return this.correo1 + '@ucab.edu.ve'
            }
        }/*,
        associate: function(models){
            Personas.hasMany(models.Localidades, {
                foreignKey: 'id_localidad'
            })
        }*/
    }
});


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
            len: 2,
            isIn: [['AD', 'ES']]
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
    tableName: 'personal.unidad',
    classMethods: {
        /*associate: function (models) {
            Unidades.hasMany(models.personasUnidad, {
                foreignKey: "cod_unidad",
                as: "personas",
                //este parametro es solo para la relacion N-N
                through: "personas_unidad"
            });
        }*/
    }
});



var personasUnidad = connect.define('personasUnidad', {
    id: {
        type: Sequelize.STRING(12),
        field: 'cedula', // Will result in an attribute that is firstName when user facing but first_name in the database        
        primaryKey: true,
        allowNull: false,
        references: {
            model: Personas, // This is a reference to another model
            key: 'id', // This is the column name of the referenced model            
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE // This declares when to check the foreign key constraint. PostgreSQL only.
        },
        validate: {
            len: 6
        }
    },
    cod_unidad: {
        type: Sequelize.STRING(6),
        allowNull: false,
        //primaryKey: true,
        references: {
            model: Unidades,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        },
        field: 'cod_unidad',
        validate: {
            len: 6
        }
    },
    cod_cargo: {
        type: Sequelize.STRING(10),
        field: 'cod_cargo',
        allowNull: false,        
        validate: {
            len: 10
        }
    },
    cod_tipo_nomina: {
        type: Sequelize.INTEGER,
        allowNull: false,
        //primaryKey: true,        
        field: 'cod_tipo_nomina',
        validate: {
            //    len: 100,  
        }
    },
    prioridad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
            min: 0,
            max: 3
        }
    },
    fecha_ingreso: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,          
        validate: {
            isDate: true,
            isAfter: "1990-01-01"
        }
    },
    fecha_egreso: {
        type: Sequelize.DATE,
        validate: {
            isDate: true,
            //isAfter: "1990-01-01"
        }
    },
    id_usuario: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            len: 30
        }
    },
    motivo: {
        type: Sequelize.STRING(500),
        field: 'motivo_egreso',
        validate: {
            len: 500
        }
    },
    horas: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        field: 'cant_horas',
        validate: {
            min: 0,
            max: 40
        }
    },
},
{
    freezeTableName: false,
    tableName: 'personal.personas_unidad',
    classMethod: {
        getterMethods: {
            fecha_ingreso: function () {
                //getDataValue me permite acceder a las columnas
                //de este modelo
                var fecha = this.getDataValue("fecha_creacion");

                //DIA-MES-YEAR
                var fechaIngresoFormato = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear();

                return fechaIngresoFormato;
            },
            fecha_egreso: function () {
                //getDataValue me permite acceder a las columnas
                //de este modelo
                var fecha = this.getDataValue("fecha_creacion");

                //DIA-MES-YEAR
                var fechaEgresoFormato = fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear();

                return fechaEgresoFormato;
            }
        }
    }
});

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
            len: 8
        }
    }    
},   
{
    freezeTableName: false,
    tableName: 'personal.localidades',
});


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

/* UN LOCALIDAD TIENE VARIAS PERSONAS */
Personas.belongsTo(Localidades, {
    foreignKey: "id_localidad",
    as: "localidades"
    
});

Personas.belongsTo(gradoAcademico, {
    foreignKey: "id_grado_academico",
    as: "grado_academico"
    
});

personasUnidad.belongsTo(Personas, {
    foreignKey: "cedula",
    as: "personas"
    
});

personasUnidad.belongsTo(Unidades, {
    foreignKey: "cod_unidad",
    as: "unidad"
    
});

personasUnidad.belongsTo(Cargos, {
    foreignKey: "cod_cargo",
    as: "cargo"    
});

personasUnidad.belongsTo(tipoNomina, {
    foreignKey: "cod_tipo_nomina",
    as: "tipo_nomina"    
});

/*
Personas.belongsToMany(Unidades, {
    foreignKey: "cedula",
    as: "unidad",
    through: "personas_unidad"
});

Unidades.belongsToMany(Personas, {
    foreignKey: "cod_unidad",
    as: "personas",
    through: "personas_unidad"
});
*/
module.exports.Personas = Personas;
module.exports.Unidades = Unidades;
module.exports.Cargos = Cargos;
module.exports.tipoNomina = tipoNomina;
module.exports.Localidades = Localidades;
module.exports.gradoAcademico = gradoAcademico;
module.exports.personasUnidad = personasUnidad;



