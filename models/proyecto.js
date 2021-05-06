// *******************************************************************************
//  *  Modelo Role
//  ********************************************************************************
const { Schema, model } = require('mongoose');

const ProyectoSchema = Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true
    },
    creador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    creado: {

        type: Date,
        default: Date.now()
    },

});
ProyectoSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}
// *******************************************************************************
//  *  Exportaciones
//  ********************************************************************************
module.exports = model('Proyecto', ProyectoSchema);
