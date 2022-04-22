const MyUserSchema = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.createUser = async (req,res) => {
    const {password,email} = req.body;
    try {
        const userExists = await MyUserSchema.findOne({email:email})
        if(userExists) {
            return res.status(400).send({msg: 'User already exists'})
        }
        const user = new MyUserSchema(req.body);
        const passwordHashed = bcrypt.hashSync(password,0);
        user.password = passwordHashed;
        await user.save();
        return res.status(200).send({msg: 'User added successfully'})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await MyUserSchema.find();
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
        const user = await MyUserSchema.findById(id);
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
        const user = await MyUserSchema.findById(id)
        if(!user){
            return res.status(404).send({msg: 'User not exists'});
        }
        await MyUserSchema.findByIdAndUpdate(id,{$set:{...req.body}})
        const users = await MyUserSchema.findById(id)
        return res.status(200).send({msg:'User Updated successfully',users})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}

exports.deleteUser = async (req, res) => {
    const {id} = req.params
    try {
        const user = await MyUserSchema.findById(id)
        if(!user){
            return res.status(404).send({msg: 'User not exists'});
        }
        const deletedUser = await MyUserSchema.findByIdAndDelete(id)
        return res.status(200).send({msg:'User deleted successfully',deletedUser})
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}