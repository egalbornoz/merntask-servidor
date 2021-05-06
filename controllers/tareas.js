const { response, request } = require('express');
const { Tarea } = require('../models');
const { Proyecto } = require('../models');
/********************************************************************************
 * Controlador crear los tareas
 ********************************************************************************/
const crearTarea = async (req = request, res = response) => {
    try {
        //Extraer el proyecto y verificar que existe
        const { proyecto, ...body } = req.body;
        const usuario = req.usuario
        const existeProyecto = await Proyecto.findById(proyecto);
        //Revisar si el proyecto  pertenece al usuario autenticado
        if (existeProyecto.creador.toString() !== usuario.toString()) {
            return res.status(401).json({ msg: 'No autorizado' });
        }
        // Se crea la tarea
        const data = {
            ...body,
            proyecto,
            nombre: body.nombre.toUpperCase(),
        }
        const tarea = new Tarea(data);
        await tarea.save();
        res.status(201).json(tarea);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
/********************************************************************************
 * Controlador Obtener las tareas de un proyecto
 ********************************************************************************/
const obtenerTareas = async (req = request, res = response) => {

    try {
        //Extraer datos del proyecto
        const { proyecto } = req.query;
        const tareas = await Tarea.find({ proyecto }).sort({ creado: -1 });
        res.json({ tareas });
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}
/********************************************************************************
 * Controlador actualizar tarea
 ********************************************************************************/
const actualizarTarea = async (req = request, res = response) => {

    try {
        const { proyecto, nombre, estado } = req.body; // se excluyen elementos y el resto se actualiza
        // Id del usuario validado
        const uid = req.usuario;
        // Id de la tarea a  actualizar
        const { id } = req.params;
        // se verifica propietario del proyecto
        const proyectoExiste = await Proyecto.findById(proyecto);

        //Se verifica el creador por el id de usuario validado
        if (proyectoExiste.creador.toString() !== uid.toString()) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }
        //Se crea el nuevo objeto de la tarea a actualizar
        const nuevaTarea = {
            nombre,
            estado,
        };

        nuevaTarea.nombre = nombre.toUpperCase();
        nuevaTarea.estado = estado;

        if (!nombre && !estado) {
            return res.json({ msg: 'No hay datos para actualizar' });
        }
        //Se actualiza la tarea
        const tarea = await Tarea.findByIdAndUpdate(id, nuevaTarea, { new: true });
        res.json({ tarea });
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}
/********************************************************************************
 * Controlador Borrar Tarea
 ********************************************************************************/
const eliminarTarea = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { proyecto } = req.query
        //se verifica que la tarea pertenezca al prot¡yecto
        const tarea = await Tarea.findById(id);
        const proyectoTarea = tarea.proyecto;

        //Se verifica el creador por el id de usuario validado
        if (proyectoTarea.toString().trim() !== proyecto.toString().trim()) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }
        //Eliminar tarea
        await Tarea.findOneAndRemove({ _id: id });
        res.json({ msg: 'Tarea Eliminada' });
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}
module.exports = {
    crearTarea,
    obtenerTareas,
    actualizarTarea,
    eliminarTarea
}