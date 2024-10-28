const joi = require('joi')

const usuario = joi.string().alphanum()
const clave = joi.string().alphanum()
const nombre = joi.string().alphanum()
const apellido = joi.string().alphanum()
const esAdmin = joi.number().min(0).max(1)

const loginSchema = joi.object({
    usuario: usuario.required(),
    clave: clave.required()
})

const crearUsuarioSchema = joi.object({
    usuario: usuario.required(),
    clave: clave.required(),
    nombre: nombre.required(),
    apellido: apellido.required(),
    esAdmin: esAdmin.required()
})


module.exports = {loginSchema, crearUsuarioSchema}