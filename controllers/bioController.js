const { Bio, PersonalInfo, UsernamePassword} = require('../model/Bio');

const getAllBios = async (req, res) => {
    const bio = await Bio.find();
    if(!bio) return res.status(204).json({'message' : 'No Bios found'});
    res.json(bio);
}
const getClient = async(req, res) =>{
    const refreshToken = req.cookies.jwt;
    const foundUser = await UsernamePassword.findOne({refreshToken}).exec();
    res.json(foundUser);
}
const createNewBio = async (req, res) => {
    const refreshToken = req.cookies.jwt;
    const foundUser = await UsernamePassword.findOne({refreshToken}).exec();
    const bio = await Bio.find();
    if(!bio) return res.status(204).json({'message' : 'No Bios found'});
    const { 
        fitness_goal, 
        current_weight, 
        goal_weight, 
        height, 
        clientAge, 
        gender, 
        fitness_level } = req.body;

    // Create a new document in the database
    const result = await Bio.create({
        fitness_goal, 
        current_weight,
        goal_weight, 
        gender, 
        clientAge, 
        height, 
        fitness_level,
        username:foundUser.username
    });
    res.status(201).json(result);
}
const createNewPi = async (req, res) => {

    const bio = await PersonalInfo.find();
    if(!bio) return res.status(204).json({'message' : 'No Personal Informatino found'});
    const { 
        age, 
        current_weight, 
        current_height, 
        gender, 
        name, 
        goal_weight,
        level } = req.body;

    // Create a new document in the database
    const result = await PersonalInfo.create({
        age, 
        current_weight, 
        current_height, 
        gender, 
        name, 
        goal_weight,
        level
    });
    res.status(201).json(result);
}

const getBio = async (req, res) => {
    try {
        const refreshToken = req.cookies.jwt;
        const foundUser = await UsernamePassword.findOne({refreshToken}).exec();
        // Find the newest document based on the createdAt field
        const bio = await Bio.findOne({username: foundUser.username}).sort({ createdAt: -1});

        // If no document is found, return a 404 status code
        if (!bio) {
            return res.status(404).json({ 'message': 'Bio not found.' });
        }

        // If document is found, return it
        res.status(200).json(bio);
    } catch (error) {
        // If an error occurs during database query, return a 500 status code
        console.error(error);
        res.status(500).json({ 'message': 'Internal server error.' });
    }
};

const updateBio = async(req, res) =>{
    const refreshToken = req.cookies.jwt;
    const foundUser = await UsernamePassword.findOne({refreshToken}).exec();
    const {
        fitness_goal, 
        current_weight, 
        goal_weight, 
        height, 
        clientAge, 
        gender, 
        fitness_level
    } = req.body;

    const result = await Bio.updateOne(
        { username: foundUser.username },
        { 
            $set: {
                fitness_goal,
                current_weight,
                goal_weight,
                gender,
                clientAge,
                height,
                fitness_level,
                username: foundUser.username 
            }
        }
    );
    
    res.json(result);
}

const updateAccount = async(req, res) =>{
    const refreshToken = req.cookies.jwt;
    const foundUser = await UsernamePassword.findOne({refreshToken}).exec();
    const {
        clientName,
        clientAge
    } = req.body;
        console.log(clientAge);
    const result = await UsernamePassword.updateOne(
        { username: foundUser.username },
        { 
            $set: {
                clientName,
                clientAge
            }
        }
    );
    
    res.json(result);
}

module.exports = {
    getClient,
    getAllBios,
    createNewBio,
    createNewPi,
    getBio,
    updateBio,
    updateAccount
};