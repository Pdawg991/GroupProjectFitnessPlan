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

const personalInfoSchema = new Schema({
    age: {
        type: Number,
        required: true
    },
    current_weight: {
        type: Number,
        required: true
    },
    current_height: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['m', 'f'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    goal_weight: {
        type: Number,
        required: true
    },
    level: {
        type: Number,
        required: true
    }
});

const Bio = mongoose.model('Bio', bioSchema);
const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);

module.exports = { Bio, PersonalInfo };
