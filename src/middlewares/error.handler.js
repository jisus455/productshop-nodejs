function logError(err, req, res, next){
    console.log("logError")
    console.log(err)
    next(err)
}


function errorHandler(err, req, res, next){
    console.log("errorHandler")
    const statusCode = err.status || 500
    res.status(statusCode).send({
        error: true,
        message: statusCode === 500 ? "Se produjo un error en el servidor" : err.message
    })
}

module.exports = {logError, errorHandler}