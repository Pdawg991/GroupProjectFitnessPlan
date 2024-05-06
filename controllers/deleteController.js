const { UsernamePassword, Bio } = require('../model/Bio');

const handleDelete = async(req,res) =>{
    const refreshToken = req.cookies.jwt;
    const foundUser = await UsernamePassword.findOne({refreshToken}).exec();
    const username = foundUser.username;
    console.log(username);
    await Bio.deleteOne({username});
    await UsernamePassword.deleteOne({username});

    res.status(200).json({message: "Account successfully deleted"});
}


module.exports = {
    handleDelete
};