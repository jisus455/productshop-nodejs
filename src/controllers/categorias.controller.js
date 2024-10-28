const CategoriasService = require('../services/categorias.service')
const service = new CategoriasService()

class CategoriasController {
    constructor() {}
    
    async getCategorias(req, res, next){
        try{
            const categorias = await service.getCategorias()
            res.send(JSON.stringify(categorias))
        }
        catch(error){
            next(error)
        }
    }

    async getCategoriasById(req, res, next){
        try{
            const id = req.params.id
            const categorias = await service.getCategoriasById(id)
            res.send(JSON.stringify(categorias))
        }
        catch(error){
            next(error)
        }
    }
    
    async postCategorias(req, res, next){
        try{
            const data = req.body
            const categorias = await service.postCategorias(data)
            res.send(JSON.stringify(categorias))
        }
        catch(error){
            next(error)
        }
    }
    
    async putCategorias(req, res, next){
        try{
            const data = req.body
            const categorias = await service.putCategorias(data)
            res.send(JSON.stringify(categorias))
        }
        catch(error){
            next(error)
        }
    }
    
    async deleteCategorias(req, res, next){
        try{
            const id = req.params.id
            const idusuaccion = req.body.idusuaccion
            const categorias = await service.deleteCategorias(id, idusuaccion)
            return res.send(JSON.stringify(categorias))
        }
        catch(error){
            next(error)
        }
    }
}


module.exports = CategoriasController