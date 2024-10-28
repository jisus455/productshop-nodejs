const joi = require('joi')

const id = joi.number().min(0)
const descripcion = joi.string().alphanum()

const consultaCategoriaPorIdSchema = joi.object({
    id: id.required()
})

const crearCategoriaSchema = joi.object({
    descripcion: descripcion.required()
})

const modificarCategoriaSchema = joi.object({
    id: id.required(),
    descripcion: descripcion.required()
})

const eliminarCategoriaSchema = joi.object({
    id: id.required()
})


module.exports = {consultaCategoriaPorIdSchema, crearCategoriaSchema, modificarCategoriaSchema, eliminarCategoriaSchema}