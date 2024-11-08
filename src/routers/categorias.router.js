const express = require('express')
const categorias = require('../controllers/categorias.controller')
const controller = new categorias()

const {checkAdmin, checkToken} = require('../middlewares/secure')
const validatorHandler = require('../middlewares/validator.handler')
const {consultaCategoriaPorIdSchema, crearCategoriaSchema, modificarCategoriaSchema, eliminarCategoriaSchema} = require('../schemas/categorias.schemas')


//creamos una ruta y la utilizamos
const categoriasRouter = express.Router()
//para resolver problemas con el body y formato json
categoriasRouter.use(express.json())

categoriasRouter.get('/', 
checkToken(),    
controller.getCategorias)

categoriasRouter.get('/:id',
checkToken(),
validatorHandler(consultaCategoriaPorIdSchema, 'params'),
controller.getCategoriasById)

categoriasRouter.post('/', 
checkAdmin(),
validatorHandler(crearCategoriaSchema, 'body'),
controller.postCategorias)

categoriasRouter.put('/', 
checkAdmin(),
validatorHandler(modificarCategoriaSchema, 'body'),
controller.putCategorias)

categoriasRouter.delete('/:id',
checkAdmin(),
validatorHandler(eliminarCategoriaSchema, 'params'),
controller.deleteCategorias)

module.exports = categoriasRouter