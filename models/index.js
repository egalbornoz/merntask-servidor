// *************************************************************
// Centralización de modelos en un solo archivo
// *************************************************************
const Server = require('./server');
const Usuario = require('./usuario');
const Proyecto = require('./proyecto');
const Tarea = require('./tarea');

// *************************************************************
// Exportaciones
// *************************************************************
module.exports = {
    Server,
    Usuario,
    Proyecto,
    Tarea

}