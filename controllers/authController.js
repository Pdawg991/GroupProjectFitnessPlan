const bcrypt = require('bcrypt');
const { UsernamePassword } = require('../model/Bio');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const path = require('path');


const handleLogin = async(req, res)=> {
    const {user, pwd} = req.body;
    //console.log(req.body);

    if(!user || !pwd) return res.status(400).json({'message' : 'Username and password are required'})
    //check for dup username in DB
    const foundUser = await UsernamePassword.findOne({username: user}).exec();
    console.log(foundUser);
    if (!foundUser) return res.sendStatus(401);
    //eval password
    console.log(foundUser.password);

    const match = await bcrypt.compare(pwd, foundUser.password);
    if(match){
        const roles = Object.values(foundUser.roles);
        //JWT
        const accessToken = jwt.sign({
            "UserInfo":{
                "username" : foundUser.username,
                "roles": roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '5m'});
        const refreshToken = jwt.sign({"username" : foundUser.username}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});
        /*const otherUsers = await UsernamePassword.find({ username: { $ne: user } });
        const currentUser = {...foundUser, refreshToken};*/
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        //console.log(result);

        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000});
        res.json({accessToken});
    } else{
        res.sendStatus(401);
    }
}

module.exports = {handleLogin};