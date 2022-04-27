const myUserSchema = require('../models/user.model');
const roleSchema = require('../models/role.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req,res) => {
    const {password,email} = req.body;
    try {
        const userExists = await myUserSchema.findOne({email:email})
        if(userExists) {
            return res.status(400).send({msg: 'User already exists'})
        }

        const user = new myUserSchema(req.body);
        const passwordHashed = bcrypt.hashSync(password,0);
        if(req.body.role){
            const role = await roleSchema.findOne({name:req.body.role});
            if(!role){
                return res.status(400).send({msg: 'User not added'})
            }
            user.role = [role._id];
        }else{
            const role = await roleSchema.findOne({name:'user'});
            if(!role){
                return res.status(400).send({msg: 'User not added'})
            }
            user.role = [role._id];
        }
        user.password = passwordHashed;
        await user.save();
        return res.status(200).send({msg: 'User added successfully'})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.login = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await myUserSchema.findOne({email: email});
        if(!user){
            return res.status(404).send({msg: 'Bad credentials'});
        }
        const passwordValid = bcrypt.compareSync(password,user.password);
        if(!passwordValid){
            return res.status(404).send({msg: 'Bad credentials'});
        }
        const token = jwt.sign({ id: user._id }, process.env.passwordToken);
        return res.status(200).send({msg:'Connected Successfully',token});
    } catch (error) {
        return res.status(500).send({msg:'Bad credentials'});
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await myUserSchema.find();
        if(users.length == 0){
            return res.status(404).send({msg: 'Data Base is empty'});
        }
        return res.status(200).send({users})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}


exports.getOneUser = async (req, res) =>{
    const {id} = req.params
    try {
        const user = await myUserSchema.findById(id);
        if(users.length == 0){
            return res.status(404).send({msg: 'User not exists'});
        }
        return res.status(200).send({user})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.updateUser = async (req, res) =>{
    const {id} = req.params
    try {
        const user = await myUserSchema.findById(id)
        if(!user){
            return res.status(404).send({msg: 'User not exists'});
        }
        await myUserSchema.findByIdAndUpdate(id,{$set:{...req.body}})
        const users = await myUserSchema.findById(id)
        return res.status(200).send({msg:'User Updated successfully',users})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.deleteUser = async (req, res) => {
    const {id} = req.params
    try {
        const user = await myUserSchema.findById(id)
        if(!user){
            return res.status(404).send({msg: 'User not exists'});
        }
        const deletedUser = await myUserSchema.findByIdAndDelete(id)
        return res.status(200).send({msg:'User deleted successfully',deletedUser})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}