const Bio = require('../model/Bio');

const getBio = async (req, res) => {
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
module.exports = {
    getBio,
    createNewBio
};