const joi = require('joi')

const id = joi.number().min(1)
const nombre = joi.string().min(1)
const descripcion = joi.string().min(1)
const precio = joi.number().min(1)
const idCategoria = joi.number().min(1)
const imagen = joi.string().min(1)

const consultaProductoPorIdSchema = joi.object({
    id: id.required()
})

const crearProductoSchema = joi.object({
    nombre: nombre.required(),
    descripcion: descripcion.required(),
    precio: precio.required(),
    idCategoria: idCategoria.required(),
    imagen: imagen.required(),
    //idusuaccion: joi.number().required()
})

const modificarProductoSchema = joi.object({
    id: id.required(),
    nombre: nombre.required(),
    descripcion: descripcion.required(),
    precio: precio.required(),
    idCategoria: idCategoria.required(),
    imagen: imagen.required()
})

const eliminarProductoSchema = joi.object({
    id: id.required()
})

module.exports = {consultaProductoPorIdSchema, crearProductoSchema, modificarProductoSchema, eliminarProductoSchema}