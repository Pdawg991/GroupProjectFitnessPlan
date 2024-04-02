const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bioSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    current_Weight: {
        type: Number,
        required: true
    },
    goal: {
        type: Number,
        required: true
    },
    goal_Weight: {
        type: Number,
        required: true
    },
    goal_Max: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('Bio', bioSchema);