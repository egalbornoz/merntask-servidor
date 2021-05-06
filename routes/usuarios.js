/********************************************************************************
 * Importaciones necesarias
 ********************************************************************************/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares');
const { emailExiste } = require('../helpers');
const { crearUsuario } = require('../controllers/usuarios');

const router = Router();

//Crea un usuario  /api/usuarios
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(emailExiste),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
    validarCampos
], crearUsuario);

module.exports = router