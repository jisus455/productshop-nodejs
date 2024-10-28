const express = require('express')
const UsuariosController = require('../controllers/usuarios.controller')
const controller = new UsuariosController

const validatorHandler = require('../middlewares/validator.handler')
const {loginSchema, crearUsuarioSchema} = require('../schemas/usuarios.schemas')

//creamos una ruta y la utilizamos
const usuariosRouter = express.Router()
//para resolver problemas con el body y formato json
usuariosRouter.use(express.json())

usuariosRouter.post('/',
validatorHandler(crearUsuarioSchema, 'body'),
controller.postUsuarios
)

usuariosRouter.post('/login', 
validatorHandler(loginSchema, 'body'),
controller.postLogin)


module.exports = usuariosRouter