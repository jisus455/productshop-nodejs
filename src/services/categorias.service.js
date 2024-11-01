const getConnection = require('../data/postgresql')

class CategoriasService {
    constructor() { }

    async getCategorias() {
        const connection = await getConnection()
        const select = 
            "SELECT categorias.Id, categorias.Descripcion, categorias.IdUserAlta, a.Nombre as NombreAlta, a.Apellido as ApellidoAlta, categorias.FechaAlta, categorias.IdUserModificacion, b.Nombre as NombreModificacion, b.Apellido as ApellidoModificacion, categorias.FechaModificacion FROM categorias INNER JOIN usuarios a ON(categorias.IdUserAlta = a.Id) LEFT JOIN usuarios b ON(categorias.IdUserModificacion = b.Id) WHERE categorias.FechaBaja IS NULL"
        const query = await connection.query(select)
        return query.rows
    }

    async getCategoriasById(id) {
        const connection = await getConnection()
        const select = 
            "SELECT categorias.Id, categorias.Descripcion, categorias.IdUserAlta, a.Nombre as NombreAlta, a.Apellido as ApellidoAlta, categorias.FechaAlta, categorias.IdUserModificacion, b.Nombre as NombreModificacion, b.Apellido as ApellidoModificacion, categorias.FechaModificacion, categorias.IdUserBaja, c.Nombre as NombreBaja, c.Apellido as ApellidoBaja, categorias.FechaBaja FROM categorias INNER JOIN usuarios a ON(categorias.IdUserAlta = a.Id) LEFT JOIN usuarios b ON(categorias.IdUserModificacion = b.Id) LEFT JOIN usuarios c ON(categorias.IdUserBaja = c.Id) WHERE categorias.Id = ?"
        const selectValues = [id]
        const query = await connection.query(select, selectValues)
        return query.rows
    }

    async postCategorias(categoria) {
        const connection = await getConnection()
        const insert = 
            "INSERT INTO categorias(Id, Descripcion, IdUserAlta, FechaAlta) VALUES(NULL, ?, ? , NOW())"
        const insertValues = [categoria.descripcion, categoria.idusuaccion] 
        const query = await connection.query(insert, insertValues)
        return {"id":query.insertId, "descripcion":categoria.descripcion}
    }

    async putCategorias(categoria) {
        const connection = await getConnection()
        const validate = await this.getCategoriasById(categoria.id)
        if(validate.length === 0){
            const error = new Error("El id no es valido")
            error.status = 400
            throw error
        } 

        const update =
            "UPDATE categorias SET Descripcion = ?, IdUserModificacion = ?, FechaModificacion = NOW() WHERE Id = ?"
        const updateValues = [categoria.descripcion, categoria.idusuaccion, categoria.id] 
        const query = await connection.query(update, updateValues)
        return {"id":categoria.id, "descripcion":categoria.descripcion}
    }

    async deleteCategorias(id, idusuaccion) {
        const connection = await getConnection()
        const validate = await this.getCategoriasById(categoria.id)
        if(validate.length === 0){
            const error = new Error("El id no es valido")
            error.status = 400
            throw error
        } 

        const update = 
            "UPDATE categorias SET IdUserBaja = ?, FechaBaja = NOW() WHERE Id = ?"
        const updateValues = [idusuaccion, id] 
        const query = await connection.query(update, updateValues)
        return {resultado: true}
    }
}

module.exports = CategoriasService