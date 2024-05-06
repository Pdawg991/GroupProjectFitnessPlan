const { UsernamePassword } = require('../model/Bio');

const handleLogout = async (req, res) => {
    //On client, delete accessToken
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); //No Content

    const refreshToken = cookies.jwt;
    //check for refreshToken in DB
    const foundUser = await UsernamePassword.findOne({refreshToken}).exec();
    if (!foundUser) {
        res.clearCookie('jwt', {httpOnly: true});
        return res.sendStatus(204);
    }
    //Delete refreshToken
    foundUser.refreshToken = '';
        const result = await foundUser.save();
        res.clearCookie('jwt', {httpOnly: true}); //Secure: true - only server on https
        res.sendStatus(204);
    }

module.exports = {handleLogout}