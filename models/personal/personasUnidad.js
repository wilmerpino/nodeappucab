var Sequelize = require("sequelize");
var connect = require('../connectDB');

var modelsPersonas = require('./personas');
var modelsUnidades = require('./unidades');
var modelsTipoNomina = require('./tipoNomina');
var modelsCargos = require('./cargos');

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


personasUnidad.belongsTo(modelsPersonas.Personas, {
    foreignKey: "cedula",
    as: "personas"
    
});

personasUnidad.belongsTo(modelsUnidades.Unidades, {
    foreignKey: "cod_unidad",
    as: "unidad"
    
});

personasUnidad.belongsTo(modelsCargos.Cargos, {
    foreignKey: "cod_cargo",
    as: "cargo"    
});

personasUnidad.belongsTo(modelsTipoNomina.tipoNomina, {
    foreignKey: "cod_tipo_nomina",
    as: "tipo_nomina"    
});

module.exports.personasUnidad = personasUnidad;

