// *******************************************************************************
//  *  Modelo Role
//  ********************************************************************************
const { Schema, model } = require('mongoose');

const TareaSchema = Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio'],
        trim: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto',
    }

});
TareaSchema.methods.toJSON = function () {
    const { __v, ...data } = this.toObject();
    return data;
}
// *******************************************************************************
//  *  Exportaciones
//  ********************************************************************************
module.exports = model('Tarea', TareaSchema);
