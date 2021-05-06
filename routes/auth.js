/******************************************************************
*  Importaciones
 ******************************************************************/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, usuarioAutemticado } = require('../controllers/auth');
const { validarJWT } = require('../middlewares');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

/******************************************************************
*  Ruta /login - endPoint
 ******************************************************************/
router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);
/******************************************************************
*  Ruta / Obtiene el usuario autenticado
 ******************************************************************/
router.get('/',[
    validarJWT,
],usuarioAutemticado);

/******************************************************************
*  Exportación Rutas - endPoints
 ******************************************************************/
module.exports = router;