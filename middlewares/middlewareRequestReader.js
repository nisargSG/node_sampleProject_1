const logger = require('../utils/logger')


module.exports = (req,res,next)=>{
    
    logger(`Incoming Reqeust : ${req.method} --> ${req.path}`)
    next()
}