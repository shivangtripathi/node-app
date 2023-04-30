let jwt = require('jsonwebtoken');

function authentication(req,resp,next){
    const token = req.cookies?.auth;
    if(token == null) return resp.sendStatus(401);

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) resp.sendStatus(403);
        req.user = user;
        next();
    })

}

module.exports = authentication;