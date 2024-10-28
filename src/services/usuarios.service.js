const getConnection = require('../data/mysql')
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
        const usuario = await connection.query("SELECT Id, Usuario, Clave, Nombre, Apellido, EsAdmin FROM usuarios WHERE Usuario = ?", [login.usuario])
        
        if (usuario.length === 0){
            const error = new Error("Datos de login incorrectos")
            error.status = 400
            throw error
        }

        const {Id, Nombre, Apellido, Usuario, Clave, EsAdmin} = usuario[0]
        
        return bcrypt.compare(login.clave, Clave)
            .then(soniguales => {
                if (soniguales == true){
                    const token = {
                    token: sign({Id, Nombre, Apellido, Usuario, EsAdmin})
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