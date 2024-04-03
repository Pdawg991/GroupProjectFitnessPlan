const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bioSchema = new Schema({
    fitness_goal: {
        type: String,
        required: true
    },
    current_weight: {
        type: Number,
        required: true
    },
    goal_weight: {
        type: Number,
        required: true
    },
    current_max: {
        type: Number,
        required: true
    }, 
    goal_max: {
        type: Number,
        required: true
    },
    fitness_level: {
        type: Number,
        required: true
    },
});
module.exports = mongoose.model('Bio', bioSchema);