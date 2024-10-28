const { func } = require('joi')
const {decode} = require('../utils/jwt')

function checkAdmin() {
    return (req, res, next) => {
        const datos = decode(req.headers.authorization || "")
        req.body.idusuaccion = datos.Id

        if (datos && datos.EsAdmin === 1) {
            next()
        } else {
            const error = new Error("Privilegios insuficientes")
            error.status = 401
            next(error)
        }
    }
}

function checkToken() {
    return (req, res, next) => {
        const datos = decode(req.headers.authorization || "")
        req.body.idusuaccion = datos.Id

        if (datos) {
            next()
        } else {
            const error = new Error("Privilegios insuficientes")
            error.status = 401
            next(error)
        }
    }

}

module.exports = {checkAdmin, checkToken}