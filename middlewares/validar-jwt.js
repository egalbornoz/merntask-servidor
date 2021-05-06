/********************************************************************************
 *  Importaciones
 ********************************************************************************/
const { response } = require('express');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

/********************************************************************************
 *  Método para validar token recibido del header
 ********************************************************************************/
const validarJWT = async (req, res = response, next) => {
    const token = req.header('token');
    // console.log(token);
    //Validar que se ha recibido un token
    if (!token) {
        return res.status(401).json({
            msg: 'No hay toke, permiso no válido '
        });
    }
    // Validar que el token este firmado
    try {
        const { uid } = jwt.verify(token, process.env.SECRET_JWT);
        const usuario = await Usuario.findById(uid);


        // Verifico usuari exista

        if (!usuario) {
            return res.status(401).json({
                msg: 'El usuario no existe'
            });
        } else {
            //Se agregan los datos del usuarios desde el token verificado al req
            req.usuario = usuario._id;
            
        }

        next();
    } catch (error) {
        //console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}
/********************************************************************************
 *  Exportaciones
 ********************************************************************************/
module.exports = {
    validarJWT,
}