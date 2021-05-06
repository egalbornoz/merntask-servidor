/********************************************************************************
 * Importaciones necesarias
 ********************************************************************************/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('../middlewares');
const { crearTarea,
    obtenerTareas,
    actualizarTarea,
    eliminarTarea
} = require('../controllers/tareas');
const { existeProyectoPorId,
    existeTareaPorId
} = require('../helpers');

const router = Router();

//Crea una tarea  /api/tareas (POST)
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('proyecto', 'El proyecto es obligatorio').not().isEmpty(),
    check('proyecto', 'El proyecto no es válido').isMongoId(),
    check('proyecto').custom(existeProyectoPorId),
    validarCampos
], crearTarea);

//Obtener Tareas por proyecto (GET)
router.get('/', [
    validarJWT,
    check('proyecto', 'El proyecto es obligatorio').not().isEmpty(),
    check('proyecto', 'El proyecto no es válido').isMongoId(),
    check('proyecto').custom(existeProyectoPorId),
    validarCampos
], obtenerTareas);

//Actualizar una tarea api/tareas/id
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeTareaPorId),
    validarCampos,
], actualizarTarea);


//Eliminar Tarea
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('proyecto', existeProyectoPorId),
    check('id').custom(existeTareaPorId),
    validarCampos
], eliminarTarea)


module.exports = router