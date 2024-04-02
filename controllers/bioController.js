const Bio = require('../model/Bio');

const getBio = async (req, res) => {
    const bio = await Bio.find();
    if(!bio) return res.status(204).json({'message' : 'No Bios found'});
    res.json(bio);
}
const createNewBio = async (req, res) => {
    const bio = await Bio.find();
    if(!bio) return res.status(204).json({'message' : 'No Bios found'});
    console.log(req.body);
    /*
    const result = await Bio.create({
    name: "Keith",
    age: 35,
    current_Weight: 180,
    goal: 175,
    goal_Weight: 175,
    goal_Max: 200

});
    res.status(201).json(bio);*/
    res.status(201);
}
module.exports = {
    getBio,
    createNewBio
};