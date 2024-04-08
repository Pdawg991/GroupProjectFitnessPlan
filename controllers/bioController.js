const Bio = require('../model/Bio');

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
const getBio = async (req, res) => {
    //Create obj to pass to Find to find by parameters
    let obj = { 
    
    }
    //ADD VALIDATION OF PARAMETERS

    if (!req?.body?.fitness_goal) {
        return res.status(400).json({ 'message': 'Fitness goal required.' });
    }

    const bio = await Bio.find(
        {
        fitness_goal: req.body.fitness_goal,
        fitness_level: req.body.fitness_level
    });
    res.status(201).json(bio);
}

module.exports = {
    getAllBios,
    createNewBio,
    getBio
};