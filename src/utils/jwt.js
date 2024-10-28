const jwt = require('jsonwebtoken')

function sign(data) {
    return jwt.sign(data, process.env.JWT_SECRET || 'password')
}

function getToken(auth) {
    if (!auth){
        const error = new Error("No hay token")
        error.status = 400
        throw error
    }

    if (auth.indexOf('Bearer ') === 1) {
        const error = new Error("Token invalido")
        error.status = 400
        throw error
    }

    let token = auth.replace('Bearer ', '')
    return token
}

function decode(auth) {
    const token = getToken(auth)
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'password')
        return decoded
    }  
    catch(error){
        const mierror = new Error("Token invalido")
        mierror.status = 400
        throw mierror
    }
    
}

module.exports = {sign, getToken, decode}