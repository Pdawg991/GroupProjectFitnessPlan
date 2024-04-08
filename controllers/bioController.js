const { Bio, PersonalInfo } = require('../model/Bio');

const getAllBios = async (req, res) => {
    const bio = await Bio.find();
    if(!bio) return res.status(204).json({'message' : 'No Bios found'});
    res.json(bio);
}
const createNewBio = async (req, res) => {
    const bio = await Bio.find();
    if(!bio) return res.status(204).json({'message' : 'No Bios found'});
    const { fitness_goal, current_weight, 
        goal_weight, current_max, 
        goal_max, fitness_level } = req.body;

    // Create a new document in the database
    const result = await Bio.create({
        fitness_goal, 
        current_weight, 
        goal_weight, 
        current_max, 
        goal_max, 
        fitness_level
    });
    res.status(201).json(result);
}
const createNewPi = async (req, res) => {
    const bio = await PersonalInfo.find();
    if(!bio) return res.status(204).json({'message' : 'No Personal Informatino found'});
    const { age, current_weight, current_height, gender, 
        name, goal_weight,level } = req.body;
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
        // Find the newest document based on the createdAt field
        const bio = await Bio.findOne().sort({ createdAt: -1 });

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


module.exports = {
    getAllBios,
    createNewBio,
    createNewPi,
    getBio
};