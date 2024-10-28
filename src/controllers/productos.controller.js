const ProductosService = require('../services/productos.service')
const service = new ProductosService()

class ProductosController {
    constructor() {}

    async getProductos(req, res, next){
        try{
            const data = req.query
            const productos = await service.getProductos(data)
            res.send(JSON.stringify(productos)).status(200)
        }
        catch(error){
            next(error)
        }
    }

    async getProductosById(req, res, next){
        try{
            const id = req.params.id
            const productos = await service.getProductosById(id)
            res.send(JSON.stringify(productos))
        }
        catch(error){
            next(error)
        }
    }
    
    async postProductos(req, res, next){
        try{
            const data = req.body
            const productos = await service.postProductos(data)
            res.send(JSON.stringify(productos)).status(201)
        }
        catch(error){
            next(error)
        }
    }
    
    async putProductos(req, res, next){
        try{
            const data = req.body
            const productos = await service.putProductos(data)
            res.send(JSON.stringify(productos))
        }
        catch(error){
            next(error)
        }
    }
    
    async deleteProductos(req, res, next){
        try{
            const id = req.params.id
            const idusuaccion = req.body.idusuaccion
            const productos = await service.deleteProductos(id, idusuaccion)
            return res.send(JSON.stringify(productos))
        }
        catch(error){
            next(error)
        }
    }
}


module.exports = ProductosController


// function getCategorias(req, res, next){
//     res.send(service.getCategoria())
// }

// function getProductosByCategoria(req, res, next){
//     res.send("get2")
// }

// function getProductosByCategoriaId(req, res, next){
//     res.send("get3")
// }