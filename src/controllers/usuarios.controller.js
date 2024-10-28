const UsuariosService = require('../services/usuarios.service')
const service = new UsuariosService()

class UsuariosController {
    constructor() {}

    async postUsuarios(req, res, next){
        try{
            const data = req.body
            const usuarios = await service.postUsuarios(data)
            res.send(JSON.stringify(usuarios))
        } catch(error){
            next(error)
        }
    }

    async postLogin(req, res, next){
        try{
            const data = req.body
            const usuarios = await service.postLogin(data)
            res.send(JSON.stringify(usuarios))
        } catch(error){
            next(error)
        }
    }
    
}


module.exports = UsuariosController
