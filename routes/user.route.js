const express = require('express');

const user = express.Router();

const {createUser,getUsers,getOneUser,updateUser,deleteUser} = require('../controllers/user.controller')

user.post('/addUser',createUser);

//get all users
user.get('/getAlalas',getUsers);

// get one user
user.get('/getOneAlala/:id',getOneUser);

// update user
user.put('/updateUser/:id',updateUser);

// delete user
user.delete('/deleteUser/:id',deleteUser)

module.exports = user