// **************************************************************
// * Modelo Usuario
// **************************************************************

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
      nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    registro:{
        type:Date,
        default:Date.now()
    }
});
//************************************************************************ */
// Se sobre escribe el metodo para personalizar
// validaciones(excluir elementos del objeto toJSON devuelto)
//*********************************************************************** */
UsuarioSchema.methods.toJSON = function(){
    const {__v, contraseña,_id,...usuario} = this.toObject();
   usuario.uid=_id;
    return  usuario;
}
//*********************************************************************** */
// Exportaciones
//*********************************************************************** */
module.exports = model('Usuario',UsuarioSchema);