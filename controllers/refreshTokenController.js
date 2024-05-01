const { UsernamePassword } = require('../model/Bio');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleRefreshToken = async (req, res)=> {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);
    
    const refreshToken = cookies.jwt;
    //check for dup username in DB
    const foundUser = await UsernamePassword.findOne({refreshToken}).exec();
    if (!foundUser) return res.sendStatus(403);
    //eval password

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) =>{
        if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {"UserInfo": {
                "username": decoded.username,
                "roles" : roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1h'}
        );
        res.json({accessToken})
    })
}

module.exports = {handleRefreshToken}