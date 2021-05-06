const { response, request } = require('express');
const { Proyecto } = require('../models');

/********************************************************************************
 * Controlador crear los proyectos
 ********************************************************************************/
const crearProyecto = async (req = request, res = response) => {
    try {
        const { usuario, ...body } = req.body;

        const proyectoDb = await Proyecto.findOne({ nombre: body.nombre.toUpperCase() });

        if (proyectoDb) {
            return res.status(400).json({
                msg: `El proyecto ${proyectoDb.nombre} ya existe`,
            })
        }
        // Grabar los datos
        const data = {
            ...body,
            nombre: body.nombre.toUpperCase(),
            creador: req.usuario
        }
        const proyecto = new Proyecto(data);
        await proyecto.save();
        res.status(201).json(proyecto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
/********************************************************************************
* Controlador obtenerProyecto - populate {retornar objeto Usuario}
 ********************************************************************************/
const obtenerProyecto = async (req = request, res = response) => {

    try {
        const uid = req.usuario
        const proyectos = await Proyecto.find({ creador: uid }).sort({ creado: -1 })
        res.json({ proyectos });
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}
/********************************************************************************
* Controlador obtenerProyecto - populate {retornar objeto Usuario}
 ********************************************************************************/
const actualizarProyecto = async (req = request, res = response) => {

    try {
        const { id } = req.params;

        if (req.body.nombre) {
            req.body.nombre = req.body.nombre.toUpperCase();
        }
        //se verifica propietario del proyecto
        const proyecto = await Proyecto.findById(id);
        //Se verifica el creador por el id de usuario validado
        if (proyecto.creador.toString() !== req.usuario.toString()) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }
        const proyectoActualizado = await Proyecto.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ proyectoActualizado });
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}
/********************************************************************************
 * Controlador Borrar Proyecto
 ********************************************************************************/
const eliminarProyecto = async (req, res = response) => {
    try {
        const { id } = req.params;

        //se verifica propietario del proyecto
        const proyecto = await Proyecto.findById(id);
        //Se verifica el creador por el id de usuario validado
        if (proyecto.creador.toString() !== req.usuario.toString()) {
            return res.status(401).json({ msg: 'No Autorizado' });
        }
        //Eliminar proyecto
        await Proyecto.findOneAndRemove({ _id: id });
        res.json({ msg: 'Proyecto Eliminado' });
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

module.exports = {
    crearProyecto,
    obtenerProyecto,
    actualizarProyecto,
    eliminarProyecto
}