const { Bio, UsernamePassword} = require('../model/Bio');

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
        current_weight, 
        goal_weight, 
        height, 
        clientAge, 
        gender, 
        fitness_level,               
        exercises,
        diet,
        caloricIntake } = req.body;

    // Create a new document in the database
    const result = await Bio.create({
        current_weight,
        goal_weight, 
        gender, 
        clientAge, 
        height, 
        fitness_level,
        exercises,
        diet,
        caloricIntake,
        username:foundUser.username
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
        current_weight, 
        goal_weight, 
        height, 
        clientAge, 
        gender, 
        fitness_level,
        exercises,
        diet,
        caloricIntake
    } = req.body;

    const result = await Bio.updateOne(
        { username: foundUser.username },
        { 
            $set: {
                current_weight,
                goal_weight,
                gender,
                clientAge,
                height,
                fitness_level,
                username: foundUser.username ,
                exercises,
                diet,
                caloricIntake
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

const updatePlan = async(req, res) =>{
    const {exercises, username} = req.body
    const result = await Bio.updateOne(
        { username },
        { 
            $set: {
                exercises
            }
        }
    );
    res.status(201).json(result);
}

module.exports = {
    getClient,
    getAllBios,
    createNewBio,
    getBio,
    updateBio,
    updateAccount,
    updatePlan
};