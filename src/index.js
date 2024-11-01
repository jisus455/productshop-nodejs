//configurar las variables de entorno
require('dotenv').config()

const express = require('express')
const productosRouter = require('./routers/productos.router')
const categoriasRouter = require('./routers/categorias.router')
const usuariosRouter = require('./routers/usuarios.router')

const {logError, errorHandler} = require('./middlewares/error.handler')

const app = express()

// Rutas de la api
app.use('/api/productos', productosRouter)
app.use('/api/categorias', categoriasRouter)
app.use('/api/usuarios', usuariosRouter)

// Manejo de errores
app.use(logError)
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send("Bienvenido a mi servidor web")
})

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log("Servidor escuchando en el puerto: " + port)
})