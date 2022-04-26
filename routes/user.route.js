const express = require('express');
const {createUser,getUsers,getOneUser,updateUser,deleteUser,login} = require('../controllers/user.controller')
const {RegisterValidation,LoginValidation,Validation} = require('../middlewares/validator')
const {isAuth} = require('../middlewares/isAuth')

const user = express.Router();


user.post('/addUser',RegisterValidation,Validation,createUser);

user.post('/login',LoginValidation,Validation,login);

//get all users
user.get('/getAlalas',getUsers);

// get one user
user.get('/getOneAlala/:id',getOneUser);

// update user
user.put('/updateUser/:id',updateUser);

// delete user
user.delete('/deleteUser/:id',deleteUser)

// get current user

user.get('/current',isAuth, (req,res) => res.send({user:req.user}))

module.exports = user