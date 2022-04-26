
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.model');

exports.isAuth = async (req,res,next) => {
    try {
        const token = req.header('Authorization');
        if(!token){
            return res.status(400).send({msg:'You have no auth'})
        }
        const decode = jwt.verify(token,process.env.TokenPassword)
        if(!decode){
            return res.status(400).send({msg:'You have no auth'})
        }
        const user = await userSchema.findById(decode.id)
        req.user = user
        next();
    } catch (error) {
        return res.status(500).send({msg:'You have no auth'})
    }
    
}