const logger = require('../utils/logger')
const libJWT = require('jsonwebtoken');

module.exports = async (req,res,next)=>{

    if(req.cookies.jwt_token){
        //verify cookie value - tokenvalid ????
        try{
            const user = await libJWT.verify(req.cookies.jwt_token,process.env.JWT_SECRET_KEY);
            console.log(user)
            req.user = user
            logger(`Authorized Reqeust : ${req.method} --> ${req.path} --> ${user.email} `)
        }
        catch(e){
           //token invalid expire
           req.user = false;
           logger(`Unauthorized Reqeust : ${req.method} --> ${req.path} --> Token Expired or Mistmacthed `)

        }
    }
    else{
        req.user=false
        logger(`Unauthorized Reqeust : ${req.method} --> ${req.path} --> No Token Found `)
    }
    
    
    next()
}