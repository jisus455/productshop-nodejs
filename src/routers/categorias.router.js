const express = require('express')
const categorias = require('../controllers/categorias.controller')
const controller = new categorias()

const {checkAdmin} = require('../middlewares/secure')
const validatorHandler = require('../middlewares/validator.handler')
const {consultaCategoriaPorIdSchema, crearCategoriaSchema, modificarCategoriaSchema, eliminarCategoriaSchema} = require('../schemas/categorias.schemas')

//creamos una ruta y la utilizamos
const categoriasRouter = express.Router()
//para resolver problemas con el body y formato json
categoriasRouter.use(express.json())


categoriasRouter.get('/', controller.getCategorias)

categoriasRouter.get('/:id',
validatorHandler(consultaCategoriaPorIdSchema, 'params'),
controller.getCategoriasById)

categoriasRouter.post('/', 
validatorHandler(crearCategoriaSchema, 'body'),
checkAdmin(),
controller.postCategorias)

categoriasRouter.put('/', 
validatorHandler(modificarCategoriaSchema, 'body'),
checkAdmin(),
controller.putCategorias)

categoriasRouter.delete('/:id',
validatorHandler(eliminarCategoriaSchema, 'params'),
checkAdmin(),
controller.deleteCategorias)

module.exports = categoriasRouter