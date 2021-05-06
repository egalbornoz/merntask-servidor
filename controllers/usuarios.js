const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');
/********************************************************************************
 * Controlador crear los usuarios
 ********************************************************************************/
const crearUsuario = async (req, res = response) => {
    try {
        //Se extraen los datos
        const { nombre, email, password, } = req.body;
        const usuario = new Usuario({ nombre, email, password });
        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();
        //Se genera el token
        const token = await generarJWT(usuario.id);
        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

module.exports = {
    crearUsuario,
}