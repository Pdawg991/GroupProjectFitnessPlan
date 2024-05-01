const { UsernamePassword } = require('../model/Bio');
const path = require('path');
const bcrypt = require('bcrypt');



const handleNewUser = async (req, res) => {
    const {user, pwd, clientName} = req.body;
    //console.log(req.body);

    if(!user || !pwd || !clientName) return res.status(400).json({'message' : 'Username, password, and name are required'})
    //check for dup username in DB

    const duplicate = await UsernamePassword.findOne({username : user});
    if(duplicate) return res.sendStatus(409); //Conflict

    try{
        //encrypt
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser = {
            "username" : user, 
            "password" : hashedPwd, 
            "clientName": clientName
        };

        const result = await UsernamePassword.create({
        username: user,
        roles: {"User":2001},
        password: hashedPwd,
        clientName
        });
        res.status(201).json(result);

        //res.status(201).json({'success': `New user ${user} created! Password is ${pwd}`});
    } catch(err){
        res.status(500).json({'message' : err.message});
    }
};

module.exports = {
    handleNewUser
};