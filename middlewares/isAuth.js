
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user.model')
exports.isAuth = async (req,res,next) => {
    
    const token = req.header('Authorization');
    // console.log(token)
    // const token = req.header('Authorization')[1]; put the token in
    try {
        if(!token){
            return res.status(404).send({msg: 'Invalid token'});
        }
        const decoded = jwt.verify(token, process.env.passwordToken);
        // console.log(decoded);
        if(!decoded){
            return res.status(404).send({msg: 'Invalid token'});
        }
        const user = await userSchema.findById(decoded.id)
        // console.log(user);
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).send({msg: 'Invalid token'});
    }
}
