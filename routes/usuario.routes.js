import Router from "express"
import uController from "../controllers/usuarioController.js"
const ruta = Router();
import verificacion from '../middleware/verificacion.js';
import verify from '../middleware/autenticar.js'
import chechRoles from '../middleware/chechRoles.js'


//listar todos
/**
 * @swagger
 * /listadoUsuarios:
 *  get:
 *      summary: Obtener Usuarios
 *      description: Obteniendo todos
 *      produces: 
 *          - application/json
 *      responses:
 *          200:
 *              description: Todos los Usuarios
 *              schema:
 *              type: json
 * 
 */
ruta.get("/listadoUsuarios", uController.listadou)


// Creando definicion de datos
/**
 * @swagger
 * definitions:
 *  Modelo Usuario:
 *      type: object
 *      properties:
 *          email:
 *              type: string
 *          password:
 *              type: string
 * 
 */

/**
 * @swagger
 * /editarUsuario/{id}:
 *  put:
 *      summary: Update usuario por Id
 *      description: Creando
 *      produces: 
 *          - application/json
 *      parameters:
 *          - name: id
 *            in: path
 *            description: Id del usuario
 *          - in: body
 *            name: update 
 *            schema:
 *              type: string
 *              format: string
 *      responses:
 *          201:
 *              description: Un usuario
 *              schema:
 *              type: json
 * 
 */
ruta.put("/editarUsuario/:id" ,[
    verify.verfiyToken, 
    verify.isAdmin, 
    chechRoles.checkRolesExisted
    ],
    uController.actualizar);

//delete
/**
 * @swagger
 * /eliminarUsuario/{id}:
 *  delete:
 *      summary: Eliminando usuario por id
 *      description: Eliminando
 *      produces: 
 *          - application/json
 *      parameters:
 *             - in: path
 *               name: id
 *               description: Ingrese el id a eliminar
 *      responses:
 *          200:
 *              description: Un usuario
 *              schema:
 *              type: json
 * 
 */
ruta.delete("/eliminarUsuario/:id",[
    verify.verfiyToken, 
    verify.isAdmin, 
    ], 
    uController.eliminar)

export default ruta

