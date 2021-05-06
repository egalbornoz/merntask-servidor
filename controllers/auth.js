/********************************************************************************
 * Importaciones necesarias
 ********************************************************************************/
const { response, request } = require('express');
const bcrypjs = require('bcryptjs');
const { Usuario } = require('../models');
const { generarJWT } = require('../helpers/generar-jwt');

/********************************************************************************
 * Controlador login
 ********************************************************************************/
const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario y/o contraseña no son válidos'
            })
        }

        const validarPass = bcrypjs.compareSync(password, usuario.password);

        if (!validarPass) {
            return res.status(400).json({
                msg: 'Usuario y/o contraseña no son válidos'
            })
        }
        const token = await generarJWT(usuario.id);
        res.json({
            // usuario,
            token
        });

    } catch (error) {
        return res.status(500).json({
            msg: 'Algo salio mal, comunicar al administrador'
        })
    }
}
/********************************************************************************
 * Controlador Obtiene usuario Auteticado
 ********************************************************************************/
const usuarioAutemticado = async (req = request, res = response) => {
    try {
        const usuario = await Usuario.findById(req.usuario).select('-password');
        res.json({ usuario });
    } catch (error) {
        console.log(erro);
        res.status(500).json({ msg: 'Hubo un error' });
    }
}
/********************************************************************************
 *  Eportación controladores
 ********************************************************************************/

module.exports = {
    login,
    usuarioAutemticado
}