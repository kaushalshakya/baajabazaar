const errorHandler = (err, req, res, next) =>{
    console.log(err.stack);
    const status = 500;
    res.status(status).json({status: status,message: err.message}) 
}

module.exports = errorHandler;