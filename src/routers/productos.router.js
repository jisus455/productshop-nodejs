const express = require('express')
const productos = require('../controllers/productos.controller')
const controller = new productos()

const {checkAdmin, checkToken} = require('../middlewares/secure')
const validatorHandler = require('../middlewares/validator.handler')
const {consultaProductoPorIdSchema, crearProductoSchema, modificarProductoSchema, eliminarProductoSchema} = require('../schemas/productos.schemas')
const { getToken } = require('../utils/jwt')


//creamos una ruta y la utilizamos
const productosRouter = express.Router()
//para resolver problemas con el body y formato json
productosRouter.use(express.json())

productosRouter.get('/', 
checkToken(),
controller.getProductos)
    
productosRouter.get('/:id',
checkToken(),
validatorHandler(consultaProductoPorIdSchema, 'params'),
controller.getProductosById)

productosRouter.post('/', 
checkAdmin(),
validatorHandler(crearProductoSchema, 'body'),
controller.postProductos)

productosRouter.put('/', 
checkAdmin(),
validatorHandler(modificarProductoSchema, 'body'),
controller.putProductos)

productosRouter.delete('/:id', 
checkAdmin(),
validatorHandler(eliminarProductoSchema, 'params'),
controller.deleteProductos)


module.exports = productosRouter