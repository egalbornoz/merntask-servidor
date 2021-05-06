/********************************************************************************
 * Importaciones necesarias
 ********************************************************************************/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');
const { existeProyectoPorId } = require('../helpers');
const { crearProyecto, 
    obtenerProyecto,
     actualizarProyecto,
     eliminarProyecto
     } = require('../controllers/proyectos');

const router = Router();

//Crea un proyecto  /api/proyectos
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearProyecto);

//Obtener proyecto  /api/proyectos
router.get('/', [
    validarJWT,
], obtenerProyecto);

//Obtener proyecto  /api/proyectos
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeProyectoPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarProyecto);

//Eliminar un proyecto

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProyectoPorId),
    validarCampos
],
eliminarProyecto);


module.exports = router