//*******************************************************************************
// *  Importaciones  - Index para estructurar middlewares personalizados
//********************************************************************************/
const validaCampos = require('../middlewares/validar-campos');
const validaJWT = require('../middlewares/validar-jwt');


// ***********************************************************************************
// Exportaciones
// ***********************************************************************************
module.exports = {
    ...validaCampos,
    ...validaJWT,
}