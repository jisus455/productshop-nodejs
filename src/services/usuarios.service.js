const getConnection = require('../data/postgresql')
const { sign, getToken, decode } = require('../utils/jwt')
const bcrypt = require('bcrypt')

class UsuariosService {
    constructor() {}

    async postUsuarios(data) {
        const connection = await getConnection()
        const insert = "INSERT INTO usuarios(Id, Usuario, Clave, Nombre, Apellido, EsAdmin) VALUES(NULL, ?, ?, ?, ?, ?)"
        const insertValues = [data.usuario, await bcrypt.hash(data.clave,5), data.nombre, data.apellido, data.esAdmin]
        const query = await connection.query(insert, insertValues)
        return {"id": query.insertId, "usuario": data.usuario, "clave": data.clave, "nombre": data.nombre, "apellido": data.apellido, "esAdmin": data.esAdmin}
    }

    async postLogin(login) {
        const connection = await getConnection()
        const query = await connection.query("SELECT Id, Usuario, Clave, Nombre, Apellido, EsAdmin FROM usuarios WHERE Usuario = $1", [login.usuario])
        
        if (query.rows.length === 0){
            const error = new Error("Datos de login incorrectos")
            error.status = 400
            throw error
        }

        const {id, nombre, apellido, usuario, clave, esadmin} = query.rows[0]
                
        return bcrypt.compare(login.clave, clave)
            .then(soniguales => {
                if (soniguales == true){
                    const token = {
                    token: sign({id, nombre, apellido, usuario, esadmin})
                    }
                    return {logeo:true, ...token}
                
                } else {
                    const error = new Error("Datos de login incorrectos")
                    error.status = 400
                    throw error
                }
        })
    }
}

module.exports = UsuariosService