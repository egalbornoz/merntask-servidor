const { Usuario, Proyecto, Tarea } = require('../models');

/********************************************************************************
 *Validador personalizado para verificar si existe email en la colección usuario
 ********************************************************************************/
const emailExiste = async (email = '') => {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
        throw new Error('El usuario ya existe');
    }
    return true;
}
/********************************************************************************
 *Validador personalizado para verificar existe proyecto por id
 ********************************************************************************/
const existeProyectoPorId = async (id) => {

    const existeProyecto = await Proyecto.findById(id);

    if (!existeProyecto) {
        throw new Error('Proyecto no encontrado');
    }

    return true;

}
/********************************************************************************
 *Validador personalizado para verificar existe proyecto por id
 ********************************************************************************/
const existeTareaPorId = async (id) => {

    const existeTarea = await Tarea.findById(id);

    if (!existeTarea) {
        throw new Error('Tarea no encontrada');
    }
    return true;
}
module.exports = {
    emailExiste,
    existeProyectoPorId,
    existeTareaPorId
}