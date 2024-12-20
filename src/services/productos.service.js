const getConnection = require('../data/postgresql')

class ProductosService {
    constructor() { }

    async getProductos(data) {   
        if(data.precio === undefined && data.nombre === undefined && data.categoria === undefined) {
            const connection = await getConnection()
            const select =
                "SELECT productos.Id, productos.Nombre, productos.Descripcion, productos.Precio, productos.IdCategoria, productos.Imagen, categorias.Descripcion as DescripcionCategoria, productos.IdUserAlta, a.Nombre as NombreAlta, a.Apellido as ApellidoAlta, productos.FechaAlta, productos.IdUserModificacion, b.Nombre as NombreModificacion, b.Apellido as ApellidoModificacion, productos.FechaModificacion FROM productos LEFT JOIN usuarios a ON(productos.IdUserAlta = a.Id) LEFT JOIN usuarios b ON(productos.IdUserModificacion = b.Id) INNER JOIN categorias ON(productos.IdCategoria = categorias.Id) WHERE productos.FechaBaja IS NULL"
            const query = await connection.query(select)
            return query.rows
        }

        let select =
                "SELECT productos.Id, productos.Nombre, productos.Descripcion, productos.Precio, productos.IdCategoria, productos.Imagen, categorias.Descripcion as DescripcionCategoria, productos.IdUserAlta, a.Nombre as NombreAlta, a.Apellido as ApellidoAlta, productos.FechaAlta, productos.IdUserModificacion, b.Nombre as NombreModificacion, b.Apellido as ApellidoModificacion, productos.FechaModificacion FROM productos LEFT JOIN usuarios a ON(productos.IdUserAlta = a.Id) LEFT JOIN usuarios b ON(productos.IdUserModificacion = b.Id) INNER JOIN categorias ON(productos.IdCategoria = categorias.Id) WHERE productos.FechaBaja IS NULL"

        if(data.precio != undefined) {
            select += ` AND productos.Precio <= ${data.precio} ` 
        }

        if(data.nombre != undefined) {
            select += ` AND productos.Nombre LIKE '%${data.nombre}%' `   
        }

        if(data.categoria != undefined) {
            select += ` AND productos.IdCategoria = ${data.categoria} ` 
        }

        const connection = await getConnection()
        const query = await connection.query(select)
        return query.rows
    }

    async getProductosById(id) {
        const connection = await getConnection()
        const select =
            "SELECT productos.Id, productos.Nombre, productos.Descripcion, productos.Precio, productos.IdCategoria, productos.Imagen, categorias.Descripcion as DescripcionCategoria, productos.IdUserAlta, a.Nombre as NombreAlta, a.Apellido as ApellidoAlta, productos.FechaAlta, productos.IdUserModificacion, b.Nombre as NombreModificacion, b.Apellido as ApellidoModificacion, productos.FechaModificacion, productos.IdUserBaja, c.Nombre as NombreBaja, c.Apellido as ApellidoBaja, productos.FechaBaja FROM productos LEFT JOIN usuarios a ON(productos.IdUserAlta = a.Id) LEFT JOIN usuarios b ON(productos.IdUserModificacion = b.Id) LEFT JOIN usuarios c ON(productos.IdUserBaja = c.Id) INNER JOIN categorias ON(productos.IdCategoria = categorias.Id) WHERE productos.Id = $1"
        const selectValues = [id]
        const query = await connection.query(select, selectValues)
        return query.rows
    }

    async postProductos(producto) {
        const connection = await getConnection()

        const insert =
        "INSERT INTO productos(Nombre, Descripcion, Precio, IdCategoria, Imagen, IdUserAlta, FechaAlta) VALUES($1, $2, $3, $4, $5, $6, NOW())"
        const insertValues = [producto.nombre, producto.descripcion, producto.precio, producto.idCategoria, producto.imagen, producto.idusuaccion]
        const query = await connection.query(insert, insertValues)
        return { "id": query.insertId, "nombre": producto.nombre, "descripcion": producto.descripcion, "precio": producto.precio, "imagen": producto.imagen, "idCategoria": producto.idCategoria }
    }

    async putProductos(producto) {
        const connection = await getConnection()
        const validate = await this.getProductosById(producto.id)
        if(validate.length == 0){
            const error = new Error("El id no es valido")
            error.status = 400
            throw error
        } 

        const update =
        "UPDATE productos SET Nombre = $1, Descripcion = $2, Precio = $3, Imagen = $4, IdCategoria = $5, IdUserModificacion = $6, FechaModificacion = NOW() WHERE Id = $7"
        const updateValues = [producto.nombre, producto.descripcion, producto.precio, producto.imagen, producto.idCategoria, producto.idusuaccion, producto.id]
        const query = await connection.query(update, updateValues)
        return { "id": producto.id, "nombre": producto.nombre, "descripcion": producto.descripcion, "precio": producto.precio, "imagen": producto.imagen, "idCategoria": producto.idCategoria }       
    }

    async deleteProductos(id, idusuaccion) {
        const connection = await getConnection()
        const validate = await this.getProductosById(id)
        if(validate.length === 0){
            const error = new Error("El id no es valido")
            error.status = 400
            throw error
        } 

        const delet =
            "UPDATE productos SET IdUserBaja = $1, FechaBaja = NOW() WHERE Id = $2"
        const deletValues = [idusuaccion, id]
        const query = await connection.query(delet, deletValues)
        return { "resultado": true }
    }
}

module.exports = ProductosService