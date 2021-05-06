// *******************************************************************************
//  *  Clase Server
//  ********************************************************************************
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../databese/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            proyectos: '/api/proyectos',
            tareas: '/api/tareas'
        }
        // Conectar a la Base de Datos
        this.conectionDB();
        // Middlewares
        this.middleware();
        //Rutas de mi aplicación    
        this.routes();
    }
    async conectionDB() {
        await dbConnection();
    }
    middleware() {
        //Cors limitar accesos al api
        this.app.use(cors());
        // Parseo y lectura del body
        this.app.use(express.json({ extend: true }))
        // Directorio Público
        // this.app.use(express.static('public'));
        //File Uploads - Carga de Archivos
        //createParentPath:true permite crear la carpera cuando se envia por parametro

    }

    routes() {
        //  Aqui se configuran las rutas a acceder desde  mi controlador
        this.app.use(this.path.usuarios, require('../routes/usuarios'));
        this.app.use(this.path.auth, require('../routes/auth'));
        this.app.use(this.path.proyectos, require('../routes/proyectos'));
        this.app.use(this.path.tareas, require('../routes/tareas'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server activo por el puerto ${this.port}`);

        });
    }
}
// ************************************************************************
// *  Exportaciones
// ************************************************************************

module.exports = Server;