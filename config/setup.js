const userSchema = require('../models/user.model');
const bcrypt = require('bcrypt')
const roleSchema = require('../models/role.model')

const init = async () => {
    // const roles = ['user','gestionnaire','admin'];
    try {
        // add new roles inside the role collection / table of dataBase
        await roleSchema.insertMany([{name:'user'},{name:'gestionnaire'},{name:'admin'}]);
        // find a role == admin from the Role Table
        // select * from role where role == admin
        const isAdmin = await roleSchema.findOne({name:'admin'});
        // find a user role == admin from The User table
        // select * from user where role == role.id
        const adminExists = await userSchema.findOne({role:[isAdmin._id]})
        if(!adminExists){
            const newAdmin = new userSchema({
                firstname: 'admin',
                lastname: 'admin',
                email: 'admin@example.com',
                password: bcrypt.hashSync('123456789',10),
                role: [isAdmin._id],
            })
            await newAdmin.save();
            console.log('Admin is created inside the user collection');
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = init;