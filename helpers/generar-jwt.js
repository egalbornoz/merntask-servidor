/********************************************************************************
 *  Importación JWT
 ********************************************************************************/
 const jwt = require('jsonwebtoken');

 /********************************************************************************
  *  Metodo para generar JWT
  ********************************************************************************/
 const generarJWT = (uid = '') => {
     return new Promise((resolve, reject) => {
 
         const payload = { uid };
         jwt.sign(payload, process.env.SECRET_JWT,{
             expiresIn: '24h'
         }, (err, token) => {
             if (err) {
                 console.log(err);
                 reject('No se pudo generar el token');
             } else {
                 resolve(token);
             }
         })
     });
 
 };
 /********************************************************************************
  *  Exportaciones
  ********************************************************************************/
 module.exports = {
     generarJWT,
 }